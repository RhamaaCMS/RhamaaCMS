"""
Async MQTT client singleton.

Single import point for all MQTT operations across the project:

    from apps.mqtt.client import mqtt_client

    # Publish from async context (views, consumers, tasks)
    await mqtt_client.publish("devices/room1/cmd", "ON")

    # Publish from sync context (models, management commands)
    from asgiref.sync import async_to_sync
    async_to_sync(mqtt_client.publish)("devices/room1/cmd", "ON")

Runtime ownership depends on MQTT_RUN_MODE: embedded mode uses ASGI lifespan;
production worker mode uses ``python manage.py mqtt_worker``.
"""

import asyncio
import logging
import random
import socket
import ssl
from typing import Optional

logger = logging.getLogger(__name__)


class MQTTClientManager:
    """
    Manages the aiomqtt connection lifecycle.

    - Starts/stops through embedded ASGI lifespan or dedicated worker.
    - Auto-reconnects with exponential backoff and jitter.
    - Runs an hourly auto-purge task for message history.
    - Fires Django signals and broadcasts to WebSocket on every message.

    Integration points for other apps
    -----------------------------------
    1. Django signal (works from any sync or async code):
          from apps.mqtt.signals import mqtt_message_received
          mqtt_message_received.connect(my_handler)

    2. Direct publish (async):
          from apps.mqtt.client import mqtt_client
          await mqtt_client.publish("topic", "payload")

    3. Query history model:
          from apps.mqtt.models import MQTTMessage
    """

    def __init__(self):
        self._client = None
        self._mqtt_task: Optional[asyncio.Task] = None
        self._purge_task: Optional[asyncio.Task] = None
        self._connected = False
        self._active_topics: set[str] = set()
        self._connection_ready = asyncio.Event()

    @property
    def is_connected(self) -> bool:
        return self._connected

    @property
    def active_topics(self) -> list[str]:
        return sorted(self._active_topics)

    async def start(self):
        """Called at ASGI lifespan startup."""
        from django.conf import settings as s

        if getattr(s, "MQTT_RUN_MODE", "disabled") == "disabled":
            logger.info("MQTT: disabled")
            return
        if self._mqtt_task and not self._mqtt_task.done():
            logger.debug("MQTT: client already started")
            return

        host = getattr(s, "MQTT_BROKER_HOST", "localhost")
        port = getattr(s, "MQTT_BROKER_PORT", 1883)

        self._mqtt_task = asyncio.create_task(
            self._connection_loop(host, port), name="mqtt-connection-loop"
        )
        self._purge_task = asyncio.create_task(
            self._auto_purge_loop(), name="mqtt-auto-purge"
        )
        logger.info(f"MQTT: Starting client → {host}:{port}")

    async def stop(self):
        """Called at ASGI lifespan shutdown."""
        for task in (self._mqtt_task, self._purge_task):
            if task and not task.done():
                task.cancel()
                try:
                    await task
                except asyncio.CancelledError:
                    pass
        self._connected = False
        self._connection_ready.clear()
        self._client = None
        self._mqtt_task = None
        self._purge_task = None
        logger.info("MQTT: Client stopped")

    async def wait_until_connected(self, timeout: float | None = None) -> bool:
        try:
            await asyncio.wait_for(self._connection_ready.wait(), timeout=timeout)
        except TimeoutError:
            return False
        return True

    # ------------------------------------------------------------------
    # Connection loop
    # ------------------------------------------------------------------

    async def _connection_loop(self, host: str, port: int):
        """Reconnecting MQTT loop — runs for the lifetime of the server."""
        import aiomqtt
        from django.conf import settings as s

        client_id = getattr(s, "MQTT_CLIENT_ID", "") or f"rhamaa-{socket.gethostname()}"
        username = getattr(s, "MQTT_USERNAME", None)
        password = getattr(s, "MQTT_PASSWORD", None)
        tls_context = self._build_tls_context(s)
        retry_delay = 1.0

        while True:
            try:
                kwargs = dict(hostname=host, port=port, identifier=client_id, keepalive=60)
                if username:
                    kwargs["username"] = username
                    kwargs["password"] = password
                if tls_context:
                    kwargs["tls_context"] = tls_context

                async with aiomqtt.Client(**kwargs) as client:
                    self._client = client
                    self._connected = True
                    self._connection_ready.set()
                    retry_delay = 1.0
                    await self._fire_connection_signal(True, host, port)

                    topics = await self._load_topics()
                    self._active_topics = set(topics)
                    for topic in topics:
                        await client.subscribe(topic)
                        logger.info(f"MQTT: Subscribed → {topic}")

                    async for message in client.messages:
                        await self._handle_message(
                            str(message.topic),
                            message.payload.decode("utf-8", errors="replace"),
                            int(message.qos),
                        )

            except asyncio.CancelledError:
                break
            except Exception as exc:
                self._connected = False
                self._connection_ready.clear()
                self._client = None
                self._active_topics = set()
                await self._fire_connection_signal(False, host, port)
                sleep_for = min(60.0, retry_delay) + random.uniform(0, 0.5)
                logger.warning(
                    "MQTT: Lost connection (%s), retry in %.1f s", exc, sleep_for
                )
                await asyncio.sleep(sleep_for)
                retry_delay = min(60.0, retry_delay * 2)

    # ------------------------------------------------------------------
    # Incoming message handling
    # ------------------------------------------------------------------

    async def _handle_message(self, topic: str, payload: str, qos: int):
        """Save to history, broadcast to WebSocket, fire Django signal."""
        from asgiref.sync import sync_to_async
        from django.utils import timezone

        # 1. Persist to history
        try:
            from .models import MQTTMessage
            await sync_to_async(MQTTMessage.objects.create)(
                topic=topic, payload=payload, qos=qos, direction="in"
            )
        except Exception as exc:
            logger.error(f"MQTT: history save failed: {exc}")

        # 2. Push to WebSocket dashboard group
        try:
            from channels.layers import get_channel_layer
            layer = get_channel_layer()
            if layer:
                await layer.group_send(
                    "mqtt_dashboard",
                    {
                        "type": "mqtt.message",
                        "data": {
                            "direction": "in",
                            "topic": topic,
                            "payload": payload,
                            "qos": qos,
                            "ts": timezone.now().isoformat(),
                        },
                    },
                )
        except Exception as exc:
            logger.debug(f"MQTT: WebSocket broadcast failed: {exc}")

        # 3. Django signal — integration point for other apps
        try:
            from .signals import mqtt_message_received
            await sync_to_async(mqtt_message_received.send)(
                sender=self.__class__, topic=topic, payload=payload, qos=qos
            )
        except Exception as exc:
            logger.error(f"MQTT: signal dispatch error: {exc}")

    # ------------------------------------------------------------------
    # Dynamic subscribe / unsubscribe
    # ------------------------------------------------------------------

    async def subscribe(self, topic: str, qos: int = 0) -> bool:
        """
        Subscribe to a topic at runtime without restarting the server.
        Persists the change to MQTTSettings.
        """
        if not self._client or not self._connected:
            return False
        try:
            await self._client.subscribe(topic, qos=qos)
            self._active_topics.add(topic)
            await self._save_topics()
            logger.info(f"MQTT: Subscribed → {topic}")
            return True
        except Exception as exc:
            logger.error(f"MQTT: subscribe error: {exc}")
            return False

    async def unsubscribe(self, topic: str) -> bool:
        """
        Unsubscribe from a topic at runtime.
        Persists the change to MQTTSettings.
        """
        if not self._client or not self._connected:
            return False
        try:
            await self._client.unsubscribe(topic)
            self._active_topics.discard(topic)
            await self._save_topics()
            logger.info(f"MQTT: Unsubscribed ← {topic}")
            return True
        except Exception as exc:
            logger.error(f"MQTT: unsubscribe error: {exc}")
            return False

    async def reload_subscriptions(self) -> bool:
        """
        Re-sync subscriptions from MQTTSettings without restarting the server.
        Subscribes to any new topics and unsubscribes from removed ones.
        """
        if not self._client or not self._connected:
            return False
        try:
            new_topics = set(await self._load_topics())
            to_add = new_topics - self._active_topics
            to_del = self._active_topics - new_topics

            for t in to_add:
                await self._client.subscribe(t)
                logger.info(f"MQTT: Reloaded + subscribed → {t}")

            for t in to_del:
                await self._client.unsubscribe(t)
                logger.info(f"MQTT: Reloaded - unsubscribed ← {t}")

            self._active_topics = new_topics
            logger.info(f"MQTT: Subscriptions reloaded ({len(new_topics)} active)")
            return True
        except Exception as exc:
            logger.error(f"MQTT: reload_subscriptions error: {exc}")
            return False

    async def _save_topics(self):
        """
        Sync _active_topics set with MQTTTopic records.
        Adds missing topics, removes stale ones.
        Preserves existing name/description fields.
        """
        try:
            from asgiref.sync import sync_to_async
            from .models import MQTTSettings, MQTTTopic

            def _sync():
                s = MQTTSettings.get_solo()
                existing = set(s.topics.values_list("topic", flat=True))
                to_add = self._active_topics - existing
                to_del = existing - self._active_topics
                for t in to_add:
                    MQTTTopic.objects.create(settings=s, topic=t)
                if to_del:
                    s.topics.filter(topic__in=to_del).delete()

            await sync_to_async(_sync)()
        except Exception as exc:
            logger.error(f"MQTT: _save_topics error: {exc}")

    # ------------------------------------------------------------------
    # Publish
    # ------------------------------------------------------------------

    async def publish(self, topic: str, payload: str, qos: int = 0, retain: bool = False):
        """
        Publish a message to the MQTT broker.

        Raises RuntimeError if the client is not connected.
        """
        if not self._client:
            raise RuntimeError("MQTT client is not connected to the broker.")

        await self._client.publish(topic, payload, qos=qos, retain=retain)

        from asgiref.sync import sync_to_async
        from django.utils import timezone

        # Persist outgoing message to history
        try:
            from .models import MQTTMessage
            await sync_to_async(MQTTMessage.objects.create)(
                topic=topic, payload=str(payload), qos=qos, direction="out"
            )
        except Exception as exc:
            logger.error(f"MQTT: outgoing history save failed: {exc}")

        # Broadcast to WebSocket dashboard
        try:
            from channels.layers import get_channel_layer
            layer = get_channel_layer()
            if layer:
                await layer.group_send(
                    "mqtt_dashboard",
                    {
                        "type": "mqtt.message",
                        "data": {
                            "direction": "out",
                            "topic": topic,
                            "payload": str(payload),
                            "qos": qos,
                            "ts": timezone.now().isoformat(),
                        },
                    },
                )
        except Exception:
            pass

        # Fire signal
        try:
            from asgiref.sync import sync_to_async
            from .signals import mqtt_message_published
            await sync_to_async(mqtt_message_published.send)(
                sender=self.__class__, topic=topic, payload=payload, qos=qos
            )
        except Exception as exc:
            logger.error(f"MQTT: published signal error: {exc}")

    # ------------------------------------------------------------------
    # Helpers
    # ------------------------------------------------------------------

    async def _load_topics(self) -> list[str]:
        """Read subscribed topics from MQTTTopic records."""
        from django.conf import settings as django_settings
        from .worker_registry import get_default_topics

        fallback_topics = set(getattr(django_settings, "MQTT_DEFAULT_TOPICS", ()))
        fallback_topics.update(get_default_topics())

        try:
            from asgiref.sync import sync_to_async
            from .models import MQTTSettings

            def _get():
                s = MQTTSettings.get_solo()
                return list(s.topics.values_list("topic", flat=True))

            topics = await sync_to_async(_get)()
            configured = [t.strip() for t in topics if t.strip()]
            return configured or sorted(fallback_topics)
        except Exception:
            logger.exception("MQTT: failed to load subscriptions")
            return sorted(fallback_topics)

    @staticmethod
    def _build_tls_context(settings):
        if not getattr(settings, "MQTT_TLS_ENABLED", False):
            return None
        context = ssl.create_default_context(
            cafile=getattr(settings, "MQTT_TLS_CA_CERT", "") or None
        )
        certfile = getattr(settings, "MQTT_TLS_CERTFILE", "")
        keyfile = getattr(settings, "MQTT_TLS_KEYFILE", "")
        if certfile:
            context.load_cert_chain(certfile=certfile, keyfile=keyfile or None)
        return context

    async def _auto_purge_loop(self):
        """Hourly task: delete old messages based on MQTTSettings retention policy."""
        while True:
            await asyncio.sleep(3600)
            try:
                from asgiref.sync import sync_to_async
                from .models import MQTTMessage
                deleted = await sync_to_async(MQTTMessage.purge_old)()
                if deleted:
                    logger.info(f"MQTT: Auto-purged {deleted} old message(s)")
            except asyncio.CancelledError:
                break
            except Exception as exc:
                logger.error(f"MQTT: Auto-purge error: {exc}")

    async def _fire_connection_signal(self, connected: bool, host: str, port: int):
        try:
            from asgiref.sync import sync_to_async
            from .signals import mqtt_connection_changed
            from .runtime_status import set_runtime_status

            await sync_to_async(set_runtime_status)(
                connected=connected, host=host, port=port
            )
            await sync_to_async(mqtt_connection_changed.send)(
                sender=self.__class__, connected=connected, host=host, port=port
            )
        except Exception:
            pass


# Global singleton — import this anywhere in the project
mqtt_client = MQTTClientManager()

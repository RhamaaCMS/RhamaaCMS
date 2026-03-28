"""
Async MQTT client singleton.

Single import point for all MQTT operations across the project:

    from apps.mqtt.client import mqtt_client

    # Publish from async context (views, consumers, tasks)
    await mqtt_client.publish("devices/room1/cmd", "ON")

    # Publish from sync context (models, management commands)
    from asgiref.sync import async_to_sync
    async_to_sync(mqtt_client.publish)("devices/room1/cmd", "ON")

The client starts automatically when the ASGI server boots via
MQTTLifespanMiddleware (apps/mqtt/middleware.py). No separate terminal
or worker process is needed.
"""

import asyncio
import logging
import uuid
from typing import Optional

logger = logging.getLogger(__name__)


class MQTTClientManager:
    """
    Manages the aiomqtt connection lifecycle.

    - Starts/stops via ASGI lifespan events (single runtime).
    - Auto-reconnects on connection loss with a 5 s backoff.
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

    @property
    def is_connected(self) -> bool:
        return self._connected

    @property
    def active_topics(self) -> list[str]:
        return sorted(self._active_topics)

    async def start(self):
        """Called at ASGI lifespan startup."""
        from django.conf import settings as s

        if not getattr(s, "MQTT_ENABLED", True):
            logger.info("MQTT: Disabled (MQTT_ENABLED=False)")
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
        logger.info("MQTT: Client stopped")

    # ------------------------------------------------------------------
    # Connection loop
    # ------------------------------------------------------------------

    async def _connection_loop(self, host: str, port: int):
        """Reconnecting MQTT loop — runs for the lifetime of the server."""
        import aiomqtt
        from django.conf import settings as s

        client_id = f"rhamaa-{uuid.uuid4().hex[:8]}"
        username = getattr(s, "MQTT_USERNAME", None)
        password = getattr(s, "MQTT_PASSWORD", None)

        while True:
            try:
                kwargs = dict(hostname=host, port=port, identifier=client_id, keepalive=60)
                if username:
                    kwargs["username"] = username
                    kwargs["password"] = password

                async with aiomqtt.Client(**kwargs) as client:
                    self._client = client
                    self._connected = True
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
                self._client = None
                self._active_topics = set()
                await self._fire_connection_signal(False, host, port)
                logger.warning(f"MQTT: Lost connection ({exc}), retry in 5 s…")
                await asyncio.sleep(5)

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
        try:
            from asgiref.sync import sync_to_async
            from .models import MQTTSettings

            def _get():
                s = MQTTSettings.get_solo()
                return list(s.topics.values_list("topic", flat=True))

            topics = await sync_to_async(_get)()
            return [t.strip() for t in topics if t.strip()] or ["#"]
        except Exception:
            return ["#"]

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
            await sync_to_async(mqtt_connection_changed.send)(
                sender=self.__class__, connected=connected, host=host, port=port
            )
        except Exception:
            pass


# Global singleton — import this anywhere in the project
mqtt_client = MQTTClientManager()

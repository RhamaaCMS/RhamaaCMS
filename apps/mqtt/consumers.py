"""
WebSocket consumer for the MQTT real-time dashboard.

Browser connects to ws://<host>/ws/mqtt/dashboard/
The consumer:
  - Joins the "mqtt_dashboard" channel layer group
  - Forwards every mqtt.message group event to the browser as JSON
  - Accepts publish commands from the browser via JSON websocket message

Only staff users are allowed to connect.
"""

import logging

from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer

logger = logging.getLogger(__name__)

DASHBOARD_GROUP = "mqtt_dashboard"


class MQTTDashboardConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        user = self.scope.get("user")
        if not user or not user.is_staff or not await self._has_perm("mqtt.view_mqttmessage"):
            await self.close(code=4403)
            return

        await self.channel_layer.group_add(DASHBOARD_GROUP, self.channel_name)
        await self.accept()

        from .client import mqtt_client
        from .runtime_status import get_runtime_status

        runtime = await sync_to_async(get_runtime_status)()
        await self.send_json(
            {
                "type": "status",
                "broker_connected": runtime["connected"],
                "topics": mqtt_client.active_topics,
            }
        )
        logger.debug(f"MQTT WS: {user} connected to dashboard")

    async def disconnect(self, code):
        await self.channel_layer.group_discard(DASHBOARD_GROUP, self.channel_name)

    # ------------------------------------------------------------------
    # Messages from browser
    # ------------------------------------------------------------------

    async def receive_json(self, content, **kwargs):
        """
        Handle commands from the browser dashboard.

        Supported types:
            {"type": "publish",        "topic": "t", "payload": "p", "qos": 0}
            {"type": "subscribe",      "topic": "sensors/#"}
            {"type": "unsubscribe",    "topic": "sensors/#"}
            {"type": "get_subscriptions"}
            {"type": "ping"}
        """
        msg_type = content.get("type")
        from django.conf import settings
        from .client import mqtt_client

        if (
            msg_type in {"publish", "subscribe", "unsubscribe", "reload_subscriptions"}
            and getattr(settings, "MQTT_RUN_MODE", "disabled") != "embedded"
        ):
            await self.send_json(
                {
                    "type": "error",
                    "message": "Direct MQTT mutations are disabled outside embedded development mode.",
                }
            )
            return

        if msg_type == "publish":
            if not await self._has_perm("mqtt.publish_mqtt"):
                await self.send_json({"type": "error", "message": "Permission denied."})
                return
            topic = content.get("topic", "").strip()
            payload = content.get("payload", "")
            try:
                qos = int(content.get("qos", 0))
            except (TypeError, ValueError):
                qos = -1

            if not topic or len(topic) > 500 or "+" in topic or "#" in topic or qos not in (0, 1, 2):
                await self.send_json({"type": "error", "message": "Invalid topic or QoS."})
                return
            if len(str(payload).encode("utf-8")) > 256 * 1024:
                await self.send_json({"type": "error", "message": "Payload is too large."})
                return

            try:
                await mqtt_client.publish(topic, payload, qos=qos)
                await self.send_json({"type": "publish_ok", "topic": topic})
            except Exception as exc:
                await self.send_json({"type": "error", "message": str(exc)})

        elif msg_type == "subscribe":
            if not await self._has_perm("mqtt.manage_mqtt_subscriptions"):
                await self.send_json({"type": "error", "message": "Permission denied."})
                return
            topic = content.get("topic", "").strip()
            if not topic:
                await self.send_json({"type": "error", "message": "Topic is required."})
                return
            ok = await mqtt_client.subscribe(topic)
            # Broadcast updated topic list to every open dashboard tab
            await self.channel_layer.group_send(
                DASHBOARD_GROUP,
                {
                    "type": "mqtt.subscriptions",
                    "data": {
                        "type": "subscriptions",
                        "topics": mqtt_client.active_topics,
                    },
                },
            )
            if not ok:
                await self.send_json(
                    {"type": "error", "message": "Not connected to broker — cannot subscribe."}
                )

        elif msg_type == "unsubscribe":
            if not await self._has_perm("mqtt.manage_mqtt_subscriptions"):
                await self.send_json({"type": "error", "message": "Permission denied."})
                return
            topic = content.get("topic", "").strip()
            if not topic:
                await self.send_json({"type": "error", "message": "Topic is required."})
                return
            ok = await mqtt_client.unsubscribe(topic)
            await self.channel_layer.group_send(
                DASHBOARD_GROUP,
                {
                    "type": "mqtt.subscriptions",
                    "data": {
                        "type": "subscriptions",
                        "topics": mqtt_client.active_topics,
                    },
                },
            )
            if not ok:
                await self.send_json(
                    {"type": "error", "message": "Not connected to broker — cannot unsubscribe."}
                )

        elif msg_type == "reload_subscriptions":
            if not await self._has_perm("mqtt.manage_mqtt_subscriptions"):
                await self.send_json({"type": "error", "message": "Permission denied."})
                return
            ok = await mqtt_client.reload_subscriptions()
            await self.channel_layer.group_send(
                DASHBOARD_GROUP,
                {
                    "type": "mqtt.subscriptions",
                    "data": {
                        "type": "subscriptions",
                        "topics": mqtt_client.active_topics,
                    },
                },
            )
            await self.send_json({
                "type": "reload_result",
                "ok": ok,
                "topics": mqtt_client.active_topics,
            })

        elif msg_type == "get_subscriptions":
            await self.send_json(
                {"type": "subscriptions", "topics": mqtt_client.active_topics}
            )

        elif msg_type == "ping":
            from .runtime_status import get_runtime_status

            runtime = await sync_to_async(get_runtime_status)()
            await self.send_json(
                {
                    "type": "pong",
                    "broker_connected": runtime["connected"],
                    "topics": mqtt_client.active_topics,
                }
            )

    async def _has_perm(self, permission: str) -> bool:
        user = self.scope.get("user")
        return bool(user and await sync_to_async(user.has_perm)(permission))

    # ------------------------------------------------------------------
    # Messages from channel layer group
    # ------------------------------------------------------------------

    async def mqtt_message(self, event):
        """Forward an MQTT message broadcast to the browser."""
        await self.send_json(event["data"])

    async def mqtt_subscriptions(self, event):
        """Forward a subscription-list update to the browser."""
        await self.send_json(event["data"])

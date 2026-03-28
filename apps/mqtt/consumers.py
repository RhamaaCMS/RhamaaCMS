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

from channels.generic.websocket import AsyncJsonWebsocketConsumer

logger = logging.getLogger(__name__)

DASHBOARD_GROUP = "mqtt_dashboard"


class MQTTDashboardConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        user = self.scope.get("user")
        if not user or not user.is_staff:
            await self.close(code=4403)
            return

        await self.channel_layer.group_add(DASHBOARD_GROUP, self.channel_name)
        await self.accept()

        from .client import mqtt_client
        await self.send_json(
            {
                "type": "status",
                "broker_connected": mqtt_client.is_connected,
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
        from .client import mqtt_client

        if msg_type == "publish":
            topic = content.get("topic", "").strip()
            payload = content.get("payload", "")
            qos = int(content.get("qos", 0))

            if not topic:
                await self.send_json({"type": "error", "message": "Topic is required."})
                return

            try:
                await mqtt_client.publish(topic, payload, qos=qos)
                await self.send_json({"type": "publish_ok", "topic": topic})
            except Exception as exc:
                await self.send_json({"type": "error", "message": str(exc)})

        elif msg_type == "subscribe":
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
            await self.send_json(
                {
                    "type": "pong",
                    "broker_connected": mqtt_client.is_connected,
                    "topics": mqtt_client.active_topics,
                }
            )

    # ------------------------------------------------------------------
    # Messages from channel layer group
    # ------------------------------------------------------------------

    async def mqtt_message(self, event):
        """Forward an MQTT message broadcast to the browser."""
        await self.send_json(event["data"])

    async def mqtt_subscriptions(self, event):
        """Forward a subscription-list update to the browser."""
        await self.send_json(event["data"])

"""
ASGI Lifespan Middleware for MQTT.

Wraps the Channels ProtocolTypeRouter and intercepts ASGI lifespan
events (startup / shutdown) to start and stop the MQTT client.

This means the MQTT client runs inside the SAME process as Django,
eliminating the need for a separate terminal or worker. Everything
starts with a single command:

    uvicorn {{ project_name }}.asgi:application --lifespan on
    # or
    gunicorn -k uvicorn_worker.UvicornWorker {{ project_name }}.asgi:application
"""

import logging

logger = logging.getLogger(__name__)


class MQTTLifespanMiddleware:
    """
    ASGI middleware that hooks into lifespan startup/shutdown
    to manage the MQTT client connection.
    """

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] == "lifespan":
            await self._handle_lifespan(receive, send)
        else:
            await self.app(scope, receive, send)

    async def _handle_lifespan(self, receive, send):
        from django.conf import settings

        embedded = getattr(settings, "MQTT_RUN_MODE", "disabled") == "embedded"
        while True:
            event = await receive()

            if event["type"] == "lifespan.startup":
                try:
                    if embedded:
                        from .client import mqtt_client

                        await mqtt_client.start()
                    await send({"type": "lifespan.startup.complete"})
                    logger.info("MQTT: Lifespan startup complete")
                except Exception as exc:
                    logger.error(f"MQTT: Lifespan startup failed: {exc}")
                    await send({"type": "lifespan.startup.failed", "message": str(exc)})
                    return

            elif event["type"] == "lifespan.shutdown":
                try:
                    if embedded:
                        from .client import mqtt_client

                        await mqtt_client.stop()
                finally:
                    await send({"type": "lifespan.shutdown.complete"})
                    logger.info("MQTT: Lifespan shutdown complete")
                return

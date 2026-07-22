from unittest.mock import AsyncMock, patch

from django.test import SimpleTestCase, override_settings

from ..checks import mqtt_deployment_checks
from ..middleware import MQTTLifespanMiddleware
from ..worker_registry import (
    get_default_topics,
    get_worker_tasks,
    register_default_topic,
    register_worker_task,
)


class LifespanTests(SimpleTestCase):
    async def _run_lifespan(self):
        events = iter(
            [
                {"type": "lifespan.startup"},
                {"type": "lifespan.shutdown"},
            ]
        )
        sent = []

        async def receive():
            return next(events)

        async def send(event):
            sent.append(event)

        middleware = MQTTLifespanMiddleware(AsyncMock())
        await middleware({"type": "lifespan"}, receive, send)
        return sent

    @override_settings(MQTT_RUN_MODE="worker")
    @patch("apps.mqtt.client.mqtt_client.stop", new_callable=AsyncMock)
    @patch("apps.mqtt.client.mqtt_client.start", new_callable=AsyncMock)
    async def test_worker_mode_does_not_start_mqtt_in_web(self, start, stop):
        sent = await self._run_lifespan()
        start.assert_not_awaited()
        stop.assert_not_awaited()
        self.assertEqual(sent[-1]["type"], "lifespan.shutdown.complete")

    @override_settings(MQTT_RUN_MODE="embedded")
    @patch("apps.mqtt.client.mqtt_client.stop", new_callable=AsyncMock)
    @patch("apps.mqtt.client.mqtt_client.start", new_callable=AsyncMock)
    async def test_embedded_mode_owns_mqtt(self, start, stop):
        await self._run_lifespan()
        start.assert_awaited_once()
        stop.assert_awaited_once()


class WorkerRegistryTests(SimpleTestCase):
    def test_registration_is_idempotent(self):
        async def task():
            return None

        before = len(get_worker_tasks())
        register_worker_task(task)
        register_worker_task(task)
        self.assertEqual(len(get_worker_tasks()), before + 1)

    def test_default_topic_registration_is_idempotent(self):
        register_default_topic("iot/test/#")
        register_default_topic("iot/test/#")
        self.assertEqual(get_default_topics().count("iot/test/#"), 1)


class DeploymentCheckTests(SimpleTestCase):
    @override_settings(
        DEBUG=False,
        MQTT_RUN_MODE="embedded",
        MQTT_CLIENT_ID="",
        MQTT_TLS_ENABLED=False,
        MQTT_DEFAULT_TOPICS=(),
        CHANNEL_LAYERS={"default": {"BACKEND": "channels.layers.InMemoryChannelLayer"}},
    )
    def test_production_rejects_embedded_and_inmemory(self):
        ids = {issue.id for issue in mqtt_deployment_checks(None)}
        self.assertIn("mqtt.E002", ids)
        self.assertIn("mqtt.E003", ids)

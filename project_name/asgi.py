"""
ASGI configuration for RhamaaCMS.

Single-runtime architecture:
  - HTTP + WebSocket served via Django Channels (Daphne / Uvicorn)
  - MQTT client starts/stops via ASGI lifespan events (MQTTLifespanMiddleware)
  - No separate terminal or worker needed

Run in development:
    uvicorn {{ project_name }}.asgi:application --reload --lifespan on

Run in production (single command):
    gunicorn -k uvicorn.workers.UvicornWorker {{ project_name }}.asgi:application -w 2
"""

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "{{ project_name }}.settings.dev")

# Must be imported before Channels routing to ensure Django apps are ready
from django.core.asgi import get_asgi_application  # noqa: E402

django_asgi_app = get_asgi_application()

from channels.auth import AuthMiddlewareStack  # noqa: E402
from channels.routing import ProtocolTypeRouter, URLRouter  # noqa: E402
from apps.mqtt.middleware import MQTTLifespanMiddleware  # noqa: E402
from apps.mqtt.routing import websocket_urlpatterns  # noqa: E402

application = MQTTLifespanMiddleware(
    ProtocolTypeRouter(
        {
            # Standard Django HTTP (Wagtail pages, admin, API)
            "http": django_asgi_app,
            # WebSocket — authenticated via Django session
            "websocket": AuthMiddlewareStack(
                URLRouter(websocket_urlpatterns)
            ),
        }
    )
)

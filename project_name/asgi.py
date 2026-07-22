"""
ASGI configuration for RhamaaCMS.

Runtime architecture:
  - HTTP + WebSocket served via Django Channels (Daphne / Uvicorn)
  - Development: MQTT_RUN_MODE=embedded starts MQTT through ASGI lifespan
  - Production: MQTT_RUN_MODE=worker; run `python manage.py mqtt_worker`

Run in development:
    uvicorn {{ project_name }}.asgi:application --reload --lifespan on

Run in production (single command):
    gunicorn -k uvicorn_worker.UvicornWorker {{ project_name }}.asgi:application -w 2
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

from django.urls import path
from .consumers import MQTTDashboardConsumer

websocket_urlpatterns = [
    path("ws/mqtt/dashboard/", MQTTDashboardConsumer.as_asgi()),
]

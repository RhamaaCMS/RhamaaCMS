"""
Wagtail admin views for the MQTT dashboard.

URL layout (all under /admin/mqtt/ via wagtail_hooks.py):
    GET  /admin/mqtt/                 → dashboard (live feed + history)
    POST /admin/mqtt/publish/         → REST publish API (for other apps)
    POST /admin/mqtt/history/delete/<pk>/  → delete one message
    POST /admin/mqtt/history/clear/   → delete ALL messages
    POST /admin/mqtt/history/purge/   → purge messages older than retention period
    GET  /admin/mqtt/status/          → JSON broker status (polled by dashboard JS)
"""

import json
import logging

from django.contrib.auth.decorators import login_required, permission_required
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect
from django.template.response import TemplateResponse
from django.views.decorators.http import require_http_methods

from django.urls import reverse, NoReverseMatch

from .client import mqtt_client
from .models import MQTTMessage, MQTTSettings

logger = logging.getLogger(__name__)

# Only staff users can access MQTT admin views
_staff_required = [login_required, permission_required("wagtailadmin.access_admin")]


def staff_view(fn):
    """Decorator: require login + wagtail admin access."""
    for dec in reversed(_staff_required):
        fn = dec(fn)
    return fn


# ---------------------------------------------------------------------------
# Dashboard
# ---------------------------------------------------------------------------


@staff_view
def dashboard(request):
    mqtt_settings = MQTTSettings.get_solo()

    direction_filter = request.GET.get("direction", "all")
    topic_filter = request.GET.get("topic", "").strip()

    qs = MQTTMessage.objects.all()
    if direction_filter in ("in", "out"):
        qs = qs.filter(direction=direction_filter)
    if topic_filter:
        qs = qs.filter(topic__icontains=topic_filter)

    paginator = Paginator(qs, 30)
    page_obj = paginator.get_page(request.GET.get("page"))

    from django.conf import settings as s
    broker_host = getattr(s, "MQTT_BROKER_HOST", "localhost")
    broker_port = getattr(s, "MQTT_BROKER_PORT", 1883)

    # Topics list for the quick-view Subscriptions panel
    subscribed_topics = list(
        mqtt_settings.topics.values("topic", "name", "description").order_by("topic")
    )

    # URL to the Wagtail Settings edit page for MQTTSettings
    try:
        mqtt_settings_url = reverse("wagtailsettings:edit", args=["mqtt", "mqttsettings"])
    except NoReverseMatch:
        mqtt_settings_url = "/admin/settings/mqtt/mqttsettings/"

    return TemplateResponse(
        request,
        "mqtt/dashboard.html",
        {
            "page_obj": page_obj,
            "mqtt_settings": mqtt_settings,
            "broker_host": broker_host,
            "broker_port": broker_port,
            "broker_connected": mqtt_client.is_connected,
            "direction_filter": direction_filter,
            "topic_filter": topic_filter,
            "total_messages": MQTTMessage.objects.count(),
            "total_in": MQTTMessage.objects.filter(direction="in").count(),
            "total_out": MQTTMessage.objects.filter(direction="out").count(),
            "subscribed_topics": subscribed_topics,
            "mqtt_settings_url": mqtt_settings_url,
        },
    )


# ---------------------------------------------------------------------------
# REST Publish API
# Used by the dashboard AJAX form AND other apps that want to publish
# ---------------------------------------------------------------------------


@staff_view
@require_http_methods(["POST"])
def publish_api(request):
    """
    Publish a message to the MQTT broker.

    Accepts JSON body OR form POST:
        {"topic": "test/hello", "payload": "world", "qos": 0}

    Returns JSON:
        {"ok": true, "topic": "..."}  or  {"ok": false, "error": "..."}

    Usage from another app (sync context):
        import requests
        requests.post("/admin/mqtt/publish/", json={"topic": "...", "payload": "..."})

    Or call mqtt_client directly:
        from apps.mqtt.client import mqtt_client
        from asgiref.sync import async_to_sync
        async_to_sync(mqtt_client.publish)("topic", "payload")
    """
    try:
        if request.content_type and "json" in request.content_type:
            data = json.loads(request.body)
        else:
            data = request.POST

        topic = (data.get("topic") or "").strip()
        payload = data.get("payload") or ""
        qos = int(data.get("qos") or 0)

        if not topic:
            return JsonResponse({"ok": False, "error": "topic is required"}, status=400)

        from asgiref.sync import async_to_sync
        async_to_sync(mqtt_client.publish)(topic, payload, qos=qos)

        return JsonResponse({"ok": True, "topic": topic})

    except RuntimeError as exc:
        return JsonResponse({"ok": False, "error": str(exc)}, status=503)
    except Exception as exc:
        logger.error(f"MQTT publish API error: {exc}")
        return JsonResponse({"ok": False, "error": "Internal error"}, status=500)


# ---------------------------------------------------------------------------
# History management
# ---------------------------------------------------------------------------


@staff_view
@require_http_methods(["POST"])
def history_delete(request, pk):
    """Delete a single message from history."""
    msg = get_object_or_404(MQTTMessage, pk=pk)
    msg.delete()
    return redirect("mqtt:dashboard")


@staff_view
@require_http_methods(["POST"])
def history_clear(request):
    """Delete ALL messages from history."""
    MQTTMessage.objects.all().delete()
    return redirect("mqtt:dashboard")


@staff_view
@require_http_methods(["POST"])
def history_purge(request):
    """Purge messages older than the configured retention period."""
    deleted = MQTTMessage.purge_old()
    logger.info(f"MQTT: Manual purge deleted {deleted} message(s)")
    return redirect("mqtt:dashboard")


# ---------------------------------------------------------------------------
# Status endpoint (polled by dashboard JS for broker connectivity indicator)
# ---------------------------------------------------------------------------


@staff_view
def status(request):
    from django.conf import settings as s
    return JsonResponse(
        {
            "connected": mqtt_client.is_connected,
            "host": getattr(s, "MQTT_BROKER_HOST", "localhost"),
            "port": getattr(s, "MQTT_BROKER_PORT", 1883),
        }
    )

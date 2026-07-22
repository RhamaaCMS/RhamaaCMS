from django.conf import settings
from django.core.checks import Error, Tags, Warning, register


@register(Tags.security, deploy=True)
def mqtt_deployment_checks(app_configs, **kwargs):
    issues = []
    mode = getattr(settings, "MQTT_RUN_MODE", "disabled")
    if mode not in {"disabled", "embedded", "worker"}:
        issues.append(Error("Invalid MQTT_RUN_MODE.", id="mqtt.E001"))
    if not settings.DEBUG and mode == "embedded":
        issues.append(
            Error(
                "Embedded MQTT cannot be used in production web workers.",
                hint="Set MQTT_RUN_MODE=worker and run `python manage.py mqtt_worker`.",
                id="mqtt.E002",
            )
        )
    backend = settings.CHANNEL_LAYERS.get("default", {}).get("BACKEND", "")
    if not settings.DEBUG and backend == "channels.layers.InMemoryChannelLayer":
        issues.append(Error("Redis channel layer is required in production.", id="mqtt.E003"))
    if not settings.DEBUG and mode == "worker" and not getattr(settings, "MQTT_CLIENT_ID", ""):
        issues.append(Error("MQTT_CLIENT_ID is required for worker mode.", id="mqtt.E004"))
    if not settings.DEBUG and mode == "worker" and not getattr(settings, "MQTT_TLS_ENABLED", False):
        issues.append(Warning("MQTT TLS is disabled in production.", id="mqtt.W001"))
    if "#" in getattr(settings, "MQTT_DEFAULT_TOPICS", ()):
        issues.append(
            Warning(
                "MQTT_DEFAULT_TOPICS contains global wildcard '#'.",
                hint="Use an application-specific prefix.",
                id="mqtt.W002",
            )
        )
    return issues

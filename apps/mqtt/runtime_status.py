from django.core.cache import cache
from django.utils import timezone

STATUS_KEY = "mqtt:runtime-status"


def set_runtime_status(*, connected: bool, host: str, port: int) -> None:
    cache.set(
        STATUS_KEY,
        {
            "connected": connected,
            "host": host,
            "port": port,
            "updated_at": timezone.now().isoformat(),
        },
        timeout=None,
    )


def get_runtime_status() -> dict:
    return cache.get(STATUS_KEY) or {
        "connected": False,
        "host": None,
        "port": None,
        "updated_at": None,
    }

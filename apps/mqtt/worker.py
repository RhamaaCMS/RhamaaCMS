"""Dedicated MQTT process runtime."""

import asyncio
import logging

from django.conf import settings

from .client import mqtt_client
from .worker_registry import get_worker_tasks

logger = logging.getLogger(__name__)


def _report_extension_result(task: asyncio.Task) -> None:
    if task.cancelled():
        return
    exception = task.exception()
    if exception is not None:
        logger.error(
            "MQTT extension task %s stopped unexpectedly",
            task.get_name(),
            exc_info=(type(exception), exception, exception.__traceback__),
        )


async def run_mqtt_worker() -> None:
    mode = getattr(settings, "MQTT_RUN_MODE", "disabled")
    if mode != "worker":
        raise RuntimeError(
            f"mqtt_worker requires MQTT_RUN_MODE=worker; current mode is {mode!r}."
        )

    extension_tasks: list[asyncio.Task] = []
    await mqtt_client.start()
    for factory in get_worker_tasks():
        task = asyncio.create_task(
            factory(), name=f"mqtt-extension:{factory.__module__}.{factory.__name__}"
        )
        task.add_done_callback(_report_extension_result)
        extension_tasks.append(task)
    logger.info("MQTT worker started with %d extension task(s)", len(extension_tasks))
    try:
        await asyncio.Event().wait()
    finally:
        for task in extension_tasks:
            task.cancel()
        if extension_tasks:
            await asyncio.gather(*extension_tasks, return_exceptions=True)
        await mqtt_client.stop()

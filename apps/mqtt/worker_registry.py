"""Registration point for optional MQTT worker background tasks."""

from collections.abc import Awaitable, Callable

WorkerTask = Callable[[], Awaitable[None]]
_worker_tasks: list[WorkerTask] = []
_default_topics: set[str] = set()


def register_worker_task(task: WorkerTask) -> None:
    if task not in _worker_tasks:
        _worker_tasks.append(task)


def get_worker_tasks() -> tuple[WorkerTask, ...]:
    return tuple(_worker_tasks)


def register_default_topic(topic: str) -> None:
    """Register app-owned fallback topic without overriding operator config."""
    normalized = topic.strip()
    if normalized:
        _default_topics.add(normalized)


def get_default_topics() -> tuple[str, ...]:
    return tuple(sorted(_default_topics))

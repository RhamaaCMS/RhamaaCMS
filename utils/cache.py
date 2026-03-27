"""Utility helpers for caching non-page responses."""

from __future__ import annotations

import logging
from collections.abc import Callable, Iterable
from functools import wraps
from typing import Any

from django.core.cache import cache
from django.http import HttpRequest, HttpResponse

CacheKeyPart = Any
ViewFunc = Callable[..., HttpResponse]

logger = logging.getLogger(__name__)


def build_cache_key(prefix: str, parts: Iterable[CacheKeyPart]) -> str:
    """Construct a deterministic cache key from dynamic parts."""
    joined_parts = ":".join(str(part) for part in parts if part is not None)
    return f"{prefix}:{joined_parts}" if joined_parts else prefix


def cache_api_response(
    timeout: int = 60,
    *,
    prefix: str = "api",
    key_func: Callable[[HttpRequest, tuple, dict], Iterable[CacheKeyPart]] | None = None,
) -> Callable[[ViewFunc], ViewFunc]:
    """Cache decorator for lightweight JSON/AJAX endpoints.

    Skips caching automatically for authenticated staff and Wagtail preview requests.
    """

    def decorator(view_func: ViewFunc) -> ViewFunc:
        @wraps(view_func)
        def wrapped(request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse:
            if getattr(request, "in_preview_panel", False):
                return view_func(request, *args, **kwargs)

            user = getattr(request, "user", None)
            if user is not None and user.is_authenticated and user.is_staff:
                return view_func(request, *args, **kwargs)

            if key_func:
                parts = key_func(request, args, kwargs)
            else:
                parts = (request.get_full_path(),)

            cache_key = build_cache_key(prefix, parts)
            cached_response = cache.get(cache_key)
            if cached_response is not None:
                logger.debug("cache_api_response hit", extra={"cache_key": cache_key})
                return cached_response

            response = view_func(request, *args, **kwargs)
            cache.set(cache_key, response, timeout=timeout)
            logger.debug(
                "cache_api_response miss", extra={"cache_key": cache_key, "timeout": timeout}
            )
            return response

        return wrapped  # type: ignore[return-value]

    return decorator


__all__ = ["cache_api_response", "build_cache_key"]

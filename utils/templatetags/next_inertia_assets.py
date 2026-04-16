import json
from pathlib import Path

from django import template
from django.conf import settings
from django.utils.html import format_html, format_html_join, json_script
from django.utils.safestring import mark_safe

register = template.Library()

MANIFEST_PATH = Path(settings.BASE_DIR) / "frontend" / "dist-next" / "manifest.json"
NEXT_BUILD_ID_PATH = Path(settings.BASE_DIR) / ".next-inertia" / "BUILD_ID"


@register.simple_tag
def next_inertia_assets():
    if not MANIFEST_PATH.exists():
        if settings.DEBUG:
            return mark_safe("<!-- Missing Next manifest: frontend/dist-next/manifest.json -->")
        return ""

    try:
        data = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        if settings.DEBUG:
            return mark_safe("<!-- Invalid Next manifest JSON -->")
        return ""

    css_tags = format_html_join(
        "\n",
        '<link rel="stylesheet" href="{}" />',
        ((href,) for href in data.get("css", [])),
    )

    js_tags = format_html_join(
        "\n",
        '<script src="{}" defer></script>',
        ((src,) for src in data.get("js", [])),
    )

    return format_html("{}\n{}", css_tags, js_tags)


@register.simple_tag
def next_runtime_bootstrap():
    """
    Next runtime expects __NEXT_DATA__ and a __next mount node.
    Provide a minimal bootstrap so Next-generated page chunks can execute
    while Django/Inertia remains the real app shell.
    """
    if not NEXT_BUILD_ID_PATH.exists():
        return ""

    build_id = NEXT_BUILD_ID_PATH.read_text(encoding="utf-8").strip()
    if not build_id:
        return ""

    payload = {
        "props": {"pageProps": {}},
        "page": "/",
        "query": {},
        "buildId": build_id,
        "nextExport": True,
        "autoExport": True,
        "isFallback": False,
        "scriptLoader": [],
    }

    next_root = '<div id="__next" style="display:none" aria-hidden="true"></div>'
    return format_html("{}\n{}", mark_safe(next_root), json_script(payload, "__NEXT_DATA__"))

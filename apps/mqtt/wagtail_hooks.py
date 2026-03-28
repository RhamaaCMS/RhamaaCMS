from django.urls import include, path
from wagtail import hooks
from wagtail.admin.menu import MenuItem


@hooks.register("register_admin_menu_item")
def register_mqtt_menu_item():
    return MenuItem(
        "MQTT",
        "/admin/mqtt/",
        icon_name="radio-empty",
        order=1000,
    )


@hooks.register("register_admin_urls")
def register_mqtt_admin_urls():
    from . import urls
    return [
        path("mqtt/", include((urls, "mqtt"), namespace="mqtt")),
    ]

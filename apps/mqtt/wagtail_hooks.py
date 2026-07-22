from django.urls import include, path
from wagtail import hooks
from wagtail.admin.menu import MenuItem


class MQTTMenuItem(MenuItem):
    def is_shown(self, request):
        return request.user.has_perm("mqtt.view_mqttmessage")


@hooks.register("register_admin_menu_item")
def register_mqtt_menu_item():
    return MQTTMenuItem(
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

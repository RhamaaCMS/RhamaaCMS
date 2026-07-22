from django.test import SimpleTestCase

from ..models import MQTTMessage


class MQTTPermissionTests(SimpleTestCase):
    def test_operational_permissions_are_declared(self):
        permissions = {code for code, _ in MQTTMessage._meta.permissions}
        self.assertEqual(
            permissions, {"publish_mqtt", "manage_mqtt_subscriptions"}
        )

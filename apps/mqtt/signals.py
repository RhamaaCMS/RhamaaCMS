"""
Django signals for MQTT integration.

Other apps hook into these signals to react to incoming MQTT messages
without coupling directly to the MQTT app.

Usage in apps/devices/apps.py:

    from django.db.models.signals import Signal
    from apps.mqtt.signals import mqtt_message_received

    def ready(self):
        mqtt_message_received.connect(self.handle_sensor_data)

    @staticmethod
    def handle_sensor_data(sender, topic, payload, qos, **kwargs):
        if topic.startswith("sensors/"):
            ...
"""

from django.dispatch import Signal

# Fired when a message arrives from the MQTT broker.
# kwargs: topic (str), payload (str), qos (int)
mqtt_message_received = Signal()

# Fired after a message is successfully published to the broker.
# kwargs: topic (str), payload (str), qos (int)
mqtt_message_published = Signal()

# Fired when the MQTT connection state changes.
# kwargs: connected (bool), host (str), port (int)
mqtt_connection_changed = Signal()

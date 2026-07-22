from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [("mqtt", "0002_remove_mqttsettings_subscribed_topics_mqtttopic")]

    operations = [
        migrations.AlterModelOptions(
            name="mqttmessage",
            options={
                "ordering": ["-received_at"],
                "permissions": [
                    ("publish_mqtt", "Can publish MQTT messages"),
                    ("manage_mqtt_subscriptions", "Can manage MQTT subscriptions"),
                ],
                "verbose_name": "MQTT Message",
                "verbose_name_plural": "MQTT Messages",
            },
        )
    ]

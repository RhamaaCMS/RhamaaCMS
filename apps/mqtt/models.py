from django.db import models
from django.utils import timezone
from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.contrib.settings.models import BaseGenericSetting, register_setting
from modelcluster.fields import ParentalKey
from modelcluster.models import ClusterableModel


class MQTTMessage(models.Model):
    """
    Persisted history of every MQTT message sent or received.

    Auto-purge is controlled by MQTTSettings.auto_delete_enabled and
    auto_delete_after_days. Call MQTTMessage.purge_old() to apply the
    retention policy (happens automatically every hour via the lifespan task,
    or manually from the Wagtail admin panel).

    Integration: other apps can query this model directly:
        from apps.mqtt.models import MQTTMessage
        recent = MQTTMessage.objects.filter(direction='in', topic__startswith='sensors/').order_by('-received_at')[:50]
    """

    DIRECTION_IN = "in"
    DIRECTION_OUT = "out"
    DIRECTION_CHOICES = [
        (DIRECTION_IN, "Received"),
        (DIRECTION_OUT, "Published"),
    ]

    topic = models.CharField(max_length=500, db_index=True)
    payload = models.TextField()
    qos = models.SmallIntegerField(default=0)
    direction = models.CharField(
        max_length=3,
        choices=DIRECTION_CHOICES,
        default=DIRECTION_IN,
        db_index=True,
    )
    received_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ["-received_at"]
        verbose_name = "MQTT Message"
        verbose_name_plural = "MQTT Messages"
        permissions = [
            ("publish_mqtt", "Can publish MQTT messages"),
            ("manage_mqtt_subscriptions", "Can manage MQTT subscriptions"),
        ]

    def __str__(self):
        return f"[{self.direction.upper()}] {self.topic} @ {self.received_at:%Y-%m-%d %H:%M:%S}"

    @classmethod
    def purge_old(cls) -> int:
        """
        Delete messages older than the configured retention period.
        Returns the number of deleted records.
        """
        settings = MQTTSettings.get_solo()
        if not settings.auto_delete_enabled:
            return 0
        cutoff = timezone.now() - timezone.timedelta(days=settings.auto_delete_after_days)
        deleted, _ = cls.objects.filter(received_at__lt=cutoff).delete()
        return deleted


@register_setting(icon="cogs")
class MQTTSettings(ClusterableModel, BaseGenericSetting):
    """
    Singleton settings for the MQTT app.
    Accessible from Wagtail admin → Snippets → MQTT Settings.

    Broker host/port live in Django settings / .env (needed before DB is ready).
    Topic subscriptions and retention policy are stored here so they can be
    changed at runtime without redeploying.
    """

    auto_delete_enabled = models.BooleanField(
        default=False,
        help_text="Automatically delete message history older than the retention period.",
    )
    auto_delete_after_days = models.PositiveIntegerField(
        default=7,
        help_text="Number of days to keep message history. Checked every hour.",
    )

    panels = [
        MultiFieldPanel(
            [
                FieldPanel("auto_delete_enabled"),
                FieldPanel("auto_delete_after_days"),
            ],
            heading="Message Retention",
        ),
        InlinePanel("topics", label="Subscribed Topics"),
    ]

    class Meta:
        verbose_name = "MQTT Settings"
        verbose_name_plural = "MQTT Settings"

    def __str__(self):
        return "MQTT Settings"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def get_solo(cls):
        """Return the single settings instance, creating it with defaults if missing."""
        try:
            return cls.load()
        except Exception:
            obj, _ = cls.objects.get_or_create(pk=1)
            return obj


class MQTTTopic(models.Model):
    """
    An MQTT topic subscription entry linked to MQTTSettings.

    Each row represents one topic the server will subscribe to.
    Managed via Wagtail admin (InlinePanel) or dynamically from
    the dashboard (subscribe/unsubscribe via WebSocket).
    """

    settings = ParentalKey(
        MQTTSettings,
        on_delete=models.CASCADE,
        related_name="topics",
    )
    topic = models.CharField(
        max_length=500,
        help_text="MQTT topic pattern. Use # for wildcard (all), + for single level.",
    )
    name = models.CharField(
        max_length=200,
        blank=True,
        help_text="Optional display name (e.g. \"All Sensors\").",
    )
    description = models.TextField(
        blank=True,
        help_text="Optional description.",
    )

    panels = [
        FieldPanel("topic"),
        FieldPanel("name"),
        FieldPanel("description"),
    ]

    class Meta:
        verbose_name = "Subscribed Topic"
        verbose_name_plural = "Subscribed Topics"
        ordering = ["topic"]

    def __str__(self):
        return self.name if self.name else self.topic

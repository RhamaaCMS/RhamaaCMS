from django.db import models
from modelcluster.models import ClusterableModel
from wagtail import blocks
from wagtail.admin.panels import FieldPanel
from wagtail.contrib.settings.models import BaseSiteSetting, register_setting
from wagtail.fields import StreamField

from utils.navigation.blocks import InternalLinkBlock, LinkStreamBlock


@register_setting(icon="list-ul")
class NavigationSettings(BaseSiteSetting, ClusterableModel):
    primary_navigation = StreamField(
        [("link", InternalLinkBlock())],
        blank=True,
        help_text="Main site navigation",
    )
    footer_navigation = StreamField(
        [
            (
                "link_section",
                blocks.StructBlock(
                    [
                        ("section_heading", blocks.CharBlock()),
                        ("links", LinkStreamBlock(label="Links", max_num=None)),
                    ]
                ),
            )
        ],
        blank=True,
    )

    panels = [
        FieldPanel("primary_navigation"),
        FieldPanel("footer_navigation"),
    ]


@register_setting
class SocialMediaSettings(BaseSiteSetting):
    """Global social media settings."""

    twitter_handle = models.CharField(
        max_length=255,
        blank=True,
        help_text="Your Twitter username without the @, e.g. katyperry",
    )
    linkedin_handle = models.CharField(
        max_length=255, blank=True, help_text="Your Linkedin handle, e.g. katyperry."
    )
    facebook_app_id = models.CharField(
        max_length=255, blank=True, help_text="Your Facebook app ID."
    )
    instagram_handle = models.CharField(
        max_length=255,
        blank=True,
        help_text="Your Instagram username, e.g. katyperry",
    )
    tiktok_handle = models.CharField(
        max_length=255,
        blank=True,
        help_text="Your TikTok username, e.g. katyperry",
    )
    default_sharing_text = models.CharField(
        max_length=255,
        blank=True,
        help_text="Default sharing text to use if social text has not been set on a page.",
    )

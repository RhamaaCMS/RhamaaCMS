"""
Optimized models for Wagtail starter kit.
Focus on performance, SEO, and clean architecture.
"""

from bs4 import BeautifulSoup
from functools import lru_cache
from django.apps import apps
from django.core.exceptions import FieldDoesNotExist
from django.db import models
from django.db.models import QuerySet
from django.utils.functional import cached_property
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.fields import RichTextField
from wagtail.models import Page
from wagtail.rich_text import expand_db_html
from wagtailcache.cache import WagtailCacheMixin
from wagtailseo.models import SeoMixin


# Optimized query utility function
def order_by_pk_position(queryset, pks, exclude_non_matches=False):
    """
    Order queryset by the position of PKs in the provided list.
    Optimized for performance with minimal database queries.
    """
    if not pks:
        return queryset.none()

    # Create a case statement for ordering
    from django.db.models import Case, IntegerField, When

    preserved_order = Case(
        *[When(pk=pk, then=pos) for pos, pk in enumerate(pks)],
        output_field=IntegerField(),
    )

    if exclude_non_matches:
        queryset = queryset.filter(pk__in=pks)

    return queryset.annotate(preserved_order=preserved_order).order_by("preserved_order")


@lru_cache(maxsize=8)
def _get_placeholder_image_for_default_site():
    try:
        from wagtail.models import Site
    except Exception:
        return None

    site = Site.objects.filter(is_default_site=True).first()
    if not site:
        return None

    system_messages_settings_model = None
    for app_config in apps.get_app_configs():
        model = app_config.models.get("systemmessagessettings")
        if model is not None:
            system_messages_settings_model = model
            break

    if system_messages_settings_model is None:
        return None

    try:
        settings_instance = system_messages_settings_model.for_site(site)
    except Exception:
        return None

    get_placeholder = getattr(settings_instance, "get_placeholder_image", None)
    if callable(get_placeholder):
        return get_placeholder()

    return None


# Enable page-aware caching behavior using wagtail-cache.
class BasePage(WagtailCacheMixin, SeoMixin, Page):
    """
    Optimized base page class for Wagtail starter kit.

    Features:
    - Complete SEO optimization via wagtail-seo
    - Listing fields for page previews
    - Related pages functionality
    - Search engine visibility control
    - Performance optimizations
    - Clean, minimal codebase
    """

    show_in_menus_default = True

    appear_in_search_results = models.BooleanField(
        default=True,
        help_text="Make this page available for indexing by search engines. "
        "If unchecked, the page will no longer be indexed by search engines.",
    )

    class Meta:
        abstract = True

    promote_panels = (
        [
            MultiFieldPanel(
                [FieldPanel("show_in_menus")],
                heading="For site menus",
            ),
        ]
        + SeoMixin.seo_panels
        + [
            FieldPanel("appear_in_search_results"),
        ]
    )

    @cached_property
    def related_pages(self) -> QuerySet:
        """
        Return related pages ordered by editor specification.
        Optimized for performance with minimal database queries.
        """
        # Get related page IDs in order
        ordered_page_pks = tuple(item.page_id for item in self.page_related_pages.all())

        if not ordered_page_pks:
            return Page.objects.none()

        return order_by_pk_position(
            Page.objects.live().public().specific(),
            pks=ordered_page_pks,
            exclude_non_matches=True,
        )

    @cached_property
    def plain_introduction(self):
        """
        Get plain text version of introduction field.
        Cached for performance optimization.
        """
        try:
            introduction_field = self._meta.get_field("introduction")
        except FieldDoesNotExist:
            return None

        introduction_value = getattr(self, "introduction", None)
        if not introduction_value:
            return None

        if isinstance(introduction_field, RichTextField):
            # Use BeautifulSoup to extract plain text from rich text
            soup = BeautifulSoup(expand_db_html(introduction_value), "html.parser")
            return soup.get_text(strip=True)
        else:
            return introduction_value

    def get_listing_title(self):
        """Get the title to use in listings."""
        listing_title = getattr(self, "listing_title", None)
        if listing_title:
            return listing_title

        return getattr(self, "title", "")

    def get_listing_summary(self):
        """Get the summary to use in listings."""
        listing_summary = getattr(self, "listing_summary", None)
        if listing_summary:
            return listing_summary

        return getattr(self, "plain_introduction", None) or ""

    def get_listing_image(self):
        """Get the image to use in listings."""
        listing_image = getattr(self, "listing_image", None)
        if listing_image:
            return listing_image

        return _get_placeholder_image_for_default_site()

    def save(self, *args, **kwargs):
        """Override save to add performance optimizations."""
        # Clear cached properties when saving
        if hasattr(self, "_related_pages"):
            delattr(self, "_related_pages")
        if hasattr(self, "_plain_introduction"):
            delattr(self, "_plain_introduction")

        super().save(*args, **kwargs)


# Note: wagtail-seo handles all SEO meta tags automatically
# No need for custom SEO field labels or implementations

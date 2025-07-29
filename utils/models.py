"""
Optimized models for Wagtail starter kit.
Focus on performance, SEO, and clean architecture.
"""

from io import BytesIO
from bs4 import BeautifulSoup
from django.core.exceptions import FieldDoesNotExist, ValidationError
from django.core.files.images import ImageFile
from django.contrib.staticfiles.finders import find
from django.db import models
from django.db.models import QuerySet
from django.utils.decorators import method_decorator
from django.utils.functional import cached_property
from modelcluster.fields import ParentalKey
from willow.image import Image as WillowImage

from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.contrib.settings.models import BaseSiteSetting, register_setting
from wagtail.fields import RichTextField
from wagtail.models import Orderable, Page
from wagtail.rich_text import expand_db_html
from wagtailseo.models import SeoMixin

from utils.images.models import CustomImage
from utils.cache import get_default_cache_control_decorator


# Related pages functionality
class PageRelatedPage(Orderable):
    """Through model for related pages functionality."""
    parent = ParentalKey(Page, related_name="page_related_pages")
    page_id: int
    page = models.ForeignKey(
        "wagtailcore.Page",
        on_delete=models.CASCADE,
        related_name="+",
    )

    panels = [FieldPanel("page")]


# Listing fields abstract class
class ListingFields(models.Model):
    """
    Abstract model for page listing functionality.
    Provides image, title, and summary for page previews.
    """
    listing_image = models.ForeignKey(
        "images.CustomImage",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Choose the image you wish to be displayed when this page appears in listings",
    )
    listing_title = models.CharField(
        max_length=255,
        blank=True,
        help_text="Override the page title used when this page appears in listings",
    )
    listing_summary = models.CharField(
        max_length=255,
        blank=True,
        help_text="The text summary used when this page appears in listings. It's also used as "
        "the description for search engines if the 'Meta description' field above is not defined.",
    )

    class Meta:
        abstract = True

    promote_panels = [
        MultiFieldPanel(
            [
                FieldPanel("listing_image"),
                FieldPanel("listing_title"),
                FieldPanel("listing_summary"),
            ],
            "Listing information",
        )
    ]


# Global Settings
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


@register_setting
class SystemMessagesSettings(BaseSiteSetting):
    """System-wide messages and content settings."""
    class Meta:
        verbose_name = "system messages"

    title_404 = models.CharField("Title", max_length=255, default="Page not found")
    body_404 = RichTextField(
        "Text",
        default="<p>You may be trying to find a page that doesn&rsquo;t exist or has been moved.</p>",
    )

    placeholder_image = models.ForeignKey(
        "images.CustomImage",
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Choose the image you wish to be displayed as a placeholder image.",
    )

    footer_newsletter_signup_title = models.CharField(
        blank=False,
        null=False,
        default="Sign up for our newsletter",
        max_length=120,
    )
    footer_newsletter_signup_description = models.CharField(
        blank=True,
        max_length=255,
    )
    footer_newsletter_signup_link = models.URLField(
        blank=True,
        null=True,
        help_text="Link to the newsletter signup form. If left blank, the signup CTA will not be displayed.",
    )

    panels = [
        MultiFieldPanel(
            [
                FieldPanel("title_404"),
                FieldPanel("body_404"),
            ],
            heading="404 page",
        ),
        FieldPanel("placeholder_image",),
        MultiFieldPanel(
            [
                FieldPanel("footer_newsletter_signup_title",),
                FieldPanel("footer_newsletter_signup_description",),
                FieldPanel("footer_newsletter_signup_link",),
            ],
            heading="Footer",
        ),
    ]

    def get_placeholder_image(self):
        """Get or create placeholder image."""
        if self.placeholder_image:
            return self.placeholder_image

        # Get the absolute path to the image file
        absolute_path = find('images/placeholder-image.webp')
        if absolute_path:
            with open(absolute_path, 'rb') as f:
                image_bytes = f.read()

            img_file = ImageFile(BytesIO(image_bytes), name="Placeholder Image")
            im = WillowImage.open(img_file)
            width, height = im.get_size()

            new_default_image = CustomImage(title="Placeholder Image", file=img_file, width=width, height=height)
            new_default_image.save()
            new_default_image.tags.add("placeholder")

            self.placeholder_image = new_default_image
            self.save()  # Save to persist new image as placeholder
            return self.placeholder_image
        raise ValidationError("No placeholder image found. Please upload a placeholder image.")


# Optimized query utility function
def order_by_pk_position(queryset, pks, exclude_non_matches=False):
    """
    Order queryset by the position of PKs in the provided list.
    Optimized for performance with minimal database queries.
    """
    if not pks:
        return queryset.none()
    
    # Create a case statement for ordering
    from django.db.models import Case, When, IntegerField
    
    preserved_order = Case(
        *[When(pk=pk, then=pos) for pos, pk in enumerate(pks)],
        output_field=IntegerField(),
    )
    
    if exclude_non_matches:
        queryset = queryset.filter(pk__in=pks)
    
    return queryset.annotate(preserved_order=preserved_order).order_by('preserved_order')


# Apply default cache headers on this page model's serve method.
@method_decorator(get_default_cache_control_decorator(), name="serve")
class BasePage(SeoMixin, ListingFields, Page):
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
        Page.promote_panels
        + SeoMixin.seo_panels
        + ListingFields.promote_panels
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
        return self.listing_title or self.title

    def get_listing_summary(self):
        """Get the summary to use in listings."""
        return self.listing_summary or self.plain_introduction or ""

    def get_listing_image(self):
        """Get the image to use in listings."""
        if self.listing_image:
            return self.listing_image
        
        # Try to get placeholder image from settings
        try:
            from wagtail.models import Site
            site = Site.find_for_request(None)  # Get default site
            if site:
                settings = SystemMessagesSettings.for_site(site)
                return settings.get_placeholder_image()
        except:
            pass
        
        return None

    def save(self, *args, **kwargs):
        """Override save to add performance optimizations."""
        # Clear cached properties when saving
        if hasattr(self, '_related_pages'):
            delattr(self, '_related_pages')
        if hasattr(self, '_plain_introduction'):
            delattr(self, '_plain_introduction')
            
        super().save(*args, **kwargs)


# Note: wagtail-seo handles all SEO meta tags automatically
# No need for custom SEO field labels or implementations
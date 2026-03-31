# Models & BasePage

The foundation of RhamaaCMS content structure.

---

## BasePage

`BasePage` is the abstract base class that all pages should inherit from. It provides:

- SEO optimization (meta tags, Open Graph)
- Listing fields (summary, image for previews)
- Related pages functionality
- Caching support
- Search configuration

### Basic Usage

```python
from utils.models import BasePage

class HomePage(BasePage):
    """Home page model."""
    
    template = "home/home_page.html"
    
    class Meta:
        verbose_name = "Home Page"
```

---

## What BasePage Provides

### SEO Fields (from SeoMixin)

| Field | Purpose |
|-------|---------|
| `search_description` | Meta description |
| `seo_title` | Custom title tag |
| `canonical_url` | Canonical URL override |
| `no_index` | Hide from search engines |

### Listing Fields

| Field | Purpose |
|-------|---------|
| `listing_image` | Image for previews/cards |
| `listing_title` | Short title for lists |
| `listing_summary` | Short description |

### Page Methods

```python
# Get listing image with fallback
def get_listing_image(self):
    return self.listing_image or self.get_first_image()

# Get listing title with fallback  
def get_listing_title(self):
    return self.listing_title or self.title

# Get listing summary with fallback
def get_listing_summary(self):
    return self.listing_summary or truncatewords(self.search_description, 20)
```

---

## Custom Page Example

```python
from wagtail.fields import StreamField
from wagtail.admin.panels import FieldPanel

from utils.models import BasePage
from utils.blocks import StoryBlock

class ContentPage(BasePage):
    """Standard content page with rich text blocks."""
    
    body = StreamField(
        StoryBlock(),
        blank=True,
        use_json_field=True,
    )
    
    content_panels = BasePage.content_panels + [
        FieldPanel("body"),
    ]
    
    class Meta:
        verbose_name = "Content Page"
```

---

## Site Settings

### SocialMediaSettings

Global social media links:

```python
from utils.models import SocialMediaSettings

settings = SocialMediaSettings.for_request(request)
print(settings.facebook_url)
print(settings.twitter_handle)
```

### SystemMessagesSettings

Site-wide messages and placeholders:

```python
from utils.models import SystemMessagesSettings

settings = SystemMessagesSettings.for_request(request)
placeholder = settings.get_placeholder_image()
```

---

## Images

### CustomImage

Extended Wagtail image with search capability:

```python
from utils.images.models import CustomImage

# Get image with focal point
image = CustomImage.objects.first()
rendition = image.get_rendition("fill-800x600")
```

### Image Renditions

```html
<!-- In templates -->
<img src="{{ image.rendition.fill-800x600.url }}" 
     alt="{{ image.title }}"
     style="{{ image.rendition.fill-800x600.object_position_style }}">
```

---

## Related Pages

BasePage includes a `related_pages` field:

```python
# Add related pages in admin
# Access in templates:
{% for page in self.related_pages.all %}
    <a href="{{ page.url }}">{{ page.title }}</a>
{% endfor %}
```

---

## Next Steps

- [StreamField Blocks](../core/streamfield.md) — Rich content blocks
- [Pages & Views](../core/pages.md) — URL routing and views

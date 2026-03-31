# StreamField

Flexible content blocks for rich page layouts.

---

## What is StreamField?

StreamField allows editors to build pages using a collection of content blocks rather than a single rich text field. This gives content editors flexibility while maintaining structured data.

```
┌─────────────────────────────────────┐
│  Hero Block                         │
│  - Image                            │
│  - Headline                         │
│  - CTA Button                       │
├─────────────────────────────────────┤
│  Text Block                         │
│  - Rich text content                │
├─────────────────────────────────────┤
│  Gallery Block                      │
│  - Multiple images                  │
└─────────────────────────────────────┘
```

---

## Basic Usage

```python
from wagtail.fields import StreamField
from wagtail.admin.panels import FieldPanel

from utils.models import BasePage
from utils.blocks import StoryBlock

class ContentPage(BasePage):
    body = StreamField(
        StoryBlock(),
        blank=True,
        use_json_field=True,
    )
    
    content_panels = BasePage.content_panels + [
        FieldPanel("body"),
    ]
```

---

## Available Blocks

### Link Blocks

```python
from utils.blocks import InternalLinkBlock, ExternalLinkBlock

# Internal link to a Wagtail page
internal_link = InternalLinkBlock()

# External URL
external_link = ExternalLinkBlock()
```

### StoryBlock (Complete Set)

```python
from utils.blocks import StoryBlock

# StoryBlock includes:
# - Heading blocks
# - Rich text
# - Images
# - Embeds (YouTube, etc.)
# - Quotes
# - Call-to-action
# - Related pages
```

---

## Creating Custom Blocks

```python
# utils/blocks.py
from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock

class HeroBlock(blocks.StructBlock):
    """Hero section with image and CTA."""
    
    image = ImageChooserBlock(required=True)
    headline = blocks.CharBlock(max_length=100)
    subheadline = blocks.TextBlock(required=False)
    cta_text = blocks.CharBlock(max_length=50, required=False)
    cta_link = blocks.PageChooserBlock(required=False)
    
    class Meta:
        template = "blocks/hero_block.html"
        icon = "image"
        label = "Hero Section"
```

### Template for Block

```html
{# templates/blocks/hero_block.html #}
<section class="hero">
  {% image value.image fill-1600x800 as hero_img %}
  <img src="{{ hero_img.url }}" alt="{{ hero_img.alt }}">
  
  <div class="hero-content">
    <h1>{{ value.headline }}</h1>
    {% if value.subheadline %}
      <p>{{ value.subheadline }}</p>
    {% endif %}
    {% if value.cta_text and value.cta_link %}
      <a href="{% pageurl value.cta_link %}" class="btn-primary">
        {{ value.cta_text }}
      </a>
    {% endif %}
  </div>
</section>
```

---

## Using Blocks in Templates

```html
{% for block in page.body %}
  {% if block.block_type == 'heading' %}
    <h2>{{ block.value }}</h2>
    
  {% elif block.block_type == 'paragraph' %}
    <div class="rich-text">{{ block.value }}</div>
    
  {% elif block.block_type == 'image' %}
    {% image block.value width-800 class="content-image" %}
    
  {% elif block.block_type == 'hero' %}
    {% include_block block %}
  {% endif %}
{% endfor %}
```

### Simpler: Auto-render

```html
{# Renders each block with its template #}
{% for block in page.body %}
  {% include_block block %}
{% endfor %}
```

---

## StructValue

For blocks with computed properties:

```python
from wagtail import blocks
from wagtail.blocks import StructValue

class CardValue(StructValue):
    def get_image(self):
        if self.get('image'):
            return self['image']
        if self.get('page'):
            return self['page'].listing_image
        return None

class CardBlock(blocks.StructBlock):
    page = blocks.PageChooserBlock(required=False)
    image = ImageChooserBlock(required=False)
    title = blocks.CharBlock(required=False)
    description = blocks.TextBlock(required=False)
    
    class Meta:
        value_class = CardValue
```

In templates:

```html
{% image value.get_image fill-400x300 %}
```

---

## Best Practices

1. **Keep blocks focused** — One purpose per block
2. **Use clear labels** — Help editors understand each block
3. **Provide templates** — Always include `template` in `Meta`
4. **Set sensible defaults** — Make blocks work without all fields filled
5. **Group related blocks** — Use `StreamBlock` to organize

---

## Next Steps

- [BasePage Models](../core/models.md) — Page foundations
- [Custom Templates](../core/templates.md) — Block templates

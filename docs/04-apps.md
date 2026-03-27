# Apps Guide

How to create new Wagtail apps, define Page models, and wire up templates.

---

## How the Existing Home App Works

Before creating a new app, understand the existing pattern in `apps/home/`:

```
apps/home/
├── models.py                    # HomePage(Page) — minimal model, no extra fields
└── templates/home/
    ├── home_page.html           # Extends base.html; overrides header/footer blocks; includes welcome_page.html
    └── welcome_page.html        # Full-screen landing section (included partial, not a standalone template)
```

`HomePage` has no fields beyond Wagtail's built-in `Page` fields (title, slug, SEO fields). The landing page layout is entirely in `welcome_page.html`.

**Wagtail's template naming convention:**
```
apps.<app_name>.models.<ModelName>
    → <app_name>/<model_name_snake_case>.html
    → found in apps/<app_name>/templates/<app_name>/<file>.html
```

---

## 1. Create a New App

```bash
# From the project root
python manage.py startapp blog
```

Move it into the `apps/` directory to keep things tidy:

```bash
# Windows PowerShell
Move-Item blog apps\blog

# macOS / Linux
mv blog apps/blog
```

Register it in `{{ project_name }}/settings/base.py`:

```python
INSTALLED_APPS = [
    "apps.home",
    "apps.blog",   # ← add this
    # ...
]
```

---

## 2. Define Page Models

Edit `apps/blog/models.py`:

```python
from django.db import models
from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel


class BlogIndexPage(Page):
    intro = models.TextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
    ]

    subpage_types = ["blog.BlogPage"]   # only BlogPage can be a child


class BlogPage(Page):
    date = models.DateField("Post date")
    intro = models.CharField(max_length=250)
    body = RichTextField()

    content_panels = Page.content_panels + [
        FieldPanel("date"),
        FieldPanel("intro"),
        FieldPanel("body"),
    ]

    parent_page_types = ["blog.BlogIndexPage"]  # must live under BlogIndexPage
```

---

## 3. Run Migrations

```bash
python manage.py makemigrations blog
python manage.py migrate
```

---

## 4. Create Templates

Template files must follow Wagtail's naming convention and live inside the app's `templates/<app_name>/` directory.

```
apps/blog/templates/blog/
├── blog_index_page.html    ← BlogIndexPage template
└── blog_page.html          ← BlogPage template
```

### `blog_index_page.html`

```html
{% extends "base.html" %}
{% load wagtailcore_tags %}

{% block content %}
<main class="max-w-4xl mx-auto px-4 py-16">

    <header class="mb-12">
        <h1 class="font-display text-4xl sm:text-5xl font-semibold text-brand-900 mb-4">
            {{ page.title }}
        </h1>
        {% if page.intro %}
        <p class="text-surface-600 text-lg leading-relaxed max-w-2xl">{{ page.intro }}</p>
        {% endif %}
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {% for post in page.get_children.live.order_by('-blogpage__date') %}
        <a href="{% pageurl post %}"
           class="group flex flex-col gap-2 p-6 rounded-2xl
                  border border-surface-200
                  hover:border-brand-300 hover:-translate-y-1 transition-all duration-200">
            <p class="font-mono text-gold-500 text-[11px] tracking-widest uppercase">
                {{ post.specific.date }}
            </p>
            <h2 class="font-display text-xl font-semibold text-brand-900
                       group-hover:text-brand-700 transition-colors">
                {{ post.title }}
            </h2>
            <p class="text-surface-500 text-sm leading-relaxed">
                {{ post.specific.intro }}
            </p>
        </a>
        {% endfor %}
    </div>

</main>
{% endblock %}
```

### `blog_page.html`

```html
{% extends "base.html" %}
{% load wagtailcore_tags %}

{% block content %}
<article class="max-w-2xl mx-auto px-4 py-16">

    <header class="mb-10">
        <p class="font-mono text-gold-500 text-[11px] tracking-widest uppercase mb-4">
            {{ page.date }}
        </p>
        <h1 class="font-display text-4xl sm:text-5xl font-semibold text-brand-900 leading-tight mb-4">
            {{ page.title }}
        </h1>
        {% if page.intro %}
        <p class="text-surface-600 text-lg leading-relaxed">{{ page.intro }}</p>
        {% endif %}
    </header>

    <div class="prose prose-lg max-w-none">
        {{ page.body|richtext }}
    </div>

</article>
{% endblock %}
```

> `prose` comes from `@tailwindcss/typography` (already included as `@plugin` in `main.css`).

---

## 5. @source Coverage

The existing `@source` directive already covers any app under `apps/`:

```css
/* in static_src/css/main.css */
@source "../../apps/**/templates/**/*.html";
```

As long as templates are stored in `apps/<app_name>/templates/`, Tailwind will scan them automatically. No change to `main.css` needed.

---

## 6. Add the Page in Wagtail Admin

1. Open `/admin/` → **Pages**
2. Navigate to the root page (or wherever you want to place the new section)
3. Click **Add child page** → select `Blog Index Page`
4. Fill in title and publish
5. Inside that page, use **Add child page** → `Blog Page` to create posts

---

## App Structure Reference

```
apps/blog/
├── __init__.py
├── models.py           # Page models with content_panels
├── migrations/         # Auto-generated by makemigrations
├── templates/
│   └── blog/
│       ├── blog_index_page.html
│       └── blog_page.html
└── templatetags/       # Optional: custom template tags
    ├── __init__.py
    └── blog_tags.py
```

---

## StreamField — Flexible Content Blocks

For pages that need flexible mixed content (text, images, quotes, code, etc.), use `StreamField`:

```python
from wagtail.fields import StreamField
from wagtail.blocks import CharBlock, RichTextBlock, ImageChooserBlock, StructBlock

class ArticlePage(Page):
    body = StreamField([
        ("heading",   CharBlock(form_classname="title")),
        ("paragraph", RichTextBlock()),
        ("image",     ImageChooserBlock()),
        ("callout",   StructBlock([
            ("text",  CharBlock()),
            ("style", CharBlock(default="info")),
        ])),
    ], use_json_field=True)

    content_panels = Page.content_panels + [
        FieldPanel("body"),
    ]
```

Render in the template:

```html
{% load wagtailcore_tags wagtailimages_tags %}

{% for block in page.body %}

    {% if block.block_type == "heading" %}
        <h2 class="font-display text-2xl font-semibold text-brand-900 mt-10 mb-4">
            {{ block.value }}
        </h2>

    {% elif block.block_type == "paragraph" %}
        <div class="prose prose-lg max-w-none mb-6">
            {{ block.value|richtext }}
        </div>

    {% elif block.block_type == "image" %}
        {% image block.value width-1200 class="rounded-2xl w-full mb-6" %}

    {% elif block.block_type == "callout" %}
        <div class="flex gap-3 p-4 rounded-xl border border-gold-500/25 bg-gold-500/10 mb-6">
            <p class="text-surface-800 text-sm leading-relaxed">{{ block.value.text }}</p>
        </div>

    {% endif %}

{% endfor %}
```

---

## Wagtail Snippets (Reusable Non-Page Content)

For content that is shared across pages (navigation items, team members, testimonials), use Snippets instead of Page models:

```python
from wagtail.models import Page
from wagtail.snippets.models import register_snippet
from wagtail.admin.panels import FieldPanel

@register_snippet
class Testimonial(models.Model):
    author = models.CharField(max_length=100)
    quote = models.TextField()
    role = models.CharField(max_length=100, blank=True)

    panels = [
        FieldPanel("author"),
        FieldPanel("role"),
        FieldPanel("quote"),
    ]

    def __str__(self):
        return self.author
```

Snippets appear under **Snippets** in the Wagtail admin sidebar and can be queried in templates via a custom context processor or template tag.

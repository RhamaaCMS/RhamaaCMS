# Django Templates

The Base Template uses Django's template system with enhancements.

---

## Base Template

`base.html` is the master template that all other templates extend:

```html
{% extends "base.html" %}

{% block title %}My Page Title{% endblock %}

{% block content %}
    <h1>Page Content Here</h1>
{% endblock %}
```

### Blocks Available

| Block | Purpose |
|-------|---------|
| `title` | Page title (in `<title>` tag) |
| `meta` | Meta tags, Open Graph |
| `content` | Main page content |
| `extra_js` | Additional JavaScript |
| `extra_css` | Additional CSS |

---

## Template Tags

### Wagtail Tags

```html
{% load wagtailcore_tags wagtailimages_tags %}

{# Page URL #}
<a href="{% pageurl page %}">{{ page.title }}</a>

{# Image rendition #}
{% image page.listing_image fill-800x600 as img %}
<img src="{{ img.url }}" alt="{{ img.alt }}">

{# Static files #}
{% load static %}
<link rel="stylesheet" href="{% static 'css/main.css' %}">
```

### Custom Tags (from utils)

```html
{% load util_tags %}

{# Modify query string #}
<a href="{% querystring_modify page=2 %}">Next</a>

{# Table of contents from StreamField #}
{% table_of_contents_array page.body as toc %}
{% for item in toc %}
    <a href="#{{ item.id }}">{{ item.text }}</a>
{% endfor %}
```

---

## Template Components

### Include Pattern

```html
{# Include a component with context #}
{% include "components/card.html" with title=page.title image=page.listing_image %}
```

### Card Component Example

```html
{# templates/components/card.html #}
<div class="card">
    {% if image %}
        {% image image fill-400x300 %}
    {% endif %}
    <h3>{{ title }}</h3>
    {% if description %}
        <p>{{ description }}</p>
    {% endif %}
</div>
```

---

## Template Inheritance Chain

```
base.html
├── base_page.html (for BasePage models)
│   └── home_page.html
│   └── content_page.html
└── error.html
    ├── 404.html
    └── 500.html
```

---

## Conditional Rendering

```html
{# Check if page has children #}
{% if page.get_children.exists %}
    <ul>
    {% for child in page.get_children.live %}
        <li><a href="{% pageurl child %}">{{ child.title }}</a></li>
    {% endfor %}
    </ul>
{% endif %}

{# Check user authentication #}
{% if request.user.is_authenticated %}
    <p>Welcome, {{ request.user.username }}!</p>
{% endif %}
```

---

## Navigation

```html
{# templates/components/navbar.html #}
<nav>
    {% for item in nav_settings.primary_navigation %}
        <a href="{{ item.value.url }}">{{ item.value.title }}</a>
    {% endfor %}
</nav>
```

---

## Next Steps

- [Static Assets](static-assets.md) — Working with CSS and JavaScript
- [Preline UI](../frontend/preline.md) — Using the component library

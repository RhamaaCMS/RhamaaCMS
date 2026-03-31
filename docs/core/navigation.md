# Navigation

Site-wide navigation management in RhamaaCMS.

---

## NavigationSettings

The `NavigationSettings` model manages primary and footer navigation:

```python
from utils.navigation.models import NavigationSettings

# Get navigation for current site
nav = NavigationSettings.for_request(request)
```

### Available Fields

| Field | Purpose |
|-------|---------|
| `primary_navigation` | Main site navigation |
| `footer_navigation` | Footer links (grouped) |

---

## Setting Up Navigation

### 1. Access in Wagtail Admin

1. Go to **Settings** → **Navigation Settings** in the admin
2. Add links to **Primary Navigation**
3. Organize **Footer Navigation** into sections

### 2. Link Types

- **Internal Link** — Links to any Wagtail page
- **External Link** — Links to external URLs

---

## Using in Templates

### Primary Navigation

```html
{# templates/components/navbar.html #}
<nav class="navbar">
  <div class="container">
    <a href="/" class="logo">{{ site_name }}</a>
    
    <ul class="nav-menu">
      {% for item in settings.navigation.NavigationSettings.primary_navigation %}
        <li>
          <a href="{{ item.value.url }}" 
             class="{% if item.value.page.id == page.id %}active{% endif %}">
            {{ item.value.title }}
          </a>
        </li>
      {% endfor %}
    </ul>
  </div>
</nav>
```

### Footer Navigation

```html
{# templates/components/footer.html #}
<footer>
  {% for section in settings.navigation.NavigationSettings.footer_navigation %}
    <div class="footer-section">
      <h4>{{ section.value.title }}</h4>
      <ul>
        {% for link in section.value.links %}
          <li><a href="{{ link.value.url }}">{{ link.value.title }}</a></li>
        {% endfor %}
      </ul>
    </div>
  {% endfor %}
</footer>
```

---

## Active State

Check if a link points to the current page:

```html
{% if item.value.page.id == page.id %}
  <a class="active" href="{{ item.value.url }}">{{ item.value.title }}</a>
{% else %}
  <a href="{{ item.value.url }}">{{ item.value.title }}</a>
{% endif %}
```

Or with a custom filter:

```html
{% load util_tags %}
<a class="{% if_active item.value.page %}active{% endif %}">
```

---

## Breadcrumbs

Generate breadcrumbs from page tree:

```html
{# templates/components/breadcrumbs.html #}
<nav class="breadcrumbs">
  <a href="/">Home</a>
  {% for ancestor in page.get_ancestors.live.public|slice:"1:" %}
    <span>/</span>
    <a href="{% pageurl ancestor %}">{{ ancestor }}</a>
  {% endfor %}
  <span>/</span>
  <span>{{ page.title }}</span>
</nav>
```

---

## Mobile Navigation

Example responsive pattern:

```html
<nav class="navbar">
  <button class="nav-toggle" aria-label="Toggle menu">
    <span></span>
    <span></span>
    <span></span>
  </button>
  
  <div class="nav-menu" id="nav-menu">
    {# Navigation items here #}
  </div>
</nav>
```

```javascript
// Toggle mobile menu
document.querySelector('.nav-toggle').addEventListener('click', () => {
  document.getElementById('nav-menu').classList.toggle('is-open');
});
```

---

## Next Steps

- [BasePage Models](../core/models.md) — Page model foundation
- [Static Assets](../core/static-assets.md) — Navigation styling

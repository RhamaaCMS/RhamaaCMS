# Core Concepts (Base Template)

The RhamaaCMS Base Template extends Wagtail with a set of opinionated defaults designed for production use.

---

## Philosophy

The Base Template follows these principles:

1. **Convention over Configuration** — Sensible defaults that work out of the box
2. **SEO First** — Every page has built-in SEO optimization
3. **Performance** — Caching, optimized images, efficient queries
4. **Accessibility** — WCAG 2.1 AA compliant by default
5. **Developer Experience** — Clear structure, helpful utilities

---

## Key Components

<div class="grid cards" markdown>

-   :material-file-document:{ .lg .middle } **BasePage**

    ---

    The foundation of all pages in your CMS. Includes SEO, listing fields, and caching.
    
    [Learn More](models.md)

-   :material-puzzle:{ .lg .middle } **StreamField**

    ---

    Flexible content blocks for rich page layouts.
    
    [Learn More](streamfield.md)

-   :material-navigation:{ .lg .middle } **Navigation**

    ---

    Site-wide navigation management with menus and settings.
    
    [Learn More](navigation.md)

-   :material-image:{ .lg .middle } **Custom Images**

    ---

    Extended image model with focal points and renditions.
    
    [Image Model](../core/models.md#images)

</div>

---

## The `utils` App

The `utils` app contains shared functionality used across all templates:

```
utils/
├── models.py           # BasePage, BaseSiteSetting
├── blocks.py          # LinkBlock, StoryBlock
├── images/            # CustomImage, Rendition
├── navigation/        # NavigationSettings
├── cache.py           # Cache utilities
└── templatetags/      # Custom filters
```

---

## Template Architecture

The Base Template uses **Django's template system** with enhancements:

```
templates/
├── base.html          # Master template with SEO, analytics
├── components/        # Reusable template components
└── 404.html, 500.html # Error pages
```

---

## Next Steps

- [Models & BasePage](models.md) — Deep dive into page models
- [Pages & Views](pages.md) — Creating custom pages
- [Django Templates](templates.md) — Template system

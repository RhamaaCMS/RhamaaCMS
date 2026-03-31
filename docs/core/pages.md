# Pages & Views

Creating and serving pages in RhamaaCMS.

---

## Wagtail Page Serving

Wagtail automatically handles URL routing for page models. When you create a `Page` subclass, Wagtail:

1. Generates URLs based on the page tree
2. Calls the `serve()` method when accessed
3. Renders the specified template

### Basic Page Serving

```python
from utils.models import BasePage

class HomePage(BasePage):
    template = "home/home_page.html"
    max_count = 1  # Only one home page allowed
    
    class Meta:
        verbose_name = "Home Page"
```

---

## Custom Serve Method

Override `serve()` for custom logic:

```python
from django.shortcuts import redirect

class PrivatePage(BasePage):
    """Page that requires authentication."""
    
    def serve(self, request):
        if not request.user.is_authenticated:
            return redirect("/login/")
        return super().serve(request)
```

---

## URL Routing

### Automatic URLs

Wagtail generates URLs from the page tree:

```
Home Page (slug: "home")
└── About Us (slug: "about")
    └── Team (slug: "team")

URLs:
- / (home page)
- /about/
- /about/team/
```

### Custom URLs

For non-page views, add to `urls.py`:

```python
# myproject/urls.py
from django.urls import path
from apps.search import views as search_views

urlpatterns = [
    path("search/", search_views.search, name="search"),
    # ... other patterns
]
```

---

## Views

### Class-Based Views

```python
from django.views.generic import TemplateView

class HomeView(TemplateView):
    template_name = "home/home_page.html"
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['featured_pages'] = ContentPage.objects.live().featured()[:6]
        return context
```

### Function Views

```python
from django.shortcuts import render
from apps.blog.models import BlogPage

def blog_listing(request):
    posts = BlogPage.objects.live().order_by('-date')[:10]
    return render(request, 'blog/listing.html', {
        'posts': posts
    })
```

---

## Context Processors

Add global context to all templates:

```python
# utils/context_processors.py
def site_settings(request):
    from utils.models import SocialMediaSettings, NavigationSettings
    return {
        'social_settings': SocialMediaSettings.for_request(request),
        'nav_settings': NavigationSettings.for_request(request),
    }
```

Add to `base.py`:

```python
TEMPLATES = [{
    'OPTIONS': {
        'context_processors': [
            # ... existing
            'utils.context_processors.site_settings',
        ]
    }
}]
```

---

## Error Pages

Base Template includes custom error handlers:

```python
# myproject/views.py
def handler404(request, exception=None):
    return render(request, '404.html', status=404)

def handler500(request, exception=None):
    return render(request, '500.html', status=500)
```

---

## Next Steps

- [Django Templates](templates.md) — Template syntax and components
- [Static Assets](static-assets.md) — CSS and JavaScript

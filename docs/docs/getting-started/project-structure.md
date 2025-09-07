# Project Structure

Understanding the project structure will help you navigate and customize the Wagtail News Template effectively.

## Overview

```
myproject/
├── apps/                   # Django applications
├── fixtures/              # Demo data and media files
├── media/                 # User-uploaded files
├── node/                  # Frontend build configuration
├── project_name/          # Main Django project settings
├── static_compiled/       # Compiled static assets
├── static_src/           # Source static files
├── templates/            # HTML templates
├── utils/                # Shared utilities and base models
├── manage.py             # Django management script
├── requirements.txt      # Python dependencies
└── Makefile             # Development commands
```

## Core Directories

### `/apps/`
Contains Django applications organized by functionality:

```
apps/
└── home/
    ├── __init__.py
    ├── models.py         # Page models
    ├── views.py          # Custom views (if needed)
    ├── urls.py           # URL patterns
    └── migrations/       # Database migrations
```

**Key Features:**
- Modular app structure
- Automatic URL discovery
- Each app can have its own namespace

### `/project_name/`
Main Django project configuration:

```
project_name/
├── __init__.py
├── settings/
│   ├── __init__.py
│   ├── base.py          # Base settings
│   ├── dev.py           # Development settings
│   └── production.py    # Production settings
├── urls.py              # Main URL configuration
└── wsgi.py              # WSGI application
```

### `/utils/`
Shared utilities and base functionality:

```
utils/
├── models.py            # Base page models and settings
├── blocks.py            # Wagtail StreamField blocks
├── cache.py             # Caching utilities
├── images/              # Custom image models
├── navigation/          # Navigation utilities
├── templatetags/        # Custom template tags
└── management/          # Custom management commands
```

**Key Components:**
- `BasePage` - Foundation for all page types
- `ListingFields` - Reusable listing functionality
- Custom blocks for content creation
- SEO and performance optimizations

### `/templates/`
HTML templates organized by functionality:

```
templates/
├── base.html            # Base template
├── base_page.html       # Base page template
├── 404.html             # Error pages
├── 500.html
├── components/          # Reusable components
│   ├── card.html
│   ├── hero.html
│   └── listing.html
└── navigation/          # Navigation components
    ├── main_nav.html
    └── footer.html
```

### `/static_src/` and `/static_compiled/`
Frontend assets management:

```
static_src/              # Source files
├── sass/
│   ├── main.scss        # Main stylesheet
│   ├── components/      # Component styles
│   └── utilities/       # Utility classes
├── javascript/
│   ├── main.js          # Main JavaScript
│   └── components/      # JS components
├── images/              # Source images
└── fonts/               # Web fonts

static_compiled/         # Built assets (auto-generated)
├── css/
├── js/
├── images/
└── fonts/
```

### `/node/`
Frontend build configuration:

```
node/
├── package.json         # Node.js dependencies
├── esbuild.js          # JavaScript bundler config
├── postcss.config.js   # PostCSS configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Configuration Files

### `Makefile`
Development shortcuts:

```makefile
init: load-data start    # Initialize project
start:                   # Start development server
load-data:              # Setup database with demo data
dump-data:              # Export current data
reset-db:               # Reset database
```

### `requirements.txt`
Python dependencies with version constraints:

```txt
django>=4.2,<5.2        # Django framework
wagtail>=6.4            # Wagtail CMS
wagtail-seo>=3.1.1      # SEO optimization
dj-database-url         # Database URL parsing
psycopg[binary]         # PostgreSQL adapter
whitenoise              # Static file serving
gunicorn==23.0.0        # WSGI server
django-storages[s3]     # Cloud storage support
wagtail-storages        # Wagtail storage integration
```

### `fly.toml`
Fly.io deployment configuration with optimized settings for Wagtail.

### `Dockerfile`
Multi-stage Docker build for efficient containerization.

## Key Design Patterns

### 1. App Auto-Discovery
The main `urls.py` automatically discovers and includes URLs from all apps in the `/apps/` directory:

```python
def import_app_urls(folder_path):
    """Automatically discover and include URLs from all Django apps"""
    # Implementation in project_name/urls.py
```

### 2. Base Model Inheritance
All page models inherit from `BasePage` which provides:
- SEO optimization
- Listing functionality
- Related pages
- Performance optimizations

### 3. Settings Organization
Settings are split into environment-specific files:
- `base.py` - Common settings
- `dev.py` - Development overrides
- `production.py` - Production optimizations

### 4. Static Asset Pipeline
Efficient frontend build process:
1. Source files in `/static_src/`
2. Build process via Node.js tools
3. Compiled assets in `/static_compiled/`
4. Django collectstatic for deployment

## Customization Points

### Adding New Apps
1. Create app in `/apps/` directory
2. Add models, views, templates
3. URLs are automatically discovered

### Extending Base Models
```python
from utils.models import BasePage

class MyCustomPage(BasePage):
    # Your custom fields
    pass
```

### Adding New Blocks
```python
from utils.blocks import LinkStreamBlock

class MyCustomBlock(blocks.StructBlock):
    # Your block definition
    pass
```

### Custom Templates
- Override base templates in your app's `templates/` directory
- Use template inheritance for consistency
- Leverage the component system

## Next Steps

- [Configure your settings](../configuration/settings.md)
- [Learn about models and content types](../development/models.md)
- [Explore the block system](../development/blocks.md)
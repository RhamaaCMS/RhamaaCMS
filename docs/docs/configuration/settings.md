# Settings Configuration

The Wagtail News Template uses a structured settings approach with environment-specific configurations. This guide covers how to configure your project for different environments.

## Settings Structure

```
project_name/settings/
├── __init__.py
├── base.py          # Common settings for all environments
├── dev.py           # Development-specific settings
└── production.py    # Production-specific settings
```

## Base Settings (`base.py`)

The base settings file contains configuration shared across all environments:

### Core Django Settings

```python
# Basic Django configuration
DEBUG = False  # Overridden in dev.py
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key-here')
ALLOWED_HOSTS = []

# Application definition
DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sitemaps',
]

WAGTAIL_APPS = [
    'wagtail.contrib.forms',
    'wagtail.contrib.redirects',
    'wagtail.embeds',
    'wagtail.sites',
    'wagtail.users',
    'wagtail.snippets',
    'wagtail.documents',
    'wagtail.images',
    'wagtail.search',
    'wagtail.admin',
    'wagtail',
    'wagtailseo',
]

THIRD_PARTY_APPS = [
    'modelcluster',
    'taggit',
    'storages',
]

LOCAL_APPS = [
    'utils',
    'apps.home',
]

INSTALLED_APPS = DJANGO_APPS + WAGTAIL_APPS + THIRD_PARTY_APPS + LOCAL_APPS
```

### Database Configuration

```python
# Database with dj-database-url support
DATABASES = {
    'default': dj_database_url.config(
        default='sqlite:///db.sqlite3',
        conn_max_age=600,
        conn_health_checks=True,
    )
}
```

### Static Files and Media

```python
# Static files configuration
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static_compiled'),
]

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

### Wagtail Configuration

```python
# Wagtail settings
WAGTAIL_SITE_NAME = 'Your Site Name'
WAGTAIL_ENABLE_UPDATE_CHECK = False

# Base URL for absolute URLs
WAGTAILADMIN_BASE_URL = 'https://your-domain.com'

# Custom image model
WAGTAILIMAGES_IMAGE_MODEL = 'images.CustomImage'
```

## Development Settings (`dev.py`)

Development-specific overrides:

```python
from .base import *

# Debug mode
DEBUG = True

# Allowed hosts for development
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0']

# Development database (SQLite)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Email backend for development
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Disable caching in development
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}

# Development logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
        },
        'wagtail': {
            'handlers': ['console'],
            'level': 'INFO',
        },
    },
}
```

## Production Settings (`production.py`)

Production-optimized configuration:

```python
from .base import *

# Security settings
DEBUG = False
SECRET_KEY = os.environ['SECRET_KEY']
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '').split(',')

# Security headers
SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'

# Database configuration (PostgreSQL)
DATABASES = {
    'default': dj_database_url.config(
        conn_max_age=600,
        conn_health_checks=True,
    )
}

# Static files with WhiteNoise
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Media files with cloud storage
if 'AWS_STORAGE_BUCKET_NAME' in os.environ:
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME']
    AWS_S3_REGION_NAME = os.environ.get('AWS_S3_REGION_NAME', 'us-east-1')
    AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
    AWS_DEFAULT_ACL = 'public-read'

# Caching with Redis
if 'REDIS_URL' in os.environ:
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.redis.RedisCache',
            'LOCATION': os.environ['REDIS_URL'],
        }
    }

# Email configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.environ.get('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.environ.get('EMAIL_PORT', '587'))
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', EMAIL_HOST_USER)

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
    'loggers': {
        'django.security.DisallowedHost': {
            'handlers': ['console'],
            'level': 'CRITICAL',
            'propagate': False,
        },
    },
}
```

## Environment Variables

### Required for Production

```bash
# Security
SECRET_KEY=your-very-long-random-secret-key
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database
DATABASE_URL=postgres://user:password@host:port/database

# Email (optional)
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@domain.com
EMAIL_HOST_PASSWORD=your-email-password
DEFAULT_FROM_EMAIL=noreply@yourdomain.com
```

### Optional Environment Variables

```bash
# AWS S3 Storage
AWS_STORAGE_BUCKET_NAME=your-bucket-name
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_REGION_NAME=us-east-1

# Redis Caching
REDIS_URL=redis://localhost:6379/1

# Wagtail Admin
WAGTAILADMIN_BASE_URL=https://yourdomain.com
```

## Custom Settings

### Adding Custom Settings

Create custom settings in `base.py`:

```python
# Custom application settings
MY_CUSTOM_SETTING = os.environ.get('MY_CUSTOM_SETTING', 'default-value')

# Feature flags
ENABLE_FEATURE_X = os.environ.get('ENABLE_FEATURE_X', 'False').lower() == 'true'

# Third-party service configuration
ANALYTICS_ID = os.environ.get('ANALYTICS_ID', '')
SOCIAL_AUTH_TWITTER_KEY = os.environ.get('SOCIAL_AUTH_TWITTER_KEY', '')
```

### Environment-Specific Overrides

Override in `dev.py` or `production.py`:

```python
# Development overrides
MY_CUSTOM_SETTING = 'development-value'
ENABLE_FEATURE_X = True

# Production overrides
if 'ANALYTICS_ID' not in os.environ:
    raise ValueError('ANALYTICS_ID environment variable is required in production')
```

## Settings Best Practices

### 1. Use Environment Variables
- Never hardcode sensitive values
- Use `os.environ.get()` with sensible defaults
- Document required environment variables

### 2. Separate by Environment
- Keep environment-specific settings in separate files
- Use inheritance to avoid duplication
- Test settings in each environment

### 3. Security First
- Enable security headers in production
- Use HTTPS in production
- Set appropriate CORS settings

### 4. Performance Optimization
- Configure caching appropriately
- Optimize database connections
- Use CDN for static files

## Switching Between Environments

### Development
```bash
export DJANGO_SETTINGS_MODULE=project_name.settings.dev
python manage.py runserver
```

### Production
```bash
export DJANGO_SETTINGS_MODULE=project_name.settings.production
gunicorn project_name.wsgi:application
```

### Using .env Files

Create `.env` file for local development:

```bash
# .env
DJANGO_SETTINGS_MODULE=project_name.settings.dev
SECRET_KEY=your-dev-secret-key
DEBUG=True
```

Load with python-dotenv:

```python
# In manage.py or wsgi.py
from dotenv import load_dotenv
load_dotenv()
```

## Next Steps

- [Configure your database](database.md)
- [Set up static files](static-files.md)
- [Configure media storage](media-storage.md)
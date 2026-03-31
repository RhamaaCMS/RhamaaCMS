# Static Files in Production

Complete guide for handling static and media files in production.

---

## Overview

| File Type | Purpose | Storage |
|-----------|---------|---------|
| **Static** | CSS, JS, images (site assets) | WhiteNoise or CDN |
| **Media** | User uploads | S3 or local volume |

---

## Static Files

### WhiteNoise (Recommended)

WhiteNoise serves static files directly from Django:

```python
# settings/production.py
MIDDLEWARE = [
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.middleware.security.SecurityMiddleware",
    # ... other middleware
]

# Production storage with compression and hashing
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
```

### Collect Static

```bash
# Collect all static files
python manage.py collectstatic --noinput

# Files go to STATIC_ROOT (default: static/)
```

### CDN (Optional)

For better performance, use a CDN:

```python
# CloudFront / Cloudflare
STATIC_URL = "https://cdn.yourdomain.com/static/"
```

Or use `django-storages` for S3:

```python
# settings/production.py
INSTALLED_APPS += ["storages"]

AWS_STORAGE_BUCKET_NAME = "mybucket"
AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"
STATIC_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/static/"
STATICFILES_STORAGE = "storages.backends.s3boto3.S3StaticStorage"
```

---

## Media Files

### Local Storage (Simple)

For single-server deployments:

```python
# settings/production.py
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"
```

**Nginx configuration:**

```nginx
location /media/ {
    alias /path/to/project/media/;
}
```

### S3 Storage (Recommended)

For multi-server or cloud deployments:

```python
# settings/production.py
DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"

AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = os.environ.get("AWS_STORAGE_BUCKET_NAME")
AWS_S3_REGION_NAME = "ap-southeast-1"

# Optional: custom domain
AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"
MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/media/"

# Security
AWS_DEFAULT_ACL = "public-read"
AWS_S3_FILE_OVERWRITE = False
```

**Environment variables:**

```bash
export AWS_ACCESS_KEY_ID=your-key
export AWS_SECRET_ACCESS_KEY=your-secret
export AWS_STORAGE_BUCKET_NAME=your-bucket
```

### Other Backends

**Google Cloud Storage:**

```python
DEFAULT_FILE_STORAGE = "storages.backends.gcloud.GoogleCloudStorage"
GS_BUCKET_NAME = "mybucket"
```

**Azure Blob:**

```python
DEFAULT_FILE_STORAGE = "storages.backends.azure_storage.AzureStorage"
AZURE_ACCOUNT_NAME = "myaccount"
AZURE_ACCOUNT_KEY = "mykey"
AZURE_CONTAINER = "media"
```

---

## Wagtail Images

RhamaaCMS uses a custom `CustomImage` model with renditions:

```python
# settings/base.py
WAGTAILIMAGES_IMAGE_MODEL = "images.CustomImage"
```

### Image Renditions

```html
{# Template usage #}
{% load wagtailimages_tags %}

{# Original #}
{% image page.listing_image original %}

{# Resized #}
{% image page.listing_image fill-800x600 %}
{% image page.listing_image width-800 %}
{% image page.listing_image height-600 %}

{# With class #}
{% image page.listing_image fill-800x600 class="img-fluid" %}
```

### Focal Points

Wagtail stores focal point for each image:

```python
image = CustomImage.objects.first()
rendition = image.get_rendition("fill-800x600")

# In templates
<img src="{{ rendition.url }}" 
     style="{{ rendition.object_position_style }}">
```

---

## Cache Control

### Static Files

```python
# WhiteNoise with caching
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Or manual headers
WHITENOISE_MAX_AGE = 31536000  # 1 year
```

### Nginx

```nginx
location /static/ {
    alias /path/to/static/;
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}

location /media/ {
    alias /path/to/media/;
    expires 1M;
    add_header Cache-Control "public";
}
```

---

## Deployment Checklist

### Before Deploying

- [ ] Run `collectstatic`
- [ ] Verify `STATIC_ROOT` is set
- [ ] Ensure `STATIC_URL` uses HTTPS
- [ ] Configure media storage (S3 for production)
- [ ] Set up CDN (optional)
- [ ] Configure cache headers

### After Deploying

- [ ] Verify static files load (check browser dev tools)
- [ ] Test image uploads
- [ ] Check image renditions work
- [ ] Verify HTTPS for all assets

---

## Troubleshooting

### Static files 404

```bash
# Check collected files
ls -la static/

# Force recollect
python manage.py collectstatic --noinput --clear
```

### Media uploads fail

1. Check directory permissions
2. Verify `MEDIA_ROOT` exists
3. Check disk space

### S3 connection issues

```bash
# Test AWS credentials
aws s3 ls s3://your-bucket/

# Check environment variables
printenv | grep AWS
```

---

## Next Steps

- [Production Checklist](production-checklist.md)
- [Fly.io Deployment](flyio.md)

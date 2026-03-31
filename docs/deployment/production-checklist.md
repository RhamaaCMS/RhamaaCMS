# Production Checklist

Complete checklist before deploying RhamaaCMS to production.

---

## Security

### Django Settings

```python
# settings/production.py
DEBUG = False

# Generate with: python -c "import secrets; print(secrets.token_urlsafe(50))"
SECRET_KEY = os.environ.get("SECRET_KEY")

ALLOWED_HOSTS = [
    "yourdomain.com",
    "www.yourdomain.com",
]

# Security middleware
SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = "DENY"

# HSTS (enable after HTTPS confirmed working)
# SECURE_HSTS_SECONDS = 31536000
# SECURE_HSTS_INCLUDE_SUBDOMAINS = True
# SECURE_HSTS_PRELOAD = True
```

### Environment Variables

```bash
# .env (never commit this file!)
SECRET_KEY=your-very-secure-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com
DATABASE_URL=postgres://...
```

---

## Performance

### Database

```python
# Use connection pooling
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "CONN_MAX_AGE": 600,  # 10 minutes
        # ... other settings
    }
}
```

### Caching

```python
# settings/production.py
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.db.DatabaseCache",
        "LOCATION": "cache_table",
    }
}

# Run: python manage.py createcachetable
```

### Static Files

```python
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Or for S3
# DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
# STATICFILES_STORAGE = "storages.backends.s3boto3.S3StaticStorage"
```

---

## Wagtail Settings

```python
# Performance
WAGTAIL_REDIRECTS_FILE_STORAGE = "cache"

# Search (upgrade to Elasticsearch for large sites)
WAGTAILSEARCH_BACKENDS = {
    "default": {
        "BACKEND": "wagtail.search.backends.database",
    }
}
```

---

## Pre-Deploy Commands

Run these before every deployment:

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run migrations
python manage.py migrate --noinput

# 3. Collect static files
python manage.py collectstatic --noinput

# 4. Create cache table (first time only)
python manage.py createcachetable

# 5. Update search index
python manage.py update_index

# 6. Clear old sessions (optional)
python manage.py clearsessions

# 7. Run system checks
python manage.py check --deploy
```

---

## Health Checks

### Django Check

```bash
python manage.py check --deploy
```

This will warn you about:
- Security misconfigurations
- Missing settings
- Performance issues

### Manual Tests

- [ ] Homepage loads correctly
- [ ] Admin login works
- [ ] Static files (CSS/JS) load
- [ ] Images display correctly
- [ ] Forms submit successfully
- [ ] 404 page displays
- [ ] 500 error page works

---

## Monitoring (Optional)

```python
# settings/production.py
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "file": {
            "level": "ERROR",
            "class": "logging.FileHandler",
            "filename": "/var/log/django/error.log",
        },
    },
    "loggers": {
        "django": {
            "handlers": ["file"],
            "level": "ERROR",
            "propagate": True,
        },
    },
}
```

---

## Backup Strategy

### Database

```bash
# PostgreSQL
pg_dump mydb > backup_$(date +%Y%m%d).sql

# Automated (cron)
0 2 * * * pg_dump mydb > /backups/daily_$(date +\%Y\%m\%d).sql
```

### Media Files

If using S3: Configure versioning/lifecycle rules.

If local storage: Sync to backup location:

```bash
rsync -av /var/www/media /backups/media
```

---

## Next Steps

- [Fly.io Deployment](flyio.md)
- [Docker Deployment](docker.md)

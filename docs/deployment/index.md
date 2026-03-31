# Deployment

Guides for deploying RhamaaCMS to production.

---

## Deployment Options

<div class="grid cards" markdown>

-   :material-cloud:{ .lg .middle } **Fly.io**

    ---

    Recommended for quick, scalable deployments with built-in PostgreSQL.
    
    [Learn More](flyio.md)

-   :material-docker:{ .lg .middle } **Docker**

    ---

    Self-hosted or cloud deployments using containers.
    
    [Learn More](docker.md)

-   :material-server:{ .lg .middle } **Traditional**

    ---

    VPS or dedicated server with manual setup.
    
    See production checklist below.

</div>

---

## Pre-Deployment Checklist

Before deploying any RhamaaCMS project:

### Security

- [ ] Change `SECRET_KEY` to a secure random value
- [ ] Set `DEBUG = False`
- [ ] Configure `ALLOWED_HOSTS` with your domain
- [ ] Enable HTTPS
- [ ] Set secure cookie flags
- [ ] Configure CORS if needed

### Performance

- [ ] Run `collectstatic`
- [ ] Enable WhiteNoise compression
- [ ] Configure database (PostgreSQL recommended)
- [ ] Set up caching (Redis or DatabaseCache)
- [ ] Enable Gzip compression

### Operations

- [ ] Configure logging
- [ ] Set up monitoring (optional)
- [ ] Configure backup strategy
- [ ] Test error pages (404, 500)

See the full [Production Checklist](production-checklist.md).

---

## Quick Deploy (Fly.io)

```bash
# 1. Install flyctl
brew install flyctl  # macOS
curl -L https://fly.io/install.sh | sh  # Linux

# 2. Login
flyctl auth login

# 3. Launch
flyctl launch

# 4. Deploy
flyctl deploy
```

[Full Fly.io Guide →](flyio.md)

---

## Environment Variables

Required for production:

```bash
DJANGO_SETTINGS_MODULE=myproject.settings.production
SECRET_KEY=your-secure-secret-key
ALLOWED_HOSTS=yourdomain.com
DATABASE_URL=postgres://user:pass@host:5432/dbname

# Optional
AWS_STORAGE_BUCKET_NAME=your-bucket
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
SENDGRID_API_KEY=for-email
```

---

## Static Files

RhamaaCMS uses WhiteNoise for static files:

```python
# settings/production.py
MIDDLEWARE = [
    "whitenoise.middleware.WhiteNoiseMiddleware",
    # ... other middleware
]

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
```

Run before deployment:

```bash
python manage.py collectstatic --noinput
```

[Static Files Guide →](static-files.md)

---

## Database

### PostgreSQL (Recommended)

```python
# settings/production.py
import dj_database_url

DATABASES = {
    "default": dj_database_url.parse(
        os.environ.get("DATABASE_URL"),
        conn_max_age=600,
    )
}
```

### SQLite (Not for Production)

SQLite is fine for development but not recommended for production due to concurrency limitations.

---

## Web Server

### Gunicorn (Base/IoT Templates)

```bash
gunicorn myproject.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 4 \
    --worker-class sync \
    --timeout 60
```

### Daphne/Uvicorn (IoT Template - WebSocket)

```bash
daphne -b 0.0.0.0 -p 8000 myproject.asgi:application

# Or with uvicorn
uvicorn myproject.asgi:application \
    --host 0.0.0.0 \
    --port 8000 \
    --workers 4
```

---

## Next Steps

- [Production Checklist](production-checklist.md)
- [Fly.io Deployment](flyio.md)
- [Docker Deployment](docker.md)
- [Static Files](static-files.md)

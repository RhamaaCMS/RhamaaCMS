# Fly.io Deployment

Deploy RhamaaCMS to [Fly.io](https://fly.io) with a single command.

---

## Why Fly.io?

- **Fast setup** — Deploy in minutes
- **PostgreSQL included** — Managed database
- **Global CDN** — Static files served globally
- **Django optimized** — Built-in support
- **Free tier** — Start without cost

---

## Prerequisites

1. [Fly.io account](https://fly.io/app/sign-up)
2. [flyctl installed](https://fly.io/docs/hands-on/install-flyctl/)

```bash
# macOS
brew install flyctl

# Linux
curl -L https://fly.io/install.sh | sh

# Windows
# Download from https://fly.io/docs/hands-on/install-flyctl/
```

---

## Step-by-Step Deployment

### 1. Login

```bash
flyctl auth login
```

### 2. Launch Your App

From your project directory:

```bash
flyctl launch
```

This will:
- Detect Django project
- Create `fly.toml` config
- Set up PostgreSQL
- Create app on Fly.io

### 3. Configure Secrets

```bash
# Generate a secret key
python -c "import secrets; print(secrets.token_urlsafe(50))"

# Set on Fly.io
flyctl secrets set SECRET_KEY=your-generated-key
flyctl secrets set DEBUG=False
```

### 4. Deploy

```bash
flyctl deploy
```

Your app is now live at `https://your-app.fly.dev`!

---

## fly.toml Configuration

```toml
# fly.toml
app = "your-app-name"
primary_region = "sin"  # Singapore

[build]
  builder = "heroku/buildpacks:20"

[env]
  PORT = "8000"

[http_service]
  internal_port = 8000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
  processes = ["app"]

[[statics]]
  guest_path = "/app/static"
  url_prefix = "/static/"

[[mounts]]
  source = "media_data"
  destination = "/app/media"
```

---

## Database

Fly.io automatically creates a PostgreSQL database:

```bash
# Connect to database
flyctl postgres connect -a your-app-db

# Run migrations
flyctl ssh console -C "python manage.py migrate"

# Create superuser
flyctl ssh console -C "python manage.py createsuperuser"
```

### Database URL

Already set as `DATABASE_URL` environment variable.

---

## Static & Media Files

### Static Files (WhiteNoise)

Already configured in `settings/production.py`:

```python
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
```

Run during deploy:

```bash
flyctl ssh console -C "python manage.py collectstatic --noinput"
```

### Media Files (Persistent Volume)

For user uploads:

```bash
# Create volume
flyctl volumes create media_data --size 1 --region sin
```

Mount configured in `fly.toml` above.

---

## Custom Domain

```bash
# Add your domain
flyctl certs create yourdomain.com

# Configure DNS
# Add CNAME: yourdomain.com → your-app.fly.dev
```

Update `ALLOWED_HOSTS`:

```bash
flyctl secrets set ALLOWED_HOSTS="your-app.fly.dev,yourdomain.com"
```

---

## Scaling

```bash
# Scale to 2 machines
flyctl scale count 2

# Change VM size
flyctl scale vm shared-cpu-2x

# Add memory
flyctl scale memory 1024
```

---

## Useful Commands

```bash
# View logs
flyctl logs

# Open app in browser
flyctl open

# SSH into machine
flyctl ssh console

# Run management commands
flyctl ssh console -C "python manage.py shell"

# Restart app
flyctl restart
```

---

## Troubleshooting

### Build Failures

```bash
# Clear build cache
flyctl deploy --no-cache
```

### Database Connection Issues

```bash
# Check database status
flyctl postgres status

# Attach database if detached
flyctl postgres attach your-app-db
```

### Static Files Not Loading

```bash
# Force collectstatic
flyctl ssh console -C "python manage.py collectstatic --noinput --clear"
```

---

## Next Steps

- [Production Checklist](production-checklist.md)
- [Docker Deployment](docker.md)

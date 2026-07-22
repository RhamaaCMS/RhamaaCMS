# Setup Guide

Complete guide for setting up RhamaaCMS from scratch on a local machine.

---

## Prerequisites

| Tool | Minimum version | Notes |
|---|---|---|
| Python | 3.11+ | |
| Node.js | 18+ | Required by pnpm and esbuild |
| pnpm | 8+ | `npm install -g pnpm` |
| Git | any | |

---

## 1. Clone the Repository

```bash
git clone <repo-url> {{ project_name }}
cd {{ project_name }}
```

---

## 2. Python Virtual Environment

```bash
# Create the virtual environment
python -m venv .venv

# Activate — Windows
.venv\Scripts\activate

# Activate — macOS / Linux
source .venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

**Dependencies installed** (`requirements.txt`):
- `Django >= 6, < 6.1` — web framework
- `wagtail 7.3` — CMS
- `wagtail-seo` — SEO meta fields on Page models
- `wagtail-cache` — page-level HTTP caching
- `django-filters` — queryset filtering
- `modelcluster` — Wagtail inline panel support
- `taggit` — tagging

---

## 3. Settings & Secret Key

Settings are split across three files in `{{ project_name }}/settings/`:

| File | Purpose |
|---|---|
| `base.py` | Shared, production-safe settings |
| `dev.py` | Imports `base.py`; sets `DEBUG=True`, `ALLOWED_HOSTS=["*"]`, console email |
| `production.py` | Strict environment settings, Redis, secure cookies, HSTS, production static storage |
| `local.py` | **Gitignored.** Per-machine overrides; imported last by both dev and production |

Django defaults to `dev.py` (via `manage.py`). The `dev.py` file contains an **insecure hardcoded `SECRET_KEY`** — override it before any real deployment.

**Recommended:** create `{{ project_name }}/settings/local.py` with a real key:

```python
SECRET_KEY = "replace-with-a-real-key"
ALLOWED_HOSTS = ["127.0.0.1", "localhost"]
```

Generate a key:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

## 4. Database

The default database is **SQLite** (`db.sqlite3` at project root), configured in `base.py`:

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
```

Run migrations and create a superuser:

```bash
python manage.py migrate
python manage.py createsuperuser
```

---

## 5. Frontend Assets

All frontend tooling lives in `node/`. The build outputs to `static_compiled/` (gitignored — always regenerate after cloning or pulling).

```bash
cd node
pnpm install      # installs Tailwind, esbuild, Preline, etc.
pnpm run build    # compiles CSS + JS, copies images
cd ..
```

**What the build produces:**

```
static_compiled/
├── css/main.css      # Tailwind v4 compiled output (~1300 lines in dev)
├── js/main.js        # Preline v4 + confetti + animation utilities (~600 KB)
└── images/           # Copied from static_src/images/
```

Django's `STATICFILES_DIRS` includes both `{{ project_name }}/static/` and `static_compiled/`, so the dev server picks these up automatically.

---

## 6. Run the Development Server

```bash
python manage.py runserver
```

| URL | Description |
|---|---|
| `http://127.0.0.1:8000/` | Landing page |
| `http://127.0.0.1:8000/admin/` | Wagtail CMS admin |
| `http://127.0.0.1:8000/django-admin/` | Django admin |
| `http://127.0.0.1:8000/documents/` | Wagtail document downloads |

---

## Static Files — How It Works

```
STATICFILES_DIRS = [
    {{ project_name }}/static/        ← project static files (if any)
    static_compiled/            ← build output (CSS, JS, images)
]

STATIC_ROOT = static/           ← target for collectstatic (production)
STATIC_URL  = /static/
```

In **development** (`DEBUG=True`), `staticfiles_urlpatterns()` serves files directly from `STATICFILES_DIRS`.

In **production**, run `python manage.py collectstatic` to copy everything to `STATIC_ROOT`, then serve it via a web server (Nginx) or CDN.

---

## Production Checklist

- [ ] Set a strong, unique `DJANGO_SECRET_KEY`
- [ ] Set `DEBUG = False` — use `production.py` or override in `local.py`
- [ ] Set `ALLOWED_HOSTS` to your actual domain(s)
- [ ] Set PostgreSQL `DATABASE_URL`
- [ ] Set `REDIS_URL` for Channels and shared runtime state
- [ ] Set `MQTT_RUN_MODE=worker`, stable `MQTT_CLIENT_ID`, credentials, and TLS
- [ ] Run one `python manage.py mqtt_worker` process
- [ ] Set `WAGTAILADMIN_BASE_URL` to your production domain in `base.py`
- [ ] Run `pnpm run build:prod` (minified output, no source maps)
- [ ] Run `python manage.py collectstatic`
- [ ] Serve with Gunicorn + Nginx (or similar WSGI/ASGI setup)
- [ ] Configure `MEDIA_ROOT` and media file serving

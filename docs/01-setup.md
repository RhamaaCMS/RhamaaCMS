# Setup Guide

Complete guide for setting up RhamaaCMS from scratch on a local machine.

---

## Prerequisites

| Tool | Minimum version | Notes |
|---|---|---|
| Python | 3.11+ | |
| Node.js | 20+ | Required by Vite 6 + pnpm |
| pnpm | 8+ | `npm install -g pnpm` |
| Git | any | |

---

## 1. Clone the Repository

```bash
git clone <repo-url> {{ project_name }}
cd {{ project_name }}

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
- `Django >= 6` — web framework
- `wagtail 7.3` — CMS
- `wagtail-seo` — SEO meta fields on Page models
- `wagtail-cache` — page-level HTTP caching
- `inertia-django >= 0.3` — Inertia.js server adapter
- `django-vite >= 3.0` — Vite asset integration

---

## 3. Settings & Secret Key

Settings are split across three files in `{{ project_name }}/settings/`:

| File | Purpose |
|---|---|
| `base.py` | Shared, production-safe settings |
| `dev.py` | Imports `base.py`; sets `DEBUG=True`, `ALLOWED_HOSTS=["*"]`, console email |
| `production.py` | Imports `base.py`; sets `DEBUG=False`, `ManifestStaticFilesStorage` |
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

## 5. Install Frontend Dependencies

All frontend tooling is configured at the project root (`package.json`, `vite.config.ts`).

```bash
# From project root (where package.json lives)
pnpm install
```

**Key packages installed:**
- `vite` + `@vitejs/plugin-react` — build tool + React HMR
- `@tailwindcss/vite` + `tailwindcss` — Tailwind v4 via Vite plugin
- `@inertiajs/react` — Inertia.js React client
- `react` + `react-dom` + TypeScript — React 18
- `class-variance-authority` + `clsx` + `tailwind-merge` — shadcn/ui utilities
- `lucide-react` + `framer-motion` — icons + animation

---

## 6. Run Both Development Servers

> **Critical:** Both servers must run simultaneously. Without Vite, the browser loads a blank page.

```bash
# Terminal 1 — Vite HMR server (port 5173, serves React assets)
pnpm run dev

# Terminal 2 — Django dev server (port 8000)
python manage.py runserver
```

| URL | Description |
|---|---|
| `http://127.0.0.1:8000/` | Landing page |
| `http://127.0.0.1:8000/admin/` | Wagtail CMS admin |
| `http://127.0.0.1:8000/django-admin/` | Django admin |
| `http://127.0.0.1:8000/documents/` | Wagtail document downloads |

---

## How Assets Flow

```
Development:
  Browser → Django :8000 → layout.html
                              ├── {% vite_hmr_client %}   → http://localhost:5173/@vite/client
                              ├── {% vite_react_refresh %} → React Fast Refresh preamble
                              └── {% vite_asset 'js/main.tsx' %} → http://localhost:5173/js/main.tsx

Production:
  pnpm run build → frontend/dist/ (manifest.json + hashed assets)
  Django reads manifest.json → injects <script> + <link> tags with correct hashed filenames
  python manage.py collectstatic → copies frontend/dist/ → static/ → served by Nginx
```

`DJANGO_VITE` in `settings/base.py` controls this:
```python
DJANGO_VITE = {
    "default": {
        "dev_mode": False,   # overridden to True in dev.py
        "manifest_path": BASE_DIR / "frontend" / "dist" / ".vite" / "manifest.json",
    }
}
```

---

## Production Checklist

- [ ] Set a strong, unique `SECRET_KEY` in `local.py` (never commit it)
- [ ] Set `DEBUG = False` in `production.py` or `local.py`
- [ ] Set `ALLOWED_HOSTS` to your actual domain(s)
- [ ] Switch to PostgreSQL (update `DATABASES` in `local.py`)
- [ ] Set `WAGTAILADMIN_BASE_URL` to your production domain in `base.py`
- [ ] Run `pnpm run build` — outputs to `frontend/dist/`
- [ ] Run `python manage.py collectstatic` — copies `frontend/dist/` to `static/`
- [ ] Set `DJANGO_VITE_DEV_MODE = False` (the default in `base.py`)
- [ ] Serve with Gunicorn/Uvicorn + Nginx
- [ ] Configure `MEDIA_ROOT` and media file serving
- [ ] See `docs/06-react-inertia.md` for the full deployment walkthrough

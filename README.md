# RhamaaCMS

A clean, production-ready **Wagtail CMS** starter template styled with **Tailwind CSS v4** and **Preline UI v4**. Intended as a reference template that demonstrates clear Tailwind and Preline patterns — all component styling lives directly in HTML templates as utility classes, with no custom CSS component layer.

---

## Stack

| Layer | Technology | Version |
|---|---|---|
| CMS Framework | [Wagtail](https://wagtail.org/) on [Django](https://djangoproject.com/) | Wagtail 7.3 / Django 6.0 |
| CSS | [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/postcss` | v4.1 |
| UI Components | [Preline UI](https://preline.co/) | v4.0 |
| JS Bundler | [esbuild](https://esbuild.github.io/) | v0.25 |
| Package Manager | [pnpm](https://pnpm.io/) | v8+ |
| Fonts | Cormorant Garamond (display) · DM Sans (body) · JetBrains Mono | via Google Fonts |

---

## Quick Start

### 1. Clone & set up Python environment

```bash
git clone <repo-url> {{ project_name }}
cd {{ project_name }}

python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # macOS / Linux

pip install -r requirements.txt
```

### 2. Set up a local settings override (optional but recommended)

Create `{{ project_name }}/settings/local.py` — it is automatically imported by both `dev.py` and `production.py` if present:

```python
SECRET_KEY = "your-secret-key-here"
ALLOWED_HOSTS = ["127.0.0.1", "localhost"]
```

> Generate a secret key:
> ```bash
> python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
> ```

### 3. Initialize the database

```bash
python manage.py migrate
python manage.py createsuperuser
```

### 4. Build frontend assets

```bash
cd node
pnpm install
pnpm run build
cd ..
```

### 5. Run the development server

```bash
python manage.py runserver
```

| URL | Description |
|---|---|
| `http://127.0.0.1:8000/` | Landing page |
| `http://127.0.0.1:8000/admin/` | Wagtail CMS admin |
| `http://127.0.0.1:8000/django-admin/` | Django admin |

---

## How a Request Is Served

```
Browser Request
    │
    ▼
Django Middleware Stack
 ├── SecurityMiddleware
 ├── SessionMiddleware
 ├── CsrfViewMiddleware
 ├── AuthenticationMiddleware
 └── wagtail.contrib.redirects.middleware.RedirectMiddleware
    │
    ▼
URL Router  ({{ project_name }}/urls.py)
 ├── django-admin/  →  Django admin
 ├── admin/         →  Wagtail CMS admin
 ├── documents/     →  Wagtail document downloads
 └── ""  (catch-all) →  Wagtail page serving
    │
    ▼
Wagtail looks up URL in Page tree
 └── Root page → HomePage (apps/home/models.py)
    │
    ▼
Template: apps/home/templates/home/home_page.html
 └── extends base.html
      └── {% block content %} includes welcome_page.html
```

---

## Project Structure

```
{{ project_name }}/
├── apps/
│   └── home/                        # Home / landing page app
│       ├── models.py                # HomePage(Page) model
│       └── templates/home/
│           ├── home_page.html       # Extends base.html; suppresses header/footer
│           └── welcome_page.html    # Full-screen landing section (pure Tailwind)
├── utils/                           # Shared utilities
│   ├── models.py                    # Abstract base models
│   ├── images/                      # Custom image model
│   ├── navigation/                  # Navigation snippets
│   └── templatetags/                # Custom template tags
├── docs/                            # Extended documentation
│   ├── 01-setup.md
│   ├── 02-development.md
│   ├── 03-styling.md
│   └── 04-apps.md
├── node/                            # Frontend build tooling
│   ├── esbuild.js                   # Build orchestrator (CSS + JS + assets)
│   ├── postcss.config.js            # PostCSS → @tailwindcss/postcss
│   ├── tailwind.config.js           # Minimal config (theme lives in main.css)
│   └── package.json
├── static_src/                      # Source assets — edit these
│   ├── css/main.css                 # Tailwind v4 entry: @theme, @source, utilities
│   ├── javascript/main.js           # Preline v4, confetti, scroll animations
│   └── images/logo.png
├── static_compiled/                 # Build output — gitignored, auto-generated
│   ├── css/main.css
│   ├── js/main.js
│   └── images/
├── {{ project_name }}/
│   ├── settings/
│   │   ├── base.py                  # Shared / production-safe settings
│   │   ├── dev.py                   # DEBUG=True, permissive ALLOWED_HOSTS
│   │   ├── production.py            # ManifestStaticFilesStorage
│   │   └── local.py                 # (gitignored) per-machine overrides
│   ├── templates/
│   │   ├── base.html                # Master layout: fonts, navbar, footer, JS
│   │   ├── 404.html                 # Branded 404 (extends base.html)
│   │   └── 500.html                 # Standalone 500 error page
│   └── urls.py
└── manage.py
```

---

## Frontend Build

All commands run from the `node/` directory.

```bash
# Development build (with source maps)
pnpm run build

# Production build (minified)
pnpm run build:prod

# Watch mode — rebuilds CSS/JS on file change
pnpm run watch

# Run both watch mode AND Django dev server together
pnpm run start
```

> **Important:** Tailwind v4 only generates CSS classes that appear in scanned files.
> The `@source` directives in `static_src/css/main.css` tell Tailwind which templates to scan.
> After adding a new app with templates in a non-standard path, add a corresponding `@source` line.

---

## Documentation

| Guide | Description |
|---|---|
| [01-setup.md](docs/01-setup.md) | Prerequisites, environment setup, production checklist |
| [02-development.md](docs/02-development.md) | Build pipeline deep-dive, watch mode, debug tips |
| [03-styling.md](docs/03-styling.md) | Modifying colors/fonts, component patterns, animations |
| [04-apps.md](docs/04-apps.md) | Creating Wagtail Page models, templates, StreamField |

---

## License

MIT

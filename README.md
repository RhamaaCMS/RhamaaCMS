# RhamaaCMS

A production-ready **Wagtail CMS** base template with a full **React + Inertia.js** frontend. Public pages are React components (shadcn/ui + Aceternity UI); the Wagtail admin stays Django HTML. No REST API, no separate SPA deployment — Inertia bridges the two seamlessly.

---

## Stack

| Layer | Technology | Version |
|---|---|---|
| CMS Framework | [Wagtail](https://wagtail.org/) on [Django](https://djangoproject.com/) | Wagtail 7.3 / Django 6.0 |
| CSS | [Tailwind CSS v4](https://tailwindcss.com/) via PostCSS (`@tailwindcss/postcss`) | v4.2 |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) + [Aceternity UI](https://ui.aceternity.com/) | – |
| JS Framework | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | 18.x / 5.x |
| SPA Bridge | [Inertia.js](https://inertiajs.com/) (`inertia-django` + `@inertiajs/react`) | v2 |
| Bundler | [Next.js](https://nextjs.org/) (webpack build for Inertia bundle) | v16 |
| Package Manager | [npm](https://www.npmjs.com/) | v10+ |
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

### 4. Install frontend dependencies

```bash
npm install
```

### 5. Build frontend assets

```bash
npm run build
```

### 6. Build frontend and run Django

```bash
# Build Next-powered Inertia assets
npm run build

# Run Django (port 8000)
python manage.py runserver
```

| URL | Description |
|---|---|
| `http://127.0.0.1:8000/` | Landing page (Inertia + React) |
| `http://127.0.0.1:8000/admin/` | Wagtail CMS admin |
| `http://127.0.0.1:8000/django-admin/` | Django admin |

---

## How a Request Is Served

```
Browser Request
    │
    ▼
Django Middleware Stack  (SecurityMiddleware → Session → CSRF → Auth → InertiaMiddleware)
    │
    ▼
URL Router  ({{ project_name }}/urls.py)
 ├── django-admin/  →  Django admin        (HTML)
 ├── admin/         →  Wagtail CMS admin   (HTML)
 ├── documents/     →  Wagtail docs
 └── ""  (catch-all) →  Wagtail page serving
         │
         ▼
    HomePage.serve()  →  inertia.render(request, "home/Index", props)
         │
         ├─ First visit ──→  layout.html shell + JSON in <div id="app">
         │                   └─ Next-built bundle loads Inertia app (`main_next.tsx`)
         │
         └─ Navigation ───→  JSON only (no full reload)  ← React updates DOM
```

---

## Project Structure

```
{{ project_name }}/
├── apps/
│   ├── home/                        # Home / landing page app
│   │   └── models.py                # InertiaPageMixin + HomePage(Page)
├── utils/                           # Shared utilities
│   ├── models.py                    # Abstract base models
│   ├── images/                      # Custom image model
│   ├── navigation/                  # Navigation snippets
│   └── templatetags/                # Custom template tags
├── frontend/                        # React/TypeScript source — edit here
│   ├── css/main.css                 # Tailwind v4 @import + shadcn vars + brand tokens
│   ├── js/main_next.tsx             # Inertia bootstrap (CSRF + createInertiaApp)
│   ├── layouts/RootLayout.tsx       # Navbar + Footer shell
│   ├── components/
│   │   ├── Navbar.tsx / Footer.tsx
│   │   ├── ui/                      # shadcn/ui: button, badge, card…
│   │   └── aceternity/              # Aceternity effects: BackgroundBeams, Spotlight
│   ├── pages/
│   │   ├── home/Index.tsx           # Home page (served at /)
│   │   └── errors/                  # NotFound.tsx, ServerError.tsx
│   ├── lib/utils.ts                 # cn() Tailwind class merger
│   └── types/                       # global.d.ts (PageProps)
├── docs/                            # Extended documentation
│   ├── 01-setup.md
│   ├── 02-development.md
│   ├── 03-styling.md
│   ├── 04-apps.md
│   └── 05-react-inertia.md          # React + Inertia.js integration guide
├── node/                            # Legacy — Wagtail admin Tailwind build (optional)
├── static_src/                      # Legacy Wagtail-admin assets (Preline CSS/JS)
├── static_compiled/                 # Legacy build output — gitignored
├── {{ project_name }}/
│   ├── asgi.py                      # ASGI entry
│   ├── views.py                     # handler404 / handler500 → Inertia
│   ├── settings/
│   │   ├── base.py                  # INERTIA_LAYOUT, DJANGO_VITE
│   │   ├── dev.py                   # DEBUG=True, DJANGO_VITE dev_mode=True
│   │   ├── production.py            # ManifestStaticFilesStorage
│   │   └── local.py                 # (gitignored) per-machine overrides
│   ├── templates/
│   │   └── layout.html              # ONLY HTML template — Inertia root shell
│   └── urls.py                      # handler404/500 + Wagtail routes
├── package.json                     # Root frontend deps (Next, React, shadcn…)
├── next.config.mjs                  # Next build config for Inertia asset output
├── tsconfig.json                    # TypeScript config
├── components.json                  # shadcn/ui CLI config
└── manage.py
```

---

## Frontend Build

All commands run from the **project root** (where `package.json` lives).

```bash
# Install dependencies
npm install

# Local Next dev server (optional, for frontend-only debugging)
npm run dev

# Production-like build used by Django → frontend/dist-next/
npm run build

# TypeScript type check
npm run typecheck
```

> **Important:** Tailwind v4 now runs through PostCSS (`postcss.config.mjs`) and
> uses explicit `@source` directives in `frontend/css/main.css`.

---

## Documentation

| Guide | Description |
|---|---|
| [01-setup.md](docs/01-setup.md) | Prerequisites, environment setup, production checklist |
| [02-development.md](docs/02-development.md) | Build pipeline deep-dive, watch mode, debug tips |
| [03-styling.md](docs/03-styling.md) | Modifying colors/fonts, component patterns, animations |
| [04-apps.md](docs/04-apps.md) | Adding Wagtail apps with React pages — InertiaPageMixin, props serialization, StreamField |
| [05-react-inertia.md](docs/05-react-inertia.md) | React + Inertia.js deep-dive — shared props, shadcn, Aceternity, deployment |

---

## License

MIT

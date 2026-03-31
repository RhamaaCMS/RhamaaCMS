# React + Inertia.js Integration

RhamaaCMS uses **Inertia.js** to bridge Django/Wagtail server-side routing with a full **React + TypeScript** frontend — no REST API or separate SPA deployment needed.

---

## How It Works

```
Browser
  │
  ▼
Django/Wagtail URL Router
  │
  ├── /admin/          → Wagtail Admin (Django HTML, unchanged)
  └── /                → Wagtail Page → inertia.render() ──────────────┐
                                                                        │
                                         layout.html (HTML shell)  ←───┘
                                           └── Vite loads main.tsx
                                                 └── React renders pages/home/Index.tsx
```

On the **first** request Inertia returns the full HTML shell (`layout.html`) with the page data embedded as JSON in a `<div id="app" data-page="...">`. On subsequent navigations it fetches only JSON — no full page reload.

---

## Stack

| Layer       | Technology                 |
|-------------|----------------------------|
| Server      | `inertia-django` — wraps `render()` responses |
| HTML shell  | `{{ project_name }}/templates/layout.html` |
| Client boot | `frontend/js/main.tsx`     |
| UI library  | shadcn/ui (Radix UI + CVA) |
| Effects     | Aceternity UI (copy-paste) |
| Styling     | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Bundler     | Vite 6                     |

---

## Running in Development

Two servers must run simultaneously:

```bash
# Terminal 1 — Vite HMR (port 5173)
pnpm run dev

# Terminal 2 — Django (port 8000)
python manage.py runserver
```

> **Without Vite running**, `layout.html` will inject a `<script>` pointing to
> `localhost:5173` which will silently fail. The page will appear blank.

---

## File Layout

```
frontend/
├── css/
│   └── main.css              # Tailwind v4 @import + shadcn CSS vars + brand tokens
├── js/
│   └── main.tsx              # Inertia bootstrap (CSRF setup + createInertiaApp)
├── layouts/
│   └── RootLayout.tsx        # Navbar + Footer shell wrapping all pages
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ui/                   # shadcn/ui components (Button, Badge, Card…)
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   └── card.tsx
│   └── aceternity/           # Aceternity UI effects (copy-paste)
│       ├── BackgroundBeams.tsx
│       └── Spotlight.tsx
├── pages/                    # One file per Django view (component name = Inertia page)
│   ├── home/
│   │   └── Index.tsx         # Served at "/"
│   └── errors/
│       ├── NotFound.tsx      # 404
│       └── ServerError.tsx   # 500
├── lib/
│   └── utils.ts              # cn() Tailwind class merger
└── types/
    ├── global.d.ts           # Shared PageProps + auth types
    └── vite-env.d.ts         # /// <reference types="vite/client" />
```

---

## Adding a New Page

### 1. Create the React component

```tsx
// frontend/pages/blog/List.tsx
import { Head } from "@inertiajs/react";
import RootLayout from "@/layouts/RootLayout";

interface Props {
  posts: { id: number; title: string; slug: string }[];
}

export default function BlogList({ posts }: Props) {
  return (
    <RootLayout>
      <Head title="Blog" />
      <div className="container mx-auto py-12">
        {posts.map((p) => (
          <div key={p.id}>{p.title}</div>
        ))}
      </div>
    </RootLayout>
  );
}
```

### 2. Create or update the Django view

For a **Wagtail Page**, use `InertiaPageMixin`:

```python
# apps/blog/models.py
from apps.home.models import InertiaPageMixin
from wagtail.models import Page

class BlogIndexPage(InertiaPageMixin, Page):
    inertia_component = "blog/List"

    def get_inertia_props(self, request):
        return {
            "title": self.title,
            "posts": list(
                BlogPost.objects.live().values("id", "title", "slug")
            ),
        }
```

For a **plain Django view**:

```python
from inertia import render as inertia_render
from django.views.decorators.http import require_GET

@require_GET
def blog_list(request):
    return inertia_render(request, "blog/List", {
        "posts": list(BlogPost.objects.live().values("id", "title", "slug")),
    })
```

### 3. Wire the URL (plain view only — Wagtail handles pages automatically)

```python
# {{ project_name }}/urls.py
path("blog/", views.blog_list),
```

---

## Sharing Global Data (Shared Props)

Use `inertia-django`'s `share()` in a middleware or view decorator to inject auth/flash data into every page:

```python
# utils/middleware.py
from inertia import share

class InertiaSharedPropsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        share(request,
            auth={"user": {"id": request.user.id, "username": request.user.username} if request.user.is_authenticated else None},
            flash={"success": request.session.pop("flash_success", None)},
        )
        return self.get_response(request)
```

Register in `settings/base.py` MIDDLEWARE list.

Then access in any page via `usePage()`:

```tsx
import { usePage } from "@inertiajs/react";
import type { PageProps } from "@/types/global";

export default function SomePage() {
  const { auth } = usePage<PageProps>().props;
  return <div>{auth.user?.username ?? "Guest"}</div>;
}
```

---

## Adding shadcn/ui Components

```bash
pnpm dlx shadcn@latest add <component>
```

Components land in `frontend/components/ui/`. They work out-of-the-box with the CSS variables defined in `frontend/css/main.css`.

---

## Adding Aceternity UI Components

Aceternity components are **copy-paste** (no npm package). Browse [ui.aceternity.com](https://ui.aceternity.com/components), copy the component source into `frontend/components/aceternity/`, adjust imports to use `@/lib/utils`.

---

## Build Commands

```bash
# Development (run alongside Django)
pnpm run dev

# Production build → frontend/dist/
pnpm run build

# TypeScript type check
pnpm run typecheck
```

---

## Wagtail Admin vs Inertia

| Area | Rendering |
|---|---|
| `/admin/*` | Django HTML templates (Wagtail admin, unchanged) |
| `/` and all public pages | React via Inertia |
| 404 / 500 errors | React via Inertia |

---

## Deployment

### 1. Build frontend assets

```bash
pnpm run build
```

Outputs to `frontend/dist/` including:
- `frontend/dist/.vite/manifest.json` — asset manifest (required by django-vite in production)
- `frontend/dist/js/main-[hash].js` — bundled React app
- `frontend/dist/css/main-[hash].css` — compiled Tailwind CSS

### 2. Collect static files

```bash
python manage.py collectstatic --no-input
```

This copies `frontend/dist/` (plus any other `STATICFILES_DIRS` entries) into `STATIC_ROOT` (default: `static/`), from where Nginx serves them.

### 3. Production settings

Create `{{ project_name }}/settings/local.py` (gitignored) on the server:

```python
from .production import *

SECRET_KEY = "<strong-random-key>"
ALLOWED_HOSTS = ["yourdomain.com"]
DEBUG = False

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "rhamaacms",
        "USER": "rhamaa",
        "PASSWORD": "<db-password>",
        "HOST": "localhost",
    }
}
```

Verify `DJANGO_VITE` has `dev_mode: False` (already the default in `base.py`).

### 4. Gunicorn + Nginx example

**Gunicorn** (WSGI — no channels/websockets needed for the base template):

```bash
gunicorn {{ project_name }}.wsgi:application \
  --bind 127.0.0.1:8000 \
  --workers 3 \
  --timeout 60
```

**Nginx config** (`/etc/nginx/sites-available/rhamaacms`):

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location /static/ {
        alias /path/to/project/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /media/ {
        alias /path/to/project/media/;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 5. Production deployment checklist

```bash
# On the server, after pulling new code:
pnpm install            # install/update JS deps
pnpm run build          # rebuild frontend assets
pip install -r requirements.txt  # install/update Python deps
python manage.py migrate         # run any new migrations
python manage.py collectstatic --no-input
systemctl restart gunicorn       # reload app server
```

### 6. Environment variables (alternative to local.py)

You can also drive settings via environment variables using `django-environ`:

```bash
pip install django-environ
```

```python
# {{ project_name }}/settings/production.py
import environ
env = environ.Env()
environ.Env.read_env()   # reads .env file

SECRET_KEY = env("SECRET_KEY")
DATABASES = {"default": env.db()}  # DATABASE_URL=postgres://...
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")
```

---

## Critical Gotchas

| Gotcha | Fix |
|---|---|
| Blank page in dev | Run `pnpm run dev` — Vite must be running |
| `can't detect preamble` error | Add `{% vite_react_refresh %}` to `layout.html` before `{% vite_asset %}` |
| `"use client"` in `.tsx` file | Remove it — Next.js-only directive, breaks Vite |
| Page component not found | Component name in `inertia_render()` must match file path under `frontend/pages/` (case-sensitive on Linux) |
| Blank page in production | Run `pnpm run build` then `collectstatic`; verify `DJANGO_VITE dev_mode=False` |
| CSRF errors on POST | Ensure `meta[name=csrf-token]` is in `layout.html`; `main.tsx` reads it into axios defaults |
| `layout.html` shadows `inertia.html` | Never name your layout template `inertia.html` — it shadows the package's own template |

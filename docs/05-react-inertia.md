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
                                           └── Next-built assets load main_next.tsx
                                                 └── React renders frontend/pages/home/Index.tsx
```

On the **first** request Inertia returns the full HTML shell (`layout.html`) with the page data embedded as JSON in a `<div id="app" data-page="...">`. On subsequent navigations it fetches only JSON — no full page reload.

---

## Stack

| Layer       | Technology                 |
|-------------|----------------------------|
| Server      | `inertia-django` — wraps `render()` responses |
| HTML shell  | `{{ project_name }}/templates/layout.html` |
| Client boot | `frontend/js/main_next.tsx` |
| UI library  | shadcn/ui (Radix UI + CVA) |
| Effects     | Aceternity UI (copy-paste) |
| Styling     | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Bundler     | Next.js 16 (webpack build output consumed by Django) |

---

## Running in Development

Build assets first, then run Django:

```bash
npm run build
python manage.py runserver
```

Optional frontend-only debug server:

```bash
npm run dev
```

---

## File Layout

```
frontend/
├── css/
│   └── main.css              # Tailwind v4 @import + shadcn CSS vars + brand tokens
├── js/
│   └── main_next.tsx         # Inertia bootstrap (CSRF setup + createInertiaApp)
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
    └── global.d.ts           # Shared PageProps + auth types
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
npx shadcn@latest add <component>
```

Components land in `frontend/components/ui/`. They work out-of-the-box with the CSS variables defined in `frontend/css/main.css`.

---

## Adding Aceternity UI Components

Aceternity components are **copy-paste** (no npm package). Browse [ui.aceternity.com](https://ui.aceternity.com/components), copy the component source into `frontend/components/aceternity/`, adjust imports to use `@/lib/utils`.

---

## Build Commands

```bash
# Next build consumed by Django staticfiles
npm run build

# TypeScript type check
npm run typecheck
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
npm run build
```

Outputs to `frontend/dist-next/` including:
- `frontend/dist-next/manifest.json` — Django template asset manifest
- `frontend/dist-next/chunks/**` — bundled React/Next runtime chunks
- `frontend/dist-next/css/**` — compiled Tailwind CSS

### 2. Collect static files

```bash
python manage.py collectstatic --no-input
```

This copies `frontend/dist-next/` (plus any other `STATICFILES_DIRS` entries) into `STATIC_ROOT` (default: `static/`), from where Nginx serves them.

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

No `django-vite` runtime config is required; Django reads `frontend/dist-next/manifest.json` via `next_inertia_assets` template tag.

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
npm install             # install/update JS deps
npm run build           # rebuild frontend assets
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
| Blank/stale page after edits | Re-run `npm run build` then hard refresh |
| Missing static chunks in browser | Ensure `frontend/dist-next/manifest.json` points to `/static/chunks/*` and run `collectstatic` |
| `"use client"` in `.tsx` file | Safe to use when needed; bundle is built by Next |
| Page component not found | Component name in `inertia_render()` must match file path under `frontend/pages/` (case-sensitive on Linux) |
| Blank page in production | Run `npm run build` then `collectstatic` and restart app server |
| CSRF errors on POST | Ensure `meta[name=csrf-token]` is in `layout.html`; `main_next.tsx` attaches `X-CSRFToken` |
| `layout.html` shadows `inertia.html` | Never name your layout template `inertia.html` — it shadows the package's own template |

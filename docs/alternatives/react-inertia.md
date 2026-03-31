# React + Inertia.js Template

Modern SPA experience without API complexity.

---

## What Makes This Different?

The React Template replaces Django's server-rendered templates with a modern React frontend while keeping Wagtail's powerful CMS backend.

### Key Differences from Base Template

| Aspect | Base Template | React Template |
|--------|--------------|----------------|
| Rendering | Server-side Django templates | React components |
| Navigation | Full page reloads | Inertia.js smooth transitions |
| JavaScript | Vanilla JS + esbuild | React 18 + TypeScript + Vite |
| Components | Preline UI (HTML) | shadcn/ui (React) |
| Styling | Tailwind + SASS | Tailwind + CSS variables |

---

## The Stack

```
Backend (Same as Base):
├── Wagtail 7.3
├── Django 6.0
└── Python 3.11+

Frontend (New):
├── React 18
├── TypeScript 5
├── Inertia.js v2
├── Vite 6
├── shadcn/ui
└── Aceternity UI
```

---

## How It Works

```
Browser Request
    │
    ▼
Django/Wagtail (Pages & Models - unchanged)
    │
    ├── /admin/* → Django HTML (unchanged)
    └── /* → inertia.render(request, "PageComponent", props)
                │
                ▼
        layout.html (HTML shell)
            └── Vite loads main.tsx
                    └── React renders PageComponent
```

**On first visit:** Full HTML with embedded JSON data  
**On navigation:** JSON only → React updates DOM

---

## Project Structure

```
myproject/
├── apps/
│   └── home/
│       └── models.py          # Same as Base
├── frontend/                  # NEW: React app
│   ├── js/
│   │   └── main.tsx           # Inertia bootstrap
│   ├── layouts/
│   │   └── RootLayout.tsx     # Shell (Navbar + Footer)
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   └── aceternity/       # Aceternity effects
│   ├── pages/                # One file = One page
│   │   ├── home/
│   │   │   └── Index.tsx     # Served at /
│   │   └── errors/
│   │       ├── NotFound.tsx
│   │       └── ServerError.tsx
│   └── css/
│       └── main.css          # Tailwind + shadcn vars
├── utils/
│   └── models.py             # InertiaPageMixin
└── myproject/
    ├── settings/base.py      # INERTIA_LAYOUT setting
    └── templates/
        └── layout.html       # Only HTML template
```

---

## Key Concepts

### InertiaPageMixin

Replace `BasePage` with `InertiaPageMixin`:

```python
# apps/home/models.py
from apps.home.models import InertiaPageMixin
from wagtail.models import Page

class HomePage(InertiaPageMixin, Page):
    """Home page with React frontend."""
    
    # React component to render
    inertia_component = "home/Index"
    
    def get_inertia_props(self, request):
        """Data passed to React component."""
        return {
            "hero_title": self.hero_title,
            "featured_pages": self.get_featured_pages(),
        }
```

### React Page Component

```tsx
// frontend/pages/home/Index.tsx
import { Head } from "@inertiajs/react";
import RootLayout from "@/layouts/RootLayout";

interface Props {
  hero_title: string;
  featured_pages: Page[];
}

export default function HomeIndex({ hero_title, featured_pages }: Props) {
  return (
    <RootLayout>
      <Head title={hero_title} />
      
      <section className="hero">
        <h1>{hero_title}</h1>
      </section>
      
      <section className="featured">
        {featured_pages.map(page => (
          <Card key={page.id} page={page} />
        ))}
      </section>
    </RootLayout>
  );
}
```

---

## Development Workflow

### Running the Project

```bash
# Terminal 1 - Vite HMR (port 5173)
pnpm run dev

# Terminal 2 - Django (port 8000)
python manage.py runserver
```

**Both must be running** — Vite serves assets in development.

### Adding Components

```bash
# Add shadcn/ui component
pnpm dlx shadcn@latest add button

# Creates: frontend/components/ui/button.tsx
```

---

## When to Choose This Template

✅ **Good for:**
- Interactive web applications
- Dashboard-style interfaces
- Real-time updates (via polling/WebSocket)
- Modern UX expectations

❌ **Not ideal for:**
- Simple content sites (use Base)
- SEO-critical landing pages (use Base)
- Sites needing fast initial load on slow connections

---

## Migration from Base

If you have an existing Base Template project:

1. Create new project with React template
2. Copy your `apps/` directory
3. Convert Django templates to React components
4. Update models to use `InertiaPageMixin`
5. Test and deploy

---

## Full Documentation

Complete React template docs are in the `docs/` folder of the `base-inertia-react` branch.

---

## Next Steps

- [Base Template Docs](../core/index.md)
- [IoT Template](iot.md)

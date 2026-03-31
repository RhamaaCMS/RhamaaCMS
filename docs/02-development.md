# Development Guide

Day-to-day development workflow for RhamaaCMS.

---

## Build Commands

All commands run from the **project root** (where `package.json` lives).

| Command | Description |
|---|---|
| `pnpm run dev` | Start Vite HMR server on port 5173 |
| `pnpm run build` | Production build → `frontend/dist/` |
| `pnpm run typecheck` | TypeScript type check without emitting files |
| `pnpm run preview` | Preview production build locally |

---

## Frontend Pipeline — How It Works

```
frontend/js/main.tsx           ← Inertia bootstrap + CSRF setup
    │
    ▼  @vitejs/plugin-react    ← JSX transform + React Fast Refresh
    │  @tailwindcss/vite       ← Tailwind v4 scan + CSS generation
    │
    ▼  Dev mode:  http://localhost:5173/js/main.tsx (served hot)
       Prod mode: frontend/dist/js/main-[hash].js + main-[hash].css
```

Tailwind v4 with `@tailwindcss/vite` **auto-scans all files** under `frontend/`. No `@source` directives needed.

---

## Recommended Dev Workflow

1. **Open two terminals** side by side
   - Terminal A: `pnpm run dev` (Vite, keep running)
   - Terminal B: `python manage.py runserver` (Django)

2. **Edit React files** in `frontend/` — Vite HMR pushes changes instantly, no page reload

3. **Edit Django models/views** — Django auto-reloads, browser reloads on next navigation

4. **Add new pages** — create `.tsx` in `frontend/pages/`, Vite picks it up immediately

---

## Adding a New React Component

### Shared / reusable component

```tsx
// frontend/components/MyWidget.tsx
import { cn } from "@/lib/utils";

interface MyWidgetProps {
  title: string;
  className?: string;
}

export function MyWidget({ title, className }: MyWidgetProps) {
  return (
    <div className={cn("rounded-xl border border-white/10 p-4", className)}>
      <h3 className="font-display text-white">{title}</h3>
    </div>
  );
}
```

Then import it anywhere:
```tsx
import { MyWidget } from "@/components/MyWidget";
```

### shadcn/ui component (recommended for UI primitives)

```bash
# Install from the shadcn registry (copies the component source into frontend/components/ui/)
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add input
```

Components land in `frontend/components/ui/` and are immediately importable:
```tsx
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
```

### Aceternity UI component (copy-paste effects)

1. Browse [ui.aceternity.com/components](https://ui.aceternity.com/components)
2. Copy the component source into `frontend/components/aceternity/MyEffect.tsx`
3. Replace `@/lib/utils` references if needed (already correct)
4. Remove any `"use client"` directive at the top — it's Next.js-only and breaks Vite

---

## Adding a New Page

See `docs/04-apps.md` for the full pattern. Quick summary:

```tsx
// 1. Create: frontend/pages/about/Index.tsx
export default function About() {
  return <RootLayout>...</RootLayout>;
}

// 2. In Django model: inertia_component = "about/Index"
// 3. Done — Inertia resolves the component name to the file automatically
```

---

## TypeScript

The project uses strict TypeScript. Run type checks with:

```bash
pnpm run typecheck
```

**Path aliases** (configured in `tsconfig.json` + `vite.config.ts`):

```tsx
import { cn } from "@/lib/utils";          // → frontend/lib/utils.ts
import { Button } from "@/components/ui/button";  // → frontend/components/ui/button.tsx
import type { PageProps } from "@/types/global";  // → frontend/types/global.d.ts
```

**Typing Inertia page props:**

```tsx
// frontend/pages/blog/List.tsx
interface Props {
  posts: { id: number; title: string; slug: string }[];
  total: number;
}

export default function BlogList({ posts, total }: Props) {
  // ...
}
```

**Accessing shared props** (injected by Django on every request):

```tsx
import { usePage } from "@inertiajs/react";

const { auth, flash } = usePage().props;
```

---

## Debugging

**Page is blank / white?**
1. Is Vite running? (`pnpm run dev`) — mandatory in dev mode
2. Check browser console for errors
3. Verify `{% vite_react_refresh %}` is in `layout.html` before `{% vite_asset %}`

**`@vitejs/plugin-react can't detect preamble`?**
- `{% vite_react_refresh %}` is missing from `layout.html`
- Or a `.tsx` file has `"use client"` at the top — remove it (Next.js-only)

**Inertia page not found (404 on navigation)?**
- Component name in `inertia_render()` must match the file path under `frontend/pages/`
- Example: `inertia_render(request, "blog/List", {})` → `frontend/pages/blog/List.tsx`
- Paths are case-sensitive on Linux/Mac

**Tailwind class not applying?**
- Class must be written verbatim in the source (no dynamic string concatenation)
- Vite + Tailwind v4 auto-scans all `.tsx` files — if class still missing, hard-refresh

**CSS lint warnings in VS Code (`@theme`, `@layer`)?**
- False positives from the VS Code CSS language server
- Tailwind v4 directives are processed correctly by `@tailwindcss/vite`
- No action needed

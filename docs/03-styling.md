# Styling Guide

How to modify the theme, add components, and work with the design system.

---

## CSS Architecture

`frontend/css/main.css` is the single CSS entry point:

```
frontend/css/main.css
├── @import "tailwindcss"           — Tailwind v4 core (via @tailwindcss/vite)
├── @layer base { :root { ... } }  — shadcn/ui CSS variables (HSL)
├── @layer base { .dark { ... } }  — Dark mode CSS variable overrides
├── @theme inline { ... }          — Map CSS vars → Tailwind tokens + brand palette
├── @layer base { * { ... } }      — Border color + body defaults
├── @keyframes { ... }             — fade-up, float, ping-slow
└── @layer utilities { ... }       — animate-* classes, animation-delay-*
```

**Design principle:** Components are styled with Tailwind utility classes written directly in `.tsx` files. The CSS file only defines design tokens — it contains no component styles.

---

## Brand Colors

All brand colors are defined under `@theme inline` in `frontend/css/main.css` and automatically become Tailwind utility classes.

### Deep blue scale (`brand-*`)

| Token | oklch value | Primary use |
|---|---|---|
| `brand-900` | `oklch(0.21 0.082 271)` | Deepest background |
| `brand-800` | `oklch(0.278 0.095 268.5)` | **Primary** — hero, navbar, footer |
| `brand-700` | `oklch(0.35 0.105 265)` | Hover overlays on dark bg |
| `brand-600` | `oklch(0.42 0.11 263)` | Ambient glow |

### Gold scale (`gold-*`)

| Token | oklch value | Primary use |
|---|---|---|
| `gold-500` | `oklch(0.68 0.148 78.5)` | **Primary accent** — CTA, borders |
| `gold-400` | `oklch(0.743 0.145 83.6)` | Icon colors, hover text |
| `gold-300` | `oklch(0.82 0.12 88)` | Subtle tints |

**To change a color**, update the `oklch()` value in `frontend/css/main.css` — Vite hot-reloads instantly, no rebuild needed in dev.

**Example — swap brand to a purple palette:**
```css
@theme inline {
  --color-brand-800: oklch(0.28 0.1 290);
  --color-brand-700: oklch(0.35 0.11 288);
  --color-brand-600: oklch(0.43 0.12 286);
}
```

---

## Typography

Fonts are referenced as tokens in the `@theme inline` block of `frontend/css/main.css`:

```css
--font-display: "Cormorant Garamond", Georgia, serif;
--font-mono:    "JetBrains Mono", "Fira Code", monospace;
```

| Token | Tailwind class | Use for |
|---|---|---|
| `--font-display` | `font-display` | Headings, hero text, brand wordmark |
| (system) | `font-sans` | Body text (DM Sans loaded via Google Fonts in layout.html) |
| `--font-mono` | `font-mono` | Labels, badges, version numbers, code |

`@layer base` applies `font-display` to all `h1`–`h6` elements automatically.

**To add or swap a font:**
1. Add a Google Fonts `<link>` in `{{ project_name }}/templates/layout.html`
2. Update `--font-display` or `--font-mono` in `frontend/css/main.css`
3. Vite picks up the change immediately (no rebuild in dev)

---

## shadcn/ui CSS Variables

`frontend/css/main.css` defines the full shadcn/ui HSL variable set, enabling all shadcn components to work automatically:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  /* ... more vars ... */
  --radius: 0.5rem;
}
```

These map to Tailwind tokens via `@theme inline`:
```css
@theme inline {
  --color-background: hsl(var(--background));
  --color-primary: hsl(var(--primary));
  /* ... */
}
```

**To change the shadcn theme color** (e.g. swap primary from dark to indigo):
```css
:root {
  --primary: 239 84% 67%;           /* indigo-500 equivalent */
  --primary-foreground: 0 0% 100%;  /* white */
}
```

---

## Animation Utilities

Defined in `@layer utilities` and `@keyframes` in `frontend/css/main.css`:

| Class | Effect | Keyframe |
|---|---|---|
| `animate-fade-up` | Slide up 16 px + fade in — one-shot entrance | `fade-up` |
| `animate-float` | Gentle 8 px vertical float loop | `float` |

**Stagger delays** (100 ms increments, up to 700 ms):

```tsx
<div className="animate-fade-up animation-delay-100">First</div>
<div className="animate-fade-up animation-delay-200">Second</div>
<div className="animate-fade-up animation-delay-300">Third</div>
```

**Adding a new animation:**
```css
/* in frontend/css/main.css */
@keyframes slide-in {
  from { transform: translateX(-20px); opacity: 0; }
  to   { transform: translateX(0);     opacity: 1; }
}

@layer utilities {
  .animate-slide-in { animation: slide-in 0.4s ease-out both; }
}
```

---

## Component Patterns (React / TSX)

Since all pages are React components, there are no HTML templates to copy. Use these TSX patterns:

### Dark card (used on the home page)

```tsx
<div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-5
                hover:-translate-y-1 hover:border-gold-500/35 hover:bg-white/[0.11]
                transition-all duration-200">
  <h3 className="font-display text-lg font-semibold text-white">Title</h3>
  <p className="text-sm leading-relaxed text-white/50">Description text.</p>
</div>
```

### shadcn Card component

```tsx
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
  </CardHeader>
</Card>
```

### Badge

```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant="gold">v1.0</Badge>
<Badge variant="outline">React · Inertia.js</Badge>
```

### Button

```tsx
import { Button } from "@/components/ui/button";

<Button variant="gold">Sign In</Button>
<Button variant="outline">Learn More</Button>
<Button variant="ghost">Cancel</Button>
```

---

## Dark Mode

The shadcn CSS variables support dark mode out of the box. Add the `dark` class to `<html>`:

```tsx
// In layout.html or via a ThemeProvider component
document.documentElement.classList.toggle('dark');
```

All shadcn components automatically switch themes. Brand colors (`brand-*`, `gold-*`) are dark-mode-only by design — this project defaults to a dark UI.

---

## Adding Tailwind Plugins

Tailwind v4 plugins are installed as packages and referenced in `frontend/css/main.css`:

```bash
# Install
pnpm add -D @tailwindcss/typography
```

```css
/* frontend/css/main.css */
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

The `prose` class is then available in any `.tsx` file:
```tsx
<div className="prose prose-invert max-w-none">
  {/* rich text content */}
</div>
```

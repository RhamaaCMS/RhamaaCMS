# Styling Guide

How to modify the theme, add components, and work with the design system.

---

## CSS Architecture

`static_src/css/main.css` is the single CSS entry point. It is intentionally minimal:

```
static_src/css/main.css
├── @import "tailwindcss"          — Core Tailwind v4 reset + utilities
├── @plugin "@tailwindcss/forms"   — Opinionated form element reset
├── @plugin "@tailwindcss/typography" — prose class for rich text
├── @source "..."                  — Paths Tailwind scans for utility classes
├── @theme { ... }                 — Brand color/font tokens → CSS variables
├── @layer base { ... }            — html, body, heading, scrollbar, selection
├── @layer utilities { ... }       — Custom utilities: animations, gradient text
└── @keyframes { ... }             — fade-up, float, shake
```

**Design principle:** There is no `@layer components`. Every component is styled entirely with **Tailwind utility classes written directly in the HTML template**. This makes templates self-documenting and easy to copy/modify.

---

## Brand Colors

All colors are defined in the `@theme` block in `main.css` and automatically become Tailwind utility classes (e.g. `bg-brand-800`, `text-gold-500`, `border-surface-200`).

### Green scale (`brand-*`)

| Token | Hex | Primary use |
|---|---|---|
| `brand-950` | `#071e17` | Deepest shadow |
| `brand-900` | `#0A3328` | Footer background |
| `brand-800` | `#0D4A3C` | **Primary** — hero section, navbar |
| `brand-700` | `#145C4B` | Hover states on dark bg |
| `brand-600` | `#1E7A63` | Ambient glow color |
| `brand-400` | `#3DB896` | Scrollbar thumb, selection |
| `brand-200` | `#A8E3D4` | Selection background |
| `brand-50` | `#EDF9F5` | Surface tint |

### Gold scale (`gold-*`)

| Token | Hex | Primary use |
|---|---|---|
| `gold-500` | `#C8A96E` | **Primary accent** — CTA buttons, badges |
| `gold-400` | `#D9BE8D` | Icon colors, hover text |
| `gold-300` | `#E8D4B0` | Gradient text |

### Surface neutrals (`surface-*`)

| Token | Hex | Primary use |
|---|---|---|
| `surface-900` | `#1A1A18` | Body text |
| `surface-50` | `#FAFAF7` | Default page background (content pages) |

**To change a color**, update the hex value in `main.css` and rebuild:

```bash
cd node && pnpm run build
```

---

## Typography

Fonts are loaded from Google Fonts in `base.html`'s `<head>`, then referenced as tokens in `@theme`:

```css
@theme {
  --font-display: "Cormorant Garamond", Georgia, "Times New Roman", serif;
  --font-sans:    "DM Sans", system-ui, -apple-system, sans-serif;
  --font-mono:    "JetBrains Mono", "Fira Code", monospace;
}
```

| Token | Tailwind class | Use for |
|---|---|---|
| `--font-display` | `font-display` | Headings, hero text, brand wordmark |
| `--font-sans` | `font-sans` | Body text (set on `body` in `@layer base`) |
| `--font-mono` | `font-mono` | Labels, badges, version numbers, code |

`@layer base` applies `font-display` to all `h1`–`h6` elements automatically.

**To swap a font:** update the Google Fonts URL in `base.html` and the token value in `main.css`.

---

## Animation Utilities

Defined in `@layer utilities` and `@keyframes` in `main.css`:

| Class | Effect | Keyframe |
|---|---|---|
| `animate-fade-up` | Slide up 24 px + fade in — one-shot entrance | `fade-up` |
| `animate-float` | Gentle 8 px vertical float loop | `float` |
| `animate-shake` | Horizontal shake — use on form error fields | `shake` |

**Stagger delays** (100 ms increments, up to 700 ms):

```html
<div class="animate-fade-up animation-delay-100">First</div>
<div class="animate-fade-up animation-delay-200">Second</div>
<div class="animate-fade-up animation-delay-300">Third</div>
```

---

## Base Layer Defaults

`@layer base` sets these global styles:

- `html` — `scroll-behavior: smooth`, `antialiased`, `optimizeLegibility`
- `body` — `font-sans`, `bg-surface-50`, `text-surface-900`, `line-height: 1.65`
- `h1`–`h6` — `font-display`, `line-height: 1.2`, `letter-spacing: -0.01em`
- `::-webkit-scrollbar` — 6 px, brand-400 thumb, surface-100 track
- `::selection` — brand-200 background, brand-900 text

---

## Component Patterns

RhamaaCMS has no component classes — copy these patterns directly into templates.

### Card (dark background variant)

```html
<div class="flex flex-col gap-3 p-5 rounded-2xl
            border border-white/10 bg-white/[0.06]
            hover:bg-white/[0.11] hover:border-gold-500/35
            hover:-translate-y-1 transition-all duration-200">
    <h3 class="font-display text-white text-lg font-semibold">Title</h3>
    <p class="text-white/50 text-sm leading-relaxed">Description text.</p>
</div>
```

### Card (light background variant)

```html
<div class="flex flex-col gap-3 p-5 rounded-2xl
            border border-surface-200
            hover:border-brand-300 hover:-translate-y-1 transition-all duration-200">
    <h3 class="font-display text-brand-900 text-lg font-semibold">Title</h3>
    <p class="text-surface-600 text-sm leading-relaxed">Description text.</p>
</div>
```

### Badge / Pill

```html
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
             border border-gold-500/25 bg-gold-500/10
             text-gold-400 text-[11px] font-mono tracking-widest uppercase">
    <span class="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0"></span>
    v1.0
</span>
```

### Buttons

```html
<!-- Primary (gold CTA — used in navbar and 404 page) -->
<a href="#" class="inline-flex items-center gap-2 text-[0.8125rem] font-semibold
                   text-brand-900 bg-gold-500 hover:bg-gold-400
                   hover:-translate-y-0.5 px-4 py-2 rounded-lg transition-all">
    Get Started
</a>

<!-- Ghost (nav links) -->
<a href="#" class="text-sm font-medium text-white/70 hover:text-white
                   hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
    Home
</a>
```

### Ornamental divider

```html
<div class="flex items-center gap-3 w-48">
    <div class="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
    <svg class="w-2.5 h-2.5 text-gold-500/40 shrink-0" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0 9.8 6.2 16 8 9.8 9.8 8 16 6.2 9.8 0 8 6.2 6.2Z"/>
    </svg>
    <div class="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
</div>
```

---

## Gradient Text

Two gradient text helpers are defined in `@layer utilities`:

```html
<!-- Green → gold diagonal gradient -->
<span class="text-gradient-brand">Rhamaa</span>

<!-- Gold light → gold gradient -->
<span class="text-gradient-gold">Premium</span>
```

---

## Suppressing Header / Footer

The landing page (`home_page.html`) hides the global header and footer by overriding their template blocks:

```django
{% block header %}{% endblock header %}
{% block footer %}{% endblock footer %}
```

Any page template that extends `base.html` can do the same. The blocks are defined in `base.html` around the `<header>` and `<footer>` elements.

---

## Adding Tailwind Plugins

Additional Tailwind v4 plugins go in `main.css` as `@plugin` directives:

```css
@plugin "@tailwindcss/forms";       /* already included */
@plugin "@tailwindcss/typography";  /* already included */
@plugin "@tailwindcss/aspect-ratio"; /* example: add if needed */
```

Install via pnpm first:

```bash
cd node && pnpm add -D @tailwindcss/aspect-ratio
```

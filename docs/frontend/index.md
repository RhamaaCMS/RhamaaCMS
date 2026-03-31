# Frontend Stack (Base)

The Base Template uses Tailwind CSS v4 with Preline UI components.

---

## Philosophy

The Base Template frontend is designed for:

- **Zero runtime CSS** — Tailwind generates all styles at build time
- **Utility-first** — Compose designs directly in HTML
- **Component-ready** — Preline UI provides production components
- **Design system** — Consistent colors, spacing, typography

---

## Stack Overview

| Technology | Purpose | Version |
|------------|---------|---------|
| Tailwind CSS | Utility-first CSS framework | v4 |
| Preline UI | Component library | v2 |
| SASS/SCSS | Advanced styling | — |
| esbuild | JavaScript bundler | latest |

---

## Comparison: Base vs React Template

| Aspect | Base Template | React Template |
|--------|--------------|----------------|
| CSS Framework | Tailwind + Preline | Tailwind + shadcn/ui |
| Components | Preline (HTML/JS) | shadcn/ui (React) |
| Templating | Django Templates | React + Inertia |
| Bundler | esbuild | Vite |
| Approach | Server-rendered | SPA-like |

---

## Key Files

```
frontend/
├── css/
│   └── main.css          # Tailwind directives, imports
└── js/
    └── main.js           # JavaScript entry

static_src/
├── sass/
│   ├── main.scss         # SASS entry
│   ├── _variables.scss   # Design tokens
│   └── _components.scss  # Custom components
└── javascript/
    └── main.js           # Module entry
```

---

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Development Mode

```bash
# Watch for changes and rebuild
pnpm run dev
```

### 3. Production Build

```bash
# Minified, optimized build
pnpm run build
```

---

## Tailwind CSS v4

### What's New in v4

- **CSS-first configuration** — No `tailwind.config.js`
- **`@import` syntax** — Use standard CSS imports
- **Better performance** — Faster builds
- **Built-in nesting** — Native CSS nesting support

### Main CSS File

```css
/* frontend/css/main.css */
@import "tailwindcss";
@import "@tailwindcss/forms";

/* Preline UI */
@import "../../node_modules/preline/dist/preline.css";

/* Custom variables */
@theme {
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
}
```

---

## Preline UI

### Installation

Already included via npm. Import the CSS in your main file.

### Using Components

```html
<!-- Dropdown -->
<div class="hs-dropdown relative inline-flex">
  <button class="hs-dropdown-toggle btn btn-primary">
    Open Dropdown
  </button>
  <div class="hs-dropdown-menu hidden ...">
    <a href="#" class="dropdown-item">Item 1</a>
    <a href="#" class="dropdown-item">Item 2</a>
  </div>
</div>

<!-- Modal -->
<button data-hs-overlay="#modal-id">
  Open Modal
</button>

<div id="modal-id" class="hs-overlay hidden ...">
  <!-- Modal content -->
</div>
```

### Initializing

```javascript
// main.js
import 'preline/preline';

// Preline components auto-initialize
```

---

## SASS/SCSS (Optional)

For more complex styling:

```scss
// _variables.scss
:root {
  --g-color-primary: #3b82f6;
  --g-color-secondary: #64748b;
  --g-spacing-unit: 1rem;
}

// _components.scss
.card {
  background: white;
  border-radius: calc(var(--g-spacing-unit) * 0.5);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
}
```

---

## Next Steps

- [Tailwind CSS](tailwind.md) — Detailed configuration
- [SASS/SCSS](sass.md) — Advanced styling
- [Preline UI](preline.md) — Component library

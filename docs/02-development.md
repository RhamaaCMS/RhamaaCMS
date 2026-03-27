# Development Guide

Day-to-day development workflow for RhamaaCMS.

---

## Build Commands

All commands run from the `node/` directory.

| Command | Description |
|---|---|
| `pnpm run build` | One-time dev build (source maps on) |
| `pnpm run build:prod` | Production build (minified, no source maps) |
| `pnpm run watch` | Watch CSS/JS/assets, rebuild on change |
| `pnpm run start` | Runs both `watch` AND `python manage.py runserver` via `concurrently` |

---

## Frontend Pipeline — How It Works

The build is orchestrated by `node/esbuild.js`. It runs three tasks in parallel:

### 1. CSS — PostCSS + Tailwind v4

```
static_src/css/main.css
    │
    ▼  postcss (node/postcss.config.js)
    │  └── @tailwindcss/postcss plugin
    │       ├── Scans template files via @source directives
    │       ├── Generates only the utility classes found in those files
    │       ├── Applies @theme tokens as CSS variables
    │       └── Appends @tailwindcss/forms and @tailwindcss/typography
    ▼
static_compiled/css/main.css
```

**Why `@source` is required:**
PostCSS runs from the `node/` directory. Tailwind v4's auto-detection would only scan files inside `node/`. The `@source` directives in `main.css` explicitly point to the Django templates:

```css
@source "../../{{ project_name }}/templates/**/*.html";
@source "../../apps/**/templates/**/*.html";
@source "../../static_src/javascript/**/*.js";
```

Paths are relative to `main.css` itself (`static_src/css/`), so `../../` resolves to the project root.

### 2. JavaScript — esbuild

```
static_src/javascript/main.js
    │
    ▼  esbuild (bundle: true, format: iife, target: es2020)
    │  ├── preline/dist      → Preline UI v4 (auto-inits all hs-* components)
    │  ├── canvas-confetti   → confetti effect utility
    │  └── custom utilities  → scroll animations, shake, stagger, reinitPreline()
    ▼
static_compiled/js/main.js  (~600 KB unminified)
```

### 3. Asset Copy

All files in `static_src/` that are **not** in `css/` or `javascript/` are copied to `static_compiled/`. This includes `images/logo.png`.

---

## Watch Mode

`pnpm run watch` uses `chokidar` to watch four sets of files:

| Watcher | Triggers |
|---|---|
| `static_src/css/**/*.css` | PostCSS rebuild |
| `static_src/javascript/**/*.js` | esbuild rebuild |
| `static_src/**/*` (excluding css/js) | Asset copy |
| Template `*.html` files | PostCSS rebuild (Tailwind re-scans classes) |

`pnpm run start` combines `pnpm run watch` with `python ../manage.py runserver` via `concurrently`, so you only need one terminal.

---

## JavaScript Utilities Exposed

`main.js` exposes two globals for use in custom scripts:

```js
// Re-initialize Preline after dynamically inserted HTML
window.reinitPreline()                  // re-init all components
window.reinitPreline(['collapse'])      // re-init specific component(s)

// Animation helpers
window.animationUtils.shakeElement(el)        // shake an element (form error)
window.animationUtils.runConfetti(options)    // fire confetti
window.animationUtils.initScrollAnimations()  // trigger IntersectionObserver setup
```

**Confetti via HTML attribute:**

```html
<button data-hs-confetti-trigger data-hs-confetti-options='{"particleCount":100}'>
    Celebrate!
</button>
```

**Stagger animation:**

```html
<ul data-stagger>
    <li>Item 1</li>  <!-- gets class stagger-1 -->
    <li>Item 2</li>  <!-- gets class stagger-2 -->
</ul>
```

---

## Preline UI Components

Preline v4 is imported as `preline/dist` and auto-initializes all `data-hs-*` components on `DOMContentLoaded`. No manual `init()` call required.

**Collapse (used in the mobile navbar):**

```html
<button data-hs-collapse="#mobile-nav">Toggle Menu</button>

<div id="mobile-nav" class="hs-collapse hidden overflow-hidden transition-all duration-300">
    <!-- mobile nav links -->
</div>
```

**Dropdown:**

```html
<div class="hs-dropdown relative">
    <button id="dropdown-trigger" type="button" data-hs-dropdown-toggle>
        Open
    </button>
    <div class="hs-dropdown-menu hidden min-w-48 ...">
        <a href="#">Option 1</a>
    </div>
</div>
```

Full component reference: [https://preline.co/docs/](https://preline.co/docs/)

> **Note:** RhamaaCMS uses Preline **v4**. API attributes differ from v2/v3 — always check v4 docs.

---

## Template Discovery

Django's template engine is configured with `APP_DIRS: True` and one explicit `DIRS` entry:

```python
TEMPLATES = [{
    "DIRS": [PROJECT_DIR / "templates"],   # {{ project_name }}/templates/
    "APP_DIRS": True,                       # each app's templates/ subdirectory
}]
```

**Resolution order for a template name:**
1. `{{ project_name }}/templates/<name>` — project-level (base.html, 404.html, 500.html)
2. Each installed app's `<app>/templates/<name>` — app-level

Wagtail resolves a Page model's template automatically:
```
apps.home.models.HomePage  →  home/home_page.html
                               └── found in apps/home/templates/home/home_page.html
```

---

## Debugging

**Tailwind class not appearing in compiled CSS?**

The class must appear verbatim in a file covered by `@source`. Check:
1. Is the template in `apps/**/templates/**/*.html` or `{{ project_name }}/templates/**/*.html`?
2. Is the class written in full (Tailwind cannot detect dynamically-constructed strings like `"text-" + color`)?
3. Run `pnpm run build` and hard-refresh (`Ctrl+Shift+R`).

**Preline component not responding?**

1. Open DevTools → Console for JS errors.
2. Check Network tab — is `js/main.js` loading (HTTP 200)?
3. Verify `data-hs-*` attributes match Preline v4 syntax.
4. If component was injected after page load, call `window.reinitPreline()`.

**CSS lint warnings in VS Code (`@plugin`, `@theme`, `@source`)?**

These are false positives from the VS Code CSS language server, which does not understand Tailwind v4 directives. The build tool (`@tailwindcss/postcss`) processes them correctly. No action needed.

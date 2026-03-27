# Changelog

All notable changes to RhamaaCMS are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

---

## [1.0.0] — 2026-03-27

### Added
- **RhamaaCMS brand identity** — deep forest green (`#0D4A3C`) × gold (`#C8A96E`) palette
- **Tailwind CSS v4** integration via `@tailwindcss/postcss` + esbuild build pipeline
- **Preline UI v4** bundled via `static_src/javascript/main.js`
- **`static_src/css/main.css`** — minimal Tailwind v4 theme file:
  - `@theme` block with full brand color scale (brand-950 → brand-50, gold-700 → gold-100, surface scale)
  - Custom fonts: Cormorant Garamond (display), DM Sans (body), JetBrains Mono (mono)
  - `@source` directives pointing at Django templates for correct utility generation
  - `@layer utilities`: `animate-fade-up`, `animate-float`, `animate-shake`, stagger delays, gradient text helpers
  - Keyframes: `fade-up`, `float`, `shake`
- **`{{ project_name }}/templates/base.html`** — master layout with:
  - Google Fonts import (Cormorant Garamond, DM Sans, JetBrains Mono)
  - Sticky Tailwind-styled navbar with Preline `data-hs-collapse` mobile menu
  - `{% block header %}` / `{% block footer %}` blocks for per-page suppression
  - Dark green footer with brand wordmark
- **`apps/home/templates/home/welcome_page.html`** — full-screen landing page:
  - Pure Tailwind utility classes (no custom CSS component classes)
  - Animated logo with float effect, version badge pill, italic display headline
  - Three feature cards (Documentation, Tutorial, Admin Panel) using Preline card pattern
  - Subtle diamond grid background + single ambient glow orb
  - Staggered `animate-fade-up` entrance animations
- **`apps/home/templates/home/home_page.html`** — overrides `{% block header %}` and `{% block footer %}` to suppress them on the landing page
- **`{{ project_name }}/templates/404.html`** — branded 404 error page (extends base.html, Tailwind utilities)
- **`{{ project_name }}/templates/500.html`** — standalone 500 error page with inline CSS
- **`node/tailwind.config.js`** — minimal config (theme tokens live in `main.css` `@theme`)
- **`docs/`** folder with setup, development, styling, and app creation guides
- **`README.md`** — project overview and quick start

### Changed
- `{{ project_name }}/settings/base.py` — added `static_compiled/` to `STATICFILES_DIRS`
- `apps/home/templates/home/home_page.html` — removed old `welcome_page.css` link

### Removed
- Default Wagtail welcome page CSS/HTML
- Old `{{ project_name }}.css` and `{{ project_name }}.js` references from templates

---

## [0.1.0] — Initial Wagtail scaffold

- Default Wagtail project generated via `wagtail start`

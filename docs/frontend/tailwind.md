# Tailwind CSS v4

Configuration and usage of Tailwind CSS in the Base Template.

---

## CSS-First Configuration

Tailwind v4 moves configuration to CSS instead of JavaScript:

```css
/* frontend/css/main.css */
@import "tailwindcss";

/* Enable plugins */
@import "@tailwindcss/forms";
@import "@tailwindcss/typography";

/* Theme customization */
@theme {
  /* Colors */
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --color-accent: #f59e0b;
  
  /* Fonts */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  
  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
}
```

---

## Utility Classes

### Layout

```html
<!-- Flexbox -->
<div class="flex items-center justify-between">
  <div class="flex-1">Left</div>
  <div class="flex-1">Right</div>
</div>

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Spacing -->
<div class="p-4 m-2">Padding + Margin</div>
<div class="px-6 py-4">Horizontal + Vertical</div>
```

### Typography

```html
<h1 class="text-4xl font-bold text-gray-900">Heading</h1>
<p class="text-base leading-relaxed text-gray-600">
  Body text with comfortable line height
</p>
<span class="text-sm font-medium uppercase tracking-wide">
  Small label
</span>
```

### Colors

```html
<!-- Background -->
<div class="bg-white dark:bg-gray-900">
<div class="bg-primary-500">
<div class="bg-gradient-to-r from-blue-500 to-purple-500">

<!-- Text -->
<p class="text-gray-900 dark:text-white">
<p class="text-primary-600 hover:text-primary-700">
```

### Responsive Design

```html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Full width on mobile, 50% on tablet, 33% on desktop -->
</div>

<div class="hidden md:block">
  <!-- Hidden on mobile, visible on tablet+ -->
</div>

<p class="text-sm md:text-base lg:text-lg">
  <!-- Responsive text sizes -->
</p>
```

### Dark Mode

```html
<div class="bg-white dark:bg-gray-900">
  <p class="text-gray-900 dark:text-gray-100">
    Automatically switches based on system preference
  </p>
</div>

<!-- Or force with class -->
<html class="dark">
```

---

## Custom Classes

### With @apply (in SASS)

```scss
// _components.scss
.btn {
  @apply px-4 py-2 rounded font-medium transition-colors;
  @apply bg-primary-500 text-white;
  @apply hover:bg-primary-600;
}

.card {
  @apply bg-white rounded-lg shadow-md p-6;
  @apply dark:bg-gray-800;
}
```

### Custom Utilities

```css
@utilities {
  .text-shadow {
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .gradient-text {
    background: linear-gradient(to right, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
```

---

## Best Practices

1. **Use semantic classes** — `btn-primary` not `px-4-py-2-blue`
2. **Group related utilities** — One element per line
3. **Extract components** — Use `@apply` for repetition
4. **Mobile-first** — Start with base, add responsive prefixes
5. **Dark mode** — Always test both modes

---

## Build Commands

```bash
# Development (watch mode)
npm run dev

# Production build (minified)
npm run build

# One-time build
npm run build:prod
```

---

## Next Steps

- [SASS/SCSS](sass.md) — Advanced styling patterns
- [Preline UI](preline.md) — Component library

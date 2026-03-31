# SASS/SCSS

Advanced styling with SASS in RhamaaCMS Base Template.

---

## Why SASS?

While Tailwind handles most styling needs, SASS is useful for:

- Complex component styles
- Design tokens and variables
- Mixins and functions
- Organized, maintainable CSS

---

## File Structure

```
static_src/
└── sass/
    ├── main.scss           # Entry point
    ├── _variables.scss     # Design tokens
    ├── _mixins.scss        # Reusable mixins
    ├── _components.scss    # Custom components
    └── _utilities.scss     # Helper classes
```

---

## Main Entry Point

```scss
// main.scss
@import 'variables';
@import 'mixins';
@import 'components';
@import 'utilities';

// Tailwind directives
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Variables (Design Tokens)

```scss
// _variables.scss
:root {
  // Colors - Brand
  --g-color-primary: #3b82f6;
  --g-color-primary-light: #60a5fa;
  --g-color-primary-dark: #2563eb;
  
  // Colors - Neutral
  --g-color-white: #ffffff;
  --g-color-gray-100: #f3f4f6;
  --g-color-gray-900: #111827;
  
  // Colors - Semantic
  --g-color-success: #10b981;
  --g-color-warning: #f59e0b;
  --g-color-error: #ef4444;
  
  // Typography
  --g-font-sans: 'Inter', system-ui, sans-serif;
  --g-font-mono: 'JetBrains Mono', monospace;
  
  --g-text-xs: 0.75rem;
  --g-text-sm: 0.875rem;
  --g-text-base: 1rem;
  --g-text-lg: 1.125rem;
  --g-text-xl: 1.25rem;
  --g-text-2xl: 1.5rem;
  
  // Spacing
  --g-space-1: 0.25rem;
  --g-space-2: 0.5rem;
  --g-space-4: 1rem;
  --g-space-8: 2rem;
  --g-space-16: 4rem;
  
  // Border radius
  --g-radius-sm: 0.25rem;
  --g-radius-md: 0.5rem;
  --g-radius-lg: 1rem;
  --g-radius-full: 9999px;
  
  // Shadows
  --g-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --g-shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --g-shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  
  // Transitions
  --g-transition-fast: 150ms ease;
  --g-transition-base: 250ms ease;
  --g-transition-slow: 350ms ease;
}

// Dark mode overrides
@media (prefers-color-scheme: dark) {
  :root {
    --g-color-white: #111827;
    --g-color-gray-900: #f9fafb;
  }
}
```

---

## Mixins

```scss
// _mixins.scss

// Responsive breakpoints
@mixin mobile {
  @media (max-width: 767px) { @content; }
}

@mixin tablet {
  @media (min-width: 768px) { @content; }
}

@mixin desktop {
  @media (min-width: 1024px) { @content; }
}

// Utility mixins
@mixin visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@mixin focus-ring {
  outline: 2px solid var(--g-color-primary);
  outline-offset: 2px;
}

@mixin truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@mixin line-clamp($lines: 3) {
  display: -webkit-box;
  -webkit-line-clamp: $lines;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

// Button mixin
@mixin button($variant: primary) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--g-space-2) var(--g-space-4);
  font-family: var(--g-font-sans);
  font-size: var(--g-text-base);
  font-weight: 500;
  border-radius: var(--g-radius-md);
  transition: all var(--g-transition-fast);
  cursor: pointer;
  border: none;
  
  @if $variant == primary {
    background: var(--g-color-primary);
    color: white;
    
    &:hover {
      background: var(--g-color-primary-dark);
    }
  } @else if $variant == secondary {
    background: transparent;
    color: var(--g-color-primary);
    border: 1px solid var(--g-color-primary);
    
    &:hover {
      background: var(--g-color-primary);
      color: white;
    }
  }
  
  &:focus {
    @include focus-ring;
  }
}
```

---

## Components

```scss
// _components.scss
@import 'mixins';

// Cards
.card {
  background: var(--g-color-white);
  border-radius: var(--g-radius-lg);
  box-shadow: var(--g-shadow-md);
  padding: var(--g-space-4);
  transition: box-shadow var(--g-transition-base);
  
  &:hover {
    box-shadow: var(--g-shadow-lg);
  }
  
  &__title {
    font-size: var(--g-text-xl);
    font-weight: 600;
    margin-bottom: var(--g-space-2);
  }
  
  &__content {
    color: var(--g-color-gray-900);
  }
}

// Buttons
.btn {
  @include button(primary);
  
  &--secondary {
    @include button(secondary);
  }
  
  &--small {
    padding: var(--g-space-1) var(--g-space-2);
    font-size: var(--g-text-sm);
  }
  
  &--large {
    padding: var(--g-space-4) var(--g-space-8);
    font-size: var(--g-text-lg);
  }
}

// Navigation
.nav {
  display: flex;
  align-items: center;
  gap: var(--g-space-4);
  
  &__link {
    color: var(--g-color-gray-900);
    text-decoration: none;
    font-weight: 500;
    transition: color var(--g-transition-fast);
    
    &:hover {
      color: var(--g-color-primary);
    }
    
    &.is-active {
      color: var(--g-color-primary);
    }
  }
}
```

---

## Build Integration

SASS is compiled by esbuild:

```javascript
// node/esbuild.js
const esbuild = require('esbuild');
const sass = require('sass');

// Compile SASS
const result = sass.compile('static_src/sass/main.scss', {
  style: 'compressed',
});

// Then bundle with esbuild
esbuild.build({
  stdin: {
    contents: result.css,
    loader: 'css',
  },
  outfile: 'static_compiled/build/main.css',
  bundle: true,
  minify: true,
});
```

---

## Best Practices

1. **Use CSS variables** — Easier to override, works with JS
2. **Organize by component** — One file per major component
3. **BEM naming** — `.block__element--modifier`
4. **Mobile-first** — Base styles, then responsive
5. **Avoid deep nesting** — Max 3 levels deep

---

## Next Steps

- [Preline UI](preline.md) — Using the component library
- [Static Assets](../core/static-assets.md) — Build pipeline

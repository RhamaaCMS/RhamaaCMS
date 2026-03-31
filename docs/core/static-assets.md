# Static Assets

Managing CSS, JavaScript, and other static files.

---

## Static Files Structure

```
static_src/              # Source files
├── sass/
│   └── main.scss        # SASS entry point
└── javascript/
    └── main.js          # JS entry point

static_compiled/         # Compiled output (gitignored)
└── build/
    ├── main.css
    └── main.js

static/                  # Collected static (production)
```

---

## Build Pipeline

The Base Template uses **esbuild** for building:

```bash
# Development (with watch)
npm run dev

# Production build
npm run build
```

### esbuild Configuration

```javascript
// node/esbuild.js
const esbuild = require('esbuild');
const sass = require('sass');

esbuild.build({
  entryPoints: ['static_src/javascript/main.js'],
  bundle: true,
  outfile: 'static_compiled/build/main.js',
  minify: true,
});
```

---

## SASS/SCSS

### Main SASS File

```scss
// static_src/sass/main.scss
@import 'variables';
@import 'components';

// Tailwind directives
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### SASS Features

```scss
// Variables
$primary-color: #3b82f6;

// Nesting
.navbar {
  background: $primary-color;
  
  .nav-link {
    color: white;
    
    &:hover {
      opacity: 0.8;
    }
  }
}

// Mixins
@mixin card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card {
  @include card;
}
```

---

## JavaScript

### Module Structure

```javascript
// static_src/javascript/main.js
import { initNavigation } from './navigation';
import { initAnalytics } from './analytics';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnalytics();
});
```

### Component Example

```javascript
// static_src/javascript/navigation.js
export function initNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  
  toggle?.addEventListener('click', () => {
    menu.classList.toggle('is-active');
  });
}
```

---

## In Templates

```html
{% load static %}

{# CSS #}
<link rel="stylesheet" href="{% static 'build/main.css' %}">

{# JavaScript #}
<script src="{% static 'build/main.js' %}"></script>

{# Images #}
<img src="{% static 'images/logo.png' %}">
```

---

## Production

### WhiteNoise

Static files served via WhiteNoise in production:

```python
# settings/production.py
MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',
    # ...
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

### Collect Static

```bash
python manage.py collectstatic
```

---

## Next Steps

- [Tailwind CSS](../frontend/tailwind.md) — Utility-first styling
- [Preline UI](../frontend/preline.md) — Component library

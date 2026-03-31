# Project Structure

Understanding the folder layout of the RhamaaCMS Base Template.

---

## Top-Level Structure

```
myproject/
├── apps/                    # Your Wagtail apps
├── docs/                    # Documentation (this folder)
├── frontend/                # Tailwind CSS source
├── static_src/              # JavaScript & SASS assets
├── static_compiled/         # Compiled assets (gitignored)
├── media/                   # User uploads (gitignored)
├── myproject/               # Django project settings
├── manage.py                # Django management script
├── package.json             # Node.js dependencies
├── requirements.txt         # Python dependencies
└── README.md                # Project readme
```

---

## Key Directories

### `apps/`

Your Wagtail applications live here. Each app is self-contained:

```
apps/
└── home/
    ├── models.py           # Page models
    ├── templates/          # Django templates
    └── migrations/         # Database migrations
```

### `utils/`

Shared utilities used across all apps:

```
utils/
├── models.py               # BasePage, ListingFields, etc.
├── blocks.py             # StreamField blocks
├── images/               # Custom image model
├── navigation/           # Navigation settings
└── templatetags/         # Custom template tags
```

### `myproject/`

Django project configuration:

```
myproject/
├── settings/
│   ├── base.py           # Common settings
│   ├── dev.py            # Development settings
│   ├── production.py     # Production settings
│   └── local.py          # Local overrides (gitignored)
├── urls.py               # URL routing
├── wsgi.py               # WSGI entry point
└── templates/
    └── base.html         # Base template
```

### `frontend/`

Tailwind CSS v4 configuration:

```
frontend/
├── css/
│   └── main.css          # Tailwind directives
└── js/
    └── main.js           # Entry point
```

### `static_src/`

Legacy asset pipeline (esbuild):

```
static_src/
├── sass/
│   └── main.scss         # SASS styles
└── javascript/
    └── main.js           # JavaScript modules
```

---

## Template-Specific Notes

### Base Template
- Uses **Django templates** + **Tailwind CSS**
- **esbuild** for JavaScript bundling
- **SASS/SCSS** for advanced styling

### React Template (Alternative)
- Uses **React** + **Inertia.js**
- **Vite** for bundling
- Frontend in `frontend/` directory

### IoT Template (Alternative)
- Adds **Django Channels**
- **MQTT** client integration
- Same frontend as Base

---

## Where to Put Your Code

| What | Where |
|------|-------|
| New page types | `apps/<app>/models.py` |
| Templates | `apps/<app>/templates/` |
| Static files (CSS/JS) | `static_src/` |
| Images, uploads | `media/` (auto-created) |
| Project settings | `myproject/settings/local.py` |
| URL routes | `myproject/urls.py` |

---

## Next Steps

- [Core Concepts](../core/index.md) — Learn about BasePage and models
- [Frontend Stack](../frontend/index.md) — Tailwind and Preline UI

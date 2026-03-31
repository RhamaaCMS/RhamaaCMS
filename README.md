<div align="center">

<img src="assets/logo.png" alt="RhamaaCMS Logo" width="180">

# RhamaaCMS

**Production-Ready Wagtail CMS Templates**

[![Wagtail](https://img.shields.io/badge/Wagtail-7.3-green?logo=wagtail)](https://wagtail.org)
[![Django](https://img.shields.io/badge/Django-6.0-092E20?logo=django&logoColor=white)](https://djangoproject.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Quick Start](#quick-start) · [Templates](#available-templates) · [Documentation](#documentation) · [CLI Tool](https://github.com/RhamaaCMS/RhamaaCLI)

</div>

---

## What is RhamaaCMS?

**RhamaaCMS** is a collection of production-ready [Wagtail CMS](https://wagtail.org) starter templates designed for rapid web development. Whether you're building a content site, an IoT dashboard, or a modern React-powered web app, we have a template to get you started.

Built on Django + Wagtail with modern frontend tooling, each template follows best practices for security, performance, and developer experience.

---

## Available Templates

Choose the template that fits your project needs:

| Template | Branch | Stack | Best For |
|----------|--------|-------|----------|
| **Base** | [`base`](https://github.com/RhamaaCMS/RhamaaCMS/tree/base) | Wagtail + Django + Tailwind CSS | Traditional CMS sites, blogs, portfolios |
| **IoT** | [`base-iot`](https://github.com/RhamaaCMS/RhamaaCMS/tree/base-iot) | Wagtail + Django Channels + MQTT | IoT dashboards, real-time monitoring, sensor data |
| **React** | [`base-inertia-react`](https://github.com/RhamaaCMS/RhamaaCMS/tree/base-inertia-react) | Wagtail + React + Inertia.js + Vite | Modern SPA-like experiences, interactive apps |

### Quick Comparison

| Feature | Base | IoT | React |
|---------|:----:|:---:|:-----:|
| Wagtail CMS | ✅ | ✅ | ✅ |
| Tailwind CSS | ✅ | ✅ | ✅ |
| Preline UI | ✅ | ✅ | ❌ |
| shadcn/ui | ❌ | ❌ | ✅ |
| React 18 | ❌ | ❌ | ✅ |
| Inertia.js | ❌ | ❌ | ✅ |
| MQTT/IoT | ❌ | ✅ | ❌ |
| WebSocket | ❌ | ✅ | ❌ |
| Django Channels | ❌ | ✅ | ❌ |
| Vite Bundler | ❌ | ❌ | ✅ |
| esbuild | ✅ | ✅ | ❌ |

---

## Quick Start

### Using RhamaaCLI (Recommended)

Install our CLI tool for the fastest setup:

```bash
pip install rhamaa

# Create project from base template
rhamaa cms start myproject

# Or with specific template
rhamaa cms start myproject --template base
rhamaa cms start myproject --template iot
rhamaa cms start myproject --template react
```

### Manual Installation

```bash
# 1. Clone template branch
git clone -b base https://github.com/RhamaaCMS/RhamaaCMS.git myproject
cd myproject

# 2. Set up Python environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# 3. Initialize database
python manage.py migrate
python manage.py createsuperuser

# 4. Run development server
python manage.py runserver
```

---

## Template Details

### Base Template
Classic Wagtail CMS with Django templates and Tailwind CSS.

**Stack:**
- Wagtail 7.3 / Django 6.0
- Tailwind CSS v4
- Preline UI Components
- SCSS/SASS
- esbuild

**Perfect for:** Content websites, blogs, corporate sites, portfolios

[View Base Template →](https://github.com/RhamaaCMS/RhamaaCMS/tree/base)

---

### IoT Template
Real-time dashboard template with MQTT and WebSocket support.

**Stack:**
- Wagtail 7.3 / Django 6.0
- Django Channels 4
- MQTT Integration
- Tailwind CSS
- Real-time data visualization

**Perfect for:** IoT dashboards, sensor monitoring, real-time control panels

[View IoT Template →](https://github.com/RhamaaCMS/RhamaaCMS/tree/base-iot)

---

### React Template
Modern frontend experience with React and Inertia.js.

**Stack:**
- Wagtail 7.3 / Django 6.0
- React 18 + TypeScript
- Inertia.js v2
- Vite 6
- shadcn/ui + Aceternity UI
- Tailwind CSS v4

**Perfect for:** Interactive web apps, modern user experiences, SPAs without API complexity

[View React Template →](https://github.com/RhamaaCMS/RhamaaCMS/tree/base-inertia-react)

---

## Documentation

Each template branch includes comprehensive documentation:

| Guide | Location |
|-------|----------|
| Setup Guide | `docs/01-setup.md` |
| Development | `docs/02-development.md` |
| Styling Guide | `docs/03-styling.md` |
| App Development | `docs/04-apps.md` |
| React + Inertia | `docs/05-react-inertia.md` (React branch) |

---

## Project Structure

All templates follow a consistent structure:

```
myproject/
├── apps/                    # Your Wagtail apps
│   └── home/               # Home page app
├── utils/                  # Shared utilities
│   ├── models.py          # BasePage, BaseSiteSetting
│   ├── blocks.py          # StreamField blocks
│   └── templatetags/      # Custom template tags
├── docs/                   # Documentation
├── frontend/              # (React template only)
│   ├── components/
│   ├── pages/
│   └── css/
├── {{ project_name }}/     # Django project settings
│   ├── settings/
│   ├── urls.py
│   └── templates/
├── manage.py
└── requirements.txt
```

---

## Features

### Core Features (All Templates)
- ✅ Production-ready Wagtail setup
- ✅ SEO-optimized base models
- ✅ Responsive Tailwind CSS styling
- ✅ Custom image model with focal points
- ✅ Navigation management
- ✅ Cache configuration
- ✅ Security headers
- ✅ WhiteNoise static file serving

### React Template Extras
- ✅ React 18 with TypeScript
- ✅ Inertia.js SPA navigation
- ✅ shadcn/ui components
- ✅ Aceternity UI effects
- ✅ Vite HMR development
- ✅ Shared props middleware

### IoT Template Extras
- ✅ Django Channels WebSocket
- ✅ MQTT client integration
- ✅ Real-time dashboard components
- ✅ Sensor data models

---

## CLI Tool: RhamaaCLI

Supercharge your workflow with [RhamaaCLI](https://github.com/RhamaaCMS/RhamaaCLI):

```bash
pip install rhamaa

# Available commands
rhamaa cms start <project>      # Create new project
rhamaa cms startapp <app>       # Create Wagtail app
rhamaa cms run                  # Run dev server
rhamaa cms build-template       # Create template from project
```

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Branch Naming
- `base` — Core template (stable)
- `base-iot` — IoT features
- `base-inertia-react` — React frontend

---

## Support

- 🐛 [Report Issues](https://github.com/RhamaaCMS/RhamaaCMS/issues)
- 💬 [Discussions](https://github.com/RhamaaCMS/RhamaaCMS/discussions)
- 📖 [Wiki](https://github.com/RhamaaCMS/RhamaaCMS/wiki)

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">

**[⬆ Back to Top](#rhamaacms)**

Built with ❤️ by the RhamaaCMS Team

</div>

# Installation

This guide covers installing all dependencies for the RhamaaCMS Base Template.

---

## Python Environment

### 1. Create Virtual Environment

```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# macOS / Linux
python -m venv .venv
source .venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

This installs:

- Django 6.0
- Wagtail 7.3
- Tailwind CSS support packages
- Production utilities (WhiteNoise, Gunicorn)

---

## Frontend Dependencies

### Install pnpm (if not already installed)

```bash
npm install -g pnpm
```

### Install Node Packages

```bash
pnpm install
```

This installs:

- Tailwind CSS v4
- esbuild
- Preline UI
- Development tools

---

## Verify Installation

Check everything is installed correctly:

```bash
# Python
python --version  # Should be 3.10+
python -c "import wagtail; print(wagtail.__version__)"

# Node.js
node --version    # Should be 18+
pnpm --version    # Should be 8+
```

---

## Optional: Local Settings

Create a local settings file for development overrides:

```python
# {{ project_name }}/settings/local.py
from .dev import *

SECRET_KEY = "your-dev-secret-key-here"
DEBUG = True
ALLOWED_HOSTS = ["127.0.0.1", "localhost"]

# Email backend for development
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
```

This file is automatically imported by both `dev.py` and `production.py` if it exists.

---

## Next Steps

Once installation is complete, proceed to the [Quick Start](quickstart.md) guide to run your project.

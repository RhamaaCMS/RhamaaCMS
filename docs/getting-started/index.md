# Getting Started

Welcome! This guide will walk you through setting up your first RhamaaCMS project using the **Base Template**.

---

## Prerequisites

Before starting, make sure you have:

- **Python** 3.10 or higher
- **Node.js** 18+ and **pnpm** 8+
- **Git** for version control

---

## Installation Options

### Option 1: Using RhamaaCLI (Recommended)

The fastest way to get started:

```bash
# Install the CLI tool
pip install rhamaa

# Create a new project
rhamaa cms start myproject

# Enter your project directory
cd myproject
```

### Option 2: Manual Installation

If you prefer manual setup:

```bash
# Clone the base template branch
git clone -b base https://github.com/RhamaaCMS/RhamaaCMS.git myproject
cd myproject

# Remove git history to start fresh
rm -rf .git
git init
```

---

## What's Included

The Base Template comes with everything you need:

| Component | Purpose |
|-----------|---------|
| `apps/home/` | Home page app with base models |
| `utils/` | Shared utilities (models, blocks, navigation) |
| `frontend/` | Tailwind CSS source files |
| `static_src/` | JavaScript and SCSS assets |
| `requirements.txt` | Python dependencies |

---

## Next Steps

Now that you have the project set up:

1. **[Quick Start](quickstart.md)** — Get the development server running
2. **[Project Structure](project-structure.md)** — Understand the folder layout
3. **[Core Concepts](../core/index.md)** — Learn about BasePage, StreamField, and more

---

## Alternative Templates

If the Base Template doesn't fit your needs, check out:

- **[React + Inertia.js](../alternatives/react-inertia.md)** — For modern SPA experiences
- **[IoT / MQTT](../alternatives/iot.md)** — For real-time IoT dashboards

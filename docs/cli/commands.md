# CLI Commands Reference

Complete reference for RhamaaCLI commands.

---

## Project Commands

### `rhamaa cms start`

Create a new RhamaaCMS project.

```bash
# Create with default (Base) template
rhamaa cms start myproject

# Create with specific template
rhamaa cms start myproject --template react
rhamaa cms start myproject --template iot
rhamaa cms start myproject --template base

# Options
--template, -t      # Template to use
--template-url    # Custom template URL
--template-file   # Local template file
--local-dev       # Skip template, setup local dev
--list            # List available templates
```

---

### `rhamaa cms run`

Run development server.

```bash
# Development server (Django runserver)
rhamaa cms run

# Custom host/port
rhamaa cms run --host 0.0.0.0 --port 8080

# Production mode (Gunicorn) - Base/IoT only
rhamaa cms run --prod
```

---

### `rhamaa cms startapp`

Create a new Wagtail app.

```bash
# Create minimal Django app
rhamaa cms startapp blog

# Create Wagtail app with templates
rhamaa cms startapp blog --type wagtail

# Force overwrite existing
rhamaa cms startapp blog --force

# List prebuilt apps
rhamaa cms startapp --list

# Install prebuilt app
rhamaa cms startapp blog --prebuild articles
```

---

## Database Commands

### `rhamaa cms migrate`

Run Django migrations.

```bash
rhamaa cms migrate

# Specific app
rhamaa cms migrate blog

# Dry run
rhamaa cms migrate --dry-run
```

### `rhamaa cms makemigrations`

Create new migrations.

```bash
rhamaa cms makemigrations

# Specific app
rhamaa cms makemigrations blog
```

---

## Utility Commands

### `rhamaa cms check`

Run Django system checks.

```bash
rhamaa cms check
```

### `rhamaa cms collectstatic`

Collect static files.

```bash
rhamaa cms collectstatic

# Skip confirmation
rhamaa cms collectstatic --no-input
```

### `rhamaa cms createsuperuser`

Create admin user.

```bash
rhamaa cms createsuperuser
```

### `rhamaa cms shell`

Open Django shell.

```bash
rhamaa cms shell
```

---

## Search Commands

### `rhamaa cms update_index`

Update search index.

```bash
rhamaa cms update_index
```

---

## Template Commands

### `rhamaa cms build-template`

Convert a project back to a template.

```bash
# Build from current directory
rhamaa cms build-template

# Build from specific directory
rhamaa cms build-template /path/to/project

# Custom slug
rhamaa cms build-template --slug myproject

# Output file
rhamaa cms build-template --output my-template.zip

# Skip verbatim wrapping
rhamaa cms build-template --no-wrap-templates
```

---

## Info Commands

### `rhamaa cms status`

Show project status.

```bash
rhamaa cms status
```

Output:
```
Project Path: /path/to/project
✓ manage.py found
✓ apps/ directory (3 apps)
✓ requirements.txt found
```

### `rhamaa cms info`

Show detailed info.

```bash
rhamaa cms info
```

Output:
```
Component          Status          Details
Django             Installed       v6.0
Wagtail            Installed       v7.3
```

---

## Global Options

Available for all commands:

```bash
--help, -h        # Show help
--version, -v     # Show version
```

---

## Examples

### Complete Workflow

```bash
# 1. Create project
rhamaa cms start myblog --template base

# 2. Enter directory
cd myblog

# 3. Install dependencies
pip install -r requirements.txt
pnpm install

# 4. Setup database
rhamaa cms migrate
rhamaa cms createsuperuser

# 5. Build assets
pnpm run build

# 6. Run server
rhamaa cms run
```

---

## Troubleshooting

### Command not found

```bash
# Ensure pip bin is in PATH
export PATH="$HOME/.local/bin:$PATH"
```

### Permission denied

```bash
# Use pip with --user
pip install --user rhamaa
```

---

## Next Steps

- [Creating Templates](creating-templates.md)

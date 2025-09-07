# Installation

This guide will walk you through setting up the Wagtail News Template on your local development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** - Check [Wagtail's compatibility guide](https://docs.wagtail.org/en/stable/releases/upgrading.html#compatible-django-python-versions)
- **Node.js 16+** - For frontend build tools
- **Git** - For version control

### Check Python Version

```bash
python --version
# Or on some systems:
python3 --version
# On Windows with Python Launcher:
py --version
```

## Step-by-Step Installation

### 1. Create Virtual Environment

Create and activate a virtual environment to isolate your project dependencies:

=== "Linux/macOS"
    ```bash
    python -m venv myproject/env
    source myproject/env/bin/activate
    ```

=== "Windows (Command Prompt)"
    ```cmd
    python -m venv myproject\env
    myproject\env\Scripts\activate
    ```

=== "Windows (PowerShell)"
    ```powershell
    python -m venv myproject\env
    myproject\env\Scripts\Activate.ps1
    ```

### 2. Navigate to Project Directory

```bash
cd myproject
```

### 3. Install Wagtail

```bash
pip install wagtail
```

### 4. Create Project from Template

```bash
wagtail start --template=https://github.com/rhamaa/RhamaaCMS/archive/refs/heads/main.zip myproject .
```

!!! tip "Template URL"
    The template URL points to the latest version. You can also specify a specific branch or tag if needed.

### 5. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 6. Install Node.js Dependencies

```bash
cd node
npm install
# or if you prefer pnpm:
pnpm install
cd ..
```

### 7. Setup Database and Load Demo Data

```bash
make load-data
```

This command will:
- Create cache tables
- Run database migrations
- Load initial demo data
- Collect static files

### 8. Start Development Server

```bash
make start
```

Your site will be available at:
- **Website**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin

## Default Credentials

Use these credentials to log into the admin panel:

- **Username**: `rhamaa`
- **Password**: `admin`

!!! warning "Security"
    Change these credentials immediately, especially before deploying to production!

## Verify Installation

1. Visit http://localhost:8000 - you should see the homepage
2. Visit http://localhost:8000/admin - you should see the Wagtail admin login
3. Log in with the default credentials
4. Explore the demo content in the admin panel

## Troubleshooting

### Common Issues

#### Python Version Compatibility
If you encounter Python version issues:

```bash
# Check Django and Wagtail compatibility
pip list | grep -E "(Django|wagtail)"
```

#### Database Issues
If you have database problems:

```bash
# Reset the database
make reset-db
```

#### Static Files Issues
If static files aren't loading:

```bash
# Rebuild static files
cd node
npm run build:prod
cd ..
python manage.py collectstatic --noinput
```

#### Permission Issues (Linux/macOS)
If you encounter permission issues:

```bash
# Make sure manage.py is executable
chmod +x manage.py
```

### Getting Help

If you encounter issues not covered here:

1. Check the [Wagtail documentation](https://docs.wagtail.org/)
2. Search existing [GitHub issues](https://github.com/rhamaa/RhamaaCMS/issues)
3. Create a new issue with detailed error information

## Next Steps

Now that you have the template installed:

1. [Explore the project structure](project-structure.md)
2. [Configure your settings](../configuration/settings.md)
3. [Start developing your content types](../development/models.md)
# Quick Start

Get your RhamaaCMS Base Template project running in 5 minutes.

---

## 1. Database Setup

Run migrations and create a superuser:

```bash
python manage.py migrate
python manage.py createsuperuser
```

Follow the prompts to create your admin account.

---

## 2. Build Frontend Assets

Compile Tailwind CSS and JavaScript:

```bash
# Production build
pnpm run build

# Or start development watch mode (optional)
pnpm run dev
```

---

## 3. Run Development Server

```bash
python manage.py runserver
```

Your site is now running!

| URL | Description |
|-----|-------------|
| `http://127.0.0.1:8000/` | Home page |
| `http://127.0.0.1:8000/admin/` | Wagtail CMS admin |
| `http://127.0.0.1:8000/django-admin/` | Django admin |

---

## 4. Load Demo Data (Optional)

To see the template in action with sample content:

```bash
python manage.py load_initial_data
```

This loads:

- Sample pages
- Navigation structure
- Images and media files

---

## Development Workflow

### Making Changes

1. **Edit templates** in `apps/home/templates/`
2. **Edit styles** in `static_src/sass/`
3. **Edit JavaScript** in `static_src/javascript/`
4. **Rebuild assets** with `pnpm run build`

### Watch Mode

For automatic rebuilding during development:

```bash
# Terminal 1 - Build watcher
pnpm run dev

# Terminal 2 - Django server
python manage.py runserver
```

---

## What's Next?

- [Understand Project Structure](project-structure.md)
- [Learn about BasePage](../core/models.md)
- [Customize Tailwind CSS](../frontend/tailwind.md)

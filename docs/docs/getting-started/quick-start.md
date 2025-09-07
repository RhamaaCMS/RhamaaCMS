# Quick Start

Get your Wagtail News Template up and running in just a few minutes with this streamlined guide.

## Prerequisites Check

Ensure you have the required tools installed:

```bash
# Check Python version (3.8+ required)
python --version

# Check if pip is available
pip --version

# Check if Node.js is installed (optional, for frontend development)
node --version
```

## One-Command Setup

For the fastest setup, use our initialization command:

```bash
# Create and activate virtual environment
python -m venv myproject/env
source myproject/env/bin/activate  # On Windows: myproject\env\Scripts\activate

# Navigate to project directory
cd myproject

# Install Wagtail and create project
pip install wagtail
wagtail start --template=https://github.com/rhamaa/RhamaaCMS/archive/refs/heads/main.zip myproject .

# Install dependencies and setup
pip install -r requirements.txt
make init
```

That's it! Your site is now running at http://localhost:8000

## What Just Happened?

The `make init` command executed several steps:

1. **Database Setup**: Created SQLite database with tables
2. **Migrations**: Applied all database migrations
3. **Demo Data**: Loaded sample content and pages
4. **Static Files**: Collected and compiled CSS/JS assets
5. **Server Start**: Launched the development server

## Access Your Site

- **Frontend**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin
  - Username: `rhamaa`
  - Password: `admin`

## Explore Demo Content

The template comes with pre-loaded demo content:

### Pages
- **Homepage**: Landing page with hero section
- **About Page**: Sample content page
- **News/Blog Pages**: Example article pages

### Admin Features
- **Page Editor**: Rich content editing with blocks
- **Media Library**: Image and document management
- **Site Settings**: Global configuration options
- **User Management**: Admin user controls

## Quick Customization

### 1. Change Site Title
1. Go to **Settings > Sites** in admin
2. Edit the default site
3. Update the site name

### 2. Add Your Logo
1. Go to **Images** in admin
2. Upload your logo image
3. Update templates to reference your logo

### 3. Customize Colors
Edit `node/tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-secondary-color',
      }
    }
  }
}
```

Then rebuild assets:
```bash
cd node
npm run build:prod
cd ..
```

### 4. Create Your First Page
1. Go to **Pages** in admin
2. Click **Add child page** under Home
3. Choose a page type
4. Fill in content and publish

## Development Workflow

### Daily Development
```bash
# Activate virtual environment
source myproject/env/bin/activate

# Start development server
make start
```

### Making Changes
- **Python/Django changes**: Server auto-reloads
- **Template changes**: Refresh browser
- **CSS/JS changes**: Run `npm run build` in `/node/` directory

### Database Changes
```bash
# Create migrations after model changes
python manage.py makemigrations

# Apply migrations
python manage.py migrate
```

## Common Next Steps

### 1. Create Custom Page Types
```python
# In apps/home/models.py
from utils.models import BasePage
from wagtail.fields import RichTextField

class ArticlePage(BasePage):
    body = RichTextField()
    
    content_panels = BasePage.content_panels + [
        FieldPanel('body'),
    ]
```

### 2. Customize Templates
Create `templates/home/article_page.html`:

```html
{% extends "base_page.html" %}
{% load wagtailcore_tags %}

{% block content %}
    <article>
        <h1>{{ page.title }}</h1>
        <div class="content">
            {{ page.body|richtext }}
        </div>
    </article>
{% endblock %}
```

### 3. Add Custom Styling
Edit `static_src/sass/main.scss`:

```scss
// Your custom styles
.my-custom-class {
    color: #333;
    font-size: 1.2rem;
}
```

## Troubleshooting

### Server Won't Start
```bash
# Check if port 8000 is in use
lsof -i :8000

# Use different port
python manage.py runserver 8001
```

### Static Files Not Loading
```bash
# Rebuild and collect static files
cd node
npm run build:prod
cd ..
python manage.py collectstatic --noinput
```

### Database Issues
```bash
# Reset database with fresh demo data
make reset-db
```

## Production Deployment

When ready to deploy:

1. **Environment Variables**: Set `SECRET_KEY`, `DATABASE_URL`, etc.
2. **Static Files**: Configure cloud storage for static/media files
3. **Database**: Use PostgreSQL instead of SQLite
4. **Security**: Update `ALLOWED_HOSTS` and other security settings

See our [deployment guides](../deployment/flyio.md) for detailed instructions.

## Get Help

- **Documentation**: Continue reading these docs
- **Wagtail Docs**: https://docs.wagtail.org/
- **GitHub Issues**: https://github.com/rhamaa/RhamaaCMS/issues
- **Community**: Wagtail Slack community

## What's Next?

- [Understand the project structure](project-structure.md)
- [Learn about configuration options](../configuration/settings.md)
- [Explore content modeling](../development/models.md)
- [Customize the frontend](../development/frontend.md)
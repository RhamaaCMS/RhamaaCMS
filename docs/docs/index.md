# Wagtail News Template

A comprehensive starter template for building news and content websites with [Wagtail CMS](https://wagtail.org). This template provides a solid foundation with pre-configured pages, blocks, SEO optimization, and deployment-ready setup.

## ✨ Features

- **🚀 Quick Setup**: Get started in minutes with pre-configured settings
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **🔍 SEO Optimized**: Built-in SEO features with wagtail-seo
- **⚡ Performance**: Optimized queries, caching, and static file handling
- **🎨 Flexible Content**: Rich block system for content creation
- **📊 Analytics Ready**: Easy integration with tracking services
- **🐳 Docker Support**: Containerized development and deployment
- **☁️ Cloud Ready**: Pre-configured for Fly.io and Divio Cloud

## 🎯 Perfect For

- News websites
- Blog platforms
- Content management systems
- Corporate websites
- Portfolio sites
- Documentation sites

## 🛠️ Tech Stack

- **Backend**: Django + Wagtail CMS
- **Frontend**: Tailwind CSS + Alpine.js
- **Build Tools**: esbuild + PostCSS
- **Database**: PostgreSQL (production) / SQLite (development)
- **Storage**: S3-compatible storage support
- **Deployment**: Docker, Fly.io, Divio Cloud

## 🚀 Quick Start

```bash
# Create virtual environment
python -m venv myproject/env
source myproject/env/bin/activate

# Install Wagtail
pip install wagtail

# Create project from template
wagtail start --template=https://github.com/rhamaa/RhamaaCMS/archive/refs/heads/main.zip myproject .

# Install dependencies
pip install -r requirements.txt

# Setup database and load demo data
make load-data

# Start development server
make start
```

Visit `http://localhost:8000` to see your site and `http://localhost:8000/admin` to access the admin panel.

**Default Admin Credentials:**
- Username: `rhamaa`
- Password: `admin`

!!! warning "Security"
    Change the default admin credentials immediately in production!

## 📚 What's Next?

- [Installation Guide](getting-started/installation.md) - Detailed setup instructions
- [Project Structure](getting-started/project-structure.md) - Understanding the codebase
- [Configuration](configuration/settings.md) - Customizing your setup
- [Development Guide](development/models.md) - Building your content types

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](contributing.md) for details on how to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/rhamaa/RhamaaCMS/blob/main/LICENSE) file for details.
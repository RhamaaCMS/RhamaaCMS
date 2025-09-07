# Wagtail News Template Documentation

This directory contains the complete documentation for the Wagtail News Template, built with Material for MkDocs and supporting both English and Indonesian languages.

## Quick Start

### Prerequisites

- Python 3.8+
- pip

### Installation

```bash
# Install dependencies
pip install -r requirements.txt

# Serve documentation locally
mkdocs serve
```

The documentation will be available at http://localhost:8000

## Building Documentation

### Development

```bash
# Serve with live reload
mkdocs serve

# Serve on specific port
mkdocs serve -a localhost:8080
```

### Production

```bash
# Build static site
mkdocs build

# Build and serve
mkdocs build && mkdocs serve
```

## Documentation Structure

```
docs/
├── mkdocs.yml              # Main configuration
├── requirements.txt        # Python dependencies
├── README.md              # This file
└── docs/                  # Documentation content
    ├── index.md           # Homepage (English)
    ├── index.id.md        # Homepage (Indonesian)
    ├── getting-started/   # Getting started guides
    ├── configuration/     # Configuration guides
    ├── development/       # Development guides
    ├── deployment/        # Deployment guides
    ├── api/              # API reference
    ├── contributing.md    # Contributing guide (English)
    └── contributing.id.md # Contributing guide (Indonesian)
```

## Language Support

The documentation supports two languages:

- **English** (default): Files without language suffix (e.g., `index.md`)
- **Indonesian**: Files with `.id.md` suffix (e.g., `index.id.md`)

### Adding New Languages

1. Update `mkdocs.yml` to add the new language:

```yaml
plugins:
  - i18n:
      languages:
        - locale: en
          default: true
          name: English
        - locale: id
          name: Bahasa Indonesia
        - locale: es  # New language
          name: Español
```

2. Create translated files with the appropriate suffix (e.g., `.es.md`)

3. Update navigation translations in the `nav_translations` section

## Writing Documentation

### File Naming Convention

- English files: `filename.md`
- Indonesian files: `filename.id.md`
- Other languages: `filename.{locale}.md`

### Markdown Features

The documentation supports:

- **Code highlighting** with syntax highlighting
- **Admonitions** for notes, warnings, tips
- **Tabbed content** for multiple options
- **Emoji support** 🎉
- **Material Design** components

### Code Blocks

```python
# Python code example
from utils.models import BasePage

class MyPage(BasePage):
    pass
```

### Admonitions

!!! note "Note"
    This is a note admonition.

!!! warning "Warning"
    This is a warning admonition.

!!! tip "Tip"
    This is a tip admonition.

### Tabbed Content

=== "Linux/macOS"
    ```bash
    source env/bin/activate
    ```

=== "Windows"
    ```cmd
    env\Scripts\activate
    ```

## Contributing to Documentation

1. **Fork the repository**
2. **Create a branch** for your documentation changes
3. **Make your changes** following the style guide
4. **Test locally** with `mkdocs serve`
5. **Submit a pull request**

### Style Guide

- Use clear, concise language
- Include code examples where helpful
- Use consistent formatting
- Add both English and Indonesian versions for major content
- Test all code examples

### Translation Guidelines

When translating content:

- Maintain the same structure and formatting
- Adapt examples to be culturally appropriate
- Keep technical terms in English when commonly used
- Ensure all links and references work correctly

## Deployment

The documentation can be deployed to various platforms:

### GitHub Pages

```bash
# Deploy to GitHub Pages
mkdocs gh-deploy
```

### Netlify

1. Connect your repository to Netlify
2. Set build command: `mkdocs build`
3. Set publish directory: `site`

### Custom Server

```bash
# Build static files
mkdocs build

# Copy site/ directory to your web server
rsync -av site/ user@server:/path/to/webroot/
```

## Configuration

### Main Configuration (`mkdocs.yml`)

Key configuration sections:

- **site_name**: Site title
- **theme**: Material theme configuration
- **plugins**: Enabled plugins (search, i18n)
- **nav**: Navigation structure
- **markdown_extensions**: Enabled Markdown features

### Theme Customization

The Material theme can be customized:

```yaml
theme:
  name: material
  palette:
    primary: teal
    accent: teal
  features:
    - navigation.tabs
    - navigation.sections
    - search.highlight
```

## Troubleshooting

### Common Issues

#### Build Errors

```bash
# Clear cache and rebuild
rm -rf site/
mkdocs build
```

#### Plugin Issues

```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

#### Language Switching Not Working

- Check file naming conventions
- Verify `mkdocs.yml` language configuration
- Ensure all required language files exist

### Getting Help

- Check [MkDocs documentation](https://www.mkdocs.org/)
- Review [Material theme docs](https://squidfunk.github.io/mkdocs-material/)
- Open an issue in the repository

## License

This documentation is part of the Wagtail News Template project and is licensed under the same terms.
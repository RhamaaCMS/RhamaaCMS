# Creating Custom Templates

Learn how to create distributable templates from your RhamaaCMS projects.

---

## What is a Template?

A RhamaaCMS template is a ZIP file containing:

- Django/Wagtail project structure
- `{{ project_name }}` placeholders (replaced by `wagtail start`)
- Static assets
- Requirements and config

## Why Create Templates?

- Share project setups with your team
- Distribute custom configurations
- Create starting points for client projects

---

## Using `build-template`

The easiest way to create a template:

```bash
# From your project directory
rhamaa cms build-template

# Template created: dist/rhamaacms-template.zip
```

---

## What Gets Converted

### Placeholders Replaced

| Original | Becomes |
|----------|---------|
| `myproject` | `{{ project_name }}` |
| `my-project` | `{{ project_name }}` |
| `MyProject` | `{{ project_name }}` |
| `MYPROJECT` | `{{ project_name\|upper }}` |

### Package Renamed

Your project folder becomes `project_name`:

```
myproject/          → project_name/
├── settings/
├── urls.py
└── wsgi.py
```

### Templates Wrapped

HTML templates get wrapped with `{% verbatim %}`:

```html
{% verbatim %}
<!DOCTYPE html>
<html>
<head>{{ seo_metadata }}</head>
</html>
{% endverbatim %}
```

This prevents Django from rendering template tags during `wagtail start`.

---

## Options

### Specify Slug

```bash
rhamaa cms build-template --slug myproject
```

### Custom Output

```bash
rhamaa cms build-template --output my-template.zip
```

### Skip Verbatim

```bash
rhamaa cms build-template --no-wrap-templates
```

**Warning:** Only skip if your templates don't use Django template syntax.

---

## Ignored Files

These are automatically excluded:

```
.git/
.venv/
venv/
node_modules/
__pycache__/
*.pyc
static_compiled/
dist/
.vscode/
.idea/
```

---

## Using Your Template

### Local File

```bash
wagtail start myproject --template=/path/to/template.zip
```

### URL

```bash
wagtail start myproject --template=https://example.com/template.zip
```

### With RhamaaCLI

Add to `project_template_list.json`:

```json
{
  "custom": {
    "name": "My Custom Template",
    "description": "Description here",
    "repository": "https://github.com/user/repo",
    "branch": "main"
  }
}
```

Then:

```bash
rhamaa cms start myproject --template custom
```

---

## Best Practices

1. **Clean before building** — Remove test data and media
2. **Update fixtures** — Include demo data if helpful
3. **Document customizations** — Add README to template
4. **Version your templates** — Use git tags
5. **Test thoroughly** — Create a project from template and verify

---

## Manual Template Creation

For full control, you can manually create templates:

### 1. Prepare Project

Replace your project name with `{{ project_name }}` in all files.

### 2. Rename Directory

```bash
mv myproject project_name
```

### 3. Wrap Templates

Add `{% verbatim %}` around HTML templates.

### 4. Create ZIP

```bash
zip -r template.zip project_name/ -x "*.pyc" -x "__pycache__/*" -x ".git/*"
```

---

## Next Steps

- [CLI Commands Reference](commands.md)

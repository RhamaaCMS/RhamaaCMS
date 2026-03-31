# Contributing

Thank you for your interest in contributing to RhamaaCMS!

---

## Ways to Contribute

- **Report bugs** — [GitHub Issues](https://github.com/RhamaaCMS/RhamaaCMS/issues)
- **Suggest features** — [GitHub Discussions](https://github.com/RhamaaCMS/RhamaaCMS/discussions)
- **Write documentation** — Improve these docs
- **Submit code** — Pull requests welcome
- **Share templates** — Create custom templates

---

## Development Setup

### 1. Fork and Clone

```bash
git clone https://github.com/YOUR-USERNAME/RhamaaCMS.git
cd RhamaaCMS
```

### 2. Create Branch

```bash
git checkout -b feature/my-feature
# or
git checkout -b fix/my-bugfix
```

### 3. Set Up Environment

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Run Tests

```bash
python manage.py test
```

---

## Branch Structure

| Branch | Purpose |
|--------|---------|
| `base` | Core template (stable) |
| `base-iot` | IoT features |
| `base-inertia-react` | React frontend |
| `dev` | Active development |

Make changes to the appropriate branch.

---

## Pull Request Process

1. **Update documentation** — If your change affects usage
2. **Add tests** — If applicable
3. **Update changelog** — Describe your changes
4. **Submit PR** — With clear description

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Breaking change

## Checklist
- [ ] Tests pass
- [ ] Documentation updated
- [ ] Code follows project style
```

---

## Code Style

### Python

Follow PEP 8 with these specifics:

```python
# Max line length: 88 characters (Black)
# Use Black formatter
black apps/ utils/

# Import order: stdlib, third-party, local
django
wagtail

utils
apps
```

### JavaScript/CSS

```bash
# Use Prettier
npx prettier --write "static_src/**/*.{js,css,scss}"
```

---

## Creating Custom Templates

Want to create a new template variant?

1. Fork the `base` branch
2. Make your modifications
3. Update documentation
4. Submit PR with:
   - Template code
   - Documentation
   - README explaining the variant

See [CLI: Creating Templates](../cli/creating-templates.md) for details.

---

## Documentation Contributions

Docs are in the `docs/` folder (MkDocs format).

### Local Preview

```bash
pip install -r requirements-docs.txt
mkdocs serve
```

Open http://127.0.0.1:8000

### Style Guide

- Use clear, concise language
- Include code examples
- Add screenshots for UI features
- Cross-reference related pages

---

## Reporting Issues

### Bug Reports

Include:
- Steps to reproduce
- Expected vs actual behavior
- Environment (OS, Python, Wagtail versions)
- Relevant code snippets

### Feature Requests

Include:
- Use case description
- Proposed solution
- Alternatives considered

---

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Assume good intent
- Focus on constructive feedback

---

## Questions?

- [GitHub Discussions](https://github.com/RhamaaCMS/RhamaaCMS/discussions)
- [Discord](https://discord.gg/rhamaacms) (if available)

---

Thank you for contributing! 🎉

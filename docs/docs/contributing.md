# Contributing

We welcome contributions to the Wagtail News Template! This guide will help you get started with contributing to the project.

## Ways to Contribute

- **Bug Reports**: Found a bug? Let us know!
- **Feature Requests**: Have an idea for improvement?
- **Code Contributions**: Submit pull requests with fixes or new features
- **Documentation**: Help improve our documentation
- **Testing**: Help test new features and report issues

## Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/RhamaaCMS.git
cd RhamaaCMS

# Add the original repository as upstream
git remote add upstream https://github.com/rhamaa/RhamaaCMS.git
```

### 2. Set Up Development Environment

```bash
# Create virtual environment
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install development dependencies
pip install -r requirements-dev.txt  # If available

# Set up pre-commit hooks (if configured)
pre-commit install
```

### 3. Create a Branch

```bash
# Create a new branch for your feature/fix
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

## Development Workflow

### Making Changes

1. **Make your changes** in the appropriate files
2. **Test your changes** thoroughly
3. **Update documentation** if needed
4. **Add tests** for new functionality
5. **Ensure code quality** follows project standards

### Testing Changes

```bash
# Run the test suite
python manage.py test

# Test with demo data
make reset-db
make load-data
make start

# Test in different environments
export DJANGO_SETTINGS_MODULE=project_name.settings.production
python manage.py check --deploy
```

### Code Quality

Follow these guidelines:

- **Python Code Style**: Follow PEP 8
- **Django Best Practices**: Use Django conventions
- **Wagtail Patterns**: Follow Wagtail best practices
- **Comments**: Add meaningful comments for complex logic
- **Docstrings**: Document functions and classes

### Template Changes

When modifying the template:

1. **Test Template Generation**: Create a new project from your template
2. **Verify All Features**: Ensure all functionality works
3. **Update Fixtures**: Run `make dump-data` if you've added demo content
4. **Build Assets**: Run `npm run build:prod` for frontend changes

## Contribution Guidelines

### Bug Reports

When reporting bugs, include:

- **Clear Description**: What happened vs. what you expected
- **Steps to Reproduce**: Detailed steps to recreate the issue
- **Environment**: Python version, OS, browser (if relevant)
- **Error Messages**: Full error messages and stack traces
- **Screenshots**: If the issue is visual

**Bug Report Template:**

```markdown
## Bug Description
Brief description of the bug.

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should have happened.

## Actual Behavior
What actually happened.

## Environment
- Python version:
- Django version:
- Wagtail version:
- OS:
- Browser (if relevant):

## Additional Context
Any other relevant information.
```

### Feature Requests

For feature requests, include:

- **Use Case**: Why is this feature needed?
- **Proposed Solution**: How should it work?
- **Alternatives**: Other ways to solve the problem
- **Implementation Ideas**: Technical approach (if you have ideas)

### Pull Requests

#### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] New functionality includes tests
- [ ] Documentation is updated
- [ ] Commit messages are clear and descriptive

#### Pull Request Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass
- [ ] Manual testing completed
- [ ] New tests added (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

#### Commit Messages

Use clear, descriptive commit messages:

```bash
# Good
git commit -m "Add SEO meta tags to BasePage model"
git commit -m "Fix image upload validation in admin"
git commit -m "Update installation documentation"

# Avoid
git commit -m "Fix bug"
git commit -m "Update stuff"
git commit -m "WIP"
```

## Development Setup Details

### Project Structure for Contributors

```
RhamaaCMS/
├── apps/                    # Django applications
├── fixtures/               # Demo data
├── node/                   # Frontend build tools
├── project_name/           # Django project (template variables)
├── static_src/            # Source assets
├── templates/             # HTML templates
├── utils/                 # Shared utilities
├── tests/                 # Test files
├── docs/                  # Documentation
├── .github/               # GitHub workflows
├── requirements.txt       # Python dependencies
└── README.md             # Project README
```

### Template Variables

When working with template files, remember:

- Use `{{ project_name }}` for the Django project name
- Use `{{ project_name|title }}` for display names
- Wrap Django template code in `{% verbatim %}` tags when needed

### Building Documentation

```bash
# Install MkDocs
pip install mkdocs-material

# Serve documentation locally
cd docs
mkdocs serve

# Build documentation
mkdocs build
```

### Frontend Development

```bash
# Install Node.js dependencies
cd node
npm install

# Development build (watch mode)
npm run build:dev

# Production build
npm run build:prod

# Lint JavaScript
npm run lint

# Format code
npm run format
```

## Release Process

### For Maintainers

1. **Update Version**: Update version numbers in relevant files
2. **Update Changelog**: Document changes in CHANGELOG.md
3. **Test Release**: Create test project from template
4. **Tag Release**: Create Git tag with version number
5. **GitHub Release**: Create release on GitHub with notes

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

## Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

### Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Wagtail Community**: Join the broader Wagtail community

## Recognition

Contributors will be recognized in:

- **README.md**: Contributors section
- **Release Notes**: Major contributions highlighted
- **Documentation**: Author credits where appropriate

## Questions?

If you have questions about contributing:

1. Check existing issues and discussions
2. Create a new discussion for questions
3. Reach out to maintainers

Thank you for contributing to the Wagtail News Template! 🎉
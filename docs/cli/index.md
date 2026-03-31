# RhamaaCLI

Command-line tool for rapid RhamaaCMS development.

---

## Installation

```bash
pip install rhamaa
```

## Verify Installation

```bash
rhamaa --help
```

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `rhamaa cms start <name>` | Create new project |
| `rhamaa cms startapp <name>` | Create new app |
| `rhamaa cms run` | Run dev server |
| `rhamaa cms build-template` | Create template from project |

---

## Available Templates

When using `rhamaa cms start`, you can choose:

| Template | Flag | Branch |
|----------|------|--------|
| Base (default) | `--template base` | `base` |
| React + Inertia | `--template react` | `base-inertia-react` |
| IoT / MQTT | `--template iot` | `base-iot` |

---

## Next Steps

- [CLI Commands Reference](commands.md)
- [Creating Custom Templates](creating-templates.md)

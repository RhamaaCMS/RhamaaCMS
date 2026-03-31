# Alternative Templates

While the Base Template is recommended for most projects, we offer specialized templates for specific use cases.

---

## When to Use Alternatives

| Your Need | Recommended Template |
|-----------|---------------------|
| Traditional CMS site | **Base Template** (default) |
| Modern SPA experience | **React + Inertia.js** |
| IoT dashboard | **IoT / MQTT** |

---

## Overview

<div class="grid cards" markdown>

-   :material-react:{ .lg .middle } **React + Inertia.js**

    ---

    For modern, interactive web applications that need a SPA feel without the complexity of a separate frontend build.
    
    - React 18 with TypeScript
    - Inertia.js v2 for seamless navigation
    - Vite 6 for blazing fast builds
    - shadcn/ui components
    - Aceternity UI effects

    [Explore Template](react-inertia.md)

-   :material-chip:{ .lg .middle } **IoT / MQTT**

    ---

    For real-time dashboards that connect to IoT devices via MQTT and WebSocket.
    
    - Django Channels 4
    - MQTT client integration
    - WebSocket support
    - Real-time data visualization
    - Sensor data models

    [Explore Template](iot.md)

</div>

---

## Comparison with Base Template

| Feature | Base | React | IoT |
|---------|:----:|:-----:|:---:|
| Wagtail CMS | ✅ | ✅ | ✅ |
| Tailwind CSS | ✅ | ✅ | ✅ |
| Django Templates | ✅ | ❌ | ✅ |
| React 18 | ❌ | ✅ | ❌ |
| Inertia.js | ❌ | ✅ | ❌ |
| MQTT/WebSocket | ❌ | ❌ | ✅ |
| Django Channels | ❌ | ❌ | ✅ |
| Vite Bundler | ❌ | ✅ | ❌ |
| esbuild | ✅ | ❌ | ✅ |

---

## Switching Templates

To use an alternative template instead of Base:

```bash
# React template
rhamaa cms start myproject --template react

# IoT template
rhamaa cms start myproject --template iot

# Or manually
git clone -b base-inertia-react https://github.com/RhamaaCMS/RhamaaCMS.git myproject
git clone -b base-iot https://github.com/RhamaaCMS/RhamaaCMS.git myproject
```

---

## Upgrading Between Templates

Currently, templates are separate branches. To "upgrade" from Base to React:

1. Create a new project with the React template
2. Copy your custom apps from the Base project
3. Update templates to React components
4. Migrate data as needed

---

## Next Steps

- [React + Inertia.js Template](react-inertia.md)
- [IoT / MQTT Template](iot.md)

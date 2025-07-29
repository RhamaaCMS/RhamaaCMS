# RHAMAA Global Design System

Design system global untuk aplikasi Wagtail dengan branding RHAMAA, menggunakan Tailwind CSS, PostCSS, SASS, dan Preline UI.

## 🎨 Color Palette

Design system RhamaaCMS:

### Brand Colors
- **Primary**: `#1a4a47`
- **Secondary**: `#b8860b`

### Status Colors
- **Info**: `#1d7792` (Blue)
- **Success**: `#1b8666` (Green)
- **Warning**: `#faa500` (Orange)
- **Error**: `#ca3b3b` (Red)

## 🏗️ Architecture

```
{{ project_name }}/static_src/sass/
├── main.scss           # Entry point
├── _variables.scss     # CSS custom properties
├── _components.scss    # Component styles
├── _utilities.scss     # Utility classes
└── README.md          # Documentation
```

## 🔧 CSS Variables

Semua variabel menggunakan prefix `--g` (global) untuk membedakan dari variabel Wagtail (`--w`):

```css
/* Colors */
--g-color-primary: #1a4a47;
--g-color-secondary: #b8860b;

/* Spacing */
--g-spacing-sm: 0.5rem;
--g-spacing-md: 1rem;

/* Typography */
--g-font-family-sans: 'Inter', sans-serif;
```

## 🎯 Component Classes

### Buttons
```html
<button class="g-btn">Primary Button</button>
<button class="g-btn-outline">Outline Button</button>
<button class="g-btn-critical">Critical Button</button>
```

### Forms
```html
<div class="g-form-group">
  <label class="g-label g-label-required">Email</label>
  <input type="email" class="g-input" placeholder="Enter email">
</div>
```

### Cards & Panels
```html
<div class="g-card">
  <div class="g-panel">
    <h3 class="g-heading-3">Panel Title</h3>
    <p class="g-body">Panel content</p>
  </div>
</div>
```

### Alerts
```html
<div class="g-alert g-alert-info">
  Information message
</div>
```

## 🌙 Dark Mode

Dark mode menggunakan attribute selector `[data-theme="dark"]`:

```html
<html data-theme="dark">
```

## 📱 Responsive Design

Menggunakan breakpoint Tailwind CSS:
- `sm`: 640px+
- `md`: 768px+
- `lg`: 1024px+
- `xl`: 1280px+

## 🔌 Integration

### Dengan Tailwind
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1a4a47',
        secondary: '#b8860b',
      }
    }
  }
}
```

### Dengan Preline
Komponen Preline otomatis menggunakan styling dari design system.

### Dengan Wagtail Admin
```css
.wagtail-admin {
  --w-color-primary: var(--g-color-primary);
  --w-color-secondary: var(--g-color-secondary);
}
```

## 🚀 Usage Examples

### Layout
```html
<div class="g-container">
  <section class="g-section">
    <div class="g-stack">
      <h1 class="g-heading-1">Page Title</h1>
      <p class="g-body">Page description</p>
    </div>
  </section>
</div>
```

### Navigation
```html
<nav class="g-nav">
  <a href="#" class="g-nav-item active">Home</a>
  <a href="#" class="g-nav-item">About</a>
  <a href="#" class="g-nav-item">Contact</a>
</nav>
```

### Data Table
```html
<table class="g-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john@example.com</td>
      <td class="g-status-success">Active</td>
    </tr>
  </tbody>
</table>
```

## 🎨 Customization

### Mengubah Warna Brand
```css
:root {
  --g-color-primary: #your-color;
  --g-color-secondary: #your-color;
}
```

### Mengubah Typography
```css
:root {
  --g-font-family-sans: 'Your Font', sans-serif;
}
```

### Mengubah Spacing
```css
:root {
  --g-density-factor: 0.8; /* Lebih compact */
}
```

## 📋 Best Practices

1. **Gunakan CSS Variables**: Selalu gunakan variabel CSS untuk konsistensi
2. **Component-First**: Prioritaskan komponen daripada utility classes
3. **Semantic Naming**: Gunakan nama class yang deskriptif
4. **Responsive Design**: Selalu pertimbangkan mobile-first
5. **Accessibility**: Gunakan proper focus states dan ARIA attributes

## 🔄 Build Process

```bash
# Development
npm run watch

# Production
npm run build:prod
```

## 📚 References

- [Wagtail Admin Customization](https://docs.wagtail.org/en/stable/advanced_topics/customization/admin_templates.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Preline UI Components](https://preline.co/docs)
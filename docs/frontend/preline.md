# Preline UI

Production-ready components for the Base Template.

---

## What is Preline?

Preline UI is a comprehensive component library built specifically for Tailwind CSS. It provides:

- 500+ UI components
- Copy-paste ready code
- Tailwind-optimized styling
- JavaScript interactions

---

## Installation

Preline is already included in the Base Template via npm.

### CSS Import

```css
/* frontend/css/main.css */
@import "tailwindcss";
@import "../../node_modules/preline/dist/preline.css";
```

### JavaScript

```javascript
// static_src/javascript/main.js
import 'preline/preline';
```

---

## Components Overview

### Navigation

```html
<!-- Dropdown -->
<div class="hs-dropdown relative inline-flex [--trigger:hover]">
  <button type="button" class="hs-dropdown-toggle btn btn-primary">
    Menu
    <svg class="size-4 ml-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  </button>
  
  <div class="hs-dropdown-menu hidden ... transition-open">
    <a href="#" class="dropdown-item">Action</a>
    <a href="#" class="dropdown-item">Another action</a>
    <div class="border-t my-2"></div>
    <a href="#" class="dropdown-item">Separated link</a>
  </div>
</div>

<!-- Navbar -->
<header class="hs-navbar flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4 dark:bg-neutral-800">
  <nav class="max-w-[85rem] w-full mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between">
      <a class="flex-none text-xl font-semibold dark:text-white" href="#">Brand</a>
      
      <div class="hs-collapse hidden ...">
        <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
          <a class="font-medium text-blue-500" href="#">Active</a>
          <a class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500" href="#">Link</a>
        </div>
      </div>
    </div>
  </nav>
</header>
```

### Overlays

```html
<!-- Modal -->
<button type="button" class="btn btn-primary" data-hs-overlay="#hs-basic-modal">
  Open modal
</button>

<div id="hs-basic-modal" class="hs-overlay hidden ..." role="dialog">
  <div class="hs-overlay-open:mt-7 ... bg-white ...">
    <div class="flex justify-between items-center py-3 px-4 border-b">
      <h3 class="font-bold text-gray-800">Modal title</h3>
      <button type="button" class="..." data-hs-overlay="#hs-basic-modal">
        <span class="sr-only">Close</span>
        <svg class="size-4" ...>...</svg>
      </button>
    </div>
    <div class="p-4">
      <p class="text-gray-800">Modal content...</p>
    </div>
  </div>
</div>

<!-- Offcanvas -->
<button type="button" class="btn btn-primary" data-hs-overlay="#hs-offcanvas">
  Toggle offcanvas
</button>

<div id="hs-offcanvas" class="hs-overlay hs-overlay-open:translate-x-0 ... -translate-x-full ..." tabindex="-1">
  <!-- Content -->
</div>
```

### Forms

```html
<!-- Input with floating label -->
<div class="relative">
  <input type="text" id="floating-input" class="peer ..." placeholder=" ">
  <label for="floating-input" class="...
    peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-focus:text-xs
    peer-[:not(:placeholder-shown)]:-translate-y-1.5
    peer-[:not(:placeholder-shown)]:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs
    ...">
    Floating label
  </label>
</div>

<!-- Select -->
<select class="py-3 px-4 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:focus:ring-neutral-600">
  <option selected>Open this select menu</option>
  <option>1</option>
  <option>2</option>
  <option>3</option>
</select>

<!-- Checkbox -->
<div class="flex">
  <input type="checkbox" class="..." id="default-checkbox">
  <label for="default-checkbox" class="...">Default checkbox</label>
</div>
```

### Data Display

```html
<!-- Accordion -->
<div class="hs-accordion-group">
  <div class="hs-accordion active" id="hs-basic-heading-one">
    <button class="hs-accordion-toggle ..." aria-controls="hs-basic-collapse-one">
      Accordion #1
    </button>
    <div id="hs-basic-collapse-one" class="hs-accordion-content ..." role="region">
      <p class="text-gray-800">It is shown by default...</p>
    </div>
  </div>
</div>

<!-- Tabs -->
<div class="...">
  <nav class="flex gap-x-1 ..." aria-label="Tabs" role="tablist">
    <button type="button" class="... active" id="tabs-with-card-item-1" data-hs-tab="#tabs-with-card-1">
      Tab 1
    </button>
    <button type="button" class="..." id="tabs-with-card-item-2" data-hs-tab="#tabs-with-card-2">
      Tab 2
    </button>
  </nav>
  
  <div class="mt-3">
    <div id="tabs-with-card-1" role="tabpanel" aria-labelledby="tabs-with-card-item-1">
      <p class="text-gray-500">Tab 1 content</p>
    </div>
    <div id="tabs-with-card-2" class="hidden" role="tabpanel" aria-labelledby="tabs-with-card-item-2">
      <p class="text-gray-500">Tab 2 content</p>
    </div>
  </div>
</div>
```

---

## Customization

### Override Styles

```scss
// Custom Preline overrides
.hs-dropdown-menu {
  @apply bg-white dark:bg-neutral-800;
  @apply shadow-lg rounded-lg;
  @apply border border-gray-200 dark:border-neutral-700;
}

.hs-accordion-content {
  @apply transition-all duration-300;
}
```

### JavaScript API

```javascript
// Access Preline components
const dropdown = HSDropdown.getInstance('#my-dropdown');
dropdown.open();
dropdown.close();

// Modal
const modal = HSOverlay.getInstance('#my-modal');
modal.open();
modal.close();
```

---

## Best Practices

1. **Use `hs-*` classes** — Don't remove Preline's functional classes
2. **Customize with Tailwind** — Add utility classes alongside
3. **Initialize once** — Preline auto-initializes on load
4. **Check accessibility** — Add proper ARIA attributes
5. **Test interactions** — Verify open/close animations

---

## Next Steps

- [Full Preline Docs](https://preline.co/docs/index.html)
- [Tailwind CSS](tailwind.md) — Core styling

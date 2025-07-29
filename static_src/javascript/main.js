// =============================================================================
// RHAMAA DESIGN SYSTEM - PRELINE INTEGRATION
// =============================================================================
// Minimal JavaScript - Maximum Preline UI

import { HSCollapse } from "preline/dist/collapse";
import { HSOverlay } from "preline/dist/overlay";
import { HSThemeSwitch } from "preline/dist/theme-switch";

// =============================================================================
// THEME SYNC WITH DESIGN SYSTEM
// =============================================================================

// Sync Preline theme (html.dark class) with our data-theme attribute
document.addEventListener("on-hs-appearance-change", (e) => {
  const theme = e.detail; // "default" or "dark"

  // Set our data-theme attribute for design system compatibility
  document.documentElement.setAttribute(
    "data-theme",
    theme === "default" ? "light" : "dark"
  );
});

// Initialize theme on load
const initTheme = () => {
  // Check if html has dark class (set by Preline)
  const isDark = document.documentElement.classList.contains("dark");
  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "dark" : "light"
  );
};

// =============================================================================
// PRELINE AUTO-INIT
// =============================================================================

// Initialize Preline components when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    HSCollapse.autoInit();
    HSOverlay.autoInit();
    HSThemeSwitch.autoInit();
    initTheme();
  });
} else {
  HSCollapse.autoInit();
  HSOverlay.autoInit();
  HSThemeSwitch.autoInit();
  initTheme();
}

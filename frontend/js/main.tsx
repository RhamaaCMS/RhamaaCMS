import "@/css/main.css";

import { createInertiaApp, router } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

function getCsrfToken(): string {
  const meta = document.querySelector<HTMLMetaElement>(
    'meta[name="csrf-token"]'
  );
  if (meta) return meta.content;
  const cookie = document.cookie
    .split("; ")
    .find((r) => r.startsWith("csrftoken="));
  return cookie ? cookie.split("=")[1] : "";
}

// Attach Django CSRF token to every Inertia request
router.on("before", (event) => {
  const token = getCsrfToken();
  if (token) {
    (event.detail.visit.headers as Record<string, string>)["X-CSRFToken"] =
      token;
  }
});

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob<{ default: React.ComponentType }>(
      "../pages/**/*.tsx",
      { eager: true }
    );
    const mod = pages[`../pages/${name}.tsx`];
    if (!mod) throw new Error(`Inertia page not found: pages/${name}.tsx`);
    return mod;
  },

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },

  title: (title) => (title ? `${title} – RhamaaCMS` : "RhamaaCMS"),
  progress: { color: "#C8A96E" },
});

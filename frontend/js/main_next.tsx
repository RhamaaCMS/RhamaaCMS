import { createInertiaApp, router } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

import { resolveInertiaPage } from "./inertia-pages";

function getCsrfToken(): string {
  if (typeof document === "undefined") {
    return "";
  }

  const meta = document.querySelector<HTMLMetaElement>(
    'meta[name="csrf-token"]'
  );
  if (meta) return meta.content;

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="));
  return cookie ? cookie.split("=")[1] : "";
}

if (typeof window !== "undefined") {
  const mountInertiaApp = async () => {
    const appRoot = document.getElementById("app");
    if (!appRoot) {
      throw new Error("Inertia root '#app' not found in document");
    }

    router.on("before", (event) => {
      const token = getCsrfToken();
      if (token) {
        (event.detail.visit.headers as Record<string, string>)["X-CSRFToken"] =
          token;
      }
    });

    await createInertiaApp({
      resolve: (name) => resolveInertiaPage(name),

      setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
      },

      title: (title) => (title ? `${title} – RhamaaCMS` : "RhamaaCMS"),
      progress: { color: "#C8A96E" },
    });
  };

  mountInertiaApp().catch((error) => {
    // Make bootstrap errors visible in-page so blank screen is debuggable.
    console.error("Inertia bootstrap failed:", error);
    const appRoot = document.getElementById("app");
    if (appRoot) {
      appRoot.innerHTML =
        '<pre style="padding:16px;color:#b00020;white-space:pre-wrap;font-family:monospace">Inertia bootstrap failed:\n' +
        String(error instanceof Error ? error.stack ?? error.message : error) +
        "</pre>";
    }
  });
}

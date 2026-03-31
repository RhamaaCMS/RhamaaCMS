import { join, resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const INPUT_DIR = "./frontend";
const OUTPUT_DIR = "./frontend/dist";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(INPUT_DIR),
    },
  },
  root: resolve(INPUT_DIR),
  base: "/static/",
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: { usePolling: true },
  },
  build: {
    manifest: true,
    emptyOutDir: true,
    outDir: resolve(OUTPUT_DIR),
    rollupOptions: {
      input: {
        main: join(INPUT_DIR, "/js/main.tsx"),
      },
    },
  },
});

import type { ComponentType } from "react";

type PageModule = { default: ComponentType };
type WebpackContext = {
  keys: () => string[];
  (id: string): PageModule;
};
type RequireWithContext = (
  directory: string,
  useSubdirectories: boolean,
  regExp: RegExp
) => WebpackContext;

declare const require: { context: RequireWithContext };

const pages: Record<string, PageModule> = {};
const context = require.context("../pages", true, /\.tsx$/);

context.keys().forEach((key) => {
  const normalized = key
    .replace(/^\.\//, "")
    .replace(/\.tsx$/, "")
    .replace(/\\/g, "/");
  pages[normalized] = context(key);
});

export function resolveInertiaPage(name: string): PageModule {
  const page = pages[name];

  if (!page) {
    throw new Error(
      `Inertia page not found: pages/${name}.tsx. Available pages: ${Object.keys(
        pages
      ).join(", ")}`
    );
  }

  return page;
}

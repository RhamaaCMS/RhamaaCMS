import type { Page } from "@inertiajs/core";

declare module "@inertiajs/react" {
  interface PageProps {
    auth: {
      user: {
        id: number;
        username: string;
        email: string;
        is_staff: boolean;
      } | null;
    };
    flash: {
      success?: string;
      error?: string;
    };
  }
}

export type InertiaPage<T = Record<string, unknown>> = Page<T>;

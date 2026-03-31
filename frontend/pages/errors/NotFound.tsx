import { Head, Link } from "@inertiajs/react";
import RootLayout from "@/layouts/RootLayout";

export default function NotFound() {
  return (
    <RootLayout>
      <Head title="404 – Page Not Found" />
      <section className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center bg-brand-800 px-4 text-center">
        <p className="mb-4 font-mono text-7xl font-bold text-white/10">404</p>
        <h1 className="mb-3 font-display text-3xl font-semibold text-white sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mb-8 max-w-sm text-sm leading-relaxed text-white/50">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="rounded-lg border border-gold-500/30 bg-gold-500/10 px-5 py-2.5 font-mono text-xs text-gold-400 transition-all hover:border-gold-500/60 hover:bg-gold-500/20"
        >
          ← Back to Home
        </Link>
      </section>
    </RootLayout>
  );
}

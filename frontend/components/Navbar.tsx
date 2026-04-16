import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 font-display text-[1.3rem] font-semibold text-white transition-opacity hover:opacity-80"
        >
          <span>
            Rhamaa
            <span className="ml-0.5 font-mono text-xs font-medium text-zinc-400">
              CMS
            </span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden items-center gap-6 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-widest text-zinc-400 transition-colors hover:text-zinc-100"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <a
          href="/admin/"
          className={cn(
            "hidden items-center gap-1.5 rounded-lg border border-white/20 bg-white/[0.03]",
            "px-3 py-1.5 font-mono text-xs text-zinc-100 transition-all",
            "hover:border-white/35 hover:bg-white/[0.08] sm:flex"
          )}
        >
          Admin Panel →
        </a>
      </nav>
    </header>
  );
}

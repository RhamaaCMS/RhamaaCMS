import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-800">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 font-display text-[1.3rem] font-semibold text-white transition-opacity hover:opacity-80"
        >
          <span>
            Rhamaa
            <span className="ml-0.5 font-mono text-xs font-medium text-gold-500">
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
              className="font-mono text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <a
          href="/admin/"
          className={cn(
            "hidden items-center gap-1.5 rounded-lg border border-gold-500/30 bg-gold-500/10",
            "px-3 py-1.5 font-mono text-xs text-gold-400 transition-all",
            "hover:border-gold-500/60 hover:bg-gold-500/20 sm:flex"
          )}
        >
          Admin Panel →
        </a>
      </nav>
    </header>
  );
}

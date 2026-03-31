export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.07] bg-brand-800 px-6 py-3">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1 sm:flex-row">
        <span className="font-mono text-[11px] text-white/25">
          &copy; {year} RhamaaCMS
        </span>
        <span className="font-mono text-[11px] text-white/25">
          {[
            { label: "Wagtail", href: "https://wagtail.org" },
            { label: "Tailwind CSS v4", href: "https://tailwindcss.com" },
            { label: "React", href: "https://react.dev" },
            { label: "Inertia.js", href: "https://inertiajs.com" },
            { label: "shadcn/ui", href: "https://ui.shadcn.com" },
          ].map((link, i, arr) => (
            <span key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-gold-400"
              >
                {link.label}
              </a>
              {i < arr.length - 1 && (
                <span className="mx-1.5 opacity-40">&middot;</span>
              )}
            </span>
          ))}
        </span>
      </div>
    </footer>
  );
}

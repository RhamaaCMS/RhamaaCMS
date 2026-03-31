import { Head } from "@inertiajs/react";
import { BackgroundBeams } from "@/components/aceternity/BackgroundBeams";
import { Spotlight } from "@/components/aceternity/Spotlight";
import { Badge } from "@/components/ui/badge";
import RootLayout from "@/layouts/RootLayout";

interface HomeProps {
  site_name?: string;
}

const FEATURE_CARDS = [
  {
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    title: "Documentation",
    description: "Complete guide, API reference, and Wagtail CMS tutorials.",
    href: "https://docs.wagtail.org",
    external: true,
    accent: "gold" as const,
    cta: "Open →",
  },
  {
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
    title: "Tutorial",
    description: "Step by step building your first Wagtail site.",
    href: "https://docs.wagtail.org/en/stable/getting_started/tutorial.html",
    external: true,
    accent: "gold" as const,
    cta: "Start →",
  },
  {
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Admin Panel",
    description: "Manage content, pages, media, and site settings.",
    href: "/admin/",
    external: false,
    accent: "gold" as const,
    cta: "Sign In →",
  },
] as const;

export default function Home({ site_name }: HomeProps) {
  return (
    <RootLayout>
      <Head title="Home" />

      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-brand-800 flex flex-col">
        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,#C8A96E 0,#C8A96E 1px,transparent 1px,transparent 28px),repeating-linear-gradient(-45deg,#C8A96E 0,#C8A96E 1px,transparent 1px,transparent 28px)",
          }}
          aria-hidden="true"
        />

        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-brand-600 opacity-20 blur-[96px]" aria-hidden="true" />

        {/* Aceternity Spotlight */}
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="rgba(200,169,110,0.15)"
        />
        <BackgroundBeams />

        {/* Hero content */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">

          {/* Logo */}
          <div className="animate-fade-up animation-delay-100 mb-5">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 animate-float">
              <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10 text-gold-400">
                <path d="M20 4L4 12v16l16 8 16-8V12L20 4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M20 4v24M4 12l16 8 16-8" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"/>
              </svg>
            </div>
          </div>

          {/* Badges */}
          <div className="animate-fade-up animation-delay-200 mb-6 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0" />
              RhamaaCMS · v1.0
            </Badge>
            <Badge variant="outline" className="border-white/15 text-white/40">
              React · Inertia.js
            </Badge>
          </div>

          {/* Headline */}
          <div className="animate-fade-up animation-delay-300 mb-3">
            <h1
              className="font-display italic font-semibold leading-none text-white"
              style={{ fontSize: "clamp(3.25rem, 11vw, 6.5rem)" }}
            >
              Rhamaa
            </h1>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-gold-400">
              Content Management System
            </p>
          </div>

          {/* Tagline */}
          <p className="animate-fade-up animation-delay-400 mb-8 mt-1 max-w-sm text-sm leading-relaxed text-white/50">
            An elegant content management platform built on Wagtail, React, and Inertia.js.
          </p>

          {/* Ornamental divider */}
          <div className="animate-fade-up animation-delay-500 mb-8 flex w-48 items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <svg className="h-2.5 w-2.5 shrink-0 text-gold-500/40" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0 9.8 6.2 16 8 9.8 9.8 8 16 6.2 9.8 0 8 6.2 6.2Z"/>
            </svg>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>

          {/* Feature cards */}
          <div className="animate-fade-up animation-delay-600 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {FEATURE_CARDS.map((card) => (
              <a
                key={card.title}
                href={card.href}
                {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-gold-500/35 hover:bg-white/[0.11]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold-500/20 bg-gold-500/10 text-gold-400">
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h2 className="mb-1 font-display text-[1.1rem] font-semibold leading-snug text-white">
                    {card.title}
                  </h2>
                  <p className="text-xs leading-relaxed text-white/45">{card.description}</p>
                </div>
                <span className="flex translate-x-[-4px] items-center gap-1 text-xs font-medium text-gold-400 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                  {card.cta}
                </span>
              </a>
            ))}
          </div>

          {/* Release notes link */}
          <div className="animate-fade-up animation-delay-700 mt-7">
            <a
              href="https://docs.wagtail.org/en/latest/releases/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-white/30 transition-colors duration-200 hover:text-gold-400"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
              </svg>
              View release notes
            </a>
          </div>

        </div>
      </section>
    </RootLayout>
  );
}

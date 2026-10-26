"use client";

import { ArrowUp, Heart, MapPin, Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Skyline } from "@/components/Skyline";

export function Footer() {
  const { t } = useLang();

  const links = [
    { href: "#home", label: t.nav.home },
    { href: "#plan", label: t.nav.plan },
    { href: "#destinations", label: t.nav.destinations },
    { href: "#food", label: t.nav.food },
    { href: "#phrases", label: t.nav.phrases }
  ];

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 print:hidden">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 opacity-25" aria-hidden="true">
        <Skyline idPrefix="footer-skyline" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row">
          <div className="max-w-xl">
            <p className="font-kannada text-4xl font-bold leading-tight text-gradient sm:text-5xl">
              {t.footer.thanks}
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm font-medium text-white/65">
              <Heart size={14} className="text-coral" aria-hidden="true" />
              {t.footer.made}
            </p>
            <p className="mt-1 font-kannada text-sm text-gold/75">{t.footer.kannadaLine}</p>
            <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-white/40">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-gold/70">
                <MapPin size={11} aria-hidden="true" />
              </span>
              {t.footer.problem}
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold/55">
              <Sparkles size={10} aria-hidden="true" />
              {t.footer.powered}
            </p>
          </div>

          <div className="grid w-full gap-8 sm:grid-cols-2 lg:w-auto lg:gap-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                {t.footer.quickLinks}
              </p>
              <nav className="mt-3 flex flex-col gap-2">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="w-fit rounded text-sm text-white/55 transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                {t.footer.language}
              </p>
              <div className="mt-3">
                <LanguageToggle />
              </div>
              <p className="mt-3 max-w-[210px] text-[10px] leading-relaxed text-white/35">
                {t.language.hint}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-gold/25 bg-gold/10 font-display text-xs font-bold text-gold">
              ಕ
            </span>
            <div>
              <p className="font-display text-sm font-bold text-white/80">{t.brand}</p>
              <p className="text-[9px] uppercase tracking-[0.15em] text-white/30">{t.brandSubtitle}</p>
            </div>
          </div>
          <div className="max-w-md sm:text-right">
            <p className="text-[10px] leading-relaxed text-white/30">{t.footer.copyright}</p>
            <p className="mt-1 text-[9px] leading-relaxed text-white/20">{t.hero.photoCredit}</p>
          </div>
          <a
            href="#home"
            aria-label={t.footer.backToTop}
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold text-white/45 transition hover:border-gold/40 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ArrowUp size={11} aria-hidden="true" />
            {t.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}

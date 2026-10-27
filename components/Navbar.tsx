"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, Landmark, Menu, Palette, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LangProvider";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";

export const OPEN_AI_ASSISTANT_EVENT = "karnataka-yatra-open-assistant";

export function Navbar() {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#home", label: t.nav.home },
    { href: "#plan", label: t.nav.plan },
    { href: "#destinations", label: t.nav.destinations },
    { href: "#artisans", label: t.nav.artisans },
    { href: "#food", label: t.nav.food },
    { href: "#phrases", label: t.nav.phrases }
  ];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openAssistant = () => {
    window.dispatchEvent(new CustomEvent(OPEN_AI_ASSISTANT_EVENT));
  };

  return (
    <header className="no-print sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav className="glass mx-auto flex max-w-7xl items-center justify-between gap-3 !rounded-full px-3 py-2.5 shadow-[0_18px_55px_rgba(0,0,0,0.35)] sm:px-4">
        <a
          href="#home"
          className="group flex min-w-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          aria-label={t.brand}
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/30 bg-gradient-to-br from-gold/25 to-coral/15 text-gold shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition group-hover:border-gold/60">
            <Landmark size={19} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-bold leading-tight text-white sm:text-lg">
              {t.brand}
            </span>
            <span className="hidden items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gold/80 sm:flex">
              <Sparkles size={9} aria-hidden="true" />
              {t.brandSubtitle}
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative rounded-full px-3 py-2 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {link.label}
              <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold to-coral transition-all duration-300 group-hover:w-4" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Ask AI Trigger Button */}
          <button
            type="button"
            onClick={openAssistant}
            className="group relative hidden items-center gap-1.5 rounded-full border border-gold/50 bg-gold/15 px-3 py-1.5 text-xs font-bold text-gold transition hover:border-gold hover:bg-gold hover:text-[#1a1205] sm:inline-flex"
          >
            <Bot size={14} className="transition group-hover:rotate-12" aria-hidden="true" />
            <span>{t.nav.assistant}</span>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
          </button>

          {/* Theme Toggle (Light / Dark) */}
          <ThemeToggle />

          <div className="hidden sm:block">
            <LanguageToggle />
          </div>

          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-gold/50 hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:hidden"
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="glass-strong mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl p-2 lg:hidden"
          >
            <div className="flex flex-col">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.045 }}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-medium text-white/80 transition hover:bg-gold/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {link.label}
                  <span className="h-1.5 w-1.5 rounded-full bg-gold/60" aria-hidden="true" />
                </motion.a>
              ))}

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openAssistant();
                }}
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-gold/20 border border-gold/40 px-4 py-3 text-sm font-bold text-gold"
              >
                <Bot size={16} />
                {t.nav.assistant}
              </button>
            </div>
            <div className="mt-2 flex justify-center border-t border-white/10 px-2 pt-3 pb-2 sm:hidden">
              <LanguageToggle />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

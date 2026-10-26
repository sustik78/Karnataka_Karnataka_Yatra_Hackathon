"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Globe2 } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";

interface LanguageToggleProps {
  variant?: "nav" | "floating";
}

export function LanguageToggle({ variant = "nav" }: LanguageToggleProps) {
  const { lang, t, toggle } = useLang();
  const reduceMotion = useReducedMotion();
  const isEnglish = lang === "en";
  const label = isEnglish ? t.language.switchToKannada : t.language.switchToEnglish;

  const button = (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={`${t.language.hint} · ${label}`}
      className={`group relative inline-flex h-14 w-[208px] items-center rounded-full border border-white/25 bg-white/[0.09] p-1 shadow-[0_12px_38px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-2xl transition duration-300 hover:border-gold/60 hover:bg-white/[0.13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-base ${
        variant === "floating" ? "gold-glow" : ""
      }`}
    >
      <motion.span
        aria-hidden="true"
        className="absolute bottom-1 left-1 top-1 w-[98px] rounded-full bg-gradient-to-r from-[#F5B301] via-[#FFD05A] to-[#FF7A59] shadow-[0_8px_24px_rgba(245,179,1,0.32),inset_0_1px_0_rgba(255,255,255,0.6)]"
        initial={false}
        animate={{ x: isEnglish ? 0 : 100 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 430, damping: 34, mass: 0.8 }
        }
      />
      <span
        className={`relative z-10 flex h-12 w-1/2 items-center justify-center gap-1.5 rounded-full text-sm font-bold tracking-wide transition-colors duration-300 ${
          isEnglish ? "text-[#1a1205]" : "text-white/65"
        }`}
      >
        <Globe2 size={15} aria-hidden="true" />
        {t.language.activeEnglish}
      </span>
      <span
        className={`relative z-10 flex h-12 w-1/2 items-center justify-center rounded-full text-sm font-bold tracking-wide transition-colors duration-300 ${
          isEnglish ? "text-white/65" : "text-[#1a1205]"
        }`}
      >
        {t.language.kannada}
      </span>
      <span
        aria-hidden="true"
        className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full border border-gold/50 bg-base text-gold shadow-lg"
      >
        <Globe2 size={12} />
      </span>
      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 transition group-hover:ring-gold/30" />
    </button>
  );

  if (variant === "floating") {
    return (
      <div className="fixed bottom-4 right-4 z-[80] flex flex-col items-end gap-2 sm:hidden print:hidden">
        <span className="glass rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
          {t.language.label}
        </span>
        {button}
      </div>
    );
  }

  return button;
}

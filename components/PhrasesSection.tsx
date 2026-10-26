"use client";

import { Quote, Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { SectionHeading } from "@/components/SectionHeading";
import { PhrasesCard } from "@/components/PhrasesCard";
import { Reveal } from "@/components/Reveal";

export function PhrasesSection() {
  const { lang, t } = useLang();

  return (
    <section id="phrases" className="relative scroll-mt-24 print:hidden">
      <SectionHeading
        eyebrow={t.phrases.eyebrow}
        title={t.phrases.sectionTitle}
        subtitle={t.phrases.sectionSubtitle}
      />

      <div className="mt-7 grid gap-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-7" y={18}>
          <PhrasesCard />
        </Reveal>

        <Reveal className="lg:col-span-5" delay={0.08} y={18}>
          <div className="glass relative flex h-full min-h-[340px] flex-col items-center justify-center overflow-hidden rounded-[1.75rem] p-7 text-center">
            <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
              <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-coral/20 blur-3xl" />
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
              <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10" />
            </div>

            <span className="relative font-kannada text-6xl font-bold leading-none text-gradient sm:text-7xl">
              ಕನ್ನಡ
            </span>
            <p className="relative mt-5 font-kannada text-lg font-medium text-white/85">
              {t.hero.tagline}
            </p>
            <p className="relative mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/65">
              {t.hero.translit}
            </p>

            <div className="relative mt-6 h-px w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

            <div className="relative mt-5 flex items-start gap-2 text-left">
              <Quote size={16} className="mt-0.5 shrink-0 text-gold/40" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-white/60">{t.hero.meaning}</p>
            </div>

            <div className="relative mt-6 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">
              <Sparkles size={10} className="text-gold/60" aria-hidden="true" />
              {lang === "kn" ? t.hero.worldsKn : t.hero.worldsEn}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowDown, ArrowRight, Bot, Compass, Languages, MapPin, Mountain, Sparkles } from "lucide-react";
import { HERO_PHOTOS } from "@/data/photos";
import { REGION_NAMES_EN, REGION_NAMES_KN } from "@/data/places";
import { useLang } from "@/i18n/LangProvider";
import { OPEN_AI_ASSISTANT_EVENT } from "@/components/Navbar";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.08 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

export function Hero() {
  const { lang, t } = useLang();
  const reduceMotion = useReducedMotion();
  const initialState = reduceMotion ? "visible" : "hidden";

  const features = [
    {
      src: HERO_PHOTOS.hampi,
      label: lang === "kn" ? REGION_NAMES_KN.Hampi : REGION_NAMES_EN.Hampi,
      detail: t.planner.categories.Heritage
    },
    {
      src: HERO_PHOTOS.coorg,
      label: lang === "kn" ? REGION_NAMES_KN.Coorg : REGION_NAMES_EN.Coorg,
      detail: t.planner.categories["Coffee Estates"]
    },
    {
      src: HERO_PHOTOS.coast,
      label: t.hero.coastal,
      detail: t.planner.categories.Beaches
    }
  ];

  return (
    <section id="home" className="relative px-3 pb-8 pt-4 sm:px-5 sm:pb-10 sm:pt-6 print:hidden">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={container}
          initial={initialState}
          animate="visible"
          className="relative isolate min-h-[690px] overflow-hidden rounded-[2rem] border border-white/15 shadow-[0_35px_100px_rgba(0,0,0,0.55)] sm:min-h-[720px] lg:min-h-[760px]"
        >
          <img
            src={HERO_PHOTOS.mysuru}
            alt={
              lang === "kn"
                ? "ಮೈಸೂರು ಅರಮನೆ, ಕರ್ನಾಟಕ"
                : "Mysuru Palace, Karnataka"
            }
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,9,16,0.96)_0%,rgba(5,9,16,0.82)_35%,rgba(5,9,16,0.32)_72%,rgba(5,9,16,0.18)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,9,16,0.55)_0%,transparent_30%,transparent_55%,rgba(5,9,16,0.92)_100%)]" />

          <div className="relative z-10 flex min-h-[690px] flex-col p-5 sm:min-h-[720px] sm:p-8 lg:min-h-[760px] lg:p-12">
            <motion.div variants={item} className="flex items-start justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/25 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold backdrop-blur-md sm:text-[11px]">
                <Sparkles size={12} aria-hidden="true" />
                {lang === "kn" ? t.hero.worldsKn : t.hero.worldsEn}
              </span>
              <span className="hidden max-w-[180px] text-right text-[9px] font-medium leading-relaxed text-white/45 sm:block">
                {t.hero.photoCredit}
              </span>
            </motion.div>

            <div className="flex flex-1 flex-col justify-center py-14 sm:py-16 lg:py-20">
              <motion.div variants={item}>
                <p className="font-kannada text-2xl font-bold leading-snug text-gold sm:text-3xl lg:text-4xl">
                  {t.hero.tagline}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-[0.24em] text-white/55 sm:text-xs">
                  <span>{t.hero.translit}</span>
                  <span className="h-px w-8 bg-gold/45" />
                  <span className="normal-case tracking-normal text-white/50">{t.hero.meaning}</span>
                </div>
              </motion.div>

              <motion.h1
                variants={item}
                className="mt-5 max-w-4xl font-display text-[2.65rem] font-bold leading-[1.04] tracking-[-0.025em] text-white sm:text-6xl lg:text-[5.2rem]"
              >
                {t.hero.titleLineOne}
                <br />
                <span className="text-gradient">{t.hero.titleLineTwo}</span>
              </motion.h1>

              <motion.p
                variants={item}
                className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base lg:text-lg"
              >
                {t.hero.pitch}
              </motion.p>

              <motion.div variants={item} className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#plan"
                  className="cta-glow group inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F5B301] via-[#FFC93C] to-[#FF7A59] px-6 py-3 text-sm font-bold text-[#1a1205] shadow-[0_16px_44px_rgba(245,179,1,0.3)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_56px_rgba(245,179,1,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#071019] sm:text-base"
                >
                  {t.hero.primaryCta}
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="#destinations"
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:text-base"
                >
                  <Compass size={18} aria-hidden="true" />
                  {t.hero.secondaryCta}
                </a>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent(OPEN_AI_ASSISTANT_EVENT))}
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-6 py-3 text-sm font-bold text-gold backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-[#1a1205] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:text-base"
                >
                  <Bot size={18} aria-hidden="true" />
                  {t.hero.chatCta}
                </button>
              </motion.div>

              <motion.div variants={item} className="mt-7 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3.5 py-2 text-[11px] font-semibold text-white/80 backdrop-blur-md">
                  <MapPin size={13} className="text-gold" aria-hidden="true" />
                  {t.hero.statPlaces}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3.5 py-2 text-[11px] font-semibold text-white/80 backdrop-blur-md">
                  <Mountain size={13} className="text-emerald" aria-hidden="true" />
                  {t.hero.statRegions}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3.5 py-2 text-[11px] font-semibold text-white/80 backdrop-blur-md">
                  <Languages size={13} className="text-teal" aria-hidden="true" />
                  {t.hero.statLanguages}
                </span>
              </motion.div>
            </div>

            <motion.div
              variants={item}
              className="grid gap-4 border-t border-white/20 pt-5 md:grid-cols-[1fr_auto] md:items-end"
            >
              <div>
                <a
                  href="#plan"
                  className="inline-flex items-center gap-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-gold/90 transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {t.hero.scroll}
                  <ArrowDown size={12} aria-hidden="true" />
                </a>
                <p className="mt-3 max-w-md text-[11px] leading-relaxed text-white/50">{t.hero.tourismNote}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {features.map((feature) => (
                  <div
                    key={feature.label}
                    className="group relative h-[68px] w-[82px] overflow-hidden rounded-xl border border-white/20 sm:h-[82px] sm:w-[128px]"
                  >
                    <img
                      src={feature.src}
                      alt={feature.label}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-2">
                      <p className="truncate text-[9px] font-bold text-white sm:text-[10px]">{feature.label}</p>
                      <p className="truncate text-[7px] font-medium text-gold/85 sm:text-[8px]">{feature.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

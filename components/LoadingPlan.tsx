"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Compass, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LangProvider";

export function LoadingPlan() {
  const { lang, t } = useLang();
  const reduceMotion = useReducedMotion();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    setMessageIndex(0);
    const interval = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % t.loading.messages.length);
    }, 1600);
    return () => window.clearInterval(interval);
  }, [t.loading.messages.length]);

  return (
    <div className="glass mt-6 overflow-hidden rounded-[2rem] p-5 print:hidden sm:p-8" aria-busy="true" aria-live="polite">
      <div className="flex flex-col items-center text-center">
        <div className="relative grid h-16 w-16 place-items-center rounded-full border border-gold/30 bg-gold/10">
          <Compass
            size={28}
            className={reduceMotion ? "text-gold" : "animate-spin text-gold"}
            style={{ animationDuration: "4s" }}
            aria-hidden="true"
          />
          <span className="absolute inset-0 animate-pulse-glow rounded-full border border-gold/20" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold text-white">{t.loading.title}</h3>
        <div className="mt-2 min-h-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-gold/90"
            >
              {t.loading.messages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-white/40">
          <Loader2 size={11} className="animate-spin" aria-hidden="true" />
          {t.loading.note}
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-center gap-2">
              <div className="skeleton h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-2.5 w-3/4 rounded-full" />
                <div className="skeleton h-2 w-1/2 rounded-full" />
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <div className="skeleton h-2 rounded-full" />
              <div className="skeleton h-2 w-11/12 rounded-full" />
              <div className="skeleton h-2 w-4/5 rounded-full" />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="skeleton h-6 w-20 rounded-full" />
              <span className="skeleton h-6 w-14 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/35">
        <Sparkles size={12} className="text-gold/60" aria-hidden="true" />
        {lang === "kn" ? t.hero.worldsKn : t.hero.worldsEn}
      </div>
    </div>
  );
}

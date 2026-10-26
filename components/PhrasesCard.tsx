"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Info, Languages, Sparkles, Square, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { PHRASES } from "@/data/places";
import { useLang } from "@/i18n/LangProvider";
import { useToast } from "@/components/ToastProvider";

export function PhrasesCard() {
  const { lang, t } = useLang();
  const { push } = useToast();
  const reduceMotion = useReducedMotion();
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = (id: string, text: string) => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) {
      push(t.phrases.unsupported, "info");
      return;
    }

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const voices = window.speechSynthesis.getVoices();
    const kannadaVoice = voices.find((voice) => {
      const normalized = voice.lang.toLowerCase().replace("_", "-");
      return normalized === "kn-in" || normalized.startsWith("kn");
    });

    if (!kannadaVoice) {
      setSpeakingId(null);
      push(t.phrases.noVoice, "info");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = kannadaVoice;
    utterance.lang = "kn-IN";
    utterance.rate = 0.84;
    utterance.pitch = 1;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="glass rounded-[1.75rem] p-5 sm:p-6 print-card">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
          <Languages size={18} aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-white">{t.phrases.title}</h3>
          <p className="mt-1 text-xs text-white/50">{t.phrases.subtitle}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {PHRASES.map((phrase) => {
          const isSpeaking = speakingId === phrase.id;
          return (
            <motion.div
              key={phrase.id}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              transition={{ type: "spring", stiffness: 340, damping: 26 }}
              className={`group rounded-2xl border p-3.5 transition-colors ${
                isSpeaking
                  ? "border-gold/55 bg-gold/10"
                  : "border-white/10 bg-white/[0.035] hover:border-white/20"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-kannada text-xl font-semibold leading-relaxed text-white">{phrase.kn}</p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold/70">
                    {phrase.translit}
                  </p>
                  <p className="mt-1 text-xs text-white/55">
                    <span className="text-white/35">{t.phrases.meaningLabel}: </span>
                    {phrase.en}
                  </p>
                </div>
                <motion.button
                  type="button"
                  whileTap={reduceMotion ? undefined : { scale: 0.9 }}
                  onClick={() => speak(phrase.id, phrase.kn)}
                  aria-label={`${isSpeaking ? t.phrases.stop : t.phrases.speak} ${phrase.kn}`}
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                    isSpeaking
                      ? "border-gold/60 bg-gold text-[#1a1205]"
                      : "border-white/15 bg-white/[0.05] text-gold/80 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
                  }`}
                >
                  {isSpeaking ? <Square size={13} aria-hidden="true" /> : <Volume2 size={15} aria-hidden="true" />}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl border border-teal/20 bg-teal/[0.06] px-3 py-2.5">
        <Info size={13} className="mt-0.5 shrink-0 text-teal" aria-hidden="true" />
        <p className="text-[11px] leading-relaxed text-white/60">{t.phrases.tip}</p>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/25">
        <Sparkles size={10} aria-hidden="true" />
        {t.hero.worldsKn}
        {lang === "kn" ? null : <span>·</span>}
        {lang === "kn" ? null : t.hero.worldsEn}
      </div>
    </div>
  );
}

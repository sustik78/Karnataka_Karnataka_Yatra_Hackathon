"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  HelpCircle,
  Info,
  Languages,
  MessageSquare,
  Navigation,
  Palette,
  ShoppingBag,
  Sparkles,
  Square,
  UtensilsCrossed,
  Volume2
} from "lucide-react";
import { useEffect, useState } from "react";
import { PHRASES } from "@/data/places";
import type { Phrase } from "@/lib/types";
import { useLang } from "@/i18n/LangProvider";
import { useToast } from "@/components/ToastProvider";

type PhraseCategory = "all" | Phrase["category"];

const categoryIcons = {
  all: Languages,
  greetings: MessageSquare,
  directions: Navigation,
  food: UtensilsCrossed,
  shopping: ShoppingBag,
  emergency: HelpCircle,
  culture: Palette
};

export function PhrasesCard() {
  const { lang, t } = useLang();
  const { push } = useToast();
  const reduceMotion = useReducedMotion();
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<PhraseCategory>("all");

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = (phrase: Phrase) => {
    if (typeof window === "undefined") return;

    if (speakingId === phrase.id) {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    if (!("speechSynthesis" in window)) {
      push(t.phrases.unsupported, "info");
      return;
    }

    window.speechSynthesis.cancel();
    const voices = window.speechSynthesis.getVoices();

    // 1. Try finding native Kannada voice
    const kannadaVoice = voices.find((v) => {
      const code = v.lang.toLowerCase().replace("_", "-");
      return code === "kn-in" || code.startsWith("kn");
    });

    // 2. Fallback to Indian English or Hindi voice using transliteration
    const indianVoice =
      kannadaVoice ||
      voices.find((v) => {
        const code = v.lang.toLowerCase().replace("_", "-");
        return code === "en-in" || code === "hi-in" || code.startsWith("hi");
      }) ||
      voices[0];

    const textToSpeak = kannadaVoice ? phrase.kn : phrase.translit;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    if (kannadaVoice) {
      utterance.voice = kannadaVoice;
      utterance.lang = "kn-IN";
      utterance.rate = 0.85;
    } else if (indianVoice) {
      utterance.voice = indianVoice;
      utterance.lang = indianVoice.lang;
      utterance.rate = 0.88;
      utterance.pitch = 1.05;
    }

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(phrase.id);
    window.speechSynthesis.speak(utterance);
  };

  const filteredPhrases = PHRASES.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  return (
    <div className="glass rounded-[1.75rem] p-5 sm:p-6 print-card">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
            <Languages size={18} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-xl font-bold text-white">{t.phrases.title}</h3>
            <p className="mt-1 text-xs text-white/50">{t.phrases.subtitle}</p>
          </div>
        </div>

        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold text-gold">
          <Sparkles size={11} aria-hidden="true" />
          24 {lang === "kn" ? "ನುಡಿಗಟ್ಟುಗಳು" : "Phrases"}
        </span>
      </div>

      {/* Category Tabs */}
      <div className="mt-4 flex flex-wrap gap-1.5 border-b border-white/10 pb-3">
        {(["all", "greetings", "directions", "food", "shopping", "emergency", "culture"] as PhraseCategory[]).map(
          (cat) => {
            const active = activeCategory === cat;
            const Icon = categoryIcons[cat];
            const label = cat === "all" ? t.common.all : t.phrases.categories[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
                  active
                    ? "bg-gold text-[#1a1205] shadow-sm"
                    : "border border-white/10 bg-white/[0.04] text-white/60 hover:text-white"
                }`}
              >
                <Icon size={12} aria-hidden="true" />
                {label}
              </button>
            );
          }
        )}
      </div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {filteredPhrases.map((phrase) => {
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
                  <p className="font-kannada text-xl font-semibold leading-relaxed text-white">
                    {phrase.kn}
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold/80">
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
                  onClick={() => speak(phrase)}
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
    </div>
  );
}

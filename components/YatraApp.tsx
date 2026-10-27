"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Bot } from "lucide-react";
import { useEffect, useState } from "react";
import type { Prefs } from "@/lib/types";
import { useLang } from "@/i18n/LangProvider";
import { MeshBackground } from "@/components/MeshBackground";
import { Navbar, OPEN_AI_ASSISTANT_EVENT } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PlannerSection, APPLY_ASSISTANT_PLAN_EVENT } from "@/components/PlannerSection";
import { Destinations } from "@/components/Destinations";
import { ArtisansSection } from "@/components/ArtisansSection";
import { FoodFestivals } from "@/components/FoodFestivals";
import { PhrasesSection } from "@/components/PhrasesSection";
import { Footer } from "@/components/Footer";
import { LanguageToggle } from "@/components/LanguageToggle";
import { AiAssistantChat } from "@/components/AiAssistantChat";

export function YatraApp() {
  const { lang, t } = useLang();
  const reduceMotion = useReducedMotion();
  const [assistantOpen, setAssistantOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleOpen = () => setAssistantOpen(true);
    window.addEventListener(OPEN_AI_ASSISTANT_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_AI_ASSISTANT_EVENT, handleOpen);
  }, []);

  const handleApplyPlan = (prefs: Partial<Prefs>) => {
    window.dispatchEvent(
      new CustomEvent(APPLY_ASSISTANT_PLAN_EVENT, { detail: prefs })
    );
    setAssistantOpen(false);
    const planEl = document.getElementById("plan");
    if (planEl) {
      planEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={lang === "kn" ? "font-kn" : undefined}>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[95] h-0.5 origin-left bg-gradient-to-r from-gold via-coral to-maroon no-print"
        style={{ scaleX: reduceMotion ? scrollYProgress : progress }}
      />
      <MeshBackground />
      <Navbar />
      <main id="main" className="relative">
        <Hero />
        <div className="mx-auto max-w-7xl px-3 sm:px-5">
          <div className="mt-12 sm:mt-16 print:mt-0">
            <PlannerSection />
          </div>
          <div className="mt-24 sm:mt-28 print:hidden">
            <Destinations />
          </div>
          <div className="mt-24 sm:mt-28 print:hidden">
            <ArtisansSection />
          </div>
          <div className="mt-24 sm:mt-28 print:hidden">
            <FoodFestivals />
          </div>
          <div className="mt-24 sm:mt-28 print:hidden">
            <PhrasesSection />
          </div>
        </div>
      </main>
      <Footer />

      {/* Floating AI Assistant Trigger */}
      <div className="fixed bottom-5 left-5 z-[90] no-print">
        <button
          type="button"
          onClick={() => setAssistantOpen(true)}
          className="cta-glow group flex items-center gap-2 rounded-full border border-gold/40 bg-[#0c1824]/90 px-4 py-2.5 text-xs font-bold text-gold shadow-2xl backdrop-blur-md transition hover:scale-105 hover:border-gold hover:bg-gold hover:text-[#1a1205]"
          aria-label={t.assistant.launcher}
        >
          <span className="relative grid h-7 w-7 place-items-center rounded-full bg-gold/20 text-gold group-hover:bg-[#1a1205] group-hover:text-gold">
            <Bot size={15} aria-hidden="true" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-teal animate-pulse" />
          </span>
          <span className="hidden sm:inline font-display">{t.assistant.launcher}</span>
        </button>
      </div>

      <AiAssistantChat
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        onApplyPlan={handleApplyPlan}
      />

      <LanguageToggle variant="floating" />
    </div>
  );
}

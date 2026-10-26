"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useLang } from "@/i18n/LangProvider";
import { MeshBackground } from "@/components/MeshBackground";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PlannerSection } from "@/components/PlannerSection";
import { Destinations } from "@/components/Destinations";
import { FoodFestivals } from "@/components/FoodFestivals";
import { PhrasesSection } from "@/components/PhrasesSection";
import { Footer } from "@/components/Footer";
import { LanguageToggle } from "@/components/LanguageToggle";

export function YatraApp() {
  const { lang } = useLang();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    restDelta: 0.001
  });

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
            <FoodFestivals />
          </div>
          <div className="mt-24 sm:mt-28 print:hidden">
            <PhrasesSection />
          </div>
        </div>
      </main>
      <Footer />
      <LanguageToggle variant="floating" />
    </div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  CalendarDays,
  Camera,
  Castle,
  Coffee,
  Compass,
  Droplets,
  Heart,
  Home,
  Info,
  Landmark,
  Leaf,
  Loader2,
  MapPin,
  Minus,
  Mountain,
  Palette,
  PartyPopper,
  PawPrint,
  Plus,
  Scale,
  Shuffle,
  Sparkles,
  User,
  Users,
  UtensilsCrossed,
  Wallet,
  Waves,
  X,
  Zap
} from "lucide-react";
import type { CSSProperties, FormEvent } from "react";
import { useState } from "react";
import type { Category, City, Companion, DietPreference, Place, Prefs, StayPreference, TravelStyle } from "@/lib/types";
import { CATEGORIES, COMPANIONS, START_CITIES, TRAVEL_STYLES } from "@/data/places";
import { getTravelerCount } from "@/lib/planner";
import { useLang } from "@/i18n/LangProvider";
import { formatINR, localizeDigits } from "@/lib/format";

const interestIcons: Record<Category, typeof Landmark> = {
  Heritage: Castle,
  Temples: Landmark,
  Wildlife: PawPrint,
  Beaches: Waves,
  "Hills & Trekking": Mountain,
  Waterfalls: Droplets,
  "Coffee Estates": Coffee,
  Food: UtensilsCrossed,
  Adventure: Compass,
  Spiritual: Sparkles,
  Photography: Camera,
  "Artisans & Crafts": Palette
};

const styleIcons: Record<TravelStyle, typeof Leaf> = {
  Relaxed: Leaf,
  Balanced: Scale,
  Packed: Zap,
  Offbeat: Compass
};

const companionIcons: Record<Companion, typeof User> = {
  Solo: User,
  Couple: Heart,
  Family: Users,
  Friends: PartyPopper
};

interface PlannerFormProps {
  prefs: Prefs;
  onChange: (patch: Partial<Prefs>) => void;
  onSubmit: () => void;
  loading: boolean;
  savedPlaces: Place[];
  onRemoveSaved: (id: string) => void;
}

export function PlannerForm({
  prefs,
  onChange,
  onSubmit,
  loading,
  savedPlaces,
  onRemoveSaved
}: PlannerFormProps) {
  const { lang, t } = useLang();
  const reduceMotion = useReducedMotion();
  const [interestError, setInterestError] = useState(false);

  const daysProgress = ((prefs.days - 1) / 9) * 100;
  const budgetProgress = ((prefs.budget - 3000) / (200000 - 3000)) * 100;
  const travelers = getTravelerCount(prefs.companions, prefs);
  const dailyBudget = prefs.budget / Math.max(1, prefs.days) / Math.max(1, travelers);
  const budgetTier = dailyBudget < 3800 ? "Budget" : dailyBudget < 8500 ? "Comfort" : "Luxury";
  const hoverMotion = reduceMotion ? {} : { y: -2, scale: 1.015 };

  const adults = prefs.adults ?? (prefs.companions === "Solo" ? 1 : prefs.companions === "Couple" ? 2 : 3);
  const kids = prefs.kids ?? 0;
  const seniors = prefs.seniors ?? 0;

  const toggleInterest = (category: Category) => {
    const exists = prefs.interests.includes(category);
    const next = exists
      ? prefs.interests.filter((interest) => interest !== category)
      : [...prefs.interests, category];
    onChange({ interests: next });
    if (next.length > 0) setInterestError(false);
  };

  const updateAdults = (delta: number) => {
    const next = Math.max(1, Math.min(15, adults + delta));
    onChange({ adults: next });
  };

  const updateKids = (delta: number) => {
    const next = Math.max(0, Math.min(10, kids + delta));
    onChange({ kids: next });
  };

  const updateSeniors = (delta: number) => {
    const next = Math.max(0, Math.min(8, seniors + delta));
    onChange({ seniors: next });
  };

  const randomize = () => {
    const shuffled = [...CATEGORIES].sort(() => Math.random() - 0.5);
    const interestCount = 2 + Math.floor(Math.random() * 3);
    const styles: TravelStyle[] = [...TRAVEL_STYLES];
    const companions: Companion[] = [...COMPANIONS];
    const cities: City[] = [...START_CITIES];
    onChange({
      interests: shuffled.slice(0, interestCount),
      days: 2 + Math.floor(Math.random() * 7),
      budget: 15000 + Math.floor(Math.random() * 65) * 1000,
      style: styles[Math.floor(Math.random() * styles.length)],
      companions: companions[Math.floor(Math.random() * companions.length)],
      startCity: cities[Math.floor(Math.random() * cities.length)],
      month: 1 + Math.floor(Math.random() * 12),
      seed: Math.floor(Math.random() * 10000),
      adults: 2,
      kids: 0,
      seniors: 0,
      diet: "Any",
      stayPref: "Any"
    });
    setInterestError(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (prefs.interests.length === 0) {
      setInterestError(true);
      return;
    }
    setInterestError(false);
    onSubmit();
  };

  // Month season advisory helper
  const getMonthAdvisory = (m: number) => {
    if (m >= 6 && m <= 8) {
      return {
        en: "Monsoon Season: Heavy rains in Malnad & Western Ghats; waterfalls (Jog, Abbey) are roaring, but beaches & water sports have rough sea restrictions.",
        kn: "ಮಳೆಗಾಲದ ಸಮಯ: ಮಲೆನಾಡು ಹಾಗೂ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳಲ್ಲಿ ಭಾರಿ ಮಳೆ; ಜಲಪಾತಗಳು ವೈಭವೋಪೇತವಾಗಿದ್ದರೂ, ಕಡಲತೀರಗಳಲ್ಲಿ ಸಮುದ್ರ ಪ್ರಕ್ಷುಬ್ಧವಾಗಿರುತ್ತದೆ."
      };
    }
    if (m === 10) {
      return {
        en: "Festive Season: Mysuru Dasara month! Cultural grandeur, pleasant post-monsoon weather and green landscapes across Karnataka.",
        kn: "ನಾಡಹಬ್ಬದ ಸಮಯ: ಮೈಸೂರು ದಸರಾ ಸಂಭ್ರಮ! ಹಿತಕರ ವಾತಾವರಣ ಮತ್ತು ಹಸಿರು ಕಂಗೊಳಿಸುವ ಸುಂದರ ದಿನಗಳು."
      };
    }
    if (m === 11 || m === 12 || m <= 2) {
      return {
        en: "Peak Travel Season: Cool and clear winter weather! Kambala races active along coast; Hampi & Pattadakal festivals in Jan/Feb.",
        kn: "ಅತ್ಯುತ್ತಮ ಪ್ರವಾಸ ಸಮಯ: ಹಿತವಾದ ಚಳಿಗಾಲ! ಕರಾವಳಿಯಲ್ಲಿ ಕಂಬಳ ಸಂಭ್ರಮ; ಜನವರಿ/ಫೆಬ್ರವರಿಯಲ್ಲಿ ಹಂಪಿ ಹಾಗೂ ಪಟ್ಟದಕಲ್ಲು ಉತ್ಸವಗಳು."
      };
    }
    return {
      en: "Summer Season: Pleasant hill stations (Coorg, Chikkamagaluru); plan early morning temple and heritage visits in northern districts.",
      kn: "ಬೇಸಿಗೆಯ ಸಮಯ: ಕೊಡಗು, ಚಿಕ್ಕಮಗಳೂರಿನಂತಹ ಗಿರಿಧಾಮಗಳು ಹಿತಕರ; ಉತ್ತರ ಕರ್ನಾಟಕದ ತಾಣಗಳಿಗೆ ಬೆಳಗ್ಗಿನ ವೇಳೆಯಲ್ಲಿ ಭೇಟಿ ನೀಡಿ."
    };
  };

  const advisory = getMonthAdvisory(prefs.month);

  return (
    <form onSubmit={handleSubmit} className="glass relative overflow-hidden rounded-[2rem] p-5 sm:p-7 lg:p-9 print:hidden">
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-emerald/10 blur-3xl" />

      <fieldset
        disabled={loading}
        aria-busy={loading}
        className="relative z-10 m-0 min-w-0 border-0 p-0"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              <Sparkles size={14} aria-hidden="true" />
              {t.planner.eyebrow}
            </p>
            {/* Proper h2 heading ensuring correct heading hierarchy */}
            <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
              {t.planner.title}
            </h2>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium text-white/60 sm:flex">
            <Sparkles size={12} className="text-gold" aria-hidden="true" />
            {t.brandSubtitle}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <label className="text-sm font-bold text-white sm:text-base">
                {t.planner.interests}
              </label>
              <p className="mt-0.5 text-xs text-white/50">{t.planner.interestsHint}</p>
            </div>
            {interestError ? (
              <p className="flex items-center gap-1.5 text-xs font-semibold text-coral" role="alert">
                <AlertCircle size={13} aria-hidden="true" />
                {t.planner.interestError}
              </p>
            ) : null}
          </div>

          <div className="mt-3.5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {CATEGORIES.map((category) => {
              const active = prefs.interests.includes(category);
              const Icon = interestIcons[category] ?? Castle;
              return (
                <motion.button
                  key={category}
                  type="button"
                  onClick={() => toggleInterest(category)}
                  whileHover={hoverMotion}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  aria-pressed={active}
                  className={`group relative flex items-center gap-2.5 rounded-2xl border p-3 text-left transition ${
                    active
                      ? "border-gold bg-gold/15 text-white shadow-[0_0_24px_rgba(245,179,1,0.22)]"
                      : "border-white/10 bg-white/[0.035] text-white/70 hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl border transition ${
                      active
                        ? "border-gold/60 bg-gold text-[#1a1205]"
                        : "border-white/15 bg-white/[0.05] text-gold/80 group-hover:border-gold/40 group-hover:text-gold"
                    }`}
                  >
                    <Icon size={15} aria-hidden="true" />
                  </span>
                  <span className="truncate text-xs font-semibold">
                    {t.planner.categories[category] ?? category}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Sliders: Days & Budget */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
            <div className="flex items-baseline justify-between gap-2">
              <label htmlFor="planner-days" className="text-xs font-bold text-white sm:text-sm">
                {t.planner.days}
              </label>
              <span className="font-display text-2xl font-bold text-gold">
                {localizeDigits(prefs.days, lang)}{" "}
                <span className="text-xs font-normal text-white/50">{t.planner.daysUnit}</span>
              </span>
            </div>
            <p className="mt-1 text-xs text-white/45">{t.planner.daysHint}</p>
            <input
              id="planner-days"
              type="range"
              min={1}
              max={10}
              step={1}
              value={prefs.days}
              onChange={(event) => onChange({ days: Number(event.target.value) })}
              style={{ "--progress": `${daysProgress}%` } as CSSProperties}
              className="range-input mt-4 w-full"
            />
            <div className="mt-2 flex justify-between text-[10px] text-white/35">
              <span>1 {t.planner.daysUnit}</span>
              <span>5 {t.planner.daysUnit}</span>
              <span>10 {t.planner.daysUnit}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
            <div className="flex items-baseline justify-between gap-2">
              <div>
                <label htmlFor="planner-budget" className="text-xs font-bold text-white sm:text-sm">
                  {t.planner.budget}
                </label>
                <span className="ml-2 inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold text-gold">
                  {t.planner.tiers[budgetTier]}
                </span>
              </div>
              <span className="font-display text-2xl font-bold text-gold">
                {formatINR(prefs.budget, lang)}
              </span>
            </div>
            <p className="mt-1 text-xs text-white/45">
              {t.planner.budgetHint} (~{formatINR(Math.round(dailyBudget), lang)} / {lang === "kn" ? "ದಿನಕ್ಕೆ ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ" : "person/day"})
            </p>
            <input
              id="planner-budget"
              type="range"
              min={3000}
              max={200000}
              step={1000}
              value={prefs.budget}
              onChange={(event) => onChange({ budget: Number(event.target.value) })}
              style={{ "--progress": `${budgetProgress}%` } as CSSProperties}
              className="range-input mt-4 w-full"
            />
            <div className="mt-2 flex justify-between text-[10px] text-white/35">
              <span>{t.planner.budgetMin}</span>
              <span>₹50,000</span>
              <span>{formatINR(200000, lang)}</span>
            </div>
          </div>
        </div>

        {/* Group Composition & Traveling With */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-bold text-white sm:text-sm">{t.planner.companions}</p>
              <p className="mt-0.5 text-xs text-white/45">{t.planner.groupDetails}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-bold text-teal">
              <Users size={13} aria-hidden="true" />
              {localizeDigits(travelers, lang)} {lang === "kn" ? "ಒಟ್ಟು ಪ್ರಯಾಣಿಕರು" : "Total Travelers"}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {COMPANIONS.map((companion) => {
              const active = prefs.companions === companion;
              const Icon = companionIcons[companion];
              return (
                <button
                  key={companion}
                  type="button"
                  onClick={() => onChange({ companions: companion })}
                  className={`flex items-center gap-2 rounded-xl border p-2.5 transition ${
                    active
                      ? "border-gold bg-gold/15 text-white font-semibold"
                      : "border-white/10 bg-white/[0.035] text-white/60 hover:text-white"
                  }`}
                >
                  <Icon size={14} className={active ? "text-gold" : "text-white/40"} aria-hidden="true" />
                  <span className="text-xs">{t.planner.companionOptions[companion]}</span>
                </button>
              );
            })}
          </div>

          {/* Group member breakdown: Adults, Kids, Seniors */}
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/10 pt-3">
            <div className="flex flex-col items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
              <span className="text-[11px] font-medium text-white/70">{t.planner.adults}</span>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateAdults(-1)}
                  className="grid h-6 w-6 place-items-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-gold/20"
                >
                  <Minus size={11} />
                </button>
                <span className="w-5 text-center font-display text-sm font-bold text-gold">
                  {localizeDigits(adults, lang)}
                </span>
                <button
                  type="button"
                  onClick={() => updateAdults(1)}
                  className="grid h-6 w-6 place-items-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-gold/20"
                >
                  <Plus size={11} />
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
              <span className="text-[11px] font-medium text-white/70">{t.planner.kids}</span>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateKids(-1)}
                  className="grid h-6 w-6 place-items-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-gold/20"
                >
                  <Minus size={11} />
                </button>
                <span className="w-5 text-center font-display text-sm font-bold text-gold">
                  {localizeDigits(kids, lang)}
                </span>
                <button
                  type="button"
                  onClick={() => updateKids(1)}
                  className="grid h-6 w-6 place-items-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-gold/20"
                >
                  <Plus size={11} />
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
              <span className="text-[11px] font-medium text-white/70">{t.planner.seniors}</span>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateSeniors(-1)}
                  className="grid h-6 w-6 place-items-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-gold/20"
                >
                  <Minus size={11} />
                </button>
                <span className="w-5 text-center font-display text-sm font-bold text-gold">
                  {localizeDigits(seniors, lang)}
                </span>
                <button
                  type="button"
                  onClick={() => updateSeniors(1)}
                  className="grid h-6 w-6 place-items-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-gold/20"
                >
                  <Plus size={11} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dietary & Stay Style Preferences */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
            <label className="flex items-center gap-2 text-xs font-bold text-white sm:text-sm">
              <UtensilsCrossed size={14} className="text-coral" aria-hidden="true" />
              {t.planner.dietTitle}
            </label>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {(["Any", "Vegetarian", "Pure Veg", "Non-Veg"] as DietPreference[]).map((diet) => {
                const active = (prefs.diet ?? "Any") === diet;
                return (
                  <button
                    key={diet}
                    type="button"
                    onClick={() => onChange({ diet })}
                    className={`rounded-xl border p-2 text-left text-xs transition ${
                      active
                        ? "border-coral bg-coral/15 font-semibold text-white"
                        : "border-white/10 bg-white/[0.03] text-white/60 hover:text-white"
                    }`}
                  >
                    {t.planner.diets[diet]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
            <label className="flex items-center gap-2 text-xs font-bold text-white sm:text-sm">
              <Home size={14} className="text-teal" aria-hidden="true" />
              {t.planner.stayTitle}
            </label>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {(["Any", "Homestay", "Heritage", "Budget", "Comfort", "Luxury"] as StayPreference[]).map(
                (stayPref) => {
                  const active = (prefs.stayPref ?? "Any") === stayPref;
                  return (
                    <button
                      key={stayPref}
                      type="button"
                      onClick={() => onChange({ stayPref })}
                      className={`rounded-xl border p-2 text-left text-xs transition ${
                        active
                          ? "border-teal bg-teal/15 font-semibold text-white"
                          : "border-white/10 bg-white/[0.03] text-white/60 hover:text-white"
                      }`}
                    >
                      {t.planner.stays[stayPref]}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Travel Style, Starting City & Month */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="travel-style" className="mb-2 flex items-center gap-2 text-xs font-semibold text-white/70">
              <Compass size={14} className="text-gold" aria-hidden="true" />
              {t.planner.style}
            </label>
            <div className="relative">
              <select
                id="travel-style"
                value={prefs.style}
                onChange={(event) => onChange({ style: event.target.value as TravelStyle })}
                className="h-12 w-full appearance-none rounded-xl border border-white/15 bg-[#111126]/80 px-3.5 pr-10 text-sm font-medium text-white outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/30"
              >
                {TRAVEL_STYLES.map((style) => (
                  <option key={style} value={style} className="bg-[#111126]">
                    {t.planner.styles[style]}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/70">▾</span>
            </div>
          </div>

          <div>
            <label htmlFor="start-city" className="mb-2 flex items-center gap-2 text-xs font-semibold text-white/70">
              <MapPin size={14} className="text-gold" aria-hidden="true" />
              {t.planner.startingCity}
            </label>
            <div className="relative">
              <select
                id="start-city"
                value={prefs.startCity}
                onChange={(event) => onChange({ startCity: event.target.value as City })}
                className="h-12 w-full appearance-none rounded-xl border border-white/15 bg-[#111126]/80 px-3.5 pr-10 text-sm font-medium text-white outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/30"
              >
                {START_CITIES.map((city) => (
                  <option key={city} value={city} className="bg-[#111126]">
                    {t.planner.cities[city] ?? city}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/70">▾</span>
            </div>
          </div>

          <div>
            <label htmlFor="travel-month" className="mb-2 flex items-center gap-2 text-xs font-semibold text-white/70">
              <CalendarDays size={14} className="text-gold" aria-hidden="true" />
              {t.planner.travelMonth}
            </label>
            <div className="relative">
              <select
                id="travel-month"
                value={prefs.month}
                onChange={(event) => onChange({ month: Number(event.target.value) })}
                className="h-12 w-full appearance-none rounded-xl border border-white/15 bg-[#111126]/80 px-3.5 pr-10 text-sm font-medium text-white outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/30"
              >
                {t.planner.months.map((month, index) => (
                  <option key={month} value={index + 1} className="bg-[#111126]">
                    {month}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/70">▾</span>
            </div>
          </div>
        </div>

        {/* Live Seasonal Advisory Banner for Chosen Month */}
        <div className="mt-3.5 flex items-start gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/[0.05] p-3 text-xs text-amber-200/90">
          <Info size={14} className="mt-0.5 shrink-0 text-amber-400" aria-hidden="true" />
          <p className="leading-relaxed">
            {lang === "kn" ? advisory.kn : advisory.en}
          </p>
        </div>

        {savedPlaces.length > 0 ? (
          <div className="mt-6 rounded-2xl border border-gold/20 bg-gold/[0.055] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="flex items-center gap-2 text-xs font-semibold text-gold">
                <Sparkles size={13} aria-hidden="true" />
                {t.planner.savedTitle}
              </p>
              <span className="text-[10px] font-medium text-white/45">{t.planner.mustVisitHint}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {savedPlaces.map((place) => (
                <span
                  key={place.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] py-1 pl-3 pr-1.5 text-[11px] font-medium text-white/75"
                >
                  {lang === "kn" ? place.name_kn : place.name_en}
                  <button
                    type="button"
                    onClick={() => onRemoveSaved(place.id)}
                    className="grid h-5 w-5 place-items-center rounded-full text-white/45 transition hover:bg-white/10 hover:text-white"
                    aria-label={`${t.common.clear} ${lang === "kn" ? place.name_kn : place.name_en}`}
                  >
                    <X size={11} aria-hidden="true" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row-reverse">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={loading || reduceMotion ? undefined : { y: -2 }}
            whileTap={loading || reduceMotion ? undefined : { scale: 0.985 }}
            className="cta-glow inline-flex min-h-[54px] flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F5B301] via-[#FFC93C] to-[#FF7A59] px-6 py-3 text-sm font-bold text-[#1a1205] shadow-[0_14px_38px_rgba(245,179,1,0.24)] transition hover:shadow-[0_18px_50px_rgba(245,179,1,0.36)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-base disabled:shadow-none sm:text-base"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                {t.planner.submitting}
              </>
            ) : (
              <>
                <Sparkles size={18} aria-hidden="true" />
                {t.planner.submit}
              </>
            )}
          </motion.button>
          <motion.button
            type="button"
            onClick={randomize}
            disabled={loading}
            whileHover={loading || reduceMotion ? undefined : { y: -2 }}
            whileTap={loading || reduceMotion ? undefined : { scale: 0.985 }}
            className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.07] px-5 py-3 text-sm font-semibold text-white/80 backdrop-blur-xl transition hover:border-gold/50 hover:bg-white/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Shuffle size={17} aria-hidden="true" />
            <span>
              {t.planner.surprise}
              <span className="ml-2 hidden text-[10px] font-medium text-white/40 lg:inline">
                {t.planner.surpriseHint}
              </span>
            </span>
          </motion.button>
        </div>
      </fieldset>
    </form>
  );
}

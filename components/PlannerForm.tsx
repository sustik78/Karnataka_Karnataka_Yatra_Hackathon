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
  Landmark,
  Leaf,
  Loader2,
  MapPin,
  Mountain,
  PartyPopper,
  PawPrint,
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
import type { Category, City, Companion, Place, Prefs, TravelStyle } from "@/lib/types";
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
  Photography: Camera
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
  const budgetProgress = ((prefs.budget - 3000) / (100000 - 3000)) * 100;
  const dailyBudget =
    prefs.budget / Math.max(1, prefs.days) / Math.max(1, getTravelerCount(prefs.companions));
  const budgetTier = dailyBudget < 4000 ? "Budget" : dailyBudget < 9000 ? "Comfort" : "Luxury";
  const hoverMotion = reduceMotion ? {} : { y: -2, scale: 1.015 };

  const toggleInterest = (category: Category) => {
    const exists = prefs.interests.includes(category);
    const next = exists
      ? prefs.interests.filter((interest) => interest !== category)
      : [...prefs.interests, category];
    onChange({ interests: next });
    if (next.length > 0) setInterestError(false);
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
      budget: 12000 + Math.floor(Math.random() * 58) * 1000,
      style: styles[Math.floor(Math.random() * styles.length)],
      companions: companions[Math.floor(Math.random() * companions.length)],
      startCity: cities[Math.floor(Math.random() * cities.length)],
      month: 1 + Math.floor(Math.random() * 12),
      seed: Math.floor(Math.random() * 10000)
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
            <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
              {t.planner.title}
            </h3>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium text-white/60 sm:flex">
            <Sparkles size={12} className="text-gold" aria-hidden="true" />
            {t.brandSubtitle}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h4 className="text-sm font-semibold text-white sm:text-base">{t.planner.interests}</h4>
              <p className="mt-1 text-xs text-white/55">{t.planner.interestsHint}</p>
            </div>
            <span className="rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-[11px] font-semibold text-gold/80">
              {localizeDigits(prefs.interests.length, lang)} / {localizeDigits(CATEGORIES.length, lang)}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            {CATEGORIES.map((category) => {
              const Icon = interestIcons[category];
              const active = prefs.interests.includes(category);
              return (
                <motion.button
                  key={category}
                  type="button"
                  whileHover={hoverMotion}
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  aria-pressed={active}
                  onClick={() => toggleInterest(category)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:text-sm ${
                    active
                      ? "border-gold/65 bg-gold/15 text-gold shadow-[0_0_24px_rgba(245,179,1,0.12)]"
                      : "border-white/15 bg-white/[0.055] text-white/70 hover:border-white/30 hover:bg-white/[0.085] hover:text-white"
                  }`}
                >
                  <Icon size={15} aria-hidden="true" />
                  {t.planner.categories[category]}
                </motion.button>
              );
            })}
          </div>

          {interestError ? (
            <p role="alert" className="mt-3 flex items-center gap-2 text-xs font-medium text-coral">
              <AlertCircle size={14} aria-hidden="true" />
              {t.planner.interestError}
            </p>
          ) : null}
        </div>

        <div className="mt-8 grid gap-7 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="trip-days" className="flex items-center gap-2 text-sm font-semibold text-white">
                <CalendarDays size={16} className="text-gold" aria-hidden="true" />
                {t.planner.days}
              </label>
              <span className="rounded-full bg-white/[0.08] px-3 py-1 text-sm font-bold text-gold">
                {localizeDigits(prefs.days, lang)} {t.planner.daysUnit}
              </span>
            </div>
            <input
              id="trip-days"
              type="range"
              min={1}
              max={10}
              step={1}
              value={prefs.days}
              onChange={(event) => onChange({ days: Number(event.target.value) })}
              style={{ "--range-progress": `${daysProgress}%` } as CSSProperties}
              className="mt-5"
              aria-valuetext={`${localizeDigits(prefs.days, lang)} ${t.planner.daysUnit}`}
            />
            <div className="mt-2 flex justify-between text-[10px] font-medium text-white/35">
              <span>{localizeDigits(1, lang)}</span>
              <span>{localizeDigits(10, lang)}</span>
            </div>
            <p className="mt-3 text-xs text-white/50">{t.planner.daysHint}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="trip-budget" className="flex items-center gap-2 text-sm font-semibold text-white">
                <Wallet size={16} className="text-gold" aria-hidden="true" />
                {t.planner.budget}
              </label>
              <div className="text-right">
                <span className="block text-sm font-bold text-gold">{formatINR(prefs.budget, lang)}</span>
                <span aria-live="polite" className="text-[10px] font-medium text-white/45">
                  {t.planner.budgetTier}: {t.planner.tiers[budgetTier]}
                </span>
              </div>
            </div>
            <input
              id="trip-budget"
              type="range"
              min={3000}
              max={100000}
              step={1000}
              value={prefs.budget}
              onChange={(event) => onChange({ budget: Number(event.target.value) })}
              style={{ "--range-progress": `${budgetProgress}%` } as CSSProperties}
              className="mt-5"
              aria-valuetext={formatINR(prefs.budget, lang)}
            />
            <div className="mt-2 flex justify-between text-[10px] font-medium text-white/35">
              <span>{t.planner.budgetMin}</span>
              <span>{t.planner.budgetMax}</span>
            </div>
            <p className="mt-3 text-xs text-white/50">{t.planner.budgetHint}</p>
          </div>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-2">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
              <Compass size={15} className="text-gold" aria-hidden="true" />
              {t.planner.style}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {TRAVEL_STYLES.map((style) => {
                const Icon = styleIcons[style];
                const active = prefs.style === style;
                return (
                  <button
                    key={style}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onChange({ style })}
                    className={`flex min-h-12 items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                      active
                        ? "border-gold/55 bg-gold/[0.12] text-gold"
                        : "border-white/10 bg-white/[0.045] text-white/65 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    <Icon size={15} aria-hidden="true" />
                    {t.planner.styles[style]}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
              <Users size={15} className="text-gold" aria-hidden="true" />
              {t.planner.companions}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {COMPANIONS.map((companion) => {
                const Icon = companionIcons[companion];
                const active = prefs.companions === companion;
                return (
                  <button
                    key={companion}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onChange({ companions: companion })}
                    className={`flex min-h-12 items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                      active
                        ? "border-gold/55 bg-gold/[0.12] text-gold"
                        : "border-white/10 bg-white/[0.045] text-white/65 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    <Icon size={15} aria-hidden="true" />
                    {t.planner.companionOptions[companion]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
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
                  <option key={city} value={city}>
                    {t.planner.cities[city]}
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
                  <option key={month} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/70">▾</span>
            </div>
          </div>
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

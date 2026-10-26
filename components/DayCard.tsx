"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Camera,
  Castle,
  Coffee,
  Compass,
  Droplets,
  Flame,
  Landmark,
  Lightbulb,
  MapPin,
  Mountain,
  PawPrint,
  RefreshCw,
  Route,
  Sparkles,
  Sun,
  Sunrise,
  Sunset,
  Ticket,
  Timer,
  UtensilsCrossed,
  Waves
} from "lucide-react";
import type { Category, Day, DaySlot, Stop } from "@/lib/types";
import { REGION_NAMES_KN } from "@/data/places";
import { placePhoto } from "@/data/photos";
import { useLang } from "@/i18n/LangProvider";
import { dayLabel, formatDuration, formatINR, localizeDigits, localizeTime } from "@/lib/format";

const DAY_COLORS = ["#F5B301", "#10B981", "#0EA5E9", "#FF7A59", "#7C5CFF", "#14B8A6", "#E11D48", "#84CC16"];

const categoryIcons: Record<Category, typeof Landmark> = {
  Heritage: Castle,
  Temples: Landmark,
  Wildlife: PawPrint,
  Beaches: Waves,
  "Hills & Trekking": Mountain,
  Waterfalls: Droplets,
  "Coffee Estates": Coffee,
  Food: UtensilsCrossed,
  Adventure: Compass,
  Spiritual: Flame,
  Photography: Camera
};

const slotIcons = {
  morning: Sunrise,
  afternoon: Sun,
  evening: Sunset
};

interface DayCardProps {
  day: Day;
  index: number;
  onSwap: (dayIndex: number, stopIndex: number) => void;
}

export function DayCard({ day, index, onSwap }: DayCardProps) {
  const { lang, t } = useLang();
  const reduceMotion = useReducedMotion();
  const color = DAY_COLORS[index % DAY_COLORS.length];
  const slots: DaySlot[] = ["morning", "afternoon", "evening"];
  const theme = lang === "kn" ? day.theme_kn : day.theme_en;

  return (
    <motion.article
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.25), ease: [0.22, 1, 0.36, 1] }}
      className="glass relative overflow-hidden rounded-[1.75rem] p-4 sm:p-6 print-card"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1"
        style={{ background: `linear-gradient(90deg, ${color}, transparent 75%)` }}
      />
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-[0.09] blur-2xl"
        style={{ background: color }}
      />

      <header className="relative flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3.5">
          <div
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/20 text-sm font-extrabold text-[#171006] shadow-lg"
            style={{ background: `linear-gradient(135deg, ${color}, #FF7A59)` }}
          >
            {localizeDigits(day.day, lang)}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{dayLabel(day.day, lang)}</h3>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold text-white/60">
                <MapPin size={11} style={{ color }} aria-hidden="true" />
                {lang === "kn" ? REGION_NAMES_KN[day.region] : day.region}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-white/75 sm:text-base">{theme}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-medium text-white/55">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles size={12} style={{ color }} aria-hidden="true" />
            {localizeDigits(day.stops.length, lang)} {t.result.timeline.stops}
          </span>
          <span className="h-3 w-px bg-white/15" />
          <span className="inline-flex items-center gap-1.5">
            <Route size={12} style={{ color }} aria-hidden="true" />
            {localizeDigits(day.travelKm, lang)} {lang === "kn" ? "ಕಿಮೀ" : "km"}
          </span>
        </div>
      </header>

      <div className="relative mt-5 space-y-5">
        {slots.map((slot) => {
          const entries = day.stops
            .map((stop, stopIndex) => ({ stop, stopIndex }))
            .filter(({ stop }) => stop.slot === slot);
          if (entries.length === 0) return null;
          const SlotIcon = slotIcons[slot];
          return (
            <div key={slot}>
              <div className="mb-2.5 flex items-center gap-2">
                <span
                  className="grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-white/[0.06]"
                  style={{ color }}
                >
                  <SlotIcon size={14} aria-hidden="true" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                  {t.result.slots[slot]}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
              </div>

              <div className="space-y-3">
                {entries.map(({ stop, stopIndex }) => (
                  <StopCard
                    key={`${stop.place.id}-${stopIndex}`}
                    stop={stop}
                    stopIndex={stopIndex}
                    dayIndex={index}
                    color={color}
                    onSwap={onSwap}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.article>
  );
}

interface StopCardProps {
  stop: Stop;
  stopIndex: number;
  dayIndex: number;
  color: string;
  onSwap: (dayIndex: number, stopIndex: number) => void;
}

function StopCard({ stop, stopIndex, dayIndex, color, onSwap }: StopCardProps) {
  const { lang, t } = useLang();
  const reduceMotion = useReducedMotion();
  const place = stop.place;
  const name = lang === "kn" ? place.name_kn : place.name_en;
  const description = lang === "kn" ? place.desc_kn : place.desc_en;
  const dish = lang === "kn" ? place.dish_kn : place.dish_en;
  const tip = lang === "kn" ? place.tip_kn : place.tip_en;
  const why = lang === "kn" ? stop.why_kn : stop.why_en;
  const PrimaryIcon = categoryIcons[place.categories[0] ?? "Heritage"];

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.055] sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/15 sm:h-24 sm:w-24">
            <img
              src={placePhoto(place.id)}
              alt={name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <span
              className="absolute bottom-1 right-1 grid h-6 w-6 place-items-center rounded-lg border border-white/20 bg-black/45 backdrop-blur-sm"
              style={{ color }}
            >
              <PrimaryIcon size={12} aria-hidden="true" />
            </span>
          </div>
          <div className="min-w-0">
            <h4 className="font-display text-lg font-bold leading-snug text-white sm:text-xl">{name}</h4>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {place.categories.slice(0, 3).map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-white/10 bg-white/[0.045] px-2 py-0.5 text-[9px] font-semibold text-white/50"
                >
                  {t.planner.categories[category]}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onSwap(dayIndex, stopIndex)}
          aria-label={`${t.result.stop.swap} ${name}`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-1.5 text-[10px] font-semibold text-white/60 transition hover:border-gold/50 hover:bg-gold/10 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:text-[11px] print:hidden"
        >
          <RefreshCw size={12} aria-hidden="true" />
          {t.result.stop.swap}
        </button>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-white/65">{description}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-medium text-white/55 sm:text-[11px]">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.045] px-2.5 py-1">
          <Timer size={11} style={{ color }} aria-hidden="true" />
          {formatDuration(stop.durationHours, lang)}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.045] px-2.5 py-1">
          <Ticket size={11} style={{ color }} aria-hidden="true" />
          {stop.place.entryFeeINR === 0
            ? t.result.stop.free
            : `${t.result.stop.entry} · ${formatINR(stop.place.entryFeeINR, lang)}`}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.045] px-2.5 py-1">
          <Sunrise size={11} style={{ color }} aria-hidden="true" />
          {t.result.stop.start} {localizeTime(stop.startTime, lang)}
        </span>
      </div>

      <div className="mt-3 rounded-xl border border-gold/20 bg-gold/[0.06] px-3 py-2.5">
        <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-gold/85">
          <Sparkles size={12} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>
            <span className="font-semibold">{t.result.stop.why}: </span>
            {why}
          </span>
        </p>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2.5">
          <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-coral/80">
            <UtensilsCrossed size={10} aria-hidden="true" />
            {t.result.stop.dish}
          </p>
          <p className="mt-1 text-xs font-medium text-white/75">{dish}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2.5">
          <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-teal/90">
            <Lightbulb size={10} aria-hidden="true" />
            {t.result.stop.tip}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/65">{tip}</p>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { CalendarDays, MapPin, PartyPopper, Sparkles, UtensilsCrossed } from "lucide-react";
import { useMemo, useState } from "react";
import type { Dish, Region } from "@/lib/types";
import {
  DISHES_BY_REGION,
  FESTIVALS,
  REGION_NAMES_EN,
  REGION_NAMES_KN
} from "@/data/places";
import { useLang } from "@/i18n/LangProvider";
import { SectionHeading } from "@/components/SectionHeading";

const REGIONS = Object.keys(REGION_NAMES_EN) as Region[];

export function FoodFestivals() {
  const { lang, t } = useLang();
  const [activeRegion, setActiveRegion] = useState<Region | "All">("All");

  const dishes = useMemo(() => {
    if (activeRegion === "All") {
      return REGIONS.map((region) => DISHES_BY_REGION[region]?.[0]).filter(
        (dish): dish is Dish => Boolean(dish)
      );
    }
    return DISHES_BY_REGION[activeRegion] ?? [];
  }, [activeRegion]);

  const festivals = useMemo(() => {
    if (activeRegion === "All") return FESTIVALS;
    return FESTIVALS.filter(
      (festival) => festival.region === "All" || festival.region === activeRegion
    );
  }, [activeRegion]);

  return (
    <section id="food" className="relative scroll-mt-24 print:hidden">
      <SectionHeading eyebrow={t.food.eyebrow} title={t.food.title} subtitle={t.food.subtitle} />

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label={t.destinations.region}>
        <button
          type="button"
          aria-pressed={activeRegion === "All"}
          onClick={() => setActiveRegion("All")}
          className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
            activeRegion === "All"
              ? "border-gold/55 bg-gold/15 text-gold"
              : "border-white/10 bg-white/[0.035] text-white/55 hover:border-white/25 hover:text-white"
          }`}
        >
          {t.destinations.all}
        </button>
        {REGIONS.map((region) => {
          const active = activeRegion === region;
          return (
            <button
              key={region}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveRegion(region)}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                active
                  ? "border-gold/55 bg-gold/15 text-gold"
                  : "border-white/10 bg-white/[0.035] text-white/55 hover:border-white/25 hover:text-white"
              }`}
            >
              {lang === "kn" ? REGION_NAMES_KN[region] : region}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <div className="glass rounded-[1.75rem] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-coral/25 bg-coral/10 text-coral">
                <UtensilsCrossed size={18} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-white">{t.food.dishesTitle}</h3>
                <p className="mt-1 text-xs text-white/50">{t.food.dishesSubtitle}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {dishes.map((dish) => (
                <div
                  key={dish.id}
                  className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-4 transition hover:border-coral/30"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-lg border border-coral/20 bg-coral/[0.07] text-coral">
                      <UtensilsCrossed size={14} aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] font-medium text-white/45">
                      {t.food.from} {lang === "kn" ? REGION_NAMES_KN[dish.region] : dish.region}
                    </span>
                  </div>
                  <h4 className="mt-3 text-sm font-semibold text-white">
                    {lang === "kn" ? dish.name_kn : dish.name_en}
                  </h4>
                  <p className="mt-0.5 text-[11px] text-white/35">
                    {lang === "kn" ? dish.name_en : dish.name_kn}
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/55">
                    {lang === "kn" ? dish.desc_kn : dish.desc_en}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/25">
              <Sparkles size={10} className="text-gold/60" aria-hidden="true" />
              {t.hero.tourismNote}
            </div>
          </div>
        </div>

        <div className="xl:col-span-5">
          <div className="glass h-full rounded-[1.75rem] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-maroon/40 bg-maroon/15 text-gold">
                <PartyPopper size={18} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-white">{t.food.festivalsTitle}</h3>
                <p className="mt-1 text-xs text-white/50">{t.food.festivalsSubtitle}</p>
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              {festivals.map((festival) => (
                <div
                  key={festival.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-3.5 transition hover:border-gold/25"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {lang === "kn" ? festival.name_kn : festival.name_en}
                      </p>
                      <p className="mt-0.5 text-[10px] text-white/35">
                        {lang === "kn" ? festival.name_en : festival.name_kn}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[8px] font-medium text-white/45">
                      <MapPin size={8} aria-hidden="true" />
                      {festival.region === "All"
                        ? t.food.statewide
                        : lang === "kn"
                          ? REGION_NAMES_KN[festival.region]
                          : festival.region}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/50">
                    {lang === "kn" ? festival.desc_kn : festival.desc_en}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-[9px] text-white/35">
                    <CalendarDays size={9} className="text-gold/60" aria-hidden="true" />
                    <span>{t.food.season}:</span>
                    <span>{festival.months.map((month) => t.planner.months[month - 1]).join(" · ")}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

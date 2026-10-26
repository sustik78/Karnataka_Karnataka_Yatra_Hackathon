"use client";

import { CalendarDays, MapPin, PartyPopper } from "lucide-react";
import { FESTIVALS, REGION_NAMES_KN } from "@/data/places";
import { useLang } from "@/i18n/LangProvider";
import type { Region } from "@/lib/types";

interface FestivalsCardProps {
  regions: Region[];
  month: number;
}

export function FestivalsCard({ regions, month }: FestivalsCardProps) {
  const { lang, t } = useLang();
  const relevant = FESTIVALS.filter(
    (festival) => festival.region === "All" || regions.includes(festival.region)
  ).sort((a, b) => {
    const aSeason = a.months.includes(month) ? 0 : 1;
    const bSeason = b.months.includes(month) ? 0 : 1;
    return aSeason - bSeason;
  });

  return (
    <div className="glass rounded-[1.75rem] p-5 sm:p-6 print-card">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-maroon/40 bg-maroon/15 text-gold">
          <PartyPopper size={18} aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-white">{t.festivals.title}</h3>
          <p className="mt-1 text-xs text-white/50">{t.festivals.subtitle}</p>
        </div>
      </div>

      {relevant.length === 0 ? (
        <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.035] p-4 text-xs text-white/50">
          {t.festivals.none}
        </p>
      ) : (
        <div className="mt-5 grid gap-2.5 md:grid-cols-2">
          {relevant.map((festival) => {
            const name = lang === "kn" ? festival.name_kn : festival.name_en;
            const otherName = lang === "kn" ? festival.name_en : festival.name_kn;
            const description = lang === "kn" ? festival.desc_kn : festival.desc_en;
            const region =
              festival.region === "All"
                ? t.festivals.statewide
                : lang === "kn"
                  ? REGION_NAMES_KN[festival.region]
                  : festival.region;
            const inSeason = festival.months.includes(month);
            return (
              <div
                key={festival.id}
                className={`rounded-2xl border p-3.5 transition ${
                  inSeason
                    ? "border-gold/30 bg-gold/[0.055]"
                    : "border-white/10 bg-white/[0.035]"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="mt-0.5 text-[11px] text-white/40">{otherName}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.045] px-2 py-0.5 text-[9px] font-medium text-white/55">
                    <MapPin size={9} aria-hidden="true" />
                    {region}
                  </span>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-white/55">{description}</p>
                <div className="mt-2.5 flex items-center gap-1.5 text-[9px] font-medium text-white/40">
                  <CalendarDays size={10} className="text-gold/70" aria-hidden="true" />
                  <span>{t.food.season}:</span>
                  <span>{festival.months.map((value) => t.planner.months[value - 1]).join(" · ")}</span>
                  {inSeason ? (
                    <span className="ml-auto rounded-full bg-gold/15 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-gold">
                      {t.festivals.inSeason}
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

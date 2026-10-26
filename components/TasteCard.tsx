"use client";

import { UtensilsCrossed } from "lucide-react";
import { DISHES_BY_REGION, REGION_NAMES_KN } from "@/data/places";
import { useLang } from "@/i18n/LangProvider";
import type { Region } from "@/lib/types";

interface TasteCardProps {
  regions: Region[];
}

export function TasteCard({ regions }: TasteCardProps) {
  const { lang, t } = useLang();
  const seen = new Set<string>();
  const dishes = regions.flatMap((region) => {
    const list = DISHES_BY_REGION[region] ?? [];
    return list.filter((dish) => {
      if (seen.has(dish.id)) return false;
      seen.add(dish.id);
      return true;
    });
  });

  return (
    <div className="glass h-full rounded-[1.75rem] p-5 sm:p-6 print-card">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-coral/25 bg-coral/10 text-coral">
          <UtensilsCrossed size={18} aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-white">{t.taste.title}</h3>
          <p className="mt-1 text-xs text-white/50">{t.taste.subtitle}</p>
        </div>
      </div>

      {dishes.length === 0 ? (
        <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.035] p-4 text-xs text-white/50">
          {t.taste.empty}
        </p>
      ) : (
        <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.055] to-transparent p-3.5 transition hover:border-coral/30"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    {lang === "kn" ? dish.name_kn : dish.name_en}
                  </p>
                  <p className="mt-0.5 text-[11px] text-white/40">
                    {lang === "kn" ? dish.name_en : dish.name_kn}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-coral/20 bg-coral/[0.07] px-2 py-0.5 text-[9px] font-semibold text-coral/85">
                  {t.food.from} {lang === "kn" ? REGION_NAMES_KN[dish.region] : dish.region}
                </span>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-white/55">
                {lang === "kn" ? dish.desc_kn : dish.desc_en}
              </p>
            </div>
          ))}
        </div>
      )}

      <p className="mt-4 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/30">
        <span className="h-1 w-1 rounded-full bg-coral" />
        {t.taste.fromRoute}
      </p>
    </div>
  );
}

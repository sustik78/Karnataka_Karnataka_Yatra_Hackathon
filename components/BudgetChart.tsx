"use client";

import { useReducedMotion } from "framer-motion";
import { PieChart as PieIcon, Wallet } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { BudgetBreakdown } from "@/lib/types";
import { useLang } from "@/i18n/LangProvider";
import { formatINR } from "@/lib/format";

interface BudgetChartProps {
  budget: BudgetBreakdown;
}

const COLORS = ["#F5B301", "#FF7A59", "#0EA5E9", "#7C5CFF"];

export function BudgetChart({ budget }: BudgetChartProps) {
  const { lang, t } = useLang();
  const reduceMotion = useReducedMotion();

  const data = [
    { key: "stay", name: t.result.budgetChart.stay, value: budget.stay, color: COLORS[0] },
    { key: "food", name: t.result.budgetChart.food, value: budget.food, color: COLORS[1] },
    { key: "transport", name: t.result.budgetChart.transport, value: budget.transport, color: COLORS[2] },
    { key: "entry", name: t.result.budgetChart.entry, value: budget.entry, color: COLORS[3] }
  ].filter((item) => item.value > 0);

  return (
    <div className="glass flex h-full flex-col rounded-[1.75rem] p-5 sm:p-6 print-card">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
          <PieIcon size={18} aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-lg font-bold text-white sm:text-xl">{t.result.budgetChart.title}</h3>
          <p className="mt-1 text-xs text-white/50">{t.result.budgetChart.subtitle}</p>
        </div>
      </div>

      <div className="relative mt-3 h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={66}
              outerRadius={92}
              paddingAngle={4}
              cornerRadius={5}
              stroke="rgba(11,11,26,0.7)"
              strokeWidth={2}
              isAnimationActive={!reduceMotion}
              animationDuration={900}
            >
              {data.map((entry) => (
                <Cell key={entry.key} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || payload.length === 0) return null;
                const item = payload[0];
                const value = typeof item.value === "number" ? item.value : Number(item.value ?? 0);
                return (
                  <div className="glass-strong min-w-[150px] rounded-xl px-3 py-2 text-xs shadow-glass-lg">
                    <p className="flex items-center gap-2 font-semibold text-white/80">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: (item.payload as { color?: string } | undefined)?.color ?? "#F5B301" }}
                      />
                      {item.name}
                    </p>
                    <p className="mt-1 font-display text-base font-bold text-white">{formatINR(value, lang)}</p>
                  </div>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">
            {t.result.budgetChart.total}
          </span>
          <span className="mt-1 font-display text-xl font-bold text-white">{formatINR(budget.total, lang)}</span>
          <span className="mt-0.5 text-[9px] text-gold/70">
            {t.planner.tiers[budget.tier]}
          </span>
        </div>
      </div>

      <div className="mt-1 grid grid-cols-2 gap-2">
        {data.map((item) => (
          <div key={item.key} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-2.5 py-2">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: item.color }} />
            <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-white/55">{item.name}</span>
            <span className="text-[11px] font-semibold text-white/80">{formatINR(item.value, lang)}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs">
        <span className="flex items-center gap-1.5 text-white/50">
          <Wallet size={13} className="text-gold" aria-hidden="true" />
          {t.result.summary.perPerson}
        </span>
        <span className="font-display text-sm font-bold text-gold">{formatINR(budget.perPerson, lang)}</span>
      </div>
    </div>
  );
}

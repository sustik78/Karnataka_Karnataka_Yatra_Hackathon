"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  Compass,
  Copy,
  FileDown,
  Loader2,
  MapPin,
  Percent,
  Printer,
  RotateCcw,
  Share2,
  Sparkles,
  Target,
  Wallet
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Itinerary } from "@/lib/types";
import { REGION_NAMES_KN } from "@/data/places";
import { HERO_PHOTOS, placePhoto } from "@/data/photos";
import { useLang } from "@/i18n/LangProvider";
import { useToast } from "@/components/ToastProvider";
import { CountUp } from "@/components/CountUp";
import { DayCard } from "@/components/DayCard";
import { BudgetChart } from "@/components/BudgetChart";
import { TripMap } from "@/components/TripMap";
import { TasteCard } from "@/components/TasteCard";
import { FestivalsCard } from "@/components/FestivalsCard";
import { ItineraryPdf } from "@/components/ItineraryPdf";
import { swapItineraryStop } from "@/lib/planner";
import { exportItineraryPdf } from "@/lib/pdf";
import { dayLabel, formatDuration, formatINR, localizeDigits, localizeTime } from "@/lib/format";

interface ItineraryResultProps {
  plan: Itinerary;
  source: "gemini" | "template";
  onPlanChange: (plan: Itinerary) => void;
  onRegenerate: () => void;
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the legacy copy path.
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.appendChild(textarea);
    try {
      textarea.focus();
      textarea.select();
      return document.execCommand("copy");
    } finally {
      document.body.removeChild(textarea);
    }
  } catch {
    return false;
  }
}

export function ItineraryResult({ plan, source, onPlanChange, onRegenerate }: ItineraryResultProps) {
  const { lang, t } = useLang();
  const { push } = useToast();
  const reduceMotion = useReducedMotion();
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const pdfRootRef = useRef<HTMLDivElement>(null);

  const regions = useMemo(() => Array.from(new Set(plan.days.map((day) => day.region))), [plan.days]);
  const coverPhoto = plan.days[0]?.stops[0]?.place.id
    ? placePhoto(plan.days[0].stops[0].place.id)
    : HERO_PHOTOS.mysuru;
  const budget = plan.budget;
  const intro = lang === "kn" ? plan.intro_kn : plan.intro_en;
  const suggestion = lang === "kn" ? budget.suggestion_kn : budget.suggestion_en;
  const budgetUsedPercent = Math.round((budget.total / Math.max(1, plan.prefs.budget)) * 100);
  const progress = Math.min(100, budgetUsedPercent);
  const statusLabel =
    budget.status === "over"
      ? t.result.summary.over
      : budget.status === "exact"
        ? t.result.summary.exact
        : t.result.summary.under;
  const statusAmount =
    budget.status === "over"
      ? `${t.result.summary.overBy} ${formatINR(Math.abs(budget.difference), lang)}`
      : budget.status === "under"
        ? `${t.result.summary.underBy} ${formatINR(budget.difference, lang)}`
        : t.result.summary.exact;
  const statusStyles =
    budget.status === "over"
      ? "border-coral/30 bg-coral/[0.07] text-coral"
      : budget.status === "under"
        ? "border-teal/30 bg-teal/[0.07] text-teal"
        : "border-gold/30 bg-gold/[0.07] text-gold";

  const buildShareUrl = () => {
    const url = new URL(window.location.href);
    url.hash = `plan=${encodeURIComponent(JSON.stringify(plan.prefs))}`;
    return url.toString();
  };

  const buildText = () => {
    const lines: string[] = [];
    lines.push(t.result.copyHeading);
    lines.push("=".repeat(t.result.copyHeading.length));
    lines.push("");
    lines.push(intro);
    lines.push("");
    lines.push(`${t.result.summary.days}: ${localizeDigits(plan.days.length, lang)}`);
    lines.push(`${t.result.summary.places}: ${localizeDigits(plan.summary.places, lang)}`);
    lines.push(`${t.result.summary.estimated}: ${formatINR(budget.total, lang)}`);
    lines.push(`${t.result.summary.perPerson}: ${formatINR(budget.perPerson, lang)}`);
    lines.push(`${t.result.summary.match}: ${localizeDigits(plan.summary.matchScore, lang)}%`);
    lines.push("");
    plan.days.forEach((day) => {
      lines.push("");
      lines.push(`${dayLabel(day.day, lang)} — ${lang === "kn" ? day.theme_kn : day.theme_en}`);
      lines.push(lang === "kn" ? REGION_NAMES_KN[day.region] : day.region);
      day.stops.forEach((stop, index) => {
        const name = lang === "kn" ? stop.place.name_kn : stop.place.name_en;
        const why = lang === "kn" ? stop.why_kn : stop.why_en;
        const dish = lang === "kn" ? stop.place.dish_kn : stop.place.dish_en;
        const tip = lang === "kn" ? stop.place.tip_kn : stop.place.tip_en;
        lines.push(
          `  ${localizeDigits(index + 1, lang)}. ${name} · ${t.result.slots[stop.slot]} · ${localizeTime(stop.startTime, lang)} · ${formatDuration(stop.durationHours, lang)}`
        );
        lines.push(`     ${t.result.stop.why}: ${why}`);
        lines.push(`     ${t.result.stop.dish}: ${dish}`);
        lines.push(`     ${t.result.stop.tip}: ${tip}`);
      });
    });
    lines.push("");
    lines.push(`${t.result.budgetChart.title}: ${formatINR(budget.total, lang)}`);
    lines.push(`${t.result.summary.status}: ${statusLabel} (${statusAmount})`);
    lines.push(suggestion);
    lines.push("");
    lines.push(t.result.copyFooter);
    return lines.join("\n");
  };

  const handleCopy = async () => {
    setBusyAction("copy");
    const copied = await copyToClipboard(buildText());
    setBusyAction(null);
    if (copied) {
      push(t.result.actions.copied, "success");
    } else {
      push(t.toasts.copyFailed, "error");
    }
  };

  const handleDownload = async () => {
    if (busyAction) return;
    setBusyAction("pdf");
    try {
      if (!pdfRootRef.current) throw new Error("PDF root is not mounted");
      const date = new Date().toISOString().slice(0, 10);
      await exportItineraryPdf(
        pdfRootRef.current,
        `karnataka-yatra-${plan.prefs.days}-day-${date}.pdf`
      );
      push(t.result.actions.pdfDownloaded, "success");
    } catch {
      push(t.result.actions.pdfFailed, "error");
    } finally {
      setBusyAction(null);
    }
  };

  const handleShare = async () => {
    setBusyAction("share");
    const shareUrl = buildShareUrl();
    window.history.replaceState(null, "", shareUrl);

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: t.brand,
          text: t.result.copyHeading,
          url: shareUrl
        });
        setBusyAction(null);
        push(t.result.actions.shared, "success");
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          setBusyAction(null);
          return;
        }
      }
    }

    const copied = await copyToClipboard(shareUrl);
    setBusyAction(null);
    push(copied ? t.result.actions.shareCopied : t.result.actions.shareFailed, copied ? "success" : "error");
  };

  const handleWhatsApp = () => {
    const text = buildText();
    const shareUrl = buildShareUrl();
    const waMessage = `✨ *${t.result.copyHeading}* ✨\n\n${text}\n\n🔗 ${shareUrl}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, "_blank");
    push(t.result.actions.whatsappSharing ?? "Opening WhatsApp...", "info");
  };

  const handleSwap = (dayIndex: number, stopIndex: number) => {
    const next = swapItineraryStop(plan, dayIndex, stopIndex);
    if (next === plan) {
      push(t.result.stop.swapUnavailable, "info");
      return;
    }
    onPlanChange(next);
    push(t.toasts.swapped, "success");
  };

  return (
    <section id="itinerary" className="relative scroll-mt-28">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow">
              <Sparkles size={12} aria-hidden="true" />
              {t.result.eyebrow}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">
              <span className={`h-1.5 w-1.5 rounded-full ${source === "gemini" ? "bg-teal" : "bg-gold"}`} />
              {source === "gemini" ? t.result.aiNote.gemini : t.result.aiNote.local}
            </span>
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.result.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55">{t.result.subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-2 print:hidden">
          <button
            type="button"
            onClick={onRegenerate}
            className="glass inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-semibold text-white/75 transition hover:border-gold/40 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <RotateCcw size={13} aria-hidden="true" />
            {t.result.actions.regenerate}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            disabled={busyAction === "copy"}
            className="glass inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-semibold text-white/75 transition hover:border-gold/40 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-60"
          >
            <Copy size={13} aria-hidden="true" />
            {t.result.actions.copy}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="glass inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-semibold text-white/75 transition hover:border-gold/40 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Printer size={13} aria-hidden="true" />
            {t.result.actions.print}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={busyAction === "pdf"}
            className="glass inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-semibold text-white/75 transition hover:border-gold/40 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-60"
          >
            {busyAction === "pdf" ? (
              <Loader2 size={13} className="animate-spin" aria-hidden="true" />
            ) : (
              <FileDown size={13} aria-hidden="true" />
            )}
            {busyAction === "pdf" ? t.result.actions.preparingPdf : t.result.actions.downloadPdf}
          </button>
          <button
            type="button"
            onClick={handleWhatsApp}
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-3.5 py-2 text-[11px] font-bold text-emerald-300 transition hover:bg-emerald-500/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span className="text-emerald-400 font-bold">WhatsApp</span>
          </button>
          <button
            type="button"
            onClick={handleShare}
            disabled={busyAction === "share"}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold to-coral px-4 py-2 text-[11px] font-bold text-[#1a1205] shadow-gold transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b1a] disabled:opacity-60"
          >
            <Share2 size={13} aria-hidden="true" />
            {t.result.actions.share}
          </button>
        </div>
      </div>

      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="glass relative mt-6 overflow-hidden rounded-[1.75rem] print-card"
      >
        <div className="relative h-44 overflow-hidden sm:h-52">
          <img
            src={coverPhoto}
            alt={t.result.pdf.coverAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b1a] via-[#0b0b1a]/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
            <div className="flex flex-wrap gap-1.5">
              {regions.slice(0, 4).map((region) => (
                <span
                  key={region}
                  className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-[9px] font-semibold text-white/80 backdrop-blur-md"
                >
                  <MapPin size={9} className="text-gold" aria-hidden="true" />
                  {lang === "kn" ? REGION_NAMES_KN[region] : region}
                </span>
              ))}
            </div>
            <span className="hidden text-right text-[9px] text-white/45 sm:block">
              {t.hero.photoCredit}
            </span>
          </div>
        </div>

        <div className="relative p-5 sm:p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
              <Compass size={19} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold/75">
                {t.result.introLabel}
              </p>
              <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-white/75">{intro}</p>
            </div>
          </div>
          <div className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold ${statusStyles}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {statusLabel}
          </div>
        </div>

        <div className="relative mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-6">
          <SummaryCell icon={<CalendarDays size={14} />} label={t.result.summary.days} accent="text-gold">
            <CountUp value={plan.summary.days} />
          </SummaryCell>
          <SummaryCell icon={<MapPin size={14} />} label={t.result.summary.places} accent="text-coral">
            <CountUp value={plan.summary.places} />
          </SummaryCell>
          <SummaryCell icon={<Wallet size={14} />} label={t.result.summary.estimated} accent="text-gold">
            <CountUp value={plan.summary.estimatedCost} prefix="₹" />
          </SummaryCell>
          <SummaryCell icon={<Target size={14} />} label={t.result.summary.budget} accent="text-teal">
            <CountUp value={plan.summary.budget} prefix="₹" />
          </SummaryCell>
          <SummaryCell icon={<Percent size={14} />} label={t.result.summary.match} accent="text-teal">
            <CountUp value={plan.summary.matchScore} suffix="%" />
          </SummaryCell>
          <SummaryCell icon={<Sparkles size={14} />} label={t.result.summary.tier} accent="text-coral">
            {t.planner.tiers[plan.summary.budgetTier]}
          </SummaryCell>
        </div>

        <div className="relative mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <div className="flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
              <span>{t.result.summary.budgetUsed}</span>
              <span className={budget.status === "over" ? "text-coral" : "text-teal"}>
                {localizeDigits(budgetUsedPercent, lang)}%
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full border border-white/10 bg-white/[0.05]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: reduceMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-gold via-coral to-maroon"
              />
            </div>
          </div>
          <div className={`text-left text-[11px] font-semibold sm:text-right ${budget.status === "over" ? "text-coral" : "text-teal"}`}>
            {statusAmount}
          </div>
        </div>

        <div className={`mt-4 flex items-start gap-2 rounded-xl border px-3 py-2.5 ${statusStyles}`}>
          <Wallet size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-[11px] leading-relaxed text-white/70">{suggestion}</p>
        </div>
        </div>
      </motion.div>

      <div className="mt-5 grid gap-4 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <TripMap days={plan.days} />
        </div>
        <div className="xl:col-span-5">
          <BudgetChart budget={budget} />
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">{t.result.timeline.title}</h3>
            <p className="mt-1.5 max-w-2xl text-sm text-white/50">{t.result.timeline.subtitle}</p>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
            {t.result.timeline.dayPlan}
          </span>
        </div>
        <div className="space-y-4">
          {plan.days.map((day, index) => (
            <DayCard key={day.day} day={day} index={index} onSwap={handleSwap} />
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <TasteCard regions={regions} />
        <FestivalsCard regions={regions} month={plan.prefs.month} />
      </div>

      <p className="mt-5 text-center text-[10px] text-white/30 print:hidden">{t.result.copyFooter}</p>

      <div
        ref={pdfRootRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 z-[-10] print:hidden"
        style={{ left: "-20000px" }}
      >
        <ItineraryPdf plan={plan} />
      </div>
    </section>
  );
}

function SummaryCell({
  icon,
  label,
  accent,
  children
}: {
  icon: ReactNode;
  label: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
      <p className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/35">
        <span className={accent}>{icon}</span>
        {label}
      </p>
      <p className="mt-1.5 font-display text-lg font-bold leading-none text-white">{children}</p>
    </div>
  );
}

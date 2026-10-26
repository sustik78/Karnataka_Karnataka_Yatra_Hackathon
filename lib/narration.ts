import type { Itinerary, Lang, NarrationPayload } from "@/lib/types";

function cleanText(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

export function templateNarration(plan: Itinerary, lang: Lang): NarrationPayload {
  return {
    intro: lang === "kn" ? plan.intro_kn : plan.intro_en,
    days: plan.days.map((day) => ({
      theme: lang === "kn" ? day.theme_kn : day.theme_en,
      stops: day.stops.map((stop) => ({
        id: stop.place.id,
        why: lang === "kn" ? stop.why_kn : stop.why_en
      }))
    }))
  };
}

export function sanitizeNarration(input: unknown, plan: Itinerary, lang: Lang): NarrationPayload {
  const fallback = templateNarration(plan, lang);
  if (!input || typeof input !== "object") return fallback;

  const raw = input as Record<string, unknown>;
  const rawDays = Array.isArray(raw.days) ? raw.days : [];
  if (rawDays.length < plan.days.length) return fallback;
  const intro = cleanText(raw.intro, fallback.intro);

  const days = plan.days.map((planDay, dayIndex) => {
    const fallbackDay = fallback.days[dayIndex];
    const candidateDay =
      rawDays[dayIndex] && typeof rawDays[dayIndex] === "object"
        ? (rawDays[dayIndex] as Record<string, unknown>)
        : null;
    const theme = cleanText(candidateDay?.theme, fallbackDay.theme);
    const stopsValue = candidateDay?.stops;
    const rawStops: unknown[] = Array.isArray(stopsValue) ? stopsValue : [];

    const stops = planDay.stops.map((planStop, stopIndex) => {
      const fallbackStop = fallbackDay.stops[stopIndex];
      const byId = rawStops.find((candidate) => {
        if (!candidate || typeof candidate !== "object") return false;
        return (candidate as Record<string, unknown>).id === planStop.place.id;
      }) as Record<string, unknown> | undefined;
      const byIndex =
        rawStops[stopIndex] && typeof rawStops[stopIndex] === "object"
          ? (rawStops[stopIndex] as Record<string, unknown>)
          : undefined;
      const matchingId = byIndex?.id;
      const safeIndexStop =
        matchingId === undefined || matchingId === planStop.place.id ? byIndex : undefined;
      const candidate = byId ?? safeIndexStop;
      return {
        id: planStop.place.id,
        why: cleanText(candidate?.why, fallbackStop.why)
      };
    });

    return { theme, stops };
  });

  return { intro, days };
}

export function applyNarration(
  plan: Itinerary,
  narration: NarrationPayload,
  lang: Lang
): Itinerary {
  const safe = sanitizeNarration(narration, plan, lang);
  const days = plan.days.map((day, dayIndex) => {
    const narrativeDay = safe.days[dayIndex];
    if (!narrativeDay) return day;
    const stops = day.stops.map((stop, stopIndex) => {
      const narrativeStop = narrativeDay.stops[stopIndex];
      if (!narrativeStop) return stop;
      return {
        ...stop,
        why_en: lang === "en" ? narrativeStop.why : stop.why_en,
        why_kn: lang === "kn" ? narrativeStop.why : stop.why_kn
      };
    });
    return {
      ...day,
      theme_en: lang === "en" ? narrativeDay.theme : day.theme_en,
      theme_kn: lang === "kn" ? narrativeDay.theme : day.theme_kn,
      stops
    };
  });

  return {
    ...plan,
    days,
    intro_en: lang === "en" ? safe.intro : plan.intro_en,
    intro_kn: lang === "kn" ? safe.intro : plan.intro_kn
  };
}

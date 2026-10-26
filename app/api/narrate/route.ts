import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { buildItinerary } from "@/lib/planner";
import { sanitizeNarration, templateNarration } from "@/lib/narration";
import type { Itinerary, Lang, NarrationPayload } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 20;
const globalBuckets = globalThis as unknown as {
  __narrationBuckets?: Map<string, { count: number; resetAt: number }>;
};
const buckets =
  globalBuckets.__narrationBuckets ??
  (globalBuckets.__narrationBuckets = new Map<string, { count: number; resetAt: number }>());

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  if (buckets.size > 1000) {
    for (const [key, val] of buckets.entries()) {
      if (val.resetAt <= now) buckets.delete(key);
    }
  }
  const existing = buckets.get(identifier);
  if (!existing || existing.resetAt <= now) {
    buckets.set(identifier, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  existing.count += 1;
  return existing.count > RATE_LIMIT;
}

function parseJsonLoose(text: string): unknown {
  const trimmed = text.trim();
  const withoutFences = trimmed
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  const start = withoutFences.indexOf("{");
  const end = withoutFences.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON object found");
  }
  return JSON.parse(withoutFences.slice(start, end + 1));
}

function isPlanLike(value: unknown): value is Itinerary {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  if (!Array.isArray(candidate.days)) return false;
  return candidate.days.every((day) => {
    if (!day || typeof day !== "object") return false;
    const dayRecord = day as Record<string, unknown>;
    return Array.isArray(dayRecord.stops);
  });
}

function buildPrompt(plan: Itinerary, lang: Lang): string {
  const language = lang === "kn" ? "Kannada script (ಕನ್ನಡ)" : "English";
  const month = plan.prefs.month;
  const shortlist = plan.days
    .map((day) => {
      const stops = day.stops
        .map((stop) => {
          const dish = lang === "kn" ? stop.place.dish_kn : stop.place.dish_en;
          const tip = lang === "kn" ? stop.place.tip_kn : stop.place.tip_en;
          const description = lang === "kn" ? stop.place.desc_kn : stop.place.desc_en;
          return `- id: ${stop.place.id} | ${stop.place.name_en} / ${stop.place.name_kn} | ${description} | local dish: ${dish} | tip: ${tip}`;
        })
        .join("\n");
      return `Day ${day.day}, region ${day.region}, planned theme: ${lang === "kn" ? day.theme_kn : day.theme_en}\n${stops}`;
    })
    .join("\n\n");

  return [
    "You are a warm, precise travel writer for Karnataka Yatra, a Karnataka tourism planner.",
    `Write the narration in ${language}. Use natural, vivid language and local cultural detail.`,
    "Use ONLY the places in the shortlist below. Never invent a place, stop, id or day.",
    "Return ONLY valid JSON with this exact shape and no markdown:",
    '{"intro":"two warm sentences","days":[{"theme":"short evocative theme","stops":[{"id":"exact-place-id","why":"one sentence, max 24 words, explaining why it suits this traveller"}]}]}',
    "Keep the same number of days and stops, in the same order, and reuse each exact id.",
    "The intro should mention the starting city, duration, and travellers' interests.",
    `Traveller profile: ${plan.prefs.days} days, ${plan.prefs.style}, ${plan.prefs.companions}, starting in ${plan.prefs.startCity}, month ${month}, interests ${plan.prefs.interests.join(", ")}, budget tier ${plan.budget.tier}.`,
    "Shortlist:",
    shortlist
  ].join("\n");
}

function jsonNarration(narration: NarrationPayload, source: "gemini" | "template", extra?: Record<string, unknown>) {
  return NextResponse.json({ narration, source, ...extra });
}

export async function POST(request: Request) {
  try {
    const identifier =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "local";
    if (isRateLimited(identifier)) {
      return NextResponse.json(
        { error: "Too many narration requests. Please wait a minute." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    const bodyRecord =
      body && typeof body === "object" ? (body as Record<string, unknown>) : {};
    const lang: Lang = bodyRecord.lang === "kn" ? "kn" : "en";
    const rawPlan = bodyRecord.plan;

    if (!isPlanLike(rawPlan)) {
      const fallbackPlan = buildItinerary(bodyRecord.prefs ?? {});
      return jsonNarration(templateNarration(fallbackPlan, lang), "template", { fallback: true });
    }

    const plan = rawPlan;
    const key = process.env.GEMINI_API_KEY;
    const template = templateNarration(plan, lang);

    if (!key) {
      return jsonNarration(template, "template");
    }

    try {
      const client = new GoogleGenerativeAI(key);
      const model = client.getGenerativeModel({
        model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2200,
          responseMimeType: "application/json"
        }
      });
      const result = await model.generateContent(buildPrompt(plan, lang));
      const rawText = result.response.text();
      const parsed = parseJsonLoose(rawText);
      const parsedRecord = parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;
      const parsedDays = Array.isArray(parsedRecord?.days) ? parsedRecord.days : null;
      if (!parsedDays || parsedDays.length !== plan.days.length) {
        return jsonNarration(template, "template", { fallback: true });
      }
      const safe = sanitizeNarration(parsed, plan, lang);
      return jsonNarration(safe, "gemini");
    } catch {
      return jsonNarration(template, "template", { fallback: true });
    }
  } catch {
    try {
      const fallbackPlan = buildItinerary({});
      return jsonNarration(templateNarration(fallbackPlan, "en"), "template", { fallback: true });
    } catch {
      return NextResponse.json(
        { error: "Narration is unavailable right now." },
        { status: 500 }
      );
    }
  }
}

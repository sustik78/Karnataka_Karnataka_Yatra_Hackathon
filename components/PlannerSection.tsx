"use client";

import { AlertCircle, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { PLACES } from "@/data/places";
import type { Itinerary, NarrationResponse, Place, Prefs } from "@/lib/types";
import { buildItinerary, normalizePrefs } from "@/lib/planner";
import { applyNarration } from "@/lib/narration";
import { useLang } from "@/i18n/LangProvider";
import { useToast } from "@/components/ToastProvider";
import { PlannerForm } from "@/components/PlannerForm";
import { LoadingPlan } from "@/components/LoadingPlan";
import { ItineraryResult } from "@/components/ItineraryResult";
import { ADD_TO_TRIP_EVENT, readSavedPlaceIds, writeSavedPlaceIds } from "@/lib/storage";

export const APPLY_ASSISTANT_PLAN_EVENT = "karnataka-yatra-apply-assistant-plan";

const DEFAULT_PREFS: Prefs = {
  interests: ["Heritage", "Food"],
  days: 4,
  budget: 25000,
  style: "Balanced",
  companions: "Solo",
  startCity: "Bengaluru",
  month: 10,
  mustVisitIds: [],
  seed: 0
};

function placesFromIds(ids: string[]): Place[] {
  const unique = Array.from(new Set(ids));
  return unique
    .map((id) => PLACES.find((place) => place.id === id))
    .filter((place): place is Place => Boolean(place));
}

export function PlannerSection() {
  const { lang, t, ready } = useLang();
  const { push } = useToast();
  const reduceMotion = useReducedMotion();
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);
  const [plan, setPlan] = useState<Itinerary | null>(null);
  const [source, setSource] = useState<"gemini" | "template">("template");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const requestIdRef = useRef(0);
  const activePlanRef = useRef<Itinerary | null>(null);
  const lastRequestRef = useRef<Prefs | null>(null);
  const sharedHandledRef = useRef(false);
  const resultAreaRef = useRef<HTMLDivElement>(null);

  const scrollToResult = useCallback(() => {
    window.setTimeout(() => {
      resultAreaRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
    }, 80);
  }, [reduceMotion]);

  const applySavedPlaces = useCallback((next: Place[]) => {
    const seen = new Set<string>();
    const unique = next.filter((place) => {
      if (seen.has(place.id)) return false;
      seen.add(place.id);
      return true;
    });
    setSavedPlaces(unique);
    writeSavedPlaceIds(unique.map((place) => place.id));
    setPrefs((current) => ({ ...current, mustVisitIds: unique.map((place) => place.id) }));
  }, []);

  const hydrateSaved = useCallback(() => {
    const places = placesFromIds(readSavedPlaceIds());
    setSavedPlaces(places);
    setPrefs((current) => ({ ...current, mustVisitIds: places.map((place) => place.id) }));
  }, []);

  const addSavedPlace = useCallback(
    (place: Place) => {
      if (savedPlaces.some((saved) => saved.id === place.id)) {
        push(t.destinations.inYourTrip, "info");
        return;
      }
      const next = [...savedPlaces, place];
      applySavedPlaces(next);
      push(
        t.toasts.added.replace("{name}", lang === "kn" ? place.name_kn : place.name_en),
        "success"
      );
    },
    [applySavedPlaces, lang, push, savedPlaces, t.destinations.inYourTrip, t.toasts.added]
  );

  const removeSavedPlace = useCallback(
    (id: string) => {
      const next = savedPlaces.filter((place) => place.id !== id);
      applySavedPlaces(next);
    },
    [applySavedPlaces, savedPlaces]
  );

  const narratePlan = useCallback(
    async (basePlan: Itinerary, narrationLang: "en" | "kn", requestId: number) => {
      try {
        const response = await fetch("/api/narrate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan: basePlan, lang: narrationLang })
        });
        if (!response.ok) return;
        const data = (await response.json()) as NarrationResponse;
        if (requestId !== requestIdRef.current) return;
        if (activePlanRef.current !== basePlan) return;
        const narrated = applyNarration(basePlan, data.narration, narrationLang);
        activePlanRef.current = narrated;
        setPlan(narrated);
        setSource(data.source === "gemini" ? "gemini" : "template");
      } catch {
        // The locally built plan remains fully usable without narration.
      }
    },
    []
  );

  const runPlan = useCallback(
    async (inputPrefs: Prefs) => {
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      lastRequestRef.current = inputPrefs;
      setLoading(true);
      setError(false);
      setPlan(null);
      activePlanRef.current = null;
      setSource("template");

      let generated: Itinerary;
      try {
        const response = await fetch("/api/plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputPrefs)
        });
        if (!response.ok) throw new Error("Plan request failed");
        generated = (await response.json()) as Itinerary;
        if (!generated || !Array.isArray(generated.days) || generated.days.length === 0) {
          throw new Error("Invalid plan response");
        }
      } catch {
        try {
          generated = buildItinerary(inputPrefs);
        } catch {
          if (requestId === requestIdRef.current) {
            setLoading(false);
            setError(true);
          }
          return;
        }
      }

      if (requestId !== requestIdRef.current) return;
      activePlanRef.current = generated;
      setPlan(generated);
      setLoading(false);
      push(t.toasts.planReady, "success");
      scrollToResult();
      void narratePlan(generated, lang, requestId);
    },
    [lang, narratePlan, push, scrollToResult, t.toasts.planReady]
  );

  useEffect(() => {
    hydrateSaved();
  }, [hydrateSaved]);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ id?: unknown }>).detail;
      if (!detail || typeof detail.id !== "string") return;
      const place = PLACES.find((item) => item.id === detail.id);
      if (place) addSavedPlace(place);
    };
    window.addEventListener(ADD_TO_TRIP_EVENT, handler as EventListener);
    return () => window.removeEventListener(ADD_TO_TRIP_EVENT, handler as EventListener);
  }, [addSavedPlace]);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ prefs?: Partial<Prefs> }>).detail;
      if (!detail || !detail.prefs) return;
      setPrefs((current) => {
        const next = { ...current, ...detail.prefs };
        void runPlan(next);
        return next;
      });
    };
    window.addEventListener(APPLY_ASSISTANT_PLAN_EVENT, handler as EventListener);
    return () => window.removeEventListener(APPLY_ASSISTANT_PLAN_EVENT, handler as EventListener);
  }, [runPlan]);

  useEffect(() => {
    if (!ready || sharedHandledRef.current) return;
    sharedHandledRef.current = true;
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    try {
      const params = new URLSearchParams(hash);
      const raw = params.get("plan");
      if (!raw) return;
      const parsed = JSON.parse(raw) as unknown;
      const normalized = normalizePrefs(parsed);
      const sharedSaved = placesFromIds(normalized.mustVisitIds ?? []);
      const nextPrefs = { ...normalized, mustVisitIds: sharedSaved.map((place) => place.id) };
      setPrefs(nextPrefs);
      setSavedPlaces(sharedSaved);
      writeSavedPlaceIds(sharedSaved.map((place) => place.id));
      void runPlan(nextPrefs);
    } catch {
      // Ignore malformed share links and keep the normal planner available.
    }
  }, [ready, runPlan]);

  const handleChange = (patch: Partial<Prefs>) => {
    setPrefs((current) => ({
      ...current,
      ...patch,
      mustVisitIds: patch.mustVisitIds ?? savedPlaces.map((place) => place.id)
    }));
    if (error) setError(false);
  };

  const handleSubmit = () => {
    const nextPrefs = {
      ...prefs,
      mustVisitIds: savedPlaces.map((place) => place.id)
    };
    void runPlan(nextPrefs);
  };

  const handleRegenerate = () => {
    const nextPrefs: Prefs = {
      ...prefs,
      mustVisitIds: savedPlaces.map((place) => place.id),
      seed: Math.floor(Math.random() * 100000) + 1
    };
    setPrefs(nextPrefs);
    void runPlan(nextPrefs);
  };

  const handlePlanChange = (next: Itinerary) => {
    requestIdRef.current += 1;
    activePlanRef.current = next;
    setPlan(next);
    setSource("template");
  };

  const handleRetry = () => {
    if (lastRequestRef.current) void runPlan(lastRequestRef.current);
  };

  return (
    <section id="plan" className="relative scroll-mt-24">
      <PlannerForm
        prefs={prefs}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        savedPlaces={savedPlaces}
        onRemoveSaved={removeSavedPlace}
      />

      {loading ? <LoadingPlan /> : null}

      {error && !loading ? (
        <div
          role="alert"
          className="glass mt-6 flex flex-col gap-3 rounded-2xl border-coral/30 p-5 print:hidden sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-coral/10 text-coral">
              <AlertCircle size={17} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{t.errors.generic}</p>
              <p className="mt-1 text-xs text-white/55">{t.errors.plan}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-coral/30 bg-coral/10 px-4 py-2 text-xs font-semibold text-coral transition hover:bg-coral/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
          >
            <RotateCcw size={13} aria-hidden="true" />
            {t.errors.retry}
          </button>
        </div>
      ) : null}

      <div ref={resultAreaRef} className="scroll-mt-24">
        {plan && !loading ? (
          <div className="mt-10">
            <ItineraryResult
              plan={plan}
              source={source}
              onPlanChange={handlePlanChange}
              onRegenerate={handleRegenerate}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

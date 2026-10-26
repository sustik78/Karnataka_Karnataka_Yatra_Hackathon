"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Camera,
  Castle,
  Check,
  ChevronDown,
  Clock,
  Coffee,
  Compass,
  Droplets,
  Landmark,
  MapPin,
  Mountain,
  PawPrint,
  Plus,
  Search,
  Sparkles,
  Ticket,
  UtensilsCrossed,
  Waves,
  X
} from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import type { Category, Place, Region } from "@/lib/types";
import {
  CATEGORIES,
  PLACES,
  REGION_NAMES_EN,
  REGION_NAMES_KN
} from "@/data/places";
import { placePhoto } from "@/data/photos";
import { useLang } from "@/i18n/LangProvider";
import { SectionHeading } from "@/components/SectionHeading";
import { ADD_TO_TRIP_EVENT, SAVED_PLACES_EVENT, readSavedPlaceIds } from "@/lib/storage";
import { formatDuration, formatINR, localizeDigits } from "@/lib/format";

const REGIONS = Object.keys(REGION_NAMES_EN) as Region[];

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
  Spiritual: Sparkles,
  Photography: Camera
};

function entryLabel(place: Place, lang: "en" | "kn", freeLabel: string): string {
  return place.entryFeeINR === 0 ? freeLabel : formatINR(place.entryFeeINR, lang);
}

export function Destinations() {
  const { lang, t } = useLang();
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [activeRegion, setActiveRegion] = useState<Region | "All">("All");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const previousModalOpen = useRef(false);

  useEffect(() => {
    const sync = () => setSavedIds(readSavedPlaceIds());
    sync();
    window.addEventListener(SAVED_PLACES_EVENT, sync);
    return () => window.removeEventListener(SAVED_PLACES_EVENT, sync);
  }, []);

  useEffect(() => {
    if (modalOpen) {
      previousModalOpen.current = true;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") setModalOpen(false);
      };
      window.addEventListener("keydown", onKeyDown);
      const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 80);
      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener("keydown", onKeyDown);
        window.clearTimeout(focusTimer);
      };
    } else if (previousModalOpen.current) {
      previousModalOpen.current = false;
      if (triggerRef.current && typeof triggerRef.current.focus === "function") {
        triggerRef.current.focus();
      }
    }
  }, [modalOpen]);

  const filtered = useMemo(() => {
    const search = deferredQuery.trim().toLowerCase();
    return PLACES.filter((place) => {
      if (activeCategory !== "All" && !place.categories.includes(activeCategory)) return false;
      if (activeRegion !== "All" && place.region !== activeRegion) return false;
      if (!search) return true;
      const localizedCategories = place.categories
        .map((category) => `${category} ${t.planner.categories[category]}`)
        .join(" ");
      const haystack = [
        place.name_en,
        place.name_kn,
        REGION_NAMES_EN[place.region],
        REGION_NAMES_KN[place.region],
        place.desc_en,
        place.desc_kn,
        place.dish_en,
        place.dish_kn,
        localizedCategories
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(search);
    });
  }, [activeCategory, activeRegion, deferredQuery, t.planner.categories]);

  const hasFilters = query.trim().length > 0 || activeCategory !== "All" || activeRegion !== "All";

  const clearFilters = () => {
    setQuery("");
    setActiveCategory("All");
    setActiveRegion("All");
  };

  const openDetails = (place: Place, triggerElement?: HTMLElement) => {
    triggerRef.current = triggerElement ?? (document.activeElement as HTMLElement | null);
    setSelectedPlace(place);
    setModalOpen(true);
  };

  const addToTrip = (place: Place) => {
    if (savedIds.includes(place.id)) return;
    window.dispatchEvent(new CustomEvent(ADD_TO_TRIP_EVENT, { detail: { id: place.id } }));
  };

  return (
    <section id="destinations" className="relative scroll-mt-24 print:hidden">
      <SectionHeading
        eyebrow={t.destinations.eyebrow}
        title={t.destinations.title}
        subtitle={t.destinations.subtitle}
      />

      <div className="glass mt-7 rounded-[1.75rem] p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <div className="relative">
            <label htmlFor="destination-search" className="sr-only">
              {t.destinations.searchLabel}
            </label>
            <Search
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/70"
              aria-hidden="true"
            />
            <input
              id="destination-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.destinations.searchPlaceholder}
              className="h-12 w-full rounded-full border border-white/10 bg-white/[0.05] pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-gold/50 focus:ring-2 focus:ring-gold/25"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={t.destinations.clear}
                className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white"
              >
                <X size={14} aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <div className="relative">
            <label htmlFor="region-filter" className="sr-only">
              {t.destinations.region}
            </label>
            <MapPin
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70"
              aria-hidden="true"
            />
            <select
              id="region-filter"
              value={activeRegion}
              onChange={(event) => setActiveRegion(event.target.value as Region | "All")}
              className="h-12 w-full appearance-none rounded-full border border-white/10 bg-[#111126] pl-9 pr-10 text-sm font-medium text-white outline-none transition focus:border-gold/50 focus:ring-2 focus:ring-gold/25 lg:w-56"
            >
              <option value="All">{t.destinations.allPlaces}</option>
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {lang === "kn" ? REGION_NAMES_KN[region] : REGION_NAMES_EN[region]}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={t.destinations.categoriesLabel}>
          <button
            type="button"
            aria-pressed={activeCategory === "All"}
            onClick={() => setActiveCategory("All")}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
              activeCategory === "All"
                ? "border-gold/60 bg-gold/15 text-gold"
                : "border-white/10 bg-white/[0.035] text-white/55 hover:border-white/25 hover:text-white"
            }`}
          >
            <Compass size={12} aria-hidden="true" />
            {t.destinations.all}
          </button>
          {CATEGORIES.map((category) => {
            const Icon = categoryIcons[category];
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveCategory(active ? "All" : category)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  active
                    ? "border-gold/60 bg-gold/15 text-gold"
                    : "border-white/10 bg-white/[0.035] text-white/55 hover:border-white/25 hover:text-white"
                }`}
              >
                <Icon size={12} aria-hidden="true" />
                {t.planner.categories[category]}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
          <p className="text-[11px] font-medium text-white/45">
            <span className="font-bold text-gold">{localizeDigits(filtered.length, lang)}</span>{" "}
            {t.destinations.results}
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold text-white/50 transition hover:border-gold/40 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <X size={10} aria-hidden="true" />
              {t.destinations.clear}
            </button>
          ) : null}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass mt-5 rounded-[1.75rem] p-10 text-center">
          <Compass size={30} className="mx-auto text-gold/60" aria-hidden="true" />
          <p className="mx-auto mt-3 max-w-md text-sm text-white/55">{t.destinations.noResults}</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 rounded-full border border-gold/35 bg-gold/10 px-4 py-2 text-xs font-semibold text-gold transition hover:bg-gold/15"
          >
            {t.destinations.clear}
          </button>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((place, index) => {
            const name = lang === "kn" ? place.name_kn : place.name_en;
            const otherName = lang === "kn" ? place.name_en : place.name_kn;
            const description = lang === "kn" ? place.desc_kn : place.desc_en;
            const region = lang === "kn" ? REGION_NAMES_KN[place.region] : REGION_NAMES_EN[place.region];
            const Icon = categoryIcons[place.categories[0] ?? "Heritage"];
            const saved = savedIds.includes(place.id);
            return (
              <motion.article
                key={place.id}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: Math.min((index % 6) * 0.035, 0.18) }}
                className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0d0d20] transition duration-300 hover:-translate-y-1 hover:border-gold/35 hover:shadow-[0_22px_55px_rgba(0,0,0,0.38)]"
              >
                <div className="relative h-48 overflow-hidden sm:h-52">
                  <button
                    type="button"
                    onClick={(e) => openDetails(place, e.currentTarget)}
                    aria-label={`${t.destinations.viewDetails}: ${name}`}
                    className="absolute inset-0 block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
                  >
                    <img
                      src={placePhoto(place.id)}
                      alt={`${name}, ${region}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </button>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0d20] via-[#0d0d20]/10 to-black/10" />
                  <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-[9px] font-semibold text-white/80 backdrop-blur-md">
                    <MapPin size={9} aria-hidden="true" />
                    {region}
                  </span>
                  <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-black/50 px-2.5 py-1 text-[9px] font-semibold text-gold backdrop-blur-md">
                      <Icon size={11} aria-hidden="true" />
                      {t.planner.categories[place.categories[0] ?? "Heritage"]}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <button
                    type="button"
                    onClick={(e) => openDetails(place, e.currentTarget)}
                    className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <h3 className="font-display text-lg font-bold leading-snug text-white transition group-hover:text-gold">
                      {name}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-white/35">{otherName}</p>
                    <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-white/50">{description}</p>
                  </button>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {place.categories.slice(0, 3).map((category) => (
                      <span
                        key={category}
                        className="rounded-full border border-white/10 bg-white/[0.035] px-2 py-0.5 text-[9px] font-medium text-white/45"
                      >
                        {t.planner.categories[category]}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-white/50">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={10} className="text-gold/70" aria-hidden="true" />
                      {formatDuration(place.avgDurationHours, lang)}
                    </span>
                    <span className="h-3 w-px bg-white/10" />
                    <span className="inline-flex items-center gap-1">
                      <Ticket size={10} className="text-gold/70" aria-hidden="true" />
                      {entryLabel(place, lang, t.destinations.freeEntry)}
                    </span>
                  </div>

                  <div className="mt-auto flex items-center gap-2 border-t border-white/10 pt-3.5">
                    <button
                      type="button"
                      onClick={() => openDetails(place)}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/55 transition hover:border-gold/40 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      {t.destinations.viewDetails}
                    </button>
                    <button
                      type="button"
                      disabled={saved}
                      onClick={() => addToTrip(place)}
                      className={`ml-auto inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                        saved
                          ? "cursor-default border border-teal/30 bg-teal/10 text-teal"
                          : "border border-gold/35 bg-gold/10 text-gold hover:bg-gold/20"
                      }`}
                    >
                      {saved ? <Check size={11} aria-hidden="true" /> : <Plus size={11} aria-hidden="true" />}
                      {saved ? t.destinations.added : t.destinations.addToTrip}
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {modalOpen && selectedPlace
          ? createPortal(
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
                className="fixed inset-0 z-[110] flex items-end justify-center bg-[#050510]/80 p-0 backdrop-blur-md sm:items-center sm:p-5"
                onClick={() => setModalOpen(false)}
              >
                <motion.div
                  key={selectedPlace.id}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 330, damping: 30 }}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="place-dialog-title"
                  onClick={(event) => event.stopPropagation()}
                  className="glass-strong relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] border-white/15 p-0 shadow-glass-lg sm:rounded-[2rem]"
                >
                  <div className="relative h-60 overflow-hidden sm:h-72">
                    <img
                      src={placePhoto(selectedPlace.id)}
                      alt={`${lang === "kn" ? selectedPlace.name_kn : selectedPlace.name_en}, ${
                        lang === "kn"
                          ? REGION_NAMES_KN[selectedPlace.region]
                          : REGION_NAMES_EN[selectedPlace.region]
                      }`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b1a] via-[#0b0b1a]/25 to-black/20" />
                    <button
                      ref={closeButtonRef}
                      type="button"
                      onClick={() => setModalOpen(false)}
                      aria-label={t.destinations.close}
                      className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-black/45 text-white/80 backdrop-blur-md transition hover:border-gold/50 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      <X size={17} aria-hidden="true" />
                    </button>
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-black/45 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-gold backdrop-blur-md">
                        <MapPin size={10} aria-hidden="true" />
                        {lang === "kn"
                          ? REGION_NAMES_KN[selectedPlace.region]
                          : REGION_NAMES_EN[selectedPlace.region]}
                      </span>
                      <h3 id="place-dialog-title" className="mt-2 max-w-2xl pr-10 font-display text-2xl font-bold text-white drop-shadow-lg sm:text-4xl">
                        {lang === "kn" ? selectedPlace.name_kn : selectedPlace.name_en}
                      </h3>
                      <p className="mt-1 text-sm text-white/60">
                        {lang === "kn" ? selectedPlace.name_en : selectedPlace.name_kn}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-7">
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPlace.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-[9px] font-semibold text-white/60"
                        >
                          {t.planner.categories[category]}
                        </span>
                      ))}
                    </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <DetailStat
                      icon={<Clock size={13} />}
                      label={t.destinations.duration}
                      value={formatDuration(selectedPlace.avgDurationHours, lang)}
                    />
                    <DetailStat
                      icon={<Ticket size={13} />}
                      label={t.destinations.entry}
                      value={entryLabel(selectedPlace, lang, t.destinations.freeEntry)}
                    />
                    <DetailStat
                      icon={<Sparkles size={13} />}
                      label={t.destinations.bestMonths}
                      value={selectedPlace.bestMonths.map((month) => t.planner.months[month - 1]).join(" · ")}
                    />
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-white/75">
                    {lang === "kn" ? selectedPlace.desc_kn : selectedPlace.desc_en}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-gold/20 bg-gold/[0.055] p-4">
                      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-gold/80">
                        <UtensilsCrossed size={12} aria-hidden="true" />
                        {t.destinations.localDish}
                      </p>
                      <p className="mt-2 text-sm font-medium text-white/80">
                        {lang === "kn" ? selectedPlace.dish_kn : selectedPlace.dish_en}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-teal/20 bg-teal/[0.055] p-4">
                      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-teal">
                        <Compass size={12} aria-hidden="true" />
                        {t.destinations.travelTip}
                      </p>
                      <p className="mt-2 text-[12px] leading-relaxed text-white/65">
                        {lang === "kn" ? selectedPlace.tip_kn : selectedPlace.tip_en}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                    <p className="flex items-center gap-1.5 text-[10px] text-white/35">
                      <Compass size={11} className="text-gold/60" aria-hidden="true" />
                      {localizeDigits(selectedPlace.lat.toFixed(3), lang)},{" "}
                      {localizeDigits(selectedPlace.lng.toFixed(3), lang)}
                    </p>
                    <button
                      type="button"
                      disabled={savedIds.includes(selectedPlace.id)}
                      onClick={() => addToTrip(selectedPlace)}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                        savedIds.includes(selectedPlace.id)
                          ? "cursor-default border border-teal/30 bg-teal/10 text-teal"
                          : "bg-gradient-to-r from-gold to-coral text-[#1a1205] shadow-gold hover:brightness-110"
                      }`}
                    >
                      {savedIds.includes(selectedPlace.id) ? (
                        <Check size={14} aria-hidden="true" />
                      ) : (
                        <Plus size={14} aria-hidden="true" />
                      )}
                      {savedIds.includes(selectedPlace.id)
                        ? t.destinations.inYourTrip
                        : t.destinations.addToTrip}
                    </button>
                  </div>
                  <p className="mt-3 text-[9px] text-white/25">{t.hero.photoCredit}</p>
                  </div>
                </motion.div>
              </motion.div>,
              document.body
            )
          : null}
      </AnimatePresence>
    </section>
  );
}

function DetailStat({
  icon,
  label,
  value
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
      <p className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-white/35">
        <span className="text-gold/80">{icon}</span>
        {label}
      </p>
      <p className="mt-1.5 text-[11px] font-semibold leading-snug text-white/80">{value}</p>
    </div>
  );
}

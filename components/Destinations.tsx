"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  Camera,
  Castle,
  Check,
  ChevronDown,
  Clock,
  Coffee,
  Compass,
  Droplets,
  Eye,
  Info,
  Landmark,
  MapPin,
  Mountain,
  Palette,
  PawPrint,
  Plus,
  Search,
  ShieldCheck,
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
  Photography: Camera,
  "Artisans & Crafts": Palette
};

function entryLabel(place: Place, lang: "en" | "kn", freeLabel: string): string {
  return place.entryFeeINR === 0 ? freeLabel : formatINR(place.entryFeeINR, lang);
}

const INITIAL_PAGE_SIZE = 12;

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
  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const previousModalOpen = useRef(false);

  useEffect(() => {
    const sync = () => setSavedIds(readSavedPlaceIds());
    sync();
    window.addEventListener(SAVED_PLACES_EVENT, sync);
    return () => window.removeEventListener(SAVED_PLACES_EVENT, sync);
  }, []);

  // Reset pagination when filter or search changes
  useEffect(() => {
    setVisibleCount(INITIAL_PAGE_SIZE);
  }, [activeCategory, activeRegion, deferredQuery]);

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

  // Deep linking check on mount (e.g. hash #place-lalbagh)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#place-")) {
        const placeId = hash.replace("#place-", "");
        const matched = PLACES.find((p) => p.id === placeId);
        if (matched) {
          setSelectedPlace(matched);
          setModalOpen(true);
        }
      }
    }
  }, []);

  const filtered = useMemo(() => {
    const search = deferredQuery.trim().toLowerCase();
    return PLACES.filter((place) => {
      if (activeCategory !== "All" && !place.categories.includes(activeCategory)) return false;
      if (activeRegion !== "All" && place.region !== activeRegion) return false;
      if (!search) return true;
      const localizedCategories = place.categories
        .map((category) => `${category} ${t.planner.categories[category] ?? category}`)
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
        place.tip_en,
        place.tip_kn,
        localizedCategories
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(search);
    });
  }, [activeCategory, activeRegion, deferredQuery, t.planner.categories]);

  const displayedPlaces = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  const hasMore = visibleCount < filtered.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(filtered.length, prev + 12));
  };

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
    // Update hash cleanly without reloading
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#place-${place.id}`);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "#destinations");
    }
  };

  const addToTrip = (place: Place) => {
    window.dispatchEvent(new CustomEvent(ADD_TO_TRIP_EVENT, { detail: { id: place.id } }));
  };

  return (
    <section id="destinations" className="relative scroll-mt-24 py-16 sm:py-24 print:hidden">
      <SectionHeading
        eyebrow={t.destinations.eyebrow}
        title={t.destinations.title}
        subtitle={t.destinations.subtitle}
      />

      <div className="glass mt-8 rounded-[1.75rem] p-4 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.destinations.searchPlaceholder}
              aria-label={t.destinations.searchLabel}
              className="w-full rounded-full border border-white/10 bg-white/[0.04] py-3 pl-11 pr-10 text-sm text-white placeholder-white/35 transition focus:border-gold/50 focus:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={t.common.clear}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/40 hover:text-white"
              >
                <X size={15} aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <select
                value={activeRegion}
                onChange={(e) => setActiveRegion(e.target.value as Region | "All")}
                aria-label={t.destinations.region}
                className="appearance-none rounded-full border border-white/10 bg-white/[0.05] py-2.5 pl-4 pr-9 text-xs font-medium text-white transition hover:border-white/20 focus:border-gold/50 focus:outline-none"
              >
                <option value="All" className="bg-[#0b0b1a] text-white">
                  {t.destinations.all} ({lang === "kn" ? "ಎಲ್ಲಾ ಪ್ರದೇಶಗಳು" : "All Regions"})
                </option>
                {REGIONS.map((region) => (
                  <option key={region} value={region} className="bg-[#0b0b1a] text-white">
                    {lang === "kn" ? REGION_NAMES_KN[region] : REGION_NAMES_EN[region]}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                aria-hidden="true"
              />
            </div>

            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full border border-coral/30 bg-coral/10 px-3.5 py-2 text-xs font-semibold text-coral transition hover:bg-coral/15"
              >
                {t.destinations.clear}
              </button>
            ) : null}
          </div>
        </div>

        {/* Category horizontal pills */}
        <div className="mt-4 flex flex-wrap gap-1.5 overflow-x-auto pb-1 pt-2">
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              activeCategory === "All"
                ? "bg-gold text-[#1a1205] shadow-sm"
                : "border border-white/10 bg-white/[0.04] text-white/60 hover:border-white/20 hover:text-white"
            }`}
          >
            {t.destinations.all}
          </button>
          {CATEGORIES.map((category) => {
            const active = activeCategory === category;
            const Icon = categoryIcons[category] ?? Castle;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "bg-gold text-[#1a1205] shadow-sm"
                    : "border border-white/10 bg-white/[0.04] text-white/60 hover:border-white/20 hover:text-white"
                }`}
              >
                <Icon size={12} aria-hidden="true" />
                {t.planner.categories[category] ?? category}
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-white/45">
          <span>
            {localizeDigits(displayedPlaces.length, lang)} / {localizeDigits(filtered.length, lang)}{" "}
            {t.destinations.results}
          </span>
          {hasMore ? (
            <span className="text-gold/80">
              {lang === "kn" ? "ಕೆಳಗೆ ಇನ್ನಷ್ಟು ತಾಣಗಳಿವೆ" : "More places available below"}
            </span>
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
        <>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {displayedPlaces.map((place, index) => {
              const name = lang === "kn" ? (place.name_kn || place.name_en) : place.name_en;
              const otherName = lang === "kn" ? place.name_en : place.name_kn;
              const description = lang === "kn" ? (place.desc_kn || place.desc_en) : place.desc_en;
              const region = lang === "kn" ? REGION_NAMES_KN[place.region] : REGION_NAMES_EN[place.region];
              const Icon = categoryIcons[place.categories[0] ?? "Heritage"] ?? Castle;
              const saved = savedIds.includes(place.id);

              return (
                <motion.article
                  key={place.id}
                  id={`place-${place.id}`}
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
                        {t.planner.categories[place.categories[0] ?? "Heritage"] ?? place.categories[0]}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <button
                      type="button"
                      onClick={(e) => openDetails(place, e.currentTarget)}
                      className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      <h3
                        lang={lang === "kn" ? "kn" : "en"}
                        className="font-display text-lg font-bold leading-snug text-white transition group-hover:text-gold"
                      >
                        {name}
                      </h3>
                      <p
                        lang={lang === "kn" ? "en" : "kn"}
                        className="mt-0.5 text-[11px] text-white/35"
                      >
                        {otherName}
                      </p>
                      <p
                        lang={lang === "kn" ? "kn" : "en"}
                        className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-white/50"
                      >
                        {description}
                      </p>
                    </button>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {place.categories.slice(0, 3).map((category) => (
                        <span
                          key={category}
                          className="rounded-full border border-white/10 bg-white/[0.035] px-2 py-0.5 text-[9px] font-medium text-white/45"
                        >
                          {t.planner.categories[category] ?? category}
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

          {hasMore ? (
            <div className="mt-8 flex flex-col items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleShowMore}
                className="group inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-6 py-2.5 text-xs font-bold text-gold transition hover:border-gold hover:bg-gold hover:text-[#1a1205]"
              >
                <Sparkles size={14} className="transition group-hover:rotate-12" aria-hidden="true" />
                {t.destinations.showMore}
              </button>
              <p className="text-[10px] text-white/40">
                {t.destinations.showingCount
                  .replace("{shown}", String(displayedPlaces.length))
                  .replace("{total}", String(filtered.length))}
              </p>
            </div>
          ) : null}
        </>
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
                onClick={closeModal}
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
                      onClick={closeModal}
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
                          {t.planner.categories[category] ?? category}
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

                    {/* Season Advice & Crowd-avoidance Tip */}
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs">
                      {selectedPlace.seasonAlert_en ? (
                        <div className="flex items-start gap-2 rounded-xl border border-amber-500/25 bg-amber-500/[0.05] p-3 text-amber-200/90">
                          <Calendar size={13} className="mt-0.5 shrink-0 text-amber-400" aria-hidden="true" />
                          <div>
                            <p className="font-semibold text-amber-300">
                              {lang === "kn" ? "ಋತುಮಾನ ಸಲಹೆ" : "Season Advisory"}
                            </p>
                            <p className="mt-0.5 leading-relaxed">
                              {lang === "kn" ? selectedPlace.seasonAlert_kn : selectedPlace.seasonAlert_en}
                            </p>
                          </div>
                        </div>
                      ) : null}

                      {selectedPlace.crowdTip_en ? (
                        <div className="flex items-start gap-2 rounded-xl border border-blue-500/25 bg-blue-500/[0.05] p-3 text-blue-200/90">
                          <Eye size={13} className="mt-0.5 shrink-0 text-blue-400" aria-hidden="true" />
                          <div>
                            <p className="font-semibold text-blue-300">
                              {lang === "kn" ? "ಜನಸಂದಣಿ ತಪ್ಪಿಸುವ ಸಲಹೆ" : "Crowd-Avoidance Tip"}
                            </p>
                            <p className="mt-0.5 leading-relaxed">
                              {lang === "kn" ? selectedPlace.crowdTip_kn : selectedPlace.crowdTip_en}
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {selectedPlace.artisanOrHomestay_en ? (
                      <div className="mt-3 flex items-start gap-2 rounded-xl border border-gold/30 bg-gold/[0.05] p-3 text-xs text-gold/90">
                        <Palette size={13} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                        <div>
                          <p className="font-semibold text-gold">
                            {lang === "kn" ? "ಸ್ಥಳೀಯ ಕುಶಲಕರ್ಮಿಗಳು / ಹೋಂಸ್ಟೇ" : "Local Craft & Artisan Heritage"}
                          </p>
                          <p className="mt-0.5 text-white/70">
                            {lang === "kn" ? selectedPlace.artisanOrHomestay_kn : selectedPlace.artisanOrHomestay_en}
                          </p>
                        </div>
                      </div>
                    ) : null}

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                      <div className="flex items-center gap-3 text-[10px] text-white/40">
                        <span className="flex items-center gap-1">
                          <Compass size={11} className="text-gold/60" aria-hidden="true" />
                          {localizeDigits(selectedPlace.lat.toFixed(3), lang)},{" "}
                          {localizeDigits(selectedPlace.lng.toFixed(3), lang)}
                        </span>
                        <span className="h-2.5 w-px bg-white/20" />
                        <span className="flex items-center gap-1 text-teal">
                          <ShieldCheck size={11} aria-hidden="true" />
                          {selectedPlace.lastVerified ?? "Verified for 2026 Season"}
                        </span>
                      </div>
                      <button
                        type="button"
                        disabled={savedIds.includes(selectedPlace.id)}
                        onClick={() => addToTrip(selectedPlace)}
                        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                          savedIds.includes(selectedPlace.id)
                            ? "cursor-default border border-teal/40 bg-teal/15 text-teal"
                            : "bg-gradient-to-r from-gold to-coral text-[#1a1205] shadow-gold hover:brightness-110"
                        }`}
                      >
                        {savedIds.includes(selectedPlace.id) ? (
                          <>
                            <Check size={13} aria-hidden="true" />
                            {t.destinations.added}
                          </>
                        ) : (
                          <>
                            <Plus size={13} aria-hidden="true" />
                            {t.destinations.addToTrip}
                          </>
                        )}
                      </button>
                    </div>
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
  value: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
      <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white/40">
        <span className="text-gold/80">{icon}</span>
        {label}
      </p>
      <p className="mt-1.5 font-display text-sm font-bold text-white">{value}</p>
    </div>
  );
}

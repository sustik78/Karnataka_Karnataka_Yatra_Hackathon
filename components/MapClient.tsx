"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Clock,
  Compass,
  Crosshair,
  Layers,
  Map as MapIcon,
  Plus,
  Satellite,
  Sparkles,
  Utensils
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import type { Day, Place } from "@/lib/types";
import { REGION_NAMES_KN } from "@/data/places";
import { placePhoto, regionPhoto } from "@/data/photos";
import { useLang } from "@/i18n/LangProvider";
import { dayLabel, localizeTime, toKannadaDigits } from "@/lib/format";
import { ADD_TO_TRIP_EVENT, readSavedPlaceIds, SAVED_PLACES_EVENT } from "@/lib/storage";

const DAY_COLORS = [
  "#F5B301",
  "#10B981",
  "#0EA5E9",
  "#FF7A59",
  "#7C5CFF",
  "#14B8A6",
  "#E11D48",
  "#84CC16"
];

type LayerMode = "dark" | "satellite" | "streets";

const TILE_LAYERS = {
  dark: {
    id: "dark" as LayerMode,
    label_en: "Dark",
    label_kn: "ಕಪ್ಪು",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
    subdomains: "abcd",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>',
    maxZoom: 19
  },
  satellite: {
    id: "satellite" as LayerMode,
    label_en: "Satellite",
    label_kn: "ಉಪಗ್ರಹ",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    subdomains: "abc",
    attribution:
      '&copy; <a href="https://www.esri.com/" target="_blank" rel="noopener">Esri</a>, Earthstar Geographics',
    maxZoom: 18
  },
  streets: {
    id: "streets" as LayerMode,
    label_en: "Streets",
    label_kn: "ರಸ್ತೆಗಳು",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    subdomains: "abc",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
    maxZoom: 19
  }
} as const;

interface MapClientProps {
  days: Day[];
}

function MapController({
  positions,
  positionKey,
  triggerRecenter
}: {
  positions: Array<[number, number]>;
  positionKey: string;
  triggerRecenter: number;
}) {
  const map = useMap();

  useEffect(() => {
    // Invalidate map size so Leaflet recalculates correctly if container resized/rendered
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 120);

    if (positions.length === 0) return () => clearTimeout(timer);
    if (positions.length === 1) {
      map.setView(positions[0], 11, { animate: true });
      return () => clearTimeout(timer);
    }
    const bounds = L.latLngBounds(positions);
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 11, animate: true });
    return () => clearTimeout(timer);
  }, [map, positionKey, positions, triggerRecenter]);

  return null;
}

export default function MapClient({ days }: MapClientProps) {
  const { lang, t } = useLang();
  const [activeLayer, setActiveLayer] = useState<LayerMode>("dark");
  const [selectedDay, setSelectedDay] = useState<number | "all">("all");
  const [recenterCount, setRecenterCount] = useState(0);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const isKn = lang === "kn";

  useEffect(() => {
    const sync = () => setSavedIds(readSavedPlaceIds());
    sync();
    window.addEventListener(SAVED_PLACES_EVENT, sync);
    return () => window.removeEventListener(SAVED_PLACES_EVENT, sync);
  }, []);

  const visibleDays = useMemo(() => {
    if (selectedDay === "all") return days;
    return days.filter((d) => d.day === selectedDay);
  }, [days, selectedDay]);

  const markers = useMemo(() => {
    return visibleDays.flatMap((day) => {
      // Find index in original days array to keep colors consistent
      const originalDayIndex = days.findIndex((d) => d.day === day.day);
      const color = DAY_COLORS[(originalDayIndex >= 0 ? originalDayIndex : 0) % DAY_COLORS.length];
      return day.stops.map((stop, stopIdx) => ({
        day,
        dayNumber: day.day,
        stop,
        stopIndexInDay: stopIdx + 1,
        color
      }));
    });
  }, [days, visibleDays]);

  const positions: Array<[number, number]> = useMemo(() => {
    return markers.map((m) => [m.stop.place.lat, m.stop.place.lng] as [number, number]);
  }, [markers]);

  const positionKey = useMemo(() => {
    return positions.map((p) => p.join(",")).join("|");
  }, [positions]);

  const center: [number, number] = useMemo(() => {
    if (positions.length > 0) return positions[0];
    return [15.335, 76.46]; // Karnataka geographic center
  }, [positions]);

  const handleAddToTrip = (place: Place) => {
    if (savedIds.includes(place.id)) return;
    window.dispatchEvent(new CustomEvent(ADD_TO_TRIP_EVENT, { detail: { id: place.id } }));
  };

  const currentLayer = TILE_LAYERS[activeLayer];
  const totalStops = days.reduce((sum, d) => sum + d.stops.length, 0);

  return (
    <div className="glass flex h-full flex-col overflow-hidden rounded-[1.75rem] p-3 print:hidden sm:p-4">
      {/* Map Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-3 pt-1">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-teal/25 bg-teal/10 text-teal shadow-inner">
            <MapIcon size={18} aria-hidden="true" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                {t.result.map.title}
              </h3>
              <span className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold text-gold">
                {isKn ? `${toKannadaDigits(totalStops)} ತಾಣಗಳು` : `${totalStops} stops`}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-white/50">{t.result.map.subtitle}</p>
          </div>
        </div>

        {/* Free Map Style Switcher (Dark, Satellite, Streets) */}
        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] p-1 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setActiveLayer("dark")}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition ${
              activeLayer === "dark"
                ? "bg-gold text-[#1a1205] shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
            title="Dark mode map (Carto)"
          >
            <Compass size={12} aria-hidden="true" />
            {isKn ? TILE_LAYERS.dark.label_kn : TILE_LAYERS.dark.label_en}
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer("satellite")}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition ${
              activeLayer === "satellite"
                ? "bg-gold text-[#1a1205] shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
            title="Satellite photography (Esri)"
          >
            <Satellite size={12} aria-hidden="true" />
            {isKn ? TILE_LAYERS.satellite.label_kn : TILE_LAYERS.satellite.label_en}
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer("streets")}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition ${
              activeLayer === "streets"
                ? "bg-gold text-[#1a1205] shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
            title="Standard street map (OpenStreetMap)"
          >
            <Layers size={12} aria-hidden="true" />
            {isKn ? TILE_LAYERS.streets.label_kn : TILE_LAYERS.streets.label_en}
          </button>
        </div>
      </div>

      {/* Day Filter Pills */}
      <div className="mb-3 flex flex-wrap items-center gap-1.5 px-1">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
          {isKn ? "ದಿನ ಶೋಧಕ:" : "Filter Day:"}
        </span>
        <button
          type="button"
          onClick={() => setSelectedDay("all")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            selectedDay === "all"
              ? "border border-gold/60 bg-gold/20 text-gold shadow-sm"
              : "border border-white/10 bg-white/[0.04] text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          {isKn ? "ಎಲ್ಲಾ ದಿನಗಳು" : "All Days"}
        </button>
        {days.map((day, dayIndex) => {
          const color = DAY_COLORS[dayIndex % DAY_COLORS.length];
          const isSelected = selectedDay === day.day;
          return (
            <button
              key={`day-pill-${day.day}`}
              type="button"
              onClick={() => setSelectedDay(day.day)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                isSelected
                  ? "border border-white/30 bg-white/15 text-white shadow-sm"
                  : "border border-white/10 bg-white/[0.04] text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              {dayLabel(day.day, lang)}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setRecenterCount((c) => c + 1)}
          title={isKn ? "ನಕ್ಷೆ ಮರುಕೇಂದ್ರೀಕರಿಸಿ" : "Recenter map view"}
          className="ml-auto inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-1 text-xs font-medium text-white/65 transition hover:border-gold/40 hover:bg-gold/15 hover:text-gold"
        >
          <Crosshair size={13} aria-hidden="true" />
          <span>{isKn ? "ಕೇಂದ್ರೀಕರಿಸಿ" : "Recenter"}</span>
        </button>
      </div>

      {/* Map Canvas */}
      <div className="relative z-0 h-[400px] w-full flex-1 overflow-hidden rounded-2xl border border-white/10 shadow-inner sm:h-[450px]">
        <MapContainer
          center={center}
          zoom={7}
          scrollWheelZoom={false}
          className="h-full w-full"
          attributionControl
        >
          <TileLayer
            key={currentLayer.id}
            url={currentLayer.url}
            attribution={currentLayer.attribution}
            subdomains={currentLayer.subdomains}
            maxZoom={currentLayer.maxZoom}
          />

          {/* Polyline Route trails */}
          {visibleDays.map((day) => {
            const originalDayIndex = days.findIndex((d) => d.day === day.day);
            const color =
              DAY_COLORS[(originalDayIndex >= 0 ? originalDayIndex : 0) % DAY_COLORS.length];
            const path = day.stops.map((stop) => [stop.place.lat, stop.place.lng] as [number, number]);
            if (path.length < 2) return null;
            return (
              <Polyline
                key={`route-day-${day.day}`}
                positions={path}
                pathOptions={{
                  color,
                  weight: 4.5,
                  opacity: 0.88,
                  dashArray: "2 8",
                  lineCap: "round"
                }}
              />
            );
          })}

          {/* Numbered Pins with Rich Dark Popups */}
          {markers.map((marker, markerIdx) => {
            const stop = marker.stop;
            const place = stop.place;
            const name = isKn ? place.name_kn : place.name_en;
            const region = isKn ? REGION_NAMES_KN[place.region] : place.region;
            const displayNumber = isKn
              ? toKannadaDigits(marker.stopIndexInDay)
              : String(marker.stopIndexInDay);
            const dish = isKn ? place.dish_kn : place.dish_en;
            const tip = isKn ? place.tip_kn : place.tip_en;
            const photoSrc = placePhoto(place.id, regionPhoto(place.region));
            const isSaved = savedIds.includes(place.id);

            const icon = L.divIcon({
              className: "yatra-marker-wrap",
              html: `<div class="yatra-map-marker" style="background:linear-gradient(135deg, ${marker.color}, #FF7A59)">${displayNumber}</div>`,
              iconSize: [32, 32],
              iconAnchor: [16, 16],
              popupAnchor: [0, -18]
            });

            return (
              <Marker
                key={`marker-${marker.dayNumber}-${place.id}-${markerIdx}`}
                position={[place.lat, place.lng]}
                icon={icon}
              >
                <Popup maxWidth={260} minWidth={220}>
                  <div className="flex flex-col overflow-hidden text-left">
                    {/* Thumbnail */}
                    <div className="relative -mx-3.5 -mt-3 mb-2.5 h-24 overflow-hidden rounded-t-xl bg-black/40">
                      <img
                        src={photoSrc}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e1e] via-transparent to-transparent" />
                      <span
                        className="absolute bottom-2 left-2 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black shadow-md"
                        style={{ backgroundColor: marker.color }}
                      >
                        {dayLabel(marker.dayNumber, lang)} · #{displayNumber}
                      </span>
                    </div>

                    {/* Place Name & Region */}
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <h4 className="font-display text-sm font-bold leading-tight text-white">
                          {name}
                        </h4>
                        <p className="mt-0.5 text-[10px] text-white/50">{region}</p>
                      </div>
                    </div>

                    {/* Time & Slot */}
                    <div className="mt-2 flex items-center gap-2 text-[10px] text-white/70">
                      <span className="inline-flex items-center gap-1 rounded bg-white/10 px-1.5 py-0.5">
                        <Clock size={10} aria-hidden="true" />
                        {localizeTime(stop.startTime, lang)}
                      </span>
                      <span className="rounded bg-gold/15 px-1.5 py-0.5 font-medium text-gold">
                        {t.result.slots[stop.slot]}
                      </span>
                    </div>

                    {/* Local Dish Recommendation */}
                    {dish ? (
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] text-coral">
                        <Utensils size={11} className="shrink-0" aria-hidden="true" />
                        <span className="truncate font-medium">{dish}</span>
                      </div>
                    ) : null}

                    {/* Local Tip */}
                    {tip ? (
                      <div className="mt-1.5 flex items-start gap-1 text-[9px] text-white/60">
                        <Sparkles size={10} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                        <p className="line-clamp-2 leading-tight">{tip}</p>
                      </div>
                    ) : null}

                    {/* Add to Wishlist Button */}
                    <button
                      type="button"
                      onClick={() => handleAddToTrip(place)}
                      disabled={isSaved}
                      className={`mt-2.5 flex items-center justify-center gap-1 rounded-lg py-1.5 text-[10px] font-semibold transition ${
                        isSaved
                          ? "cursor-default bg-teal/20 text-teal"
                          : "bg-gold text-[#1a1205] shadow hover:bg-gold/90"
                      }`}
                    >
                      <Plus size={11} aria-hidden="true" />
                      {isSaved ? t.destinations.inYourTrip : t.destinations.addToTrip}
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          <MapController
            positions={positions}
            positionKey={positionKey}
            triggerRecenter={recenterCount}
          />
        </MapContainer>
      </div>

      {/* Map Footer & Color Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-3">
        <p className="text-[10px] text-white/45">
          {isKn
            ? "ಗುರುತನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ ಸ್ಥಳದ ವಿವರ, ತಿಂಡಿ ಮತ್ತು ಸಲಹೆ ನೋಡಿ."
            : "Click any pin for place stories, timings and local dishes."}
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          {days.map((day, dayIndex) => (
            <button
              key={`legend-${day.day}`}
              type="button"
              onClick={() => setSelectedDay(day.day)}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] font-medium text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: DAY_COLORS[dayIndex % DAY_COLORS.length] }}
              />
              {dayLabel(day.day, lang)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

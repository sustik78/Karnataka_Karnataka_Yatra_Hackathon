import {
  CATEGORIES,
  COMPANIONS,
  PLACES,
  REGION_COSTS,
  REGION_NAMES_EN,
  REGION_NAMES_KN,
  START_CITIES,
  START_CITY_COORDS,
  TRAVEL_STYLES
} from "@/data/places";
import { formatINR, monthName, toKannadaDigits } from "@/lib/format";
import type {
  BudgetBreakdown,
  BudgetTierName,
  Category,
  City,
  Companion,
  Day,
  DaySlot,
  DietPreference,
  Itinerary,
  Place,
  Prefs,
  Region,
  StayPreference,
  Stop,
  TravelStyle
} from "@/lib/types";

const AVERAGE_SPEED_KMH = 45;
const MAX_DAY_MINUTES = 9 * 60;
const START_MINUTES = 9 * 60;
const TIER_NAMES: BudgetTierName[] = ["Budget", "Comfort", "Luxury"];

const TIER_NAMES_KN: Record<BudgetTierName, string> = {
  Budget: "ಬಜೆಟ್",
  Comfort: "ಆರಾಮದಾಯಕ",
  Luxury: "ಐಷಾರಾಮಿ"
};

const CITY_REGION: Record<City, Region> = {
  Bengaluru: "Bengaluru",
  Mysuru: "Mysuru",
  Mangaluru: "Mangaluru",
  Hubballi: "Hubballi-Dharwad",
  Belagavi: "Belagavi",
  Shivamogga: "Shivamogga",
  Vijayapura: "Vijayapura"
};

const TRAVELER_COUNT: Record<Companion, number> = {
  Solo: 1,
  Couple: 2,
  Family: 4,
  Friends: 3
};

const STOP_TARGET: Record<TravelStyle, number> = {
  Relaxed: 3,
  Balanced: 4,
  Packed: 5,
  Offbeat: 3
};

const CATEGORY_KN: Record<Category, string> = {
  Heritage: "ಪರಂಪರೆ",
  Temples: "ದೇವಾಲಯಗಳು",
  Wildlife: "ವನ್ಯಜೀವಿ",
  Beaches: "ಕಡಲತೀರ",
  "Hills & Trekking": "ಬೆಟ್ಟ ಮತ್ತು ಟ್ರೆಕ್ಕಿಂಗ್",
  Waterfalls: "ಜಲಪಾತ",
  "Coffee Estates": "ಕಾಫಿ ತೋಟ",
  Food: "ಆಹಾರ",
  Adventure: "ಸಾಹಸ",
  Spiritual: "ಆಧ್ಯಾತ್ಮ",
  Photography: "ಛಾಯಾಗ್ರಹಣ",
  "Artisans & Crafts": "ಕರಕುಶಲ ಮತ್ತು ಕಲೆಗಳು"
};

const STYLE_KN: Record<TravelStyle, string> = {
  Relaxed: "ವಿಶ್ರಾಂತ",
  Balanced: "ಸಮತೋಲನ",
  Packed: "ಸಾಂದ್ರ",
  Offbeat: "ಅಪರೂಪದ"
};

const COMPANION_KN: Record<Companion, string> = {
  Solo: "ಒಬ್ಬಂಟಿ",
  Couple: "ದಂಪತಿ",
  Family: "ಕುಟುಂಬ",
  Friends: "ಸ್ನೇಹಿತರ"
};

const SLOT_PROFILES: Record<number, DaySlot[]> = {
  1: ["morning"],
  2: ["morning", "afternoon"],
  3: ["morning", "afternoon", "evening"],
  4: ["morning", "afternoon", "afternoon", "evening"],
  5: ["morning", "morning", "afternoon", "afternoon", "evening"]
};

interface ScoredPlace {
  place: Place;
  score: number;
  rank: number;
}

interface RegionGroup {
  region: Region;
  places: ScoredPlace[];
  score: number;
  center: { lat: number; lng: number };
}

interface TierCost {
  stay: number;
  food: number;
  transport: number;
  entry: number;
  total: number;
}

export function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const earthRadius = 6371;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const root = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLng * sinLng;
  return 2 * earthRadius * Math.atan2(Math.sqrt(root), Math.sqrt(1 - root));
}

function clampNumber(value: unknown, fallback: number, min: number, max: number): number {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, Math.round(parsed)));
}

function asString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

export function normalizePrefs(input: unknown): Prefs {
  const raw = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const rawInterests = Array.isArray(raw.interests) ? raw.interests : [];
  let interests = rawInterests.filter(
    (value): value is Category => typeof value === "string" && (CATEGORIES as string[]).includes(value)
  );
  if (interests.length === 0) interests = ["Heritage", "Food"];

  const rawMustVisit = Array.isArray(raw.mustVisitIds) ? raw.mustVisitIds : [];
  const validIds = new Set(PLACES.map((place) => place.id));
  const mustVisitIds = rawMustVisit
    .filter((value): value is string => typeof value === "string" && validIds.has(value))
    .slice(0, 25);

  const style = asString(raw.style, "Balanced") as TravelStyle;
  const companions = asString(raw.companions, "Solo") as Companion;
  const startCity = asString(raw.startCity, "Bengaluru") as City;
  const seedRaw = typeof raw.seed === "number" ? raw.seed : Number(raw.seed);

  const defaultTravelers = TRAVELER_COUNT[companions] ?? 1;
  const adults = clampNumber(raw.adults, defaultTravelers, 1, 20);
  const kids = clampNumber(raw.kids, 0, 0, 10);
  const seniors = clampNumber(raw.seniors, 0, 0, 10);
  const diet = (["Any", "Vegetarian", "Pure Veg", "Non-Veg"].includes(String(raw.diet))
    ? raw.diet
    : "Any") as DietPreference;
  const stayPref = (["Any", "Homestay", "Heritage", "Budget", "Comfort", "Luxury"].includes(
    String(raw.stayPref)
  )
    ? raw.stayPref
    : "Any") as StayPreference;

  return {
    interests,
    days: clampNumber(raw.days, 4, 1, 10),
    budget: clampNumber(raw.budget, 25000, 3000, 200000),
    style: (TRAVEL_STYLES as string[]).includes(style) ? style : "Balanced",
    companions: (COMPANIONS as string[]).includes(companions) ? companions : "Solo",
    startCity: (START_CITIES as string[]).includes(startCity) ? startCity : "Bengaluru",
    month: clampNumber(raw.month, 10, 1, 12),
    mustVisitIds,
    seed: Number.isFinite(seedRaw) ? Math.abs(Math.round(seedRaw)) : 0,
    adults,
    kids,
    seniors,
    diet,
    stayPref
  };
}

export function getTravelerCount(companions: Companion, prefs?: Prefs): number {
  if (prefs?.adults !== undefined) {
    const total = (prefs.adults || 1) + (prefs.kids || 0) + (prefs.seniors || 0);
    return Math.max(1, total);
  }
  return TRAVELER_COUNT[companions] ?? 1;
}

export function scorePlaceForPrefs(place: Place, prefs: Prefs): number {
  let score = 20;
  const matched = place.categories.filter((category) => prefs.interests.includes(category)).length;
  score += matched * 18;
  if (prefs.interests.length > 0 && matched === 0) score -= 12;

  if (place.bestMonths.includes(prefs.month)) score += 16;
  else score -= 6;

  score += (place.popularity - 3) * 2;

  // Senior citizen considerations
  if ((prefs.seniors ?? 0) > 0) {
    if (place.avgDurationHours > 3.5 || place.categories.includes("Adventure")) score -= 14;
    if (place.categories.includes("Temples") || place.categories.includes("Spiritual") || place.categories.includes("Heritage")) score += 12;
  }

  // Kids considerations
  if ((prefs.kids ?? 0) > 0) {
    if (place.categories.includes("Wildlife") || place.categories.includes("Beaches") || place.categories.includes("Waterfalls")) score += 10;
  }

  // Dietary alignment
  if (prefs.diet === "Pure Veg" || prefs.diet === "Vegetarian") {
    if (place.categories.includes("Temples") || place.region === "Mangaluru" || place.region === "Hassan" || place.region === "Mysuru") {
      score += 4;
    }
  }

  if (prefs.style === "Offbeat") {
    score += (5 - place.popularity) * 8;
    if (place.popularity <= 2) score += 8;
  }

  if (prefs.style === "Relaxed") {
    if (place.avgDurationHours <= 2) score += 6;
    if (place.avgDurationHours > 3.5) score -= 10;
  }

  if (prefs.style === "Packed") {
    if (place.avgDurationHours <= 2) score += 6;
  }

  if (prefs.companions === "Family") {
    const easyCategories: Category[] = ["Heritage", "Beaches", "Food", "Temples", "Spiritual", "Artisans & Crafts"];
    if (place.categories.some((category) => easyCategories.includes(category))) score += 7;
    score += place.avgDurationHours <= 3 ? 5 : -7;
  }

  if (prefs.companions === "Couple") {
    const romantic: Category[] = ["Beaches", "Waterfalls", "Coffee Estates", "Photography", "Heritage"];
    if (place.categories.some((category) => romantic.includes(category))) score += 5;
  }

  if (prefs.companions === "Friends") {
    const social: Category[] = ["Adventure", "Wildlife", "Waterfalls", "Beaches"];
    if (place.categories.some((category) => social.includes(category))) score += 6;
  }

  if (prefs.companions === "Solo") {
    const solo: Category[] = ["Photography", "Spiritual", "Adventure", "Coffee Estates", "Artisans & Crafts"];
    if (place.categories.some((category) => solo.includes(category))) score += 4;
  }

  if ((prefs.mustVisitIds ?? []).includes(place.id)) score += 95;

  return Math.max(5, Math.min(100, Math.round(score)));
}

function seededNoise(id: string, seed: number): number {
  if (!seed) return 0;
  let hash = 0;
  for (let index = 0; index < id.length; index += 1) {
    hash = (hash * 31 + id.charCodeAt(index)) % 100000;
  }
  return ((hash + seed * 37) % 11) - 5;
}

function buildScoredPlaces(prefs: Prefs): ScoredPlace[] {
  return PLACES.map((place) => {
    const score = scorePlaceForPrefs(place, prefs);
    return {
      place,
      score,
      rank: Math.max(5, Math.min(100, score + seededNoise(place.id, prefs.seed ?? 0)))
    };
  });
}

function regionCenter(places: Place[]): { lat: number; lng: number } {
  if (places.length === 0) return { lat: 12.9716, lng: 77.5946 };
  const total = places.reduce(
    (accumulator, place) => ({
      lat: accumulator.lat + place.lat,
      lng: accumulator.lng + place.lng
    }),
    { lat: 0, lng: 0 }
  );
  return { lat: total.lat / places.length, lng: total.lng / places.length };
}

function buildRegionGroups(scored: ScoredPlace[], prefs: Prefs): RegionGroup[] {
  const regions = Array.from(new Set(PLACES.map((place) => place.region)));
  const startRegion = CITY_REGION[prefs.startCity] ?? "Bengaluru";
  const startPoint = START_CITY_COORDS[prefs.startCity] ?? { lat: 12.9716, lng: 77.5946 };

  return regions
    .map((region) => {
      const places = scored
        .filter((item) => item.place.region === region)
        .sort((a, b) => b.rank - a.rank);
      const top = places.slice(0, 4);
      const average = top.length > 0 ? top.reduce((sum, item) => sum + item.score, 0) / top.length : 0;
      const center = regionCenter(places.map((item) => item.place));
      const distance = haversineKm(startPoint, center);
      const startBonus = region === startRegion ? 50 : Math.max(0, 30 - distance / 20);
      const mustVisitBonus = places.some((item) => (prefs.mustVisitIds ?? []).includes(item.place.id)) ? 90 : 0;
      return {
        region,
        places,
        center,
        score: average + startBonus + mustVisitBonus
      };
    })
    .sort((a, b) => b.score - a.score);
}

/**
 * Geographically coherent sequence generator:
 * Follows real corridors instead of erratic jumps across Karnataka.
 */
function selectRegionSequence(groups: RegionGroup[], prefs: Prefs): Region[] {
  if (groups.length === 0) return [];
  const startRegion = CITY_REGION[prefs.startCity] ?? groups[0].region;
  const startGroup = groups.find((g) => g.region === startRegion) ?? groups[0];

  const sequence: Region[] = [startGroup.region];
  const unvisited = groups.filter((g) => g.region !== startGroup.region);

  let currentCenter = startGroup.center;

  while (sequence.length < prefs.days && unvisited.length > 0) {
    // Sort unvisited candidates by balancing their quality score and proximity to current region
    unvisited.sort((a, b) => {
      const distA = haversineKm(currentCenter, a.center);
      const distB = haversineKm(currentCenter, b.center);

      // Distance penalty: > 200 km is heavily penalized to keep daily hops realistic
      const effectiveScoreA = a.score - (distA * 0.22);
      const effectiveScoreB = b.score - (distB * 0.22);

      return effectiveScoreB - effectiveScoreA;
    });

    const next = unvisited.shift()!;
    sequence.push(next.region);
    currentCenter = next.center;
  }

  // If trip duration exceeds unique visited regions, loop back to highest-score region for extra exploration
  while (sequence.length < prefs.days) {
    const candidates = [...groups].sort((a, b) => {
      const countA = sequence.filter((region) => region === a.region).length;
      const countB = sequence.filter((region) => region === b.region).length;
      if (countA !== countB) return countA - countB;
      return b.score - a.score;
    });
    sequence.push(candidates[0].region);
  }

  return sequence;
}

function pickDayPlaces(
  region: Region,
  scored: ScoredPlace[],
  used: Set<string>,
  prefs: Prefs
): Place[] {
  const pool = scored.filter((item) => item.place.region === region && !used.has(item.place.id));
  if (pool.length === 0) return [];

  const sorted = [...pool].sort((a, b) => b.rank - a.rank);
  const shortlist = sorted.slice(0, Math.min(14, sorted.length));
  const first = shortlist[0].place;
  const selected: Place[] = [first];
  const target = Math.max(1, Math.min(5, STOP_TARGET[prefs.style] ?? 3));
  let elapsedMinutes = first.avgDurationHours * 60;
  let previous = first;
  const remaining = shortlist.filter((item) => item.place.id !== first.id);

  while (selected.length < target) {
    const candidates = remaining
      .filter((item) => !selected.some((place) => place.id === item.place.id))
      .map((item) => ({
        item,
        distance: haversineKm(previous, item.place),
        travelMinutes: (haversineKm(previous, item.place) / AVERAGE_SPEED_KMH) * 60
      }))
      .sort((a, b) => {
        const mustA = (prefs.mustVisitIds ?? []).includes(a.item.place.id) ? 1 : 0;
        const mustB = (prefs.mustVisitIds ?? []).includes(b.item.place.id) ? 1 : 0;
        if (mustA !== mustB) return mustB - mustA;
        return a.distance - b.distance;
      });

    let next: Place | null = null;
    for (const candidate of candidates) {
      const projected =
        elapsedMinutes + candidate.travelMinutes + candidate.item.place.avgDurationHours * 60;
      if (projected <= MAX_DAY_MINUTES) {
        next = candidate.item.place;
        elapsedMinutes = projected;
        break;
      }
    }

    if (!next) break;
    selected.push(next);
    previous = next;
  }

  return selected;
}

function dominantCategory(stops: Stop[]): Category {
  const counts = new Map<Category, number>();
  stops.forEach((stop) => {
    stop.place.categories.forEach((category) => {
      counts.set(category, (counts.get(category) ?? 0) + 1);
    });
  });
  let best: Category = "Heritage";
  let bestCount = -1;
  CATEGORIES.forEach((category) => {
    const count = counts.get(category) ?? 0;
    if (count > bestCount) {
      best = category;
      bestCount = count;
    }
  });
  return best;
}

function themeFor(category: Category, region: Region, lang: "en" | "kn"): string {
  const regionEn = REGION_NAMES_EN[region] ?? region;
  const regionKn = REGION_NAMES_KN[region] ?? region;
  if (lang === "kn") {
    const map: Record<Category, string> = {
      Heritage: `${regionKn}: ಪರಂಪರೆಯ ಪಯಣ`,
      Temples: `${regionKn}: ದೇವಾಲಯಗಳ ದರ್ಶನ`,
      Wildlife: `${regionKn}: ವನ್ಯಜೀವಿಗಳ ಜೊತೆ`,
      Beaches: `${regionKn}: ಕಡಲತೀರದ ನೆಮ್ಮದಿ`,
      "Hills & Trekking": `${regionKn}: ಬೆಟ್ಟದ ಹಾದಿ`,
      Waterfalls: `${regionKn}: ಜಲಪಾತಗಳ ಸವಿ`,
      "Coffee Estates": `${regionKn}: ಕಾಫಿ ತೋಟಗಳ ನಡುವೆ`,
      Food: `${regionKn}: ರುಚಿಯ ಪಯಣ`,
      Adventure: `${regionKn}: ಸಾಹಸದ ದಿನ`,
      Spiritual: `${regionKn}: ಆಧ್ಯಾತ್ಮದ ನೆಲೆ`,
      Photography: `${regionKn}: ಕ್ಯಾಮೆರಾದ ಕಣ್ಣಲ್ಲಿ`,
      "Artisans & Crafts": `${regionKn}: ಕರಕುಶಲ ಕಲೆಯ ಲೋಕ`
    };
    return map[category] ?? `${regionKn}: ಸುಂದರ ಪಯಣ`;
  }

  const map: Record<Category, string> = {
    Heritage: `Timeless heritage of ${regionEn}`,
    Temples: `Temple trails of ${regionEn}`,
    Wildlife: `Into the wild in ${regionEn}`,
    Beaches: `Coastal calm of ${regionEn}`,
    "Hills & Trekking": `High trails of ${regionEn}`,
    Waterfalls: `Chasing waterfalls in ${regionEn}`,
    "Coffee Estates": `Coffee country in ${regionEn}`,
    Food: `A taste of ${regionEn}`,
    Adventure: `Adventure in ${regionEn}`,
    Spiritual: `Sacred stories of ${regionEn}`,
    Photography: `Frames of ${regionEn}`,
    "Artisans & Crafts": `Artisan crafts of ${regionEn}`
  };
  return map[category] ?? `Explorations in ${regionEn}`;
}

function getTransportDetails(region: Region, incomingKm: number) {
  const transportMap: Record<
    Region,
    {
      roadEn: string;
      busEn: string;
      trainEn?: string;
      roadKn: string;
      busKn: string;
      trainKn?: string;
    }
  > = {
    Bengaluru: {
      roadEn: "NICE Road / Outer Ring Road & NH 44 / NH 75",
      busEn: "BMTC Vayu Vajra & KSRTC Majestic Central Stand",
      trainEn: "Namma Metro Purple/Green Lines & KSR Bengaluru / Yesvantpur Jn",
      roadKn: "ನೈಸ್ ರಸ್ತೆ ಮತ್ತು ಎನ್‌ಎಚ್ 44 / ಎನ್‌ಎಚ್ 75",
      busKn: "ಬಿಎಂಟಿಸಿ ವಾಯು ವಜ್ರ ಮತ್ತು ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಮೆಜೆಸ್ಟಿಕ್ ಬಸ್ ನಿಲ್ದಾಣ",
      trainKn: "ನಮ್ಮ ಮೆಟ್ರೋ ಮತ್ತು ಕ್ರಾಂತಿವೀರ ಸಂಗೊಳ್ಳಿ ರಾಯಣ್ಣ ನಿಲ್ದಾಣ"
    },
    Mysuru: {
      roadEn: "NH 275 Bengaluru-Mysuru 10-Lane Expressway (140 km, ~2h)",
      busEn: "KSRTC Airavat Club Class every 15 mins from Bengaluru / Suburb Stand",
      trainEn: "Mysuru-Chennai Vande Bharat Express & Shatabdi (1h 45m)",
      roadKn: "ಎನ್‌ಎಚ್ 275 ಬೆಂಗಳೂರು-ಮೈಸೂರು ಎಕ್ಸ್‌ಪ್ರೆಸ್‌ವೇ (140 ಕಿಮೀ, ~2 ಗಂಟೆ)",
      busKn: "ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಐರಾವತ್ ಕ್ಲಬ್ ಕ್ಲಾಸ್ ಪ್ರತಿ 15 ನಿಮಿಷಕ್ಕೆ",
      trainKn: "ಮೈಸೂರು-ಚೆನ್ನೈ ವಂದೇ ಭಾರತ್ ಮತ್ತು ಶತಾಬ್ದಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್"
    },
    Mangaluru: {
      roadEn: "NH 75 via Shiradi Ghat / NH 66 Coastal 4-Lane Highway",
      busEn: "KSRTC Airavat & Ambari Dream Class overnight sleeper services",
      trainEn: "Vande Bharat Mangaluru-Madgaon & Karwar Express",
      roadKn: "ಶಿರಾಡಿ ಘಾಟ್ ಎನ್‌ಎಚ್ 75 ಮತ್ತು ಕರಾವಳಿ ಎನ್‌ಎಚ್ 66",
      busKn: "ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಅಂಬಾರಿ ಡ್ರೀಮ್ ಕ್ಲಾಸ್ ಸ್ಲೀಪರ್ ಬಸ್‌ಗಳು",
      trainKn: "ಮಂಗಳೂರು-ಮಡಗಾಂವ್ ವಂದೇ ಭಾರತ್ ಎಕ್ಸ್‌ಪ್ರೆಸ್"
    },
    "Uttara Kannada": {
      roadEn: "NH 66 Coastal Highway & Sirsi-Yellapur Ghat passes",
      busEn: "NWKRTC Rajahamsa & KSRTC Coastal Express",
      trainEn: "Matsyagandha & Panchaganga SF Express (Gokarna / Murudeshwar)",
      roadKn: "ಕರಾವಳಿ ಎನ್‌ಎಚ್ 66 ಹೆದ್ದಾರಿ ಮತ್ತು ಶಿರಸಿ ಘಾಟಿ ಹಾದಿ",
      busKn: "ವಾಯವ್ಯ ಸಾರಿಗೆ ರಾಜಹಂಸ ಮತ್ತು ಕರಾವಳಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಬಸ್‌ಗಳು",
      trainKn: "ಮತ್ಸ್ಯಗಂಧ ಮತ್ತು ಪಂಚಗಂಗಾ ಎಕ್ಸ್‌ಪ್ರೆಸ್ (ಗೋಕರ್ಣ / ಮುರುಡೇಶ್ವರ)"
    },
    Chikkamagaluru: {
      roadEn: "NH 173 via Hassan-Belur & scenic Western Ghat coffee passes",
      busEn: "KSRTC Non-Stop Flybus & Rajahamsa from Bengaluru / Hassan",
      roadKn: "ಎನ್‌ಎಚ್ 173 ಹಾಸನ-ಬೇಲೂರು ಮತ್ತು ಮಲೆನಾಡು ಘಾಟಿ ರಸ್ತೆ",
      busKn: "ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ರಾಜಹಂಸ ಮತ್ತು ಪಾಯಿಂಟ್-ಟು-ಪಾಯಿಂಟ್ ಬಸ್‌ಗಳು"
    },
    Hassan: {
      roadEn: "NH 75 4-Lane Highway (Bengaluru to Hassan 180 km, ~3.5h)",
      busEn: "KSRTC Hassan Sarige every 10 min",
      trainEn: "Yesvantpur-Hassan Intercity & Karwar Express",
      roadKn: "ಎನ್‌ಎಚ್ 75 ಚತುಷ್ಪಥ ಹೆದ್ದಾರಿ (ಬೆಂಗಳೂರು-ಹಾಸನ 180 ಕಿಮೀ, ~3.5 ಗಂಟೆ)",
      busKn: "ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಹಾಸನ ಸಾರಿಗೆ ಬಸ್‌ಗಳು",
      trainKn: "ಯಶವಂತಪುರ-ಹಾಸನ ಇಂಟರ್‌ಸಿಟಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್"
    },
    Shivamogga: {
      roadEn: "NH 206 (Tumakuru-Shivamogga Expressway corridor)",
      busEn: "KSRTC Airavat & Rajahamsa from Bengaluru Majestic",
      trainEn: "Jan Shatabdi Express (Bengaluru to Shivamogga, 4h 15m)",
      roadKn: "ಎನ್‌ಎಚ್ 206 ತುಮಕೂರು-ಶಿವಮೊಗ್ಗ ಕಾರಿಡಾರ್",
      busKn: "ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಐರಾವತ್ ಮತ್ತು ರಾಜಹಂಸ",
      trainKn: "ಜನ ಶತಾಬ್ದಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್ (ಬೆಂಗಳೂರು-ಶಿವಮೊಗ್ಗ, 4 ಗಂಟೆ 15 ನಿಮಿಷ)"
    },
    Coorg: {
      roadEn: "SH 88 Mysuru-Madikeri Scenic Plantation Highway (120 km, ~2.5h)",
      busEn: "KSRTC Club Class & Rajahamsa from Mysuru Suburb Stand",
      roadKn: "ಎಸ್ಎಚ್ 88 ಮೈಸೂರು-ಮಡಿಕೇರಿ ತೋಟದ ಹೆದ್ದಾರಿ (120 ಕಿಮೀ, ~2.5 ಗಂಟೆ)",
      busKn: "ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಕ್ಲಬ್ ಕ್ಲಾಸ್ ಮತ್ತು ರಾಜಹಂಸ ಬಸ್‌ಗಳು"
    },
    Hampi: {
      roadEn: "NH 50 & NH 67 via Chitradurga / Hospete 4-Lane Road",
      busEn: "KSRTC Airavat Multi-Axle sleeper to Hospete",
      trainEn: "Hampi Express from KSR Bengaluru to Hosapete Jn",
      roadKn: "ಎನ್‌ಎಚ್ 50 ಮತ್ತು ಎನ್‌ಎಚ್ 67 ಹೊಸಪೇಟೆ ಚತುಷ್ಪಥ ರಸ್ತೆ",
      busKn: "ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಐರಾವತ್ ಸ್ಲೀಪರ್ ಬಸ್‌ಗಳು",
      trainKn: "ಹಂಪಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್ (ಬೆಂಗಳೂರು - ಹೊಸಪೇಟೆ ಜಂಕ್ಷನ್)"
    },
    "Hubballi-Dharwad": {
      roadEn: "NH 48 Pune-Bengaluru Golden Quadrilateral 6-Lane Expressway",
      busEn: "NWKRTC Central Bus Terminal Hubballi",
      trainEn: "Vande Bharat Bengaluru-Hubballi-Dharwad Express (4h 50m)",
      roadKn: "ಎನ್‌ಎಚ್ 48 ಪುಣೆ-ಬೆಂಗಳೂರು ಸುವರ್ಣ ಚತುಷ್ಕೋನ ಹೆದ್ದಾರಿ",
      busKn: "ವಾಯವ್ಯ ಸಾರಿಗೆ ಕೇಂದ್ರ ಬಸ್ ನಿಲ್ದಾಣ",
      trainKn: "ಬೆಂಗಳೂರು-ಧಾರವಾಡ ವಂದೇ ಭಾರತ್ ಎಕ್ಸ್‌ಪ್ರೆಸ್"
    },
    Badami: {
      roadEn: "SH 14 / NH 218 from Hubballi or Bagalkote (~105 km, 2.5h)",
      busEn: "NWKRTC express buses from Hubballi / Bagalkote",
      trainEn: "Solapur-Gadag Passenger & Express via Badami Station",
      roadKn: "ಎಸ್ಎಚ್ 14 / ಎನ್‌ಎಚ್ 218 ಹುಬ್ಬಳ್ಳಿ ಅಥವಾ ಬಾಗಲಕೋಟೆಯಿಂದ",
      busKn: "ವಾಯವ್ಯ ಸಾರಿಗೆ ಬಸ್‌ಗಳು",
      trainKn: "ಬದಾಮಿ ರೈಲ್ವೆ ನಿಲ್ದಾಣದ ಮೂಲಕ ಗದಗ-ಸೋಲಾಪುರ ಎಕ್ಸ್‌ಪ್ರೆಸ್"
    },
    Vijayapura: {
      roadEn: "NH 50 (Solapur-Mangaluru Corridor) & SH 12",
      busEn: "NWKRTC & KSRTC overnight sleepers from Bengaluru / Hubballi",
      trainEn: "Gol Gumbaz Express & Basava Express direct to Vijayapura Station",
      roadKn: "ಎನ್‌ಎಚ್ 50 ಸೋಲಾಪುರ-ಮಂಗಳೂರು ಕಾರಿಡಾರ್",
      busKn: "ವಾಯವ್ಯ ಕರ್ನಾಟಕ ಸಾರಿಗೆ ಸ್ಲೀಪರ್ ಬಸ್‌ಗಳು",
      trainKn: "ಗೋಲ ಗುಂಬಜ್ ಮತ್ತು ಬಸವ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ರೈಲುಗಳು"
    },
    Kalaburagi: {
      roadEn: "NH 150 & SH 10 from Bidar / Vijayapura",
      busEn: "KKRTC Sarige & Airavat from Bengaluru Central",
      trainEn: "Vande Bharat Kalaburagi-Bengaluru & Udyan Express",
      roadKn: "ಎನ್‌ಎಚ್ 150 ಮತ್ತು ಎಸ್ಎಚ್ 10 ಹೆದ್ದಾರಿ",
      busKn: "ಕಲ್ಯಾಣ ಕರ್ನಾಟಕ ಸಾರಿಗೆ ಐರಾವತ್ ಬಸ್‌ಗಳು",
      trainKn: "ಕಲಬುರಗಿ-ಬೆಂಗಳೂರು ವಂದೇ ಭಾರತ್ ಎಕ್ಸ್‌ಪ್ರೆಸ್"
    },
    Chitradurga: {
      roadEn: "NH 48 (Bengaluru-Pune Expressway, 200 km, ~3.5h)",
      busEn: "KSRTC Non-stop express from Majestic",
      trainEn: "Siddhaganga Intercity Express & Jan Shatabdi",
      roadKn: "ಎನ್‌ಎಚ್ 48 ಬೆಂಗಳೂರು-ಪುಣೆ ಹೆದ್ದಾರಿ (200 ಕಿಮೀ, ~3.5 ಗಂಟೆ)",
      busKn: "ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ನಾನ್-ಸ್ಟಾಪ್ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಬಸ್‌ಗಳು",
      trainKn: "ಸಿದ್ಧಗಂಗಾ ಇಂಟರ್‌ಸಿಟಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್"
    },
    Belagavi: {
      roadEn: "NH 48 Golden Quadrilateral 6-Lane corridor",
      busEn: "NWKRTC Central Terminal Belagavi",
      trainEn: "Rani Chennamma Express & Vande Bharat feeder",
      roadKn: "ಎನ್‌ಎಚ್ 48 ಸುವರ್ಣ ಚತುಷ್ಕೋನ ಕಾರಿಡಾರ್",
      busKn: "ವಾಯವ್ಯ ಸಾರಿಗೆ ಕೇಂದ್ರ ಬಸ್ ನಿಲ್ದಾಣ",
      trainKn: "ರಾಣಿ ಚೆನ್ನಮ್ಮ ಎಕ್ಸ್‌ಪ್ರೆಸ್"
    }
  };

  const info = transportMap[region] ?? transportMap.Bengaluru;
  return {
    en: {
      road: `${info.roadEn} (${incomingKm > 0 ? `${Math.round(incomingKm)} km leg` : "local city circuit"})`,
      bus: info.busEn,
      train: info.trainEn
    },
    kn: {
      road: `${info.roadKn} (${incomingKm > 0 ? `${toKannadaDigits(Math.round(incomingKm))} ಕಿಮೀ ಪ್ರಯಾಣ` : "ಸ್ಥಳೀಯ ಸಂಚಾರ"})`,
      bus: info.busKn,
      train: info.trainKn
    }
  };
}

function buildWhy(place: Place, prefs: Prefs): { en: string; kn: string } {
  const matched = place.categories.filter((category) => prefs.interests.includes(category));
  const monthEn = monthName(prefs.month, "en");
  const monthKn = monthName(prefs.month, "kn");
  const bestSeason = place.bestMonths.includes(prefs.month);
  const en: string[] = [];
  const kn: string[] = [];

  if (matched.length > 0) {
    en.push(`Chosen for your interest in ${matched.join(" and ")}.`);
    kn.push(`ನಿಮ್ಮ ${matched.map((category) => CATEGORY_KN[category] ?? category).join(" ಮತ್ತು ")} ಆಸಕ್ತಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.`);
  } else {
    en.push("Adds a rich cultural highlight to your route.");
    kn.push("ನಿಮ್ಮ ಪ್ರಯಾಣಕ್ಕೆ ವಿಶೇಷ ಸಾಂಸ್ಕೃತಿಕ ಮೆರುಗು ನೀಡುತ್ತದೆ.");
  }

  if (bestSeason) {
    en.push(`It is at its prime in ${monthEn}.`);
    kn.push(`${monthKn} ತಿಂಗಳಲ್ಲಿ ಇದು ತನ್ನ ಅತ್ಯುತ್ತಮ ಸೌಂದರ್ಯದಲ್ಲಿರುತ್ತದೆ.`);
  } else {
    en.push(`Comfortable to visit during morning hours in ${monthEn}.`);
    kn.push(`${monthKn} ತಿಂಗಳಲ್ಲಿ ಬೆಳಗ್ಗಿನ ಭೇಟಿಗೆ ಅನುಕೂಲಕರವಾಗಿದೆ.`);
  }

  if (place.categories.includes("Artisans & Crafts")) {
    en.push("Features authentic generational artisans with GI-tag craft heritage.");
    kn.push("ಪಾರಂಪರಿಕ ಜಿ.ಐ. ಟ್ಯಾಗ್ ಪಡೆದ ಅಸಲಿ ಕುಶಲಕರ್ಮಿಗಳ ಅದ್ಭುತ ಕಲೆ ಇಲ್ಲಿದೆ.");
  }

  if ((prefs.seniors ?? 0) > 0 && place.avgDurationHours <= 2.5) {
    en.push("Comfortable walking pace with shaded resting areas, ideal for seniors.");
    kn.push("ಹಿರಿಯರಿಗೆ ಅನುಕೂಲಕರವಾದ ನೆರಳಿನ ವಿಶ್ರಾಂತಿ ಸ್ಥಳಗಳು ಮತ್ತು ಸುಲಭ ನಡಿಗೆ ಹಾದಿ.");
  } else if (prefs.style === "Offbeat" && place.popularity <= 3) {
    en.push("A peaceful, uncrowded stop off the beaten track.");
    kn.push("ಜನಜಂಗುಳಿ ಇಲ್ಲದ ಶಾಂತಿಯುತ ವಿಶಿಷ್ಟ ತಾಣ.");
  }

  return { en: en.join(" "), kn: kn.join(" ") };
}

function decorateDay(
  dayNumber: number,
  region: Region,
  orderedPlaces: Place[],
  prefs: Prefs,
  incomingKm = 0
): Day {
  const slots = SLOT_PROFILES[Math.max(1, Math.min(5, orderedPlaces.length))] ?? SLOT_PROFILES[3];
  let travelKm = incomingKm;
  let clock = START_MINUTES;
  let previous: Place | null = null;
  const stops: Stop[] = [];

  orderedPlaces.forEach((place, index) => {
    let legDistance = 0;
    let driveMinutes = 0;
    if (previous) {
      legDistance = haversineKm(previous, place);
      travelKm += legDistance;
      driveMinutes = Math.round((legDistance / AVERAGE_SPEED_KMH) * 60);
      clock += driveMinutes;
    }
    const why = buildWhy(place, prefs);
    stops.push({
      place,
      slot: slots[index] ?? "evening",
      startTime: totalMinutesToTime(clock),
      durationHours: place.avgDurationHours,
      why_en: why.en,
      why_kn: why.kn,
      distanceFromPrevKm: Math.round(legDistance),
      driveTimeMin: driveMinutes
    });
    clock += Math.round(place.avgDurationHours * 60);
    previous = place;
  });

  const category = dominantCategory(stops);
  const transport = getTransportDetails(region, incomingKm);

  return {
    day: dayNumber,
    region,
    theme_en: themeFor(category, region, "en"),
    theme_kn: themeFor(category, region, "kn"),
    stops,
    travelKm: Math.round(travelKm),
    transportInfo_en: transport.en,
    transportInfo_kn: transport.kn
  };
}

function totalMinutesToTime(totalMinutes: number): string {
  const normalized = ((Math.round(totalMinutes) % 1440) + 1440) % 1440;
  const hours24 = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  const suffix = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function calculateTierCost(days: Day[], prefs: Prefs, tierIndex: number): TierCost {
  const travelers = getTravelerCount(prefs.companions, prefs);
  const nights = Math.max(0, days.length - 1);
  const rooms = Math.max(1, Math.ceil(travelers / 2));
  let stay = 0;
  let food = 0;
  let transport = 0;
  let entry = 0;

  days.forEach((day, index) => {
    const costs = REGION_COSTS[day.region] ?? REGION_COSTS.Bengaluru;
    if (index < nights) stay += costs.stay[tierIndex] * rooms;
    food += costs.food[tierIndex] * travelers;
    entry += day.stops.reduce((sum, stop) => sum + stop.place.entryFeeINR, 0) * travelers;
  });

  let previousPoint: { lat: number; lng: number } = START_CITY_COORDS[prefs.startCity] ?? {
    lat: 12.9716,
    lng: 77.5946
  };
  days.forEach((day) => {
    if (day.stops.length === 0) return;
    const first = day.stops[0].place;
    const incoming = haversineKm(previousPoint, first);
    const costs = REGION_COSTS[day.region] ?? REGION_COSTS.Bengaluru;
    transport += (incoming + day.travelKm) * costs.transportPerKm[tierIndex];
    const last = day.stops[day.stops.length - 1].place;
    previousPoint = { lat: last.lat, lng: last.lng };
  });

  stay = Math.round(stay);
  food = Math.round(food);
  transport = Math.round(transport);
  entry = Math.round(entry);
  return {
    stay,
    food,
    transport,
    entry,
    total: stay + food + transport + entry
  };
}

function idealTierIndex(prefs: Prefs): number {
  const travelers = getTravelerCount(prefs.companions, prefs);
  const perDayPerson = prefs.budget / Math.max(1, prefs.days) / Math.max(1, travelers);
  if (perDayPerson < 3800) return 0;
  if (perDayPerson < 8500) return 1;
  return 2;
}

function buildBudget(days: Day[], prefs: Prefs): BudgetBreakdown {
  const travelers = getTravelerCount(prefs.companions, prefs);
  const adults = prefs.adults ?? (prefs.companions === "Solo" ? 1 : prefs.companions === "Couple" ? 2 : 3);
  const kids = prefs.kids ?? 0;
  const seniors = prefs.seniors ?? 0;
  const nights = Math.max(0, days.length - 1);
  const rooms = Math.max(1, Math.ceil(travelers / 2));
  const costByTier = [0, 1, 2].map((tier) => calculateTierCost(days, prefs, tier));
  let tierIndex = idealTierIndex(prefs);
  while (tierIndex > 0 && costByTier[tierIndex].total > prefs.budget) {
    tierIndex -= 1;
  }

  const selected = costByTier[tierIndex];
  const total = selected.total;
  const difference = Math.round(prefs.budget - total);
  const status: "under" | "over" | "exact" =
    Math.abs(difference) <= 50 ? "exact" : difference < 0 ? "over" : "under";
  let suggestionEn = "";
  let suggestionKn = "";

  if (status === "over") {
    const overspend = Math.abs(difference);
    if (tierIndex > 0) {
      suggestionEn = `You are about ${formatINR(overspend, "en")} over budget. Moving to ${TIER_NAMES[tierIndex - 1]} stays, trimming one day, or choosing homestays would close the gap.`;
      suggestionKn = `ನಿಮ್ಮ ಬಜೆಟ್‌ಗಿಂತ ಸುಮಾರು ${formatINR(overspend, "kn")} ಹೆಚ್ಚಾಗಿದೆ. ${TIER_NAMES_KN[TIER_NAMES[tierIndex - 1]]} ವಸತಿ ಅಥವಾ ಹೋಂಸ್ಟೇಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.`;
    } else {
      suggestionEn = `You are about ${formatINR(overspend, "en")} over budget. Choosing closer circuits, KSRTC bus passes, or free heritage stops brings it comfortably within budget.`;
      suggestionKn = `ನಿಮ್ಮ ಬಜೆಟ್‌ಗಿಂತ ಸುಮಾರು ${formatINR(overspend, "kn")} ಹೆಚ್ಚಾಗಿದೆ. ಸಮೀಪದ ಸರ್ಕ್ಯೂಟ್, ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಬಸ್ ಅಥವಾ ಉಚಿತ ಪ್ರವೇಶದ ತಾಣಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.`;
    }
  } else if (status === "under") {
    suggestionEn = `You have about ${formatINR(difference, "en")} to spare. Add an artisan craft shopping stop, upgrade to a heritage stay, or enjoy special cuisine experiences.`;
    suggestionKn = `ನಿಮ್ಮ ಬಳಿ ಸುಮಾರು ${formatINR(difference, "kn")} ಉಳಿದಿದೆ. ಕರಕುಶಲ ಕಲಾ ಶಾಪಿಂಗ್ ಸೇರಿಸಿ, ಹೆರಿಟೇಜ್ ವಸತಿ ಅಥವಾ ವಿಶೇಷ ಭೋಜನವನ್ನು ಆನಂದಿಸಿ.`;
  } else {
    suggestionEn = "Your estimate lands almost exactly on budget. A perfectly balanced Karnataka journey.";
    suggestionKn = "ನಿಮ್ಮ ಅಂದಾಜು ಬಜೆಟ್‌ಗೆ ಬಹುತೇಕ ಸರಿಯಾಗಿದೆ. ಅತ್ಯುತ್ತಮ ಸಮತೋಲಿತ ಕರ್ನಾಟಕ ಯಾತ್ರೆ.";
  }

  return {
    tier: TIER_NAMES[tierIndex],
    tierIndex,
    nights,
    rooms,
    travelers,
    adults,
    kids,
    seniors,
    stay: selected.stay,
    food: selected.food,
    transport: selected.transport,
    entry: selected.entry,
    total,
    perPerson: Math.round(total / travelers),
    difference,
    status,
    suggestion_en: suggestionEn,
    suggestion_kn: suggestionKn
  };
}

function uniqueRegions(days: Day[]): Region[] {
  return Array.from(new Set(days.map((day) => day.region)));
}

function computeMatchScore(days: Day[], scoredMap: Map<string, ScoredPlace>, prefs: Prefs): number {
  const allStops = days.flatMap((day) => day.stops);
  if (allStops.length === 0) return 60;
  const total = allStops.reduce((sum, stop) => {
    const scored = scoredMap.get(stop.place.id);
    return sum + (scored ? scored.score : 65);
  }, 0);
  const average = total / allStops.length;
  const interestCoverage = prefs.interests.reduce((count, category) => {
    const present = allStops.some((stop) => stop.place.categories.includes(category));
    return count + (present ? 1 : 0);
  }, 0);
  const coverageRatio = prefs.interests.length > 0 ? interestCoverage / prefs.interests.length : 1;
  const score = average * 0.75 + coverageRatio * 25;
  return Math.max(55, Math.min(99, Math.round(score)));
}

function buildIntro(prefs: Prefs, days: Day[], lang: "en" | "kn"): string {
  const monthNameStr = monthName(prefs.month, lang);
  const startCityName = prefs.startCity;
  const regionNames = uniqueRegions(days).map((r) =>
    lang === "kn" ? REGION_NAMES_KN[r] ?? r : REGION_NAMES_EN[r] ?? r
  );
  const count = days.length;
  const dietNote = prefs.diet && prefs.diet !== "Any" ? (lang === "kn" ? ` (${prefs.diet} ಊಟದ ಆದ್ಯತೆ)` : ` with ${prefs.diet} dining`) : "";

  if (lang === "kn") {
    const companionsStr = COMPANION_KN[prefs.companions] ?? prefs.companions;
    const styleStr = STYLE_KN[prefs.style] ?? prefs.style;
    return `${startCityName}ಯಿಂದ ಆರಂಭವಾಗುವ ${toKannadaDigits(count)} ದಿನಗಳ ${styleStr} ${companionsStr} ಪ್ರವಾಸ${dietNote}. ${monthNameStr} ಮಾಸದಲ್ಲಿ ${regionNames.join(", ")} ಪ್ರದೇಶಗಳ ಸುಂದರ ತಾಣಗಳನ್ನು ಸಂಯೋಜಿಸಿ ರೂಪಿಸಿದ ಪಯಣ.`;
  }

  const companionsStr = prefs.companions.toLowerCase();
  const styleStr = prefs.style.toLowerCase();
  return `A personal ${count}-day ${styleStr} itinerary starting from ${startCityName} for ${companionsStr} travelers in ${monthNameStr}${dietNote}. Traversing ${regionNames.join(", ")}, shaped for heritage, local culture, and natural beauty.`;
}

function finalizePlan(
  days: Day[],
  prefs: Prefs,
  scoredMap: Map<string, ScoredPlace> = new Map()
): Itinerary {
  const budget = buildBudget(days, prefs);
  const matchScore = computeMatchScore(days, scoredMap, prefs);
  const placesCount = days.reduce((sum, day) => sum + day.stops.length, 0);

  return {
    prefs,
    days,
    budget,
    matchScore,
    intro_en: buildIntro(prefs, days, "en"),
    intro_kn: buildIntro(prefs, days, "kn"),
    summary: {
      days: days.length,
      places: placesCount,
      estimatedCost: budget.total,
      budget: prefs.budget,
      matchScore,
      budgetTier: budget.tier,
      status: budget.status
    }
  };
}

export function buildItinerary(inputPrefs: unknown): Itinerary {
  const prefs = normalizePrefs(inputPrefs);
  const scored = buildScoredPlaces(prefs);
  const scoredMap = new Map<string, ScoredPlace>(scored.map((item) => [item.place.id, item]));
  const groups = buildRegionGroups(scored, prefs);
  const sequence = selectRegionSequence(groups, prefs);
  const used = new Set<string>();
  const days: Day[] = [];

  let previousPoint: { lat: number; lng: number } = START_CITY_COORDS[prefs.startCity] ?? {
    lat: 12.9716,
    lng: 77.5946
  };

  sequence.forEach((region) => {
    let places = pickDayPlaces(region, scored, used, prefs);
    if (places.length === 0) {
      places = pickDayPlaces(region, scored, new Set(), prefs);
    }
    if (places.length === 0) return;

    places.forEach((place) => used.add(place.id));
    const firstPlace = places[0];
    const incomingKm = haversineKm(previousPoint, firstPlace);

    days.push(decorateDay(days.length + 1, region, places, prefs, incomingKm));

    const lastPlace = places[places.length - 1];
    previousPoint = { lat: lastPlace.lat, lng: lastPlace.lng };
  });

  if (days.length === 0) {
    const bestRegion = groups[0]?.region ?? "Bengaluru";
    let fallbackPlaces = PLACES.filter((place) => place.region === bestRegion)
      .sort((a, b) => scorePlaceForPrefs(b, prefs) - scorePlaceForPrefs(a, prefs))
      .slice(0, 3);
    if (fallbackPlaces.length === 0) {
      fallbackPlaces = [...PLACES]
        .sort((a, b) => scorePlaceForPrefs(b, prefs) - scorePlaceForPrefs(a, prefs))
        .slice(0, 3);
    }
    const dayRegion = fallbackPlaces[0]?.region ?? bestRegion;
    days.push(decorateDay(1, dayRegion, fallbackPlaces, prefs, 0));
  }

  return finalizePlan(days, prefs, scoredMap);
}

export function swapItineraryStop(plan: Itinerary, dayIndex: number, stopIndex: number): Itinerary {
  const day = plan.days[dayIndex];
  if (!day || !day.stops[stopIndex]) return plan;
  const original = day.stops[stopIndex].place;
  const used = new Set(plan.days.flatMap((item) => item.stops.map((stop) => stop.place.id)));
  used.delete(original.id);

  const candidates = PLACES.filter(
    (place) => place.region === original.region && !used.has(place.id) && place.id !== original.id
  )
    .map((place) => {
      const overlap = place.categories.filter((category) => original.categories.includes(category)).length;
      const distance = haversineKm(original, place);
      return { place, overlap, distance };
    })
    .sort((a, b) => {
      const scoreA =
        a.overlap * 24 -
        a.distance * 0.045 +
        scorePlaceForPrefs(a.place, plan.prefs) * 0.2;
      const scoreB =
        b.overlap * 24 -
        b.distance * 0.045 +
        scorePlaceForPrefs(b.place, plan.prefs) * 0.2;
      return scoreB - scoreA;
    });

  const replacement = candidates[0]?.place;
  if (!replacement) return plan;

  const newDays = plan.days.map((item, index) => {
    if (index !== dayIndex) return item;
    const places = item.stops.map((stop, indexInner) =>
      indexInner === stopIndex ? replacement : stop.place
    );
    return decorateDay(item.day, item.region, places, plan.prefs, item.travelKm);
  });

  return finalizePlan(newDays, plan.prefs);
}

export function regionsInItinerary(plan: Itinerary): Region[] {
  return uniqueRegions(plan.days);
}

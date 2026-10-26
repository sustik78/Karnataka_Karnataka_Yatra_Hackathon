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
  Itinerary,
  Place,
  Prefs,
  Region,
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
  Hubballi: "Hubballi",
  Belagavi: "Belagavi"
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
  Photography: "ಛಾಯಾಗ್ರಹಣ"
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
    .slice(0, 20);

  const style = asString(raw.style, "Balanced") as TravelStyle;
  const companions = asString(raw.companions, "Solo") as Companion;
  const startCity = asString(raw.startCity, "Bengaluru") as City;
  const seedRaw = typeof raw.seed === "number" ? raw.seed : Number(raw.seed);

  return {
    interests,
    days: clampNumber(raw.days, 4, 1, 10),
    budget: clampNumber(raw.budget, 25000, 3000, 100000),
    style: (TRAVEL_STYLES as string[]).includes(style) ? style : "Balanced",
    companions: (COMPANIONS as string[]).includes(companions) ? companions : "Solo",
    startCity: (START_CITIES as string[]).includes(startCity) ? startCity : "Bengaluru",
    month: clampNumber(raw.month, 10, 1, 12),
    mustVisitIds,
    seed: Number.isFinite(seedRaw) ? Math.abs(Math.round(seedRaw)) : 0
  };
}

export function getTravelerCount(companions: Companion): number {
  return TRAVELER_COUNT[companions];
}

export function scorePlaceForPrefs(place: Place, prefs: Prefs): number {
  let score = 20;
  const matched = place.categories.filter((category) => prefs.interests.includes(category)).length;
  score += matched * 17;
  if (prefs.interests.length > 0 && matched === 0) score -= 12;

  if (place.bestMonths.includes(prefs.month)) score += 14;
  else score -= 5;

  score += (place.popularity - 3) * 2;

  if (prefs.style === "Offbeat") {
    score += (5 - place.popularity) * 7;
    if (place.popularity <= 2) score += 6;
  }

  if (prefs.style === "Relaxed") {
    if (place.avgDurationHours <= 2) score += 6;
    if (place.avgDurationHours > 4) score -= 9;
  }

  if (prefs.style === "Packed") {
    if (place.avgDurationHours <= 2) score += 5;
    if (place.avgDurationHours >= 4) score -= 3;
  }

  if (prefs.companions === "Family") {
    const easyCategories: Category[] = ["Heritage", "Beaches", "Food", "Temples", "Spiritual"];
    if (place.categories.some((category) => easyCategories.includes(category))) score += 7;
    score += place.avgDurationHours <= 3 ? 5 : -7;
  }

  if (prefs.companions === "Couple") {
    const romantic: Category[] = ["Beaches", "Waterfalls", "Coffee Estates", "Photography", "Heritage"];
    if (place.categories.some((category) => romantic.includes(category))) score += 4;
  }

  if (prefs.companions === "Friends") {
    const social: Category[] = ["Adventure", "Wildlife", "Waterfalls", "Beaches"];
    if (place.categories.some((category) => social.includes(category))) score += 5;
  }

  if (prefs.companions === "Solo") {
    const solo: Category[] = ["Photography", "Spiritual", "Adventure", "Coffee Estates"];
    if (place.categories.some((category) => solo.includes(category))) score += 3;
  }

  if ((prefs.mustVisitIds ?? []).includes(place.id)) score += 90;

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
  const startRegion = CITY_REGION[prefs.startCity];
  const startPoint = START_CITY_COORDS[prefs.startCity];

  return regions
    .map((region) => {
      const places = scored
        .filter((item) => item.place.region === region)
        .sort((a, b) => b.rank - a.rank);
      const top = places.slice(0, 4);
      const average = top.length > 0 ? top.reduce((sum, item) => sum + item.score, 0) / top.length : 0;
      const center = regionCenter(places.map((item) => item.place));
      const distance = haversineKm(startPoint, center);
      const startBonus = region === startRegion ? 45 : Math.max(0, 26 - distance / 22);
      const mustVisitBonus = places.some((item) => (prefs.mustVisitIds ?? []).includes(item.place.id)) ? 80 : 0;
      return {
        region,
        places,
        center,
        score: average + startBonus + mustVisitBonus
      };
    })
    .sort((a, b) => b.score - a.score);
}

function selectRegionSequence(groups: RegionGroup[], prefs: Prefs): Region[] {
  if (groups.length === 0) return [];
  const count = Math.min(prefs.days, groups.length);
  const sequence: Region[] = groups.slice(0, count).map((group) => group.region);

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
  const regionEn = REGION_NAMES_EN[region];
  const regionKn = REGION_NAMES_KN[region];
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
      Photography: `${regionKn}: ಕ್ಯಾಮೆರಾದ ಕಣ್ಣಲ್ಲಿ`
    };
    return map[category];
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
    Photography: `Frames of ${regionEn}`
  };
  return map[category];
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
    kn.push(`ನಿಮ್ಮ ${matched.map((category) => CATEGORY_KN[category]).join(" ಮತ್ತು ")} ಆಸಕ್ತಿಗಾಗಿ ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ.`);
  } else {
    en.push("Adds a different flavour to your route.");
    kn.push("ನಿಮ್ಮ ಪ್ರಯಾಣಕ್ಕೆ ಬೇರೆಯದೇ ರುಚಿ ಸೇರಿಸುತ್ತದೆ.");
  }

  if (bestSeason) {
    en.push(`It is at its best in ${monthEn}.`);
    kn.push(`${monthKn} ತಿಂಗಳಲ್ಲಿ ಇದು ತನ್ನ ಅತ್ಯುತ್ತಮ ಸ್ಥಿತಿಯಲ್ಲಿರುತ್ತದೆ.`);
  } else {
    en.push(`An early start makes ${monthEn} work well.`);
    kn.push(`${monthKn} ತಿಂಗಳಲ್ಲೂ ಬೇಗ ಹೊರಟರೆ ಚೆನ್ನಾಗಿರುತ್ತದೆ.`);
  }

  if (prefs.style === "Offbeat" && place.popularity <= 3) {
    en.push("A quieter, less-touristy stop.");
    kn.push("ಕಡಿಮೆ ಜನಸಂದಣಿಯ ಶಾಂತ ತಾಣ.");
  }

  if (prefs.companions === "Family" && place.avgDurationHours <= 3) {
    en.push("Easy-paced for the whole family.");
    kn.push("ಕುಟುಂಬದೊಂದಿಗೆ ಸುಲಭವಾಗಿ ಸವಿಯಬಹುದು.");
  }

  return { en: en.join(" "), kn: kn.join(" ") };
}

function decorateDay(dayNumber: number, region: Region, orderedPlaces: Place[], prefs: Prefs): Day {
  const slots = SLOT_PROFILES[Math.max(1, Math.min(5, orderedPlaces.length))] ?? SLOT_PROFILES[3];
  let travelKm = 0;
  let clock = START_MINUTES;
  let previous: Place | null = null;
  const stops: Stop[] = [];

  orderedPlaces.forEach((place, index) => {
    if (previous) {
      const distance = haversineKm(previous, place);
      travelKm += distance;
      clock += Math.round((distance / AVERAGE_SPEED_KMH) * 60);
    }
    const why = buildWhy(place, prefs);
    stops.push({
      place,
      slot: slots[index] ?? "evening",
      startTime: totalMinutesToTime(clock),
      durationHours: place.avgDurationHours,
      why_en: why.en,
      why_kn: why.kn
    });
    clock += Math.round(place.avgDurationHours * 60);
  });

  const category = dominantCategory(stops);
  return {
    day: dayNumber,
    region,
    theme_en: themeFor(category, region, "en"),
    theme_kn: themeFor(category, region, "kn"),
    stops,
    travelKm: Math.round(travelKm)
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
  const travelers = getTravelerCount(prefs.companions);
  const nights = Math.max(0, days.length - 1);
  const rooms = Math.max(1, Math.ceil(travelers / 2));
  let stay = 0;
  let food = 0;
  let transport = 0;
  let entry = 0;

  days.forEach((day, index) => {
    const costs = REGION_COSTS[day.region];
    if (index < nights) stay += costs.stay[tierIndex] * rooms;
    food += costs.food[tierIndex] * travelers;
    entry += day.stops.reduce((sum, stop) => sum + stop.place.entryFeeINR, 0) * travelers;
  });

  let previousPoint: { lat: number; lng: number } = START_CITY_COORDS[prefs.startCity];
  days.forEach((day) => {
    if (day.stops.length === 0) return;
    const first = day.stops[0].place;
    const incoming = haversineKm(previousPoint, first);
    const costs = REGION_COSTS[day.region];
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
  const travelers = getTravelerCount(prefs.companions);
  const perDayPerson = prefs.budget / Math.max(1, prefs.days) / Math.max(1, travelers);
  if (perDayPerson < 4000) return 0;
  if (perDayPerson < 9000) return 1;
  return 2;
}

function buildBudget(days: Day[], prefs: Prefs): BudgetBreakdown {
  const travelers = getTravelerCount(prefs.companions);
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
    Math.abs(difference) <= 1 ? "exact" : difference < 0 ? "over" : "under";
  let suggestionEn = "";
  let suggestionKn = "";

  if (status === "over") {
    const overspend = Math.abs(difference);
    if (tierIndex > 0) {
      suggestionEn = `You are about ${formatINR(overspend, "en")} over budget. Moving to ${TIER_NAMES[tierIndex - 1]} stays, trimming one day, or swapping for free-entry stops would close the gap.`;
      suggestionKn = `ನಿಮ್ಮ ಬಜೆಟ್‌ಗಿಂತ ಸುಮಾರು ${formatINR(overspend, "kn")} ಹೆಚ್ಚಾಗಿದೆ. ${TIER_NAMES_KN[TIER_NAMES[tierIndex - 1]]} ವಸತಿ, ಒಂದು ದಿನ ಕಡಿಮೆ ಅಥವಾ ಉಚಿತ ಪ್ರವೇಶದ ತಾಣಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.`;
    } else {
      suggestionEn = `You are about ${formatINR(overspend, "en")} over budget. Choose fewer days, a nearer region, or free-entry stops and local buses to bring it down.`;
      suggestionKn = `ನಿಮ್ಮ ಬಜೆಟ್‌ಗಿಂತ ಸುಮಾರು ${formatINR(overspend, "kn")} ಹೆಚ್ಚಾಗಿದೆ. ಕಡಿಮೆ ದಿನ, ಹತ್ತಿರದ ಪ್ರದೇಶ ಅಥವಾ ಉಚಿತ ಪ್ರವೇಶದ ತಾಣಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.`;
    }
  } else if (status === "under") {
    suggestionEn = `You have about ${formatINR(difference, "en")} to spare. Add a day, upgrade a stay, or include a special local experience.`;
    suggestionKn = `ನಿಮ್ಮ ಬಳಿ ಸುಮಾರು ${formatINR(difference, "kn")} ಉಳಿದಿದೆ. ಒಂದು ದಿನ ಸೇರಿಸಿ, ವಸತಿ ಉತ್ತಮಗೊಳಿಸಿ ಅಥವಾ ವಿಶೇಷ ಸ್ಥಳೀಯ ಅನುಭವ ಸೇರಿಸಿ.`;
  } else {
    suggestionEn = "Your estimate lands almost exactly on budget. A well-balanced plan.";
    suggestionKn = "ನಿಮ್ಮ ಅಂದಾಜು ಬಜೆಟ್‌ಗೆ ಬಹುತೇಕ ಸರಿಯಾಗಿದೆ. ಸಮತೋಲಿತ ಯೋಜನೆ.";
  }

  return {
    tier: TIER_NAMES[tierIndex],
    tierIndex,
    nights,
    rooms,
    travelers,
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

function buildIntro(days: Day[], prefs: Prefs, budget: BudgetBreakdown, matchScore: number): { en: string; kn: string } {
  const travelers = getTravelerCount(prefs.companions);
  const placeCount = days.reduce((sum, day) => sum + day.stops.length, 0);
  const routeEn = uniqueRegions(days).map((region) => REGION_NAMES_EN[region]).join(", ");
  const routeKn = uniqueRegions(days).map((region) => REGION_NAMES_KN[region]).join(", ");
  const interestsEn = prefs.interests.join(", ");
  const interestsKn = prefs.interests.map((category) => CATEGORY_KN[category]).join(", ");
  const styleEn = prefs.style.toLowerCase();
  const cityEn = REGION_NAMES_EN[CITY_REGION[prefs.startCity]];
  const cityKn = REGION_NAMES_KN[CITY_REGION[prefs.startCity]];

  return {
    en: `Namaskara! This ${prefs.days}-day ${styleEn} journey starts in ${cityEn} and moves through ${routeEn}. We selected ${placeCount} places around your love for ${interestsEn}, your ${prefs.companions.toLowerCase()} travel style and the ${monthName(prefs.month, "en")} season. The estimated cost is ${formatINR(budget.total, "en")} for ${travelers} ${travelers === 1 ? "traveller" : "travellers"}, with a ${matchScore}% interest match.`,
    kn: `ನಮಸ್ಕಾರ! ನಿಮ್ಮ ${toKannadaDigits(prefs.days)} ದಿನಗಳ ${STYLE_KN[prefs.style]} ಪ್ರಯಾಣ ${cityKn}ನಿಂದ ಆರಂಭವಾಗಿ ${routeKn} ಮೂಲಕ ಸಾಗುತ್ತದೆ. ನಿಮ್ಮ ${interestsKn} ಆಸಕ್ತಿ, ${COMPANION_KN[prefs.companions]} ಪ್ರಯಾಣ ಶೈಲಿ ಮತ್ತು ${monthName(prefs.month, "kn")} ಋತುವಿಗೆ ತಕ್ಕಂತೆ ${toKannadaDigits(placeCount)} ಸ್ಥಳಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಿದ್ದೇವೆ. ${toKannadaDigits(travelers)} ಪ್ರಯಾಣಿಕರಿಗೆ ಅಂದಾಜು ವೆಚ್ಚ ${formatINR(budget.total, "kn")}; ಆಸಕ್ತಿ ಹೊಂದಾಣಿಕೆ ${toKannadaDigits(matchScore)}%.`
  };
}

function finalizePlan(days: Day[], prefs: Prefs, scoredPlacesMap?: Map<string, number>): Itinerary {
  const budget = buildBudget(days, prefs);
  const stops = days.flatMap((day) => day.stops);
  const rawMatch =
    stops.length > 0
      ? Math.round(
          stops.reduce(
            (sum, stop) =>
              sum + (scoredPlacesMap?.get(stop.place.id) ?? scorePlaceForPrefs(stop.place, prefs)),
            0
          ) / stops.length
        )
      : 0;
  const matchScore = Math.max(0, Math.min(100, rawMatch));
  const intro = buildIntro(days, prefs, budget, matchScore);

  return {
    prefs,
    days,
    budget,
    matchScore,
    intro_en: intro.en,
    intro_kn: intro.kn,
    summary: {
      days: days.length,
      places: stops.length,
      estimatedCost: budget.total,
      budget: prefs.budget,
      matchScore,
      budgetTier: budget.tier,
      status: budget.status
    }
  };
}

export function buildItinerary(input: unknown): Itinerary {
  const prefs = normalizePrefs(input);
  const scored = buildScoredPlaces(prefs);
  const scoredMap = new Map<string, number>(scored.map((item) => [item.place.id, item.score]));
  const groups = buildRegionGroups(scored, prefs);
  const regionSequence = selectRegionSequence(groups, prefs);
  const used = new Set<string>();
  const days: Day[] = [];

  regionSequence.forEach((requestedRegion) => {
    let region = requestedRegion;
    let places = pickDayPlaces(region, scored, used, prefs);

    if (places.length === 0) {
      const alternative = groups
        .filter((group) => group.region !== region)
        .map((group) => ({
          group,
          available: group.places.filter((item) => !used.has(item.place.id)).length
        }))
        .filter((entry) => entry.available > 0)
        .sort((a, b) => b.available - a.available || b.group.score - a.group.score)[0]?.group;
      if (!alternative) return;
      region = alternative.region;
      places = pickDayPlaces(region, scored, used, prefs);
    }

    if (places.length === 0) return;
    places.forEach((place) => used.add(place.id));
    days.push(decorateDay(days.length + 1, region, places, prefs));
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
    days.push(decorateDay(1, dayRegion, fallbackPlaces, prefs));
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
    return decorateDay(item.day, item.region, places, plan.prefs);
  });

  return finalizePlan(newDays, plan.prefs);
}

export function regionsInItinerary(plan: Itinerary): Region[] {
  return uniqueRegions(plan.days);
}

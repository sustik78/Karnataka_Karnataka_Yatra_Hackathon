export type Lang = "en" | "kn";

export type Category =
  | "Heritage"
  | "Temples"
  | "Wildlife"
  | "Beaches"
  | "Hills & Trekking"
  | "Waterfalls"
  | "Coffee Estates"
  | "Food"
  | "Adventure"
  | "Spiritual"
  | "Photography"
  | "Artisans & Crafts";

export type Region =
  | "Bengaluru"
  | "Mysuru"
  | "Mangaluru"
  | "Uttara Kannada"
  | "Chikkamagaluru"
  | "Hassan"
  | "Shivamogga"
  | "Coorg"
  | "Hampi"
  | "Hubballi-Dharwad"
  | "Badami"
  | "Vijayapura"
  | "Kalaburagi"
  | "Chitradurga"
  | "Belagavi";

export type TravelStyle = "Relaxed" | "Balanced" | "Packed" | "Offbeat";

export type Companion = "Solo" | "Couple" | "Family" | "Friends";

export type DietPreference = "Any" | "Vegetarian" | "Pure Veg" | "Non-Veg";

export type StayPreference = "Any" | "Homestay" | "Heritage" | "Budget" | "Comfort" | "Luxury";

export type City =
  | "Bengaluru"
  | "Mysuru"
  | "Mangaluru"
  | "Hubballi"
  | "Belagavi"
  | "Shivamogga"
  | "Vijayapura";

export type BudgetTierName = "Budget" | "Comfort" | "Luxury";

export type DaySlot = "morning" | "afternoon" | "evening";

export interface Place {
  id: string;
  name_en: string;
  name_kn: string;
  region: Region;
  categories: Category[];
  lat: number;
  lng: number;
  avgDurationHours: number;
  entryFeeINR: number;
  bestMonths: number[];
  popularity: number;
  desc_en: string;
  desc_kn: string;
  dish_en: string;
  dish_kn: string;
  tip_en: string;
  tip_kn: string;
  seasonAlert_en?: string;
  seasonAlert_kn?: string;
  crowdTip_en?: string;
  crowdTip_kn?: string;
  lastVerified?: string;
  artisanOrHomestay_en?: string;
  artisanOrHomestay_kn?: string;
}

export interface Dish {
  id: string;
  name_en: string;
  name_kn: string;
  desc_en: string;
  desc_kn: string;
  region: Region;
  diet?: "Veg" | "Non-Veg" | "Sattvic";
}

export interface Festival {
  id: string;
  name_en: string;
  name_kn: string;
  region: Region | "All";
  months: number[];
  desc_en: string;
  desc_kn: string;
  timingNote_en?: string;
  timingNote_kn?: string;
}

export interface Phrase {
  id: string;
  kn: string;
  translit: string;
  en: string;
  category: "greetings" | "directions" | "food" | "shopping" | "emergency" | "culture";
}

export interface RegionCost {
  stay: [number, number, number];
  food: [number, number, number];
  transportPerKm: [number, number, number];
}

export interface Prefs {
  interests: Category[];
  days: number;
  budget: number;
  style: TravelStyle;
  companions: Companion;
  startCity: City;
  month: number;
  mustVisitIds?: string[];
  seed?: number;
  adults?: number;
  kids?: number;
  seniors?: number;
  diet?: DietPreference;
  stayPref?: StayPreference;
}

export interface Stop {
  place: Place;
  slot: DaySlot;
  startTime: string;
  durationHours: number;
  why_en: string;
  why_kn: string;
  distanceFromPrevKm?: number;
  driveTimeMin?: number;
}

export interface Day {
  day: number;
  region: Region;
  theme_en: string;
  theme_kn: string;
  stops: Stop[];
  travelKm: number;
  transportInfo_en?: {
    road: string;
    bus: string;
    train?: string;
  };
  transportInfo_kn?: {
    road: string;
    bus: string;
    train?: string;
  };
}

export interface BudgetBreakdown {
  tier: BudgetTierName;
  tierIndex: number;
  nights: number;
  rooms: number;
  travelers: number;
  adults: number;
  kids: number;
  seniors: number;
  stay: number;
  food: number;
  transport: number;
  entry: number;
  total: number;
  perPerson: number;
  difference: number;
  status: "under" | "over" | "exact";
  suggestion_en: string;
  suggestion_kn: string;
}

export interface ItinerarySummary {
  days: number;
  places: number;
  estimatedCost: number;
  budget: number;
  matchScore: number;
  budgetTier: BudgetTierName;
  status: "under" | "over" | "exact";
}

export interface Itinerary {
  prefs: Prefs;
  days: Day[];
  budget: BudgetBreakdown;
  matchScore: number;
  intro_en: string;
  intro_kn: string;
  summary: ItinerarySummary;
}

export interface NarrationDay {
  theme: string;
  stops: Array<{ id: string; why: string }>;
}

export interface NarrationPayload {
  intro: string;
  days: NarrationDay[];
}

export interface NarrationResponse {
  narration: NarrationPayload;
  source: "gemini" | "template";
}

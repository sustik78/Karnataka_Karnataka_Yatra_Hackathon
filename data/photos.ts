import type { Region } from "@/lib/types";

export const HERO_PHOTOS = {
  mysuru: "/images/hero/hero-mysuru.jpg",
  hampi: "/images/hero/hero-hampi.jpg",
  coorg: "/images/hero/hero-coorg.jpg",
  coast: "/images/hero/hero-coast.jpg",
  bengaluru: "/images/hero/hero-vidhana.jpg"
} as const;

export const REGION_PHOTOS: Record<Region, string> = {
  Bengaluru: "/images/places/vidhana-soudha.jpg",
  Mysuru: HERO_PHOTOS.mysuru,
  Mangaluru: HERO_PHOTOS.coast,
  Hubballi: "/images/places/pattadakal.jpg",
  Belagavi: "/images/places/gokak-falls.jpg",
  Coorg: HERO_PHOTOS.coorg,
  Hampi: HERO_PHOTOS.hampi,
  Chikkamagaluru: "/images/places/mullayanagiri.jpg"
};

export const KNOWN_PLACE_PHOTOS = new Set([
  "abbey-falls", "agumbe", "aihole", "anegundi", "baba-budangiri", "badami", "bandipur",
  "belagavi-fort", "belur", "bidar-fort", "brindavan-gardens", "chamundi-hills",
  "chikkamagaluru", "cubbon-park", "dandeli", "devbagh", "dharmasthala", "dubare",
  "gokak-falls", "gokarna-temple", "gol-gumbaz", "halebidu", "hemakuta-hill",
  "jog-falls", "kabini", "kaup-beach", "kittur-fort", "kudremukh", "kukke-subramanya",
  "lalbagh", "madikeri-fort", "malpe-beach", "maravanthe", "mullayanagiri",
  "murudeshwar", "mysuru-palace", "mysuru-zoo", "nagarhole", "namdroling", "nandi-hills",
  "om-beach", "panambur-beach", "pattadakal", "queens-bath", "ranganathittu",
  "sakleshpur", "shravanabelagola", "somanathapura", "srirangapatna", "st-marys-island",
  "talakaveri", "udupi-krishna", "vidhana-soudha", "virupaksha-temple", "vittala-temple",
  "yana-rocks"
]);

export function placePhoto(id: string, fallback: string = HERO_PHOTOS.mysuru): string {
  if (KNOWN_PLACE_PHOTOS.has(id)) {
    return `/images/places/${id}.jpg`;
  }
  return fallback;
}

export function regionPhoto(region: Region): string {
  return REGION_PHOTOS[region];
}

export const PHOTO_CREDIT = {
  en: "Photographs: Karnataka Tourism, Government of Karnataka",
  kn: "ಛಾಯಾಚಿತ್ರಗಳು: ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ"
} as const;

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
  "Uttara Kannada": "/images/places/murudeshwar.jpg",
  Chikkamagaluru: "/images/places/mullayanagiri.jpg",
  Hassan: "/images/places/belur.jpg",
  Shivamogga: "/images/places/jog-falls.jpg",
  Coorg: HERO_PHOTOS.coorg,
  Hampi: HERO_PHOTOS.hampi,
  "Hubballi-Dharwad": "/images/places/pattadakal.jpg",
  Badami: "/images/places/badami.jpg",
  Vijayapura: "/images/places/gol-gumbaz.jpg",
  Kalaburagi: "/images/places/bidar-fort.jpg",
  Chitradurga: "/images/places/kittur-fort.jpg",
  Belagavi: "/images/places/gokak-falls.jpg"
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
  // Mapping for custom/artisan places to visually stunning relevant photos
  if (id === "chitradurga-fort") return "/images/places/kittur-fort.jpg";
  if (id === "ibrahim-rauza") return "/images/places/gol-gumbaz.jpg";
  if (id === "hubballi-heritage") return "/images/places/aihole.jpg";
  if (id === "kalaburagi-fort") return "/images/places/bidar-fort.jpg";
  if (id === "channapatna-crafts") return "/images/places/lalbagh.jpg";
  if (id === "ilkal-weaving") return "/images/places/badami.jpg";
  if (id === "bidri-crafts") return "/images/places/bidar-fort.jpg";
  if (id === "mysuru-silk") return "/images/places/mysuru-palace.jpg";
  if (id === "kinnal-crafts") return "/images/places/virupaksha-temple.jpg";

  return fallback;
}

export function regionPhoto(region: Region): string {
  return REGION_PHOTOS[region] ?? HERO_PHOTOS.mysuru;
}

export const PHOTO_CREDIT = {
  en: "Photographs: Karnataka Tourism, Government of Karnataka & KSTDC Archives",
  kn: "ಛಾಯಾಚಿತ್ರಗಳು: ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಮತ್ತು ಕೆಎಸ್‌ಟಿಡಿಸಿ"
} as const;

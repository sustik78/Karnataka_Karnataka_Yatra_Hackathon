import type {
  Category,
  City,
  Dish,
  Festival,
  Phrase,
  Place,
  Region,
  RegionCost,
  TravelStyle,
  Companion
} from "@/lib/types";

export const CATEGORIES: Category[] = [
  "Heritage",
  "Temples",
  "Wildlife",
  "Beaches",
  "Hills & Trekking",
  "Waterfalls",
  "Coffee Estates",
  "Food",
  "Adventure",
  "Spiritual",
  "Photography",
  "Artisans & Crafts"
];

export const REGION_NAMES_EN: Record<Region, string> = {
  "Bengaluru": "Bengaluru",
  "Mysuru": "Mysuru",
  "Mangaluru": "Mangaluru & Udupi",
  "Uttara Kannada": "Uttara Kannada",
  "Chikkamagaluru": "Chikkamagaluru",
  "Hassan": "Hassan",
  "Shivamogga": "Shivamogga",
  "Coorg": "Coorg (Kodagu)",
  "Hampi": "Hampi (Vijayanagara)",
  "Hubballi-Dharwad": "Hubballi-Dharwad",
  "Badami": "Badami & Bagalkote",
  "Vijayapura": "Vijayapura",
  "Kalaburagi": "Kalaburagi & Bidar",
  "Chitradurga": "Chitradurga",
  "Belagavi": "Belagavi"
};

export const REGION_NAMES_KN: Record<Region, string> = {
  "Bengaluru": "ಬೆಂಗಳೂರು",
  "Mysuru": "ಮೈಸೂರು",
  "Mangaluru": "ಮಂಗಳೂರು ಮತ್ತು ಉಡುಪಿ",
  "Uttara Kannada": "ಉತ್ತರ ಕನ್ನಡ",
  "Chikkamagaluru": "ಚಿಕ್ಕಮಗಳೂರು",
  "Hassan": "ಹಾಸನ",
  "Shivamogga": "ಶಿವಮೊಗ್ಗ",
  "Coorg": "ಕೊಡಗು",
  "Hampi": "ಹಂಪಿ",
  "Hubballi-Dharwad": "ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ",
  "Badami": "ಬದಾಮಿ-ಬಾಗಲಕೋಟೆ",
  "Vijayapura": "ವಿಜಯಪುರ",
  "Kalaburagi": "ಕಲಬುರಗಿ ಮತ್ತು ಬೀದರ್",
  "Chitradurga": "ಚಿತ್ರದುರ್ಗ",
  "Belagavi": "ಬೆಳಗಾವಿ"
};

export const START_CITIES: City[] = [
  "Bengaluru",
  "Mysuru",
  "Mangaluru",
  "Hubballi",
  "Belagavi",
  "Shivamogga",
  "Vijayapura"
];

export const START_CITY_COORDS: Record<City, { lat: number; lng: number }> = {
  "Bengaluru": {
    "lat": 12.9716,
    "lng": 77.5946
  },
  "Mysuru": {
    "lat": 12.2958,
    "lng": 76.6394
  },
  "Mangaluru": {
    "lat": 12.9141,
    "lng": 74.856
  },
  "Hubballi": {
    "lat": 15.3647,
    "lng": 75.124
  },
  "Belagavi": {
    "lat": 15.8497,
    "lng": 74.4977
  },
  "Shivamogga": {
    "lat": 13.9299,
    "lng": 75.5681
  },
  "Vijayapura": {
    "lat": 16.8302,
    "lng": 75.71
  }
};

export const TRAVEL_STYLES: TravelStyle[] = [
  "Relaxed",
  "Balanced",
  "Packed",
  "Offbeat"
];
export const COMPANIONS: Companion[] = [
  "Solo",
  "Couple",
  "Family",
  "Friends"
];

export const PLACES: Place[] = [
  {
    "id": "lalbagh",
    "name_en": "Lalbagh Botanical Garden",
    "name_kn": "ಲಾಲ್‌ಬಾಗ್ ಸಸ್ಯೋದ್ಯಾನ",
    "region": "Bengaluru",
    "categories": [
      "Heritage",
      "Photography"
    ],
    "lat": 12.9507,
    "lng": 77.5848,
    "avgDurationHours": 2.5,
    "entryFeeINR": 30,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      9,
      10,
      11,
      12
    ],
    "popularity": 5,
    "desc_en": "A 240-acre botanical treasure founded by Hyder Ali, home to the Glass House, ancient rock formations and a celebrated collection of tropical plants.",
    "desc_kn": "ಹೈದರ್ ಅಲಿ ಸ್ಥಾಪಿಸಿದ 240 ಎಕರೆಗಳ ಸಸ್ಯ ಸಂಪತ್ತು. ಗ್ಲಾಸ್ ಹೌಸ್, ಪ್ರಾಚೀನ ಬಂಡೆಗಳು ಮತ್ತು ಅಪರೂಪದ ಉಷ್ಣವಲಯ ಸಸ್ಯಗಳಿಗೆ ಪ್ರಸಿದ್ಧ.",
    "dish_en": "Masala Dosa",
    "dish_kn": "ಮಸಾಲೆ ದೋಸೆ",
    "tip_en": "Arrive before 8 AM for birdsong, cool air and the best light in the Glass House.",
    "tip_kn": "ಪಕ್ಷಿಗಳ ಕಲರವ, ತಂಪಾದ ಗಾಳಿ ಮತ್ತು ಗ್ಲಾಸ್ ಹೌಸ್‌ನ ಉತ್ತಮ ಬೆಳಕಿಗಾಗಿ ಬೆಳಗ್ಗೆ 8 ಗಂಟೆಗೆ ಮೊದಲು ಬನ್ನಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "cubbon-park",
    "name_en": "Cubbon Park",
    "name_kn": "ಕಬ್ಬನ್ ಪಾರ್ಕ್",
    "region": "Bengaluru",
    "categories": [
      "Heritage",
      "Photography"
    ],
    "lat": 12.9763,
    "lng": 77.5929,
    "avgDurationHours": 1.5,
    "entryFeeINR": 0,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "popularity": 4,
    "desc_en": "Bengaluru's green lung, a leafy Victorian-era park wrapped around colonial statues, heritage buildings and wide walking avenues.",
    "desc_kn": "ಬೆಂಗಳೂರಿನ ಹಸಿರು ಹೃದಯ. ವಸಾಹತುಶಾಹಿ ಪ್ರತಿಮೆಗಳು, ಪರಂಪರೆಯ ಕಟ್ಟಡಗಳು ಮತ್ತು ಅಗಲವಾದ ನಡಿಗೆ ಹಾದಿಗಳ ನಡುವೆ ಹಬ್ಬಿರುವ ವಿಕ್ಟೋರಿಯನ್ ಉದ್ಯಾನ.",
    "dish_en": "Filter Coffee",
    "dish_kn": "ಫಿಲ್ಟರ್ ಕಾಫಿ",
    "tip_en": "Walk toward the red Gothic State Central Library and the bandstand for the prettiest corners.",
    "tip_kn": "ಕೆಂಪು ಗೋಥಿಕ್ ಸ್ಟೇಟ್ ಸೆಂಟ್ರಲ್ ಲೈಬ್ರರಿ ಮತ್ತು ಬ್ಯಾಂಡ್‌ಸ್ಟ್ಯಾಂಡ್ ಕಡೆ ನಡೆಯಿರಿ; ಅಲ್ಲಿನ ದೃಶ್ಯ ಸುಂದರ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "vidhana-soudha",
    "name_en": "Vidhana Soudha",
    "name_kn": "ವಿಧಾನ ಸೌಧ",
    "region": "Bengaluru",
    "categories": [
      "Heritage",
      "Photography"
    ],
    "lat": 12.9794,
    "lng": 77.5907,
    "avgDurationHours": 0.75,
    "entryFeeINR": 0,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      9,
      10,
      11,
      12
    ],
    "popularity": 5,
    "desc_en": "Karnataka's monumental neo-Dravidian legislature, crowned by a grand dome and glowing dramatically during evening illuminations.",
    "desc_kn": "ಕರ್ನಾಟಕದ ಭವ್ಯ ನವ-ದ್ರಾವಿಡ ಶೈಲಿಯ ವಿಧಾನ ಮಂದಿರ. ದೊಡ್ಡ ಗುಮ್ಮಟ ಮತ್ತು ಸಂಜೆಯ ದೀಪಾಲಂಕಾರದಿಂದ ಅದ್ಭುತವಾಗಿ ಹೊಳೆಯುತ್ತದೆ.",
    "dish_en": "Benne Dose",
    "dish_kn": "ಬೆಣ್ಣೆ ದೋಸೆ",
    "tip_en": "Public entry is restricted, so plan a photo stop from the lawn opposite and visit after dusk on a Sunday.",
    "tip_kn": "ಸಾರ್ವಜನಿಕ ಪ್ರವೇಶ ನಿರ್ಬಂಧಿತ. ಎದುರಿನ ಹುಲ್ಲುಹಾಸಿನಿಂದ ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ; ಭಾನುವಾರ ಸಂಜೆ ದೀಪಾಲಂಕಾರ ನೋಡಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "nandi-hills",
    "name_en": "Nandi Hills",
    "name_kn": "ನಂದಿ ಬೆಟ್ಟ",
    "region": "Bengaluru",
    "categories": [
      "Hills & Trekking",
      "Adventure",
      "Photography",
      "Heritage"
    ],
    "lat": 13.3702,
    "lng": 77.6835,
    "avgDurationHours": 3,
    "entryFeeINR": 15,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      9,
      10,
      11,
      12
    ],
    "popularity": 5,
    "desc_en": "A 1,480-metre sunrise ridge with Tipu Sultan's summer retreat, old gateways, cloud-wrapped cliffs and sweeping views over the plains.",
    "desc_kn": "1,480 ಮೀಟರ್ ಎತ್ತರದ ಸೂರ್ಯೋದಯ ಬೆಟ್ಟ. ಟಿಪ್ಪು ಸುಲ್ತಾನ್ ಬೇಸಿಗೆ ತಾಣ, ಹಳೆಯ ದ್ವಾರಗಳು, ಮೋಡ ಸುತ್ತಿದ ಬಂಡೆಗಳು ಮತ್ತು ವಿಶಾಲ ಮೈದಾನ ದೃಶ್ಯ.",
    "dish_en": "Thatte Idli",
    "dish_kn": "ತಟ್ಟೆ ಇಡ್ಲಿ",
    "tip_en": "Reach the gate by 5:30 AM on weekends; the parking queue grows quickly after sunrise.",
    "tip_kn": "ವಾರಾಂತ್ಯದಲ್ಲಿ ಬೆಳಗ್ಗೆ 5:30ಕ್ಕೆ ದ್ವಾರ ತಲುಪಿ; ಸೂರ್ಯೋದಯದ ನಂತರ ಪಾರ್ಕಿಂಗ್ ಸಾಲು ಬೇಗ ಹೆಚ್ಚಾಗುತ್ತದೆ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "mysuru-palace",
    "name_en": "Mysuru Palace",
    "name_kn": "ಮೈಸೂರು ಅರಮನೆ",
    "region": "Mysuru",
    "categories": [
      "Heritage",
      "Photography"
    ],
    "lat": 12.3052,
    "lng": 76.6552,
    "avgDurationHours": 2.5,
    "entryFeeINR": 70,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "popularity": 5,
    "desc_en": "The Indo-Saracenic palace of the Wadiyar dynasty, with stained glass, carved rosewood doors, mirrored halls and a dazzling Sunday light show.",
    "desc_kn": "ವಡೆಯರ್ ಸಂತತಿಯ ಇಂಡೋ-ಸಾರಸೆನಿಕ್ ಅರಮನೆ. ಬಣ್ಣದ ಗಾಜು, ಕೆತ್ತಿದ ಗುಲಗಂಚಿ ಬಾಗಿಲು, ಕನ್ನಡಿ ಮಂದಿರ ಮತ್ತು ಭಾನುವಾರದ ಬೆಳಕಿನ ಪ್ರದರ್ಶನ.",
    "dish_en": "Mysore Pak",
    "dish_kn": "ಮೈಸೂರು ಪಾಕ್",
    "tip_en": "Buy the palace + museum combo ticket and keep the audio guide; footwear is removed inside the main palace.",
    "tip_kn": "ಅರಮನೆ ಮತ್ತು ವಸ್ತುಸಂಗ್ರಹಾಲಯದ ಒಟ್ಟು ಟಿಕೆಟ್ ಪಡೆಯಿರಿ; ಮುಖ್ಯ ಅರಮನೆಯೊಳಗೆ ಚಪ್ಪಲಿ ತೆಗೆಯಬೇಕು.",
    "seasonAlert_en": "Spectacular Dasara season (Oct); grand illuminations on Sundays and public holidays.",
    "seasonAlert_kn": "ದಸರಾ ಸಮಯದಲ್ಲಿ (ಅಕ್ಟೋಬರ್) ಭವ್ಯ; ಭಾನುವಾರ ಮತ್ತು ರಜಾದಿನಗಳಲ್ಲಿ ದೀಪಾಲಂಕಾರ ಅದ್ಭುತ.",
    "crowdTip_en": "Avoid 11 AM–2 PM tour buses; 9:30 AM entry gives peaceful courtyard photography.",
    "crowdTip_kn": "ಬೆಳಗ್ಗೆ 9:30 ಕ್ಕೆ ಪ್ರವೇಶಿಸಿ; ಮಧ್ಯಾಹ್ನದ ಜನಸಂದಣಿಯನ್ನು ತಪ್ಪಿಸಿ ಶಾಂತವಾಗಿ ಅರಮನೆ ನೋಡಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI"
  },
  {
    "id": "chamundi-hills",
    "name_en": "Chamundi Hills",
    "name_kn": "ಚಾಮುಂಡಿ ಬೆಟ್ಟ",
    "region": "Mysuru",
    "categories": [
      "Spiritual",
      "Temples",
      "Heritage",
      "Hills & Trekking",
      "Photography"
    ],
    "lat": 12.2724,
    "lng": 76.6707,
    "avgDurationHours": 2,
    "entryFeeINR": 0,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "popularity": 5,
    "desc_en": "A sacred hill crowned by the Chamundeshwari Temple, with 1,000 stone steps, a giant Nandi and wonderful views over Mysuru.",
    "desc_kn": "ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಾಲಯದಿಂದ ಅಲಂಕೃತ ಪವಿತ್ರ ಬೆಟ್ಟ. 1,000 ಕಲ್ಲಿನ ಮೆಟ್ಟಿಲುಗಳು, ದೊಡ್ಡ ನಂದಿ ಮತ್ತು ಮೈಸೂರು ನಗರದ ಸುಂದರ ದೃಶ್ಯ.",
    "dish_en": "Bisi Bele Bath",
    "dish_kn": "ಬಿಸಿ ಬೇಳೆ ಬಾತ್",
    "tip_en": "Dress modestly for the temple and avoid carrying plastic bags; the 1,000-step climb takes about 45 minutes.",
    "tip_kn": "ದೇವಾಲಯಕ್ಕೆ ಸಭ್ಯ ಉಡುಗೆ ಧರಿಸಿ, ಪ್ಲಾಸ್ಟಿಕ್ ಚೀಲ ತಪ್ಪಿಸಿ; 1,000 ಮೆಟ್ಟಿಲು ಏರಲು ಸುಮಾರು 45 ನಿಮಿಷ ಬೇಕು.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "brindavan-gardens",
    "name_en": "Brindavan Gardens",
    "name_kn": "ಬೃಂದಾವನ ಉದ್ಯಾನ",
    "region": "Mysuru",
    "categories": [
      "Heritage",
      "Photography"
    ],
    "lat": 12.4218,
    "lng": 76.5733,
    "avgDurationHours": 2,
    "entryFeeINR": 30,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      9,
      10,
      11,
      12
    ],
    "popularity": 4,
    "desc_en": "Terraced formal gardens beside the Krishna Raja Sagara dam, famous for topiary avenues, fountains and a musical fountain at dusk.",
    "desc_kn": "ಕೃಷ್ಣರಾಜ ಸಾಗರ ಅಣೆಕಟ್ಟೆಯ ಪಕ್ಕದ ಮೆಟ್ಟಿಲು ಉದ್ಯಾನ. ಅಲಂಕೃತ ಸಸ್ಯ ಸಾಲುಗಳು, ಕಾರಂಜಿಗಳು ಮತ್ತು ಸಂಜೆಯ ಸಂಗೀತ ಕಾರಂಜಿಗೆ ಪ್ರಸಿದ್ಧ.",
    "dish_en": "Mysore Pak",
    "dish_kn": "ಮೈಸೂರು ಪಾಕ್",
    "tip_en": "Stay for the musical fountain after sunset and check the day's show timings at the entrance.",
    "tip_kn": "ಸೂರ್ಯಾಸ್ತದ ನಂತರ ಸಂಗೀತ ಕಾರಂಜಿ ನೋಡಿ; ಪ್ರವೇಶದ್ವಾರದಲ್ಲಿ ಆ ದಿನದ ಸಮಯ ಪರಿಶೀಲಿಸಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "srirangapatna",
    "name_en": "Srirangapatna",
    "name_kn": "ಶ್ರೀರಂಗಪಟ್ಟಣ",
    "region": "Mysuru",
    "categories": [
      "Heritage",
      "Spiritual",
      "Photography"
    ],
    "lat": 12.4226,
    "lng": 76.6913,
    "avgDurationHours": 2.5,
    "entryFeeINR": 0,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "popularity": 4,
    "desc_en": "Tipu Sultan's island fortress town on the Kaveri, home to the Ranganathaswamy Temple, Daria Daulat Bagh and layered battle history.",
    "desc_kn": "ಕಾವೇರಿ ನದಿಯ ದ್ವೀಪದಲ್ಲಿರುವ ಟಿಪ್ಪು ಸುಲ್ತಾನ್ ಕೋಟೆ ಪಟ್ಟಣ. ರಂಗನಾಥಸ್ವಾಮಿ ದೇವಾಲಯ, ದರಿಯಾ ದೌಲತ್ ಬಾಗ್ ಮತ್ತು ಯುದ್ಧ ಇತಿಹಾಸದ ಪದರಗಳು.",
    "dish_en": "Ragi Mudde",
    "dish_kn": "ರಾಗಿ ಮುದ್ದೆ",
    "tip_en": "Combine the temple, Daria Daulat Bagh and Gumbaz in one loop; roads are narrow, so park once and walk.",
    "tip_kn": "ದೇವಾಲಯ, ದರಿಯಾ ದೌಲತ್ ಬಾಗ್ ಮತ್ತು ಗುಂಬಜ್ ಒಂದೇ ಸುತ್ತಿನಲ್ಲಿ ನೋಡಿ; ರಸ್ತೆಗಳು ಸಣ್ಣವು, ಒಮ್ಮೆ ಪಾರ್ಕ್ ಮಾಡಿ ನಡೆಯಿರಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "somanathapura",
    "name_en": "Somanathapura Temple",
    "name_kn": "ಸೋಮನಾಥಪುರ ದೇವಾಲಯ",
    "region": "Mysuru",
    "categories": [
      "Heritage",
      "Temples",
      "Photography",
      "Spiritual"
    ],
    "lat": 12.2748,
    "lng": 76.8899,
    "avgDurationHours": 1.5,
    "entryFeeINR": 25,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      9,
      10,
      11,
      12
    ],
    "popularity": 3,
    "desc_en": "A jewel of Hoysala architecture, the star-shaped Keshava Temple carries three sculpted shrines and some of the finest soapstone carving in India.",
    "desc_kn": "ಹೊಯ್ಸಳ ವಾಸ್ತುಶಿಲ್ಪದ ರತ್ನ. ನಕ್ಷತ್ರಾಕಾರದ ಕೇಶವ ದೇವಾಲಯದಲ್ಲಿ ಮೂರು ಕೆತ್ತಿದ ಗರ್ಭಗೃಹಗಳು ಮತ್ತು ಭಾರತದ ಅತ್ಯುತ್ತಮ ಬಳಪದ ಕಲ್ಲಿನ ಕೆತ್ತನೆ.",
    "dish_en": "Bisi Bele Bath",
    "dish_kn": "ಬಿಸಿ ಬೇಳೆ ಬಾತ್",
    "tip_en": "Bring a local guide or read the panel before entering; the narrative friezes are easy to miss without context.",
    "tip_kn": "ಒಳಗೆ ಹೋಗುವ ಮೊದಲು ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಿ ಅಥವಾ ಮಾಹಿತಿ ಫಲಕ ಓದಿ; ಕಥಾ ಶಿಲ್ಪಗಳನ್ನು ಗಮನಿಸದೆ ಹೋಗಬಹುದು.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "mysuru-zoo",
    "name_en": "Mysuru Zoo",
    "name_kn": "ಮೈಸೂರು ಪ್ರಾಣಿಸಂಗ್ರಹಾಲಯ",
    "region": "Mysuru",
    "categories": [
      "Wildlife",
      "Photography"
    ],
    "lat": 12.301,
    "lng": 76.663,
    "avgDurationHours": 3,
    "entryFeeINR": 100,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "popularity": 4,
    "desc_en": "One of India's oldest and best-designed zoos, with broad leafy enclosures, a giraffe house, reptiles and a lake full of waterbirds.",
    "desc_kn": "ಭಾರತದ ಅತ್ಯಂತ ಹಳೆಯ ಮತ್ತು ಚೆನ್ನಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಿದ ಪ್ರಾಣಿಸಂಗ್ರಹಾಲಯಗಳಲ್ಲಿ ಒಂದು. ವಿಶಾಲ ಮರದ ಆವರಣಗಳು, ಜಿರಾಫೆ ಮನೆ, ಸರೀಸೃಪಗಳು ಮತ್ತು ಜಲಪಕ್ಷಿಗಳ ಕೆರೆ.",
    "dish_en": "Masala Dosa",
    "dish_kn": "ಮಸಾಲೆ ದೋಸೆ",
    "tip_en": "Visit early morning when animals are active; the zoo is closed on Tuesdays.",
    "tip_kn": "ಪ್ರಾಣಿಗಳು ಚುರುಕಾಗಿರುವ ಬೆಳಗ್ಗೆ ಭೇಟಿ ನೀಡಿ; ಮಂಗಳವಾರ ಪ್ರಾಣಿಸಂಗ್ರಹಾಲಯ ಬಂದ್.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "ranganathittu",
    "name_en": "Ranganathittu Bird Sanctuary",
    "name_kn": "ರಂಗನತಿಟ್ಟು ಪಕ್ಷಿಧಾಮ",
    "region": "Mysuru",
    "categories": [
      "Wildlife",
      "Photography",
      "Adventure"
    ],
    "lat": 12.4204,
    "lng": 76.6578,
    "avgDurationHours": 2,
    "entryFeeINR": 75,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 4,
    "desc_en": "A cluster of Kaveri river islets sheltering painted storks, spoonbills, ibis and crocodiles, best seen from a quiet boat ride.",
    "desc_kn": "ಕಾವೇರಿ ನದಿಯ ಸಣ್ಣ ದ್ವೀಪಗಳ ಸಮೂಹ. ಬಣ್ಣದ ಕೊಕ್ಕರೆಗಳು, ಸ್ಪೂನ್‌ಬಿಲ್‌ಗಳು, ಐಬಿಸ್ ಮತ್ತು ಮೊಸಳೆಗಳಿಗೆ ಆಶ್ರಯ; ಶಾಂತ ದೋಣಿ ಪ್ರಯಾಣದಲ್ಲಿ ಉತ್ತಮ.",
    "dish_en": "Ragi Mudde",
    "dish_kn": "ರಾಗಿ ಮುದ್ದೆ",
    "tip_en": "Take the first boat of the morning and carry binoculars; avoid loud clothes and sudden movements.",
    "tip_kn": "ಬೆಳಗಿನ ಮೊದಲ ದೋಣಿ ಹತ್ತಿ, ದೂರದರ್ಶಕ ಒಯ್ಯಿರಿ; ಗದ್ದಲದ ಉಡುಗೆ ಮತ್ತು ಥಟ್ಟನೆ ಚಲನೆ ತಪ್ಪಿಸಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "kabini",
    "name_en": "Kabini Wildlife Sanctuary",
    "name_kn": "ಕಬಿನಿ ವನ್ಯಜೀವಿ ಧಾಮ",
    "region": "Mysuru",
    "categories": [
      "Wildlife",
      "Adventure",
      "Photography"
    ],
    "lat": 11.936,
    "lng": 76.333,
    "avgDurationHours": 5,
    "entryFeeINR": 1500,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3,
      4,
      5
    ],
    "popularity": 4,
    "desc_en": "A forest-and-water wilderness on the Kabini backwaters, celebrated for elephant herds, leopards, dholes and misty dawn safaris.",
    "desc_kn": "ಕಬಿನಿ ಹಿನ್ನೀರಿನ ಅರಣ್ಯ ಮತ್ತು ಜಲ ವನ್ಯಪ್ರದೇಶ. ಆನೆಗಳ ಹಿಂಡು, ಚಿರತೆ, ಕಾಡುನಾಯಿ ಮತ್ತು ಮಂಜಿನ ಬೆಳಗಿನ ಸಫಾರಿಗೆ ಪ್ರಸಿದ್ಧ.",
    "dish_en": "Bamboo Shoot Curry",
    "dish_kn": "ಬಿದಿರು ಚಿಗುರು ಪಲ್ಯ",
    "tip_en": "Book the safari and stay together in advance; the 6 AM boat safari offers the best wildlife light.",
    "tip_kn": "ಸಫಾರಿ ಮತ್ತು ವಾಸ್ತವ್ಯವನ್ನು ಮುಂಚಿತವಾಗಿ ಕಾಯ್ದಿರಿಸಿ; ಬೆಳಗ್ಗೆ 6 ಗಂಟೆಯ ದೋಣಿ ಸಫಾರಿಯಲ್ಲಿ ಉತ್ತಮ ಬೆಳಕು ಸಿಗುತ್ತದೆ.",
    "seasonAlert_en": "Core safari zones open year-round; best tiger and leopard sightings Feb–May around waterholes.",
    "seasonAlert_kn": "ಸಫಾರಿ ವರ್ಷಪೂರ್ತಿ ಲಭ್ಯ; ಫೆಬ್ರವರಿ-ಮೇ ನೀರಿನ ಹೊಂಡಗಳ ಬಳಿ ಹುಲಿ ಮತ್ತು ಚಿರತೆ ದರ್ಶನ ಹೆಚ್ಚು.",
    "crowdTip_en": "Pre-book Government Forest Department safari slot at least 30 days ahead online.",
    "crowdTip_kn": "ಅರಣ್ಯ ಇಲಾಖೆಯ ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಕನಿಷ್ಠ 30 ದಿನ ಮುಂಚಿತವಾಗಿ ಸಫಾರಿ ಬುಕ್ ಮಾಡಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI"
  },
  {
    "id": "bandipur",
    "name_en": "Bandipur National Park",
    "name_kn": "ಬಂಡೀಪುರ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನ",
    "region": "Mysuru",
    "categories": [
      "Wildlife",
      "Adventure",
      "Photography"
    ],
    "lat": 11.6694,
    "lng": 76.6333,
    "avgDurationHours": 4,
    "entryFeeINR": 800,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3,
      4,
      5
    ],
    "popularity": 4,
    "desc_en": "A vast tiger reserve in the Nilgiri foothills, where dry deciduous forest, open meadows and sal woodland shelter elephants, gaur and tigers.",
    "desc_kn": "ನೀಲಗಿರಿ ತಪ್ಪಲಿನ ವಿಶಾಲ ಹುಲಿ ಸಂರಕ್ಷಿತ ಅರಣ್ಯ. ಒಣ ಎಲೆ ಉದುರುವ ಕಾಡು, ಹುಲ್ಲುಗಾವಲು ಮತ್ತು ಸಾಲ್ ಮರಗಳು ಆನೆ, ಕಾಡುಕೋಣ ಮತ್ತು ಹುಲಿಗಳಿಗೆ ಆಶ್ರಯ.",
    "dish_en": "Millet Roti",
    "dish_kn": "ಸಿರಿಧಾನ್ಯ ರೊಟ್ಟಿ",
    "tip_en": "Book a government jeep safari online; private vehicles are not allowed inside the core forest.",
    "tip_kn": "ಸರ್ಕಾರಿ ಜೀಪ್ ಸಫಾರಿಯನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಕಾಯ್ದಿರಿಸಿ; ಒಳ ಅರಣ್ಯದೊಳಗೆ ಖಾಸಗಿ ವಾಹನಗಳಿಗೆ ಅನುಮತಿ ಇಲ್ಲ.",
    "seasonAlert_en": "Core safari zones open year-round; best tiger and leopard sightings Feb–May around waterholes.",
    "seasonAlert_kn": "ಸಫಾರಿ ವರ್ಷಪೂರ್ತಿ ಲಭ್ಯ; ಫೆಬ್ರವರಿ-ಮೇ ನೀರಿನ ಹೊಂಡಗಳ ಬಳಿ ಹುಲಿ ಮತ್ತು ಚಿರತೆ ದರ್ಶನ ಹೆಚ್ಚು.",
    "crowdTip_en": "Pre-book Government Forest Department safari slot at least 30 days ahead online.",
    "crowdTip_kn": "ಅರಣ್ಯ ಇಲಾಖೆಯ ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಕನಿಷ್ಠ 30 ದಿನ ಮುಂಚಿತವಾಗಿ ಸಫಾರಿ ಬುಕ್ ಮಾಡಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI"
  },
  {
    "id": "shravanabelagola",
    "name_en": "Shravanabelagola",
    "name_kn": "ಶ್ರವಣಬೆಳಗೊಳ",
    "region": "Hassan",
    "categories": [
      "Spiritual",
      "Temples",
      "Heritage",
      "Photography"
    ],
    "lat": 12.8593,
    "lng": 76.4873,
    "avgDurationHours": 2.5,
    "entryFeeINR": 0,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 4,
    "desc_en": "A Jain pilgrimage town beneath Vindhyagiri hill, where the 17-metre monolithic statue of Bahubali stands above 600 carved steps.",
    "desc_kn": "ವಿಂಧ್ಯಗಿರಿ ಬೆಟ್ಟದ ಕೆಳಗಿನ ಜೈನ ತೀರ್ಥಕ್ಷೇತ್ರ. 600 ಕೆತ್ತಿದ ಮೆಟ್ಟಿಲುಗಳ ಮೇಲೆ 17 ಮೀಟರ್ ಏಕಶಿಲಾ ಬಾಹುಬಲಿ ಪ್ರತಿಮೆ ನಿಂತಿದೆ.",
    "dish_en": "Ragi Mudde",
    "dish_kn": "ರಾಗಿ ಮುದ್ದೆ",
    "tip_en": "The climb is barefoot and hot by midday; carry socks, water and start early.",
    "tip_kn": "ಮೆಟ್ಟಿಲು ಏರುವುದು ಬರಿಗಾಲಿನಲ್ಲಿ, ಮಧ್ಯಾಹ್ನದಲ್ಲಿ ಬಿಸಿ; ಸಾಕ್ಸ್, ನೀರು ಒಯ್ದು ಬೇಗ ಪ್ರಾರಂಭಿಸಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "belur",
    "name_en": "Belur Chennakeshava Temple",
    "name_kn": "ಬೇಲೂರು ಚೆನ್ನಕೇಶವ ದೇವಾಲಯ",
    "region": "Hassan",
    "categories": [
      "Heritage",
      "Temples",
      "Spiritual",
      "Photography"
    ],
    "lat": 13.1642,
    "lng": 75.8651,
    "avgDurationHours": 2,
    "entryFeeINR": 50,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      9,
      10,
      11,
      12
    ],
    "popularity": 4,
    "desc_en": "A 12th-century Hoysala masterwork with gravity-defying bracket figures, madanika dancers and filigree soapstone carved like lace.",
    "desc_kn": "12ನೇ ಶತಮಾನದ ಹೊಯ್ಸಳ ಕಲಾ ಶ್ರೇಷ್ಠ ಕೃತಿ. ಬಾಗಿದ ಕಲ್ಲಿನ ಆಧಾರ ಮೂರ್ತಿಗಳು, ಮದನಿಕೆ ನರ್ತಕಿಯರು ಮತ್ತು ಕಸೂತಿಯಂತೆ ಕೆತ್ತಿದ ಬಳಪದ ಕಲ್ಲು.",
    "dish_en": "Bisi Bele Bath",
    "dish_kn": "ಬಿಸಿ ಬೇಳೆ ಬಾತ್",
    "tip_en": "Hire a certified guide to point out the signature bracket figures; morning light is best for the carvings.",
    "tip_kn": "ವಿಶಿಷ್ಟ ಆಧಾರ ಮೂರ್ತಿಗಳನ್ನು ತೋರಿಸಲು ಅಧಿಕೃತ ಮಾರ್ಗದರ್ಶಿ ನೇಮಿಸಿ; ಕೆತ್ತನೆಗಳಿಗೆ ಬೆಳಗಿನ ಬೆಳಕು ಉತ್ತಮ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "halebidu",
    "name_en": "Halebidu Hoysaleswara Temple",
    "name_kn": "ಹಳೇಬೀಡು ಹೊಯ್ಸಳೇಶ್ವರ ದೇವಾಲಯ",
    "region": "Hassan",
    "categories": [
      "Heritage",
      "Temples",
      "Spiritual",
      "Photography"
    ],
    "lat": 13.2169,
    "lng": 75.9946,
    "avgDurationHours": 2,
    "entryFeeINR": 25,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      9,
      10,
      11,
      12
    ],
    "popularity": 4,
    "desc_en": "The unfinished Hoysaleswara temple is a dense gallery of Hindu epics, elephants, dancers and deities carved in dark chloritic schist.",
    "desc_kn": "ಅಪೂರ್ಣ ಹೊಯ್ಸಳೇಶ್ವರ ದೇವಾಲಯ. ಕಪ್ಪು ಕಲ್ಲಿನಲ್ಲಿ ಕೆತ್ತಿದ ಪುರಾಣ ಕಥೆಗಳು, ಆನೆಗಳು, ನರ್ತಕಿಯರು ಮತ್ತು ದೇವತೆಗಳ ದಟ್ಟ ಗ್ಯಾಲರಿ.",
    "dish_en": "Bisi Bele Bath",
    "dish_kn": "ಬಿಸಿ ಬೇಳೆ ಬಾತ್",
    "tip_en": "Pair Belur and Halebidu in one morning; the museum beside the temple explains the temple's lost city.",
    "tip_kn": "ಬೇಲೂರು ಮತ್ತು ಹಳೇಬೀಡು ಒಂದೇ ಬೆಳಗ್ಗೆ ನೋಡಿ; ದೇವಾಲಯದ ಪಕ್ಕದ ವಸ್ತುಸಂಗ್ರಹಾಲಯ ಕಳೆದುಹೋದ ನಗರದ ಕಥೆ ಹೇಳುತ್ತದೆ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "chikkamagaluru",
    "name_en": "Chikkamagaluru Coffee Country",
    "name_kn": "ಚಿಕ್ಕಮಗಳೂರು ಕಾಫಿ ನಾಡು",
    "region": "Chikkamagaluru",
    "categories": [
      "Coffee Estates",
      "Food",
      "Photography",
      "Hills & Trekking"
    ],
    "lat": 13.3153,
    "lng": 75.7754,
    "avgDurationHours": 4,
    "entryFeeINR": 250,
    "bestMonths": [
      1,
      2,
      3,
      9,
      10,
      11,
      12
    ],
    "popularity": 4,
    "desc_en": "The birthplace of Indian coffee, where estate bungalows, red-earth paths and shade-grown arabica sit beneath the Baba Budan hills.",
    "desc_kn": "ಭಾರತೀಯ ಕಾಫಿಯ ಜನ್ಮಸ್ಥಳ. ಎಸ್ಟೇಟ್ ಬಂಗಲೆಗಳು, ಕೆಂಪು ಮಣ್ಣಿನ ಹಾದಿಗಳು ಮತ್ತು ನೆರಳಿನಲ್ಲಿ ಬೆಳೆಯುವ ಅರೇಬಿಕಾ ಬಾಬಾಬುಡನ್ ಬೆಟ್ಟದ ಕೆಳಗೆ.",
    "dish_en": "Ragi Mudde",
    "dish_kn": "ರಾಗಿ ಮುದ್ದೆ",
    "tip_en": "Book an estate walk in advance and taste freshly roasted coffee; the harvest season runs November to January.",
    "tip_kn": "ಎಸ್ಟೇಟ್ ನಡಿಗೆಯನ್ನು ಮುಂಚಿತವಾಗಿ ಕಾಯ್ದಿರಿಸಿ, ತಾಜಾ ಹುರಿದ ಕಾಫಿ ರುಚಿ ನೋಡಿ; ಕೊಯ್ಲು ನವೆಂಬರ್‌ನಿಂದ ಜನವರಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "mullayanagiri",
    "name_en": "Mullayanagiri Peak",
    "name_kn": "ಮುಳ್ಳಯ್ಯನಗಿರಿ ಶಿಖರ",
    "region": "Chikkamagaluru",
    "categories": [
      "Hills & Trekking",
      "Adventure",
      "Photography"
    ],
    "lat": 13.3905,
    "lng": 75.723,
    "avgDurationHours": 3.5,
    "entryFeeINR": 20,
    "bestMonths": [
      9,
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 5,
    "desc_en": "Karnataka's highest peak at 1,930 metres, a grassy summit with cloud-filled valleys, a small temple and a thrilling ridge drive.",
    "desc_kn": "ಕರ್ನಾಟಕದ ಅತ್ಯುನ್ನತ ಶಿಖರ, 1,930 ಮೀಟರ್. ಹುಲ್ಲಿನ ತುದಿ, ಮೋಡ ತುಂಬಿದ ಕಣಿವೆಗಳು, ಸಣ್ಣ ದೇವಾಲಯ ಮತ್ತು ರೋಮಾಂಚಕ ಬೆಟ್ಟ ರಸ್ತೆ.",
    "dish_en": "Ragi Mudde",
    "dish_kn": "ರಾಗಿ ಮುದ್ದೆ",
    "tip_en": "Carry a windproof layer and start the final climb before noon; clouds can close the view quickly.",
    "tip_kn": "ಗಾಳಿ ತಡೆಯುವ ಬಟ್ಟೆ ಒಯ್ಯಿರಿ, ಮಧ್ಯಾಹ್ನಕ್ಕೆ ಮೊದಲು ಕೊನೆಯ ಏರಿಕೆ ಪ್ರಾರಂಭಿಸಿ; ಮೋಡ ದೃಶ್ಯ ಮುಚ್ಚಬಹುದು.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "baba-budangiri",
    "name_en": "Baba Budangiri",
    "name_kn": "ಬಾಬಾಬುಡನ್ ಗಿರಿ",
    "region": "Chikkamagaluru",
    "categories": [
      "Hills & Trekking",
      "Spiritual",
      "Coffee Estates",
      "Photography"
    ],
    "lat": 13.3958,
    "lng": 75.721,
    "avgDurationHours": 3,
    "entryFeeINR": 0,
    "bestMonths": [
      9,
      10,
      11,
      12,
      1,
      2,
      3,
      4,
      5
    ],
    "popularity": 4,
    "desc_en": "A misty coffee-and-shrine mountain where the cave of Baba Budan, who brought coffee to India, sits beside rolling grassland.",
    "desc_kn": "ಮಂಜಿನ ಕಾಫಿ ಮತ್ತು ದೇವಾಲಯದ ಬೆಟ್ಟ. ಭಾರತಕ್ಕೆ ಕಾಫಿ ತಂದ ಬಾಬಾಬುಡನ್ ಗುಹೆ ಮತ್ತು ಹಸಿರು ಹುಲ್ಲುಗಾವಲು ಜೊತೆಗೂಡಿವೆ.",
    "dish_en": "Ragi Mudde",
    "dish_kn": "ರಾಗಿ ಮುದ್ದೆ",
    "tip_en": "The road beyond Mullayanagiri is narrow and often foggy; drive slowly and avoid late evening.",
    "tip_kn": "ಮುಳ್ಳಯ್ಯನಗಿರಿಯ ನಂತರದ ರಸ್ತೆ ಸಣ್ಣ ಮತ್ತು ಮಂಜಿನಿಂದ ಕೂಡಿರುತ್ತದೆ; ನಿಧಾನವಾಗಿ ಓಡಿಸಿ, ಸಂಜೆ ತಡವಾಗಬೇಡಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "kudremukh",
    "name_en": "Kudremukh National Park",
    "name_kn": "ಕುದುರೆಮುಖ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನ",
    "region": "Chikkamagaluru",
    "categories": [
      "Hills & Trekking",
      "Wildlife",
      "Waterfalls",
      "Photography"
    ],
    "lat": 13.2281,
    "lng": 75.257,
    "avgDurationHours": 5,
    "entryFeeINR": 0,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2
    ],
    "popularity": 3,
    "desc_en": "A UNESCO-listed Western Ghats landscape of shola forests, rolling grasslands and the horse-face peak that gives the park its name.",
    "desc_kn": "ಯುನೆಸ್ಕೋ ಪಟ್ಟಿಯ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ನೆಲೆ. ಶೋಲಾ ಅರಣ್ಯ, ಹಸಿರು ಹುಲ್ಲುಗಾವಲು ಮತ್ತು ಪಾರ್ಕಿಗೆ ಹೆಸರು ನೀಡಿದ ಕುದುರೆ ಮುಖದ ಶಿಖರ.",
    "dish_en": "Ragi Mudde",
    "dish_kn": "ರಾಗಿ ಮುದ್ದೆ",
    "tip_en": "Trekking permits are limited and forest-guided; check the current entry rules at the range office.",
    "tip_kn": "ಟ್ರೆಕ್ಕಿಂಗ್ ಅನುಮತಿ ಸೀಮಿತ ಮತ್ತು ಅರಣ್ಯ ಮಾರ್ಗದರ್ಶಿ ಕಡ್ಡಾಯ; ಪ್ರಸ್ತುತ ನಿಯಮಗಳನ್ನು ವನ್ಯಾಧಿಕಾರಿ ಕಚೇರಿಯಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "sakleshpur",
    "name_en": "Sakleshpur",
    "name_kn": "ಸಕಲೇಶಪುರ",
    "region": "Hassan",
    "categories": [
      "Coffee Estates",
      "Adventure",
      "Hills & Trekking",
      "Photography"
    ],
    "lat": 12.9417,
    "lng": 75.7847,
    "avgDurationHours": 4,
    "entryFeeINR": 0,
    "bestMonths": [
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      1,
      2
    ],
    "popularity": 3,
    "desc_en": "A rain-soaked plantation town with coffee and cardamom estates, old rail bridges, waterfalls and the green Manjarabad Fort nearby.",
    "desc_kn": "ಮಳೆ ಸಿಕ್ತ ಕಾಫಿ ಮತ್ತು ಏಲಕ್ಕಿ ತೋಟಗಳ ಪಟ್ಟಣ. ಹಳೆಯ ರೈಲು ಸೇತುವೆಗಳು, ಜಲಪಾತಗಳು ಮತ್ತು ಸಮೀಪದ ಹಸಿರು ಮಂಜರಾಬಾದ್ ಕೋಟೆ.",
    "dish_en": "Ragi Mudde",
    "dish_kn": "ರಾಗಿ ಮುದ್ದೆ",
    "tip_en": "Pack a rain jacket even in summer and try a homestay for home-style Kodagu-Malnad food.",
    "tip_kn": "ಬೇಸಿಗೆಯಲ್ಲೂ ಮಳೆಕೋಟ್ ಒಯ್ಯಿರಿ; ಕೊಡಗು-ಮಲೆನಾಡು ಮನೆಮದ್ದಿನ ಊಟಕ್ಕೆ ಹೋಮ್‌ಸ್ಟೇ ಸವಿಯಿರಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "jog-falls",
    "name_en": "Jog Falls",
    "name_kn": "ಜೋಗ ಜಲಪಾತ",
    "region": "Shivamogga",
    "categories": [
      "Waterfalls",
      "Photography",
      "Adventure"
    ],
    "lat": 14.2292,
    "lng": 74.8106,
    "avgDurationHours": 2,
    "entryFeeINR": 20,
    "bestMonths": [
      7,
      8,
      9,
      10,
      11,
      12,
      1
    ],
    "popularity": 5,
    "desc_en": "India's highest plunge waterfall, where the Sharavathi drops 253 metres in four thunderous streams through a forested gorge.",
    "desc_kn": "ಭಾರತದ ಅತ್ಯುನ್ನತ ಧುಮುಕು ಜಲಪಾತ. ಶರಾವತಿ ನದಿ ಅರಣ್ಯ ಕಂದರದಲ್ಲಿ 253 ಮೀಟರ್ ಎತ್ತರದಿಂದ ನಾಲ್ಕು ಧಾರೆಗಳಾಗಿ ಧುಮುಕುತ್ತದೆ.",
    "dish_en": "Ragi Mudde",
    "dish_kn": "ರಾಗಿ ಮುದ್ದೆ",
    "tip_en": "Go during or just after the monsoon for full flow; the viewpoints involve steep, slippery steps.",
    "tip_kn": "ಪೂರ್ಣ ಪ್ರವಾಹಕ್ಕಾಗಿ ಮಳೆಗಾಲದಲ್ಲಿ ಅಥವಾ ತಕ್ಷಣ ನಂತರ ಹೋಗಿ; ವೀಕ್ಷಣಾ ಸ್ಥಳಗಳಿಗೆ ಕಡಿದಾದ, ಜಾರುವ ಮೆಟ್ಟಿಲುಗಳಿವೆ.",
    "seasonAlert_en": "Monsoon Wonder: Roaring full volume July–Oct. Post-monsoon flow tapers by Dec.",
    "seasonAlert_kn": "ಮಳೆಗಾಲದ ಅದ್ಭುತ: ಜುಲೈ-ಅಕ್ಟೋಬರ್‌ನಲ್ಲಿ ಭೋರ್ಗರೆಯುವ ಜಲಪಾತ; ಡಿಸೆಂಬರ್ ವೇಳೆಗೆ ನೀರು ಕಡಿಮೆಯಾಗುತ್ತದೆ.",
    "crowdTip_en": "Visit the British Bungalow viewpoint for panoramic mist-free shots.",
    "crowdTip_kn": "ಮಂಜು ಇಲ್ಲದ ವಿಶಾಲ ದೃಶ್ಯಗಳಿಗಾಗಿ ಬ್ರಿಟಿಷ್ ಬಂಗಲೆ ವ್ಯೂಪಾಯಿಂಟ್‌ನಿಂದ ನೋಡಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI"
  },
  {
    "id": "agumbe",
    "name_en": "Agumbe Rainforest",
    "name_kn": "ಅಗುಂಬೆ ಮಳೆಕಾಡು",
    "region": "Shivamogga",
    "categories": [
      "Waterfalls",
      "Wildlife",
      "Photography",
      "Adventure"
    ],
    "lat": 13.5019,
    "lng": 75.0921,
    "avgDurationHours": 3,
    "entryFeeINR": 0,
    "bestMonths": [
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "popularity": 3,
    "desc_en": "The Cherrapunji of the South, a rainforest famous for king cobras, dripping canopies, sunset viewpoints and the Barkana Falls trail.",
    "desc_kn": "ದಕ್ಷಿಣದ ಚೇರಪುಂಜಿ. ಕಾಳಿಂಗ ಸರ್ಪ, ಮಳೆ ಹನಿ ಸುರಿಯುವ ಮರದ ಚಾವಣಿ, ಸೂರ್ಯಾಸ್ತ ವೀಕ್ಷಣಾ ಸ್ಥಳ ಮತ್ತು ಬರ್ಕನಾ ಜಲಪಾತ ಹಾದಿಗೆ ಪ್ರಸಿದ್ಧ.",
    "dish_en": "Ragi Mudde",
    "dish_kn": "ರಾಗಿ ಮುದ್ದೆ",
    "tip_en": "Leeches are common in the monsoon; wear closed shoes and use a local guide for forest trails.",
    "tip_kn": "ಮಳೆಗಾಲದಲ್ಲಿ ಜಿಗಣೆ ಸಾಮಾನ್ಯ; ಮುಚ್ಚಿದ ಶೂ ಧರಿಸಿ, ಅರಣ್ಯ ಹಾದಿಗೆ ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಿ ಬಳಸಿ.",
    "seasonAlert_en": "Heavy rain July–Sept. Ideal trekking and rainforest reptile exploration Oct–Feb.",
    "seasonAlert_kn": "ಜುಲೈ-ಸೆಪ್ಟೆಂಬರ್ ಭಾರಿ ಮಳೆ. ಅಕ್ಟೋಬರ್-ಫೆಬ್ರವರಿ ಟ್ರೆಕ್ಕಿಂಗ್ ಮತ್ತು ಮಳೆಕಾಡಿನ ಅನ್ವೇಷಣೆಗೆ ಸೂಕ್ತ.",
    "crowdTip_en": "Sunset Point gets crowded by 5:30 PM; reach 45 min early for clear front views.",
    "crowdTip_kn": "ಸೂರ್ಯಾಸ್ತ ವೀಕ್ಷಣೆಗೆ ಸಂಜೆ 5:30 ಕ್ಕೆ ಜನ ಹೆಚ್ಚಿರುತ್ತಾರೆ; 45 ನಿಮಿಷ ಮುಂಚಿತವಾಗಿ ತಲುಪಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI"
  },
  {
    "id": "virupaksha-temple",
    "name_en": "Virupaksha Temple, Hampi",
    "name_kn": "ಹಂಪಿ ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ",
    "region": "Hampi",
    "categories": [
      "Spiritual",
      "Temples",
      "Heritage",
      "Photography"
    ],
    "lat": 15.335,
    "lng": 76.46,
    "avgDurationHours": 1.5,
    "entryFeeINR": 0,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 5,
    "desc_en": "Hampi's living temple, a towering gopuram and riverside ritual complex that has drawn pilgrims since the Vijayanagara empire.",
    "desc_kn": "ಹಂಪಿಯ ಜೀವಂತ ದೇವಾಲಯ. ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದಿಂದಲೂ ಭಕ್ತರನ್ನು ಸೆಳೆಯುತ್ತಿರುವ ಎತ್ತರದ ಗೋಪುರ ಮತ್ತು ನದಿ ತೀರದ ಆಚರಣಾ ಸಮುಚ್ಚಯ.",
    "dish_en": "Jolada Rotti",
    "dish_kn": "ಜೋಳದ ರೊಟ್ಟಿ",
    "tip_en": "Visit at sunrise to see the temple elephant and rituals; remove footwear before the inner courtyard.",
    "tip_kn": "ಸೂರ್ಯೋದಯಕ್ಕೆ ದೇವಾಲಯದ ಆನೆ ಮತ್ತು ಆಚರಣೆಗಳನ್ನು ನೋಡಿ; ಒಳ ಅಂಗಳದ ಮೊದಲು ಚಪ್ಪಲಿ ತೆಗೆಯಿರಿ.",
    "seasonAlert_en": "Best explored Nov–Feb. Carry hydration during sunny midday walks.",
    "seasonAlert_kn": "ನವೆಂಬರ್-ಫೆಬ್ರವರಿ ಅತ್ಯುತ್ತಮ. ಬಿಸಿಲಿನ ನಡಿಗೆಯಲ್ಲಿ ನೀರಿನ ಬಾಟಲಿ ಕೊಂಡೊಯ್ಯಿರಿ.",
    "crowdTip_en": "Stone Chariot at Vittala Temple glows warmly under sunrise light at 6:30 AM.",
    "crowdTip_kn": "ಬೆಳಗ್ಗೆ 6:30 ರ ಸೂರ್ಯೋದಯ ಬೆಳಕಿನಲ್ಲಿ ಕಲ್ಲಿನ ರಥದ ಅದ್ಭುತ ಫೋಟೋಗಳನ್ನು ಸೆರೆಹಿಡಿಯಿರಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI"
  },
  {
    "id": "vittala-temple",
    "name_en": "Vittala Temple, Hampi",
    "name_kn": "ಹಂಪಿ ವಿಠ್ಠಲ ದೇವಾಲಯ",
    "region": "Hampi",
    "categories": [
      "Heritage",
      "Temples",
      "Photography"
    ],
    "lat": 15.3422,
    "lng": 76.4756,
    "avgDurationHours": 2.5,
    "entryFeeINR": 40,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 5,
    "desc_en": "Home of the iconic stone chariot, carved musical pillars and a vast courtly temple complex at the heart of Vijayanagara's sacred centre.",
    "desc_kn": "ಪ್ರಸಿದ್ಧ ಕಲ್ಲಿನ ರಥ, ಕೆತ್ತಿದ ಸಂಗೀತ ಕಂಬಗಳು ಮತ್ತು ವಿಜಯನಗರದ ಪವಿತ್ರ ಕೇಂದ್ರದ ವಿಶಾಲ ದೇವಾಲಯ ಸಮುಚ್ಚಯ.",
    "dish_en": "Jolada Rotti",
    "dish_kn": "ಜೋಳದ ರೊಟ್ಟಿ",
    "tip_en": "The site has little shade; carry water, wear a hat and allow time to walk from the parking area.",
    "tip_kn": "ಸ್ಥಳದಲ್ಲಿ ನೆರಳು ಕಡಿಮೆ; ನೀರು, ಟೋಪಿ ಒಯ್ಯಿರಿ ಮತ್ತು ಪಾರ್ಕಿಂಗ್‌ನಿಂದ ನಡೆಯಲು ಸಮಯ ಬಿಡಿ.",
    "seasonAlert_en": "Best explored Nov–Feb. Carry hydration during sunny midday walks.",
    "seasonAlert_kn": "ನವೆಂಬರ್-ಫೆಬ್ರವರಿ ಅತ್ಯುತ್ತಮ. ಬಿಸಿಲಿನ ನಡಿಗೆಯಲ್ಲಿ ನೀರಿನ ಬಾಟಲಿ ಕೊಂಡೊಯ್ಯಿರಿ.",
    "crowdTip_en": "Stone Chariot at Vittala Temple glows warmly under sunrise light at 6:30 AM.",
    "crowdTip_kn": "ಬೆಳಗ್ಗೆ 6:30 ರ ಸೂರ್ಯೋದಯ ಬೆಳಕಿನಲ್ಲಿ ಕಲ್ಲಿನ ರಥದ ಅದ್ಭುತ ಫೋಟೋಗಳನ್ನು ಸೆರೆಹಿಡಿಯಿರಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI"
  },
  {
    "id": "hemakuta-hill",
    "name_en": "Hemakuta Hill",
    "name_kn": "ಹೇಮಕೂಟ ಬೆಟ್ಟ",
    "region": "Hampi",
    "categories": [
      "Heritage",
      "Hills & Trekking",
      "Photography",
      "Spiritual"
    ],
    "lat": 15.3338,
    "lng": 76.4588,
    "avgDurationHours": 1.5,
    "entryFeeINR": 0,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 4,
    "desc_en": "A smooth granite hill scattered with early Jain and Shaiva shrines, offering Hampi's most famous sunset view over the ruins.",
    "desc_kn": "ಮೃದುವಾದ ಗ್ರಾನೈಟ್ ಬೆಟ್ಟ. ಆರಂಭಿಕ ಜೈನ ಮತ್ತು ಶೈವ ದೇಗುಲಗಳ ನಡುವೆ ಹಂಪಿ ಅವಶೇಷಗಳ ಮೇಲೆ ಪ್ರಸಿದ್ಧ ಸೂರ್ಯಾಸ್ತ ದೃಶ್ಯ.",
    "dish_en": "Jolada Rotti",
    "dish_kn": "ಜೋಳದ ರೊಟ್ಟಿ",
    "tip_en": "Climb 20 minutes before sunset, carry a torch for the descent and watch for smooth slippery rock.",
    "tip_kn": "ಸೂರ್ಯಾಸ್ತಕ್ಕೆ 20 ನಿಮಿಷ ಮೊದಲು ಏರಿ, ಇಳಿಯಲು ಟಾರ್ಚ್ ಒಯ್ಯಿರಿ; ನುಣುಪಾದ ಬಂಡೆ ಜಾರಬಹುದು.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "anegundi",
    "name_en": "Anegundi",
    "name_kn": "ಆನೆಗುಂದಿ",
    "region": "Hampi",
    "categories": [
      "Heritage",
      "Adventure",
      "Photography",
      "Spiritual"
    ],
    "lat": 15.3592,
    "lng": 76.498,
    "avgDurationHours": 2.5,
    "entryFeeINR": 0,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 3,
    "desc_en": "An older-than-Hampi village of mythic Kishkindha, with a hilltop fort, ancient temples, banana fields and coracle rides across the Tungabhadra.",
    "desc_kn": "ಹಂಪಿಗಿಂತಲೂ ಹಳೆಯ ಕಿಷ್ಕಿಂಧಾ ಪುರಾಣದ ಹಳ್ಳಿ. ಬೆಟ್ಟದ ಕೋಟೆ, ಪ್ರಾಚೀನ ದೇವಾಲಯಗಳು, ಬಾಳೆ ಗದ್ದೆಗಳು ಮತ್ತು ತುಂಗಭದ್ರೆಯ ದೋಣಿ ಸವಾರಿ.",
    "dish_en": "Jolada Rotti",
    "dish_kn": "ಜೋಳದ ರೊಟ್ಟಿ",
    "tip_en": "Take the local coracle across the river and climb the fort for a quieter view of Hampi's boulder landscape.",
    "tip_kn": "ಸ್ಥಳೀಯ ದೋಣಿಯಲ್ಲಿ ನದಿ ದಾಟಿ, ಕೋಟೆ ಏರಿ ಹಂಪಿಯ ಬಂಡೆ ನಾಡಿನ ಶಾಂತ ದೃಶ್ಯ ನೋಡಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "queens-bath",
    "name_en": "Queen's Bath, Hampi",
    "name_kn": "ಹಂಪಿ ರಾಣಿಯ ಸ್ನಾನಗೃಹ",
    "region": "Hampi",
    "categories": [
      "Heritage",
      "Photography"
    ],
    "lat": 15.3347,
    "lng": 76.4637,
    "avgDurationHours": 1,
    "entryFeeINR": 25,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 3,
    "desc_en": "An ornate Vijayanagara pleasure pavilion with arched corridors, lotus-shaped fountains and a sunken royal bath.",
    "desc_kn": "ವಿಜಯನಗರದ ಅಲಂಕೃತ ವಿಶ್ರಾಂತಿ ಮಂದಿರ. ಕಮಾನು ಕಾರಿಡಾರ್‌ಗಳು, ಕಮಲದ ಆಕಾರದ ಕಾರಂಜಿಗಳು ಮತ್ತು ಮುಳುಗು ರಾಜ ಸ್ನಾನಗೃಹ.",
    "dish_en": "Jolada Rotti",
    "dish_kn": "ಜೋಳದ ರೊಟ್ಟಿ",
    "tip_en": "The interior is cooler and quieter than the main ruins; pair it with a walk to the nearby Lotus Mahal.",
    "tip_kn": "ಒಳಭಾಗ ಮುಖ್ಯ ಅವಶೇಷಗಳಿಗಿಂತ ತಂಪು ಮತ್ತು ಶಾಂತ; ಸಮೀಪದ ಕಮಲ ಮಹಲ್ ನಡಿಗೆಯೊಂದಿಗೆ ಸೇರಿಸಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "badami",
    "name_en": "Badami Cave Temples",
    "name_kn": "ಬಾದಾಮಿ ಗುಹಾಲಯಗಳು",
    "region": "Badami",
    "categories": [
      "Heritage",
      "Temples",
      "Photography",
      "Spiritual"
    ],
    "lat": 15.9186,
    "lng": 75.6763,
    "avgDurationHours": 3,
    "entryFeeINR": 40,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 4,
    "desc_en": "Four rock-cut cave temples above a red sandstone gorge, showcasing Chalukyan sculpture, a natural spring tank and vast cliff views.",
    "desc_kn": "ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಕಮರಿಯ ಮೇಲೆ ನಾಲ್ಕು ಬಂಡೆ ಕೆತ್ತಿದ ಗುಹಾಲಯಗಳು. ಚಾಲುಕ್ಯ ಶಿಲ್ಪ, ನೈಸರ್ಗಿಕ ಬುಗ್ಗೆ ಮತ್ತು ವಿಶಾಲ ಕಂದರ ದೃಶ್ಯ.",
    "dish_en": "Jolada Rotti",
    "dish_kn": "ಜೋಳದ ರೊಟ್ಟಿ",
    "tip_en": "Climb early to avoid the heat and see the cave murals in raking light; the Bhootanatha temple is a short walk away.",
    "tip_kn": "ಬಿಸಿಲು ತಪ್ಪಿಸಲು ಬೇಗ ಏರಿ; ಇಳಿಬೆಳಕಿನಲ್ಲಿ ಗುಹಾ ಚಿತ್ರಗಳು ಸುಂದರ. ಭೂತನಾಥ ದೇವಾಲಯ ಸ್ವಲ್ಪ ದೂರ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "aihole",
    "name_en": "Aihole",
    "name_kn": "ಐಹೊಳೆ",
    "region": "Badami",
    "categories": [
      "Heritage",
      "Temples",
      "Photography"
    ],
    "lat": 15.9382,
    "lng": 75.8154,
    "avgDurationHours": 2,
    "entryFeeINR": 40,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 3,
    "desc_en": "A sprawling laboratory of early Chalukyan temple design, with more than 120 monuments including the exquisite Durga temple.",
    "desc_kn": "ಆರಂಭಿಕ ಚಾಲುಕ್ಯ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದ ವಿಶಾಲ ಪ್ರಯೋಗಶಾಲೆ. ಸುಂದರ ದುರ್ಗಾ ದೇವಾಲಯ ಸೇರಿ 120ಕ್ಕೂ ಹೆಚ್ಚು ಸ್ಮಾರಕಗಳು.",
    "dish_en": "Jolada Rotti",
    "dish_kn": "ಜೋಳದ ರೊಟ್ಟಿ",
    "tip_en": "The site is spread out; carry an umbrella and pair it with Pattadakal 20 minutes away.",
    "tip_kn": "ಸ್ಥಳ ವಿಶಾಲವಾಗಿದೆ; ಛತ್ರಿ ಒಯ್ಯಿರಿ ಮತ್ತು 20 ನಿಮಿಷ ದೂರದ ಪಟ್ಟದಕಲ್ಲು ಜೊತೆಗೆ ನೋಡಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "pattadakal",
    "name_en": "Pattadakal",
    "name_kn": "ಪಟ್ಟದಕಲ್ಲು",
    "region": "Badami",
    "categories": [
      "Heritage",
      "Temples",
      "Photography",
      "Spiritual"
    ],
    "lat": 15.9488,
    "lng": 75.8168,
    "avgDurationHours": 2,
    "entryFeeINR": 40,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 3,
    "desc_en": "A UNESCO World Heritage group of 7th-8th century Chalukyan temples, where north and south Indian architectural styles meet in stone.",
    "desc_kn": "ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ 7-8ನೇ ಶತಮಾನದ ಚಾಲುಕ್ಯ ದೇವಾಲಯಗಳ ಗುಂಪು. ಉತ್ತರ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ವಾಸ್ತು ಶೈಲಿಗಳ ಸಂಗಮ.",
    "dish_en": "Jolada Rotti",
    "dish_kn": "ಜೋಳದ ರೊಟ್ಟಿ",
    "tip_en": "Visit the museum first, then walk the temple row; the Virupaksha Temple is the grand finale.",
    "tip_kn": "ಮೊದಲು ವಸ್ತುಸಂಗ್ರಹಾಲಯ ನೋಡಿ, ನಂತರ ದೇವಾಲಯ ಸಾಲಿನಲ್ಲಿ ನಡೆಯಿರಿ; ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ ಅಂತಿಮ ಆಕರ್ಷಣೆ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "gol-gumbaz",
    "name_en": "Gol Gumbaz",
    "name_kn": "ಗೋಲ ಗುಂಬಜ್",
    "region": "Vijayapura",
    "categories": [
      "Heritage",
      "Photography"
    ],
    "lat": 16.8296,
    "lng": 75.736,
    "avgDurationHours": 1.5,
    "entryFeeINR": 25,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      9,
      10,
      11,
      12
    ],
    "popularity": 4,
    "desc_en": "The mausoleum of Mohammed Adil Shah, crowned by one of the world's largest domes and famous for its whispering gallery.",
    "desc_kn": "ಮೊಹಮ್ಮದ್ ಆದಿಲ್ ಷಾ ಸಮಾಧಿ. ಜಗತ್ತಿನ ಅತಿದೊಡ್ಡ ಗುಮ್ಮಟಗಳಲ್ಲೊಂದು ಮತ್ತು ಪಿಸುಮಾತಿನ ಗ್ಯಾಲರಿಗೆ ಪ್ರಸಿದ್ಧ.",
    "dish_en": "Jolada Rotti with Ennegayi",
    "dish_kn": "ಜೋಳದ ರೊಟ್ಟಿ ಮತ್ತು ಎಣ್ಣೆಗಾಯಿ",
    "tip_en": "Whisper toward the dome wall from one corner and listen at the opposite side; it really carries.",
    "tip_kn": "ಒಂದು ಮೂಲೆಯಿಂದ ಗುಮ್ಮಟದ ಗೋಡೆಗೆ ಪಿಸುಮಾತಾಡಿ, ಎದುರು ಬದಿಯಲ್ಲಿ ಕೇಳಿ; ಧ್ವನಿ ನಿಜವಾಗಿ ತಲುಪುತ್ತದೆ.",
    "seasonAlert_en": "Pleasant in winter (Oct–Feb); afternoons get hot in summer.",
    "seasonAlert_kn": "ಚಳಿಗಾಲದಲ್ಲಿ (ಅಕ್ಟೋಬರ್-ಫೆಬ್ರವರಿ) ಅತ್ಯುತ್ತಮ; ಬೇಸಿಗೆಯ ಮಧ್ಯಾಹ್ನ ಬಿಸಿಲು ಹೆಚ್ಚು.",
    "crowdTip_en": "Climb the Whispering Gallery right at 8:30 AM before tourist groups arrive.",
    "crowdTip_kn": "ಪ್ರವಾಸಿಗರ ದಂಡು ಬರುವ ಮೊದಲು ಬೆಳಗ್ಗೆ 8:30 ಕ್ಕೆ ಪಿಸುಮಾತಿನ ಗ್ಯಾಲರಿಗೆ ಭೇಟಿ ನೀಡಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI"
  },
  {
    "id": "bidar-fort",
    "name_en": "Bidar Fort",
    "name_kn": "ಬೀದರ್ ಕೋಟೆ",
    "region": "Kalaburagi",
    "categories": [
      "Heritage",
      "Photography",
      "Adventure"
    ],
    "lat": 17.9247,
    "lng": 77.5291,
    "avgDurationHours": 3,
    "entryFeeINR": 25,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 3,
    "desc_en": "A vast Bahmani-era citadel with royal pavilions, a Persian-style madrasa, deep moats and the unique Bidri metalwork tradition nearby.",
    "desc_kn": "ಬಹಮನಿ ಕಾಲದ ವಿಶಾಲ ಕೋಟೆ. ರಾಜ ಮಂಟಪಗಳು, ಪರ್ಷಿಯನ್ ಶೈಲಿಯ ಮದರಸಾ, ಆಳವಾದ ಕಂದಕಗಳು ಮತ್ತು ಸಮೀಪದ ಬಿದ್ರಿ ಲೋಹ ಕಲೆ.",
    "dish_en": "Dharwad Pedha",
    "dish_kn": "ಧಾರವಾಡ ಪೇಡಾ",
    "tip_en": "The fort is enormous; hire a guide and carry water, as shade is limited between monuments.",
    "tip_kn": "ಕೋಟೆ ಬಹಳ ವಿಶಾಲ; ಮಾರ್ಗದರ್ಶಿ ಬಳಸಿ, ನೀರು ಒಯ್ಯಿರಿ; ಸ್ಮಾರಕಗಳ ನಡುವೆ ನೆರಳು ಕಡಿಮೆ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "abbey-falls",
    "name_en": "Abbey Falls",
    "name_kn": "ಅಬ್ಬೆ ಜಲಪಾತ",
    "region": "Coorg",
    "categories": [
      "Waterfalls",
      "Photography",
      "Adventure"
    ],
    "lat": 12.4577,
    "lng": 75.7575,
    "avgDurationHours": 1.5,
    "entryFeeINR": 30,
    "bestMonths": [
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      1
    ],
    "popularity": 5,
    "desc_en": "A misty waterfall tucked into coffee and spice plantations, reached by a hanging bridge and forest steps near Madikeri.",
    "desc_kn": "ಕಾಫಿ ಮತ್ತು ಸಾಂಬಾರ ತೋಟಗಳ ನಡುವೆ ಅಡಗಿರುವ ಮಂಜಿನ ಜಲಪಾತ. ಮಡಿಕೇರಿ ಸಮೀಪದ ತೂಗು ಸೇತುವೆ ಮತ್ತು ಅರಣ್ಯ ಮೆಟ್ಟಿಲುಗಳ ಮೂಲಕ ತಲುಪುತ್ತದೆ.",
    "dish_en": "Kodava Pandi Curry",
    "dish_kn": "ಪಂದಿ ಕರಿ",
    "tip_en": "Go early after rain for a powerful flow; the rocks near the viewing deck are slippery.",
    "tip_kn": "ಮಳೆ ನಂತರ ಬೇಗ ಹೋದರೆ ಪ್ರಬಲ ಧಾರೆ; ವೀಕ್ಷಣಾ ಸ್ಥಳದ ಬಂಡೆಗಳು ಜಾರುತ್ತವೆ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "dubare",
    "name_en": "Dubare Elephant Camp",
    "name_kn": "ದುಬಾರೆ ಆನೆ ಶಿಬಿರ",
    "region": "Coorg",
    "categories": [
      "Wildlife",
      "Adventure",
      "Photography"
    ],
    "lat": 12.373,
    "lng": 75.9025,
    "avgDurationHours": 3,
    "entryFeeINR": 500,
    "bestMonths": [
      9,
      10,
      11,
      12,
      1,
      2,
      3,
      4,
      5
    ],
    "popularity": 4,
    "desc_en": "A forest camp on the Kaveri where rescued elephants are cared for; boat crossings, feeding and eco-walks make it family-friendly.",
    "desc_kn": "ಕಾವೇರಿ ತೀರದ ಅರಣ್ಯ ಶಿಬಿರ. ರಕ್ಷಿಸಿದ ಆನೆಗಳ ಆರೈಕೆ, ದೋಣಿ ದಾಟುವಿಕೆ, ಆಹಾರ ನೀಡುವಿಕೆ ಮತ್ತು ಪರಿಸರ ನಡಿಗೆ ಕುಟುಂಬಕ್ಕೆ ಸೂಕ್ತ.",
    "dish_en": "Kodava Pandi Curry",
    "dish_kn": "ಪಂದಿ ಕರಿ",
    "tip_en": "Confirm elephant interaction timings before crossing; book in advance during school holidays.",
    "tip_kn": "ದೋಣಿ ದಾಟುವ ಮೊದಲು ಆನೆ ಸಂವಹನದ ಸಮಯ ಖಚಿತಪಡಿಸಿ; ಶಾಲಾ ರಜೆಗಳಲ್ಲಿ ಮುಂಚಿತವಾಗಿ ಕಾಯ್ದಿರಿಸಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "namdroling",
    "name_en": "Namdroling Golden Temple",
    "name_kn": "ನಮ್‌ದ್ರೋಲಿಂಗ್ ಸುವರ್ಣ ದೇವಾಲಯ",
    "region": "Coorg",
    "categories": [
      "Spiritual",
      "Temples",
      "Heritage",
      "Photography"
    ],
    "lat": 12.3978,
    "lng": 75.966,
    "avgDurationHours": 2,
    "entryFeeINR": 0,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      9,
      10,
      11,
      12
    ],
    "popularity": 4,
    "desc_en": "A Tibetan Buddhist monastery complex at Bylakuppe, with a golden-roofed temple, towering Buddha statues and colourful prayer halls.",
    "desc_kn": "ಬೈಲಕುಪ್ಪೆಯ ತಿಬೆಟಿಯನ್ ಬೌದ್ಧ ಮಠ ಸಮುಚ್ಚಯ. ಚಿನ್ನದ ಛಾವಣಿಯ ದೇವಾಲಯ, ಎತ್ತರದ ಬುದ್ಧ ಪ್ರತಿಮೆಗಳು ಮತ್ತು ಬಣ್ಣದ ಪ್ರಾರ್ಥನಾ ಮಂದಿರಗಳು.",
    "dish_en": "Kodava Pandi Curry",
    "dish_kn": "ಪಂದಿ ಕರಿ",
    "tip_en": "Maintain silence in the prayer halls, and try the monastery's simple Tibetan thali nearby.",
    "tip_kn": "ಪ್ರಾರ್ಥನಾ ಮಂದಿರಗಳಲ್ಲಿ ಮೌನ ಪಾಲಿಸಿ; ಸಮೀಪದಲ್ಲಿ ಮಠದ ಸರಳ ತಿಬೆಟಿಯನ್ ಥಾಲಿ ಸವಿಯಿರಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "madikeri-fort",
    "name_en": "Madikeri Fort",
    "name_kn": "ಮಡಿಕೇರಿ ಕೋಟೆ",
    "region": "Coorg",
    "categories": [
      "Heritage",
      "Photography"
    ],
    "lat": 12.4228,
    "lng": 75.7384,
    "avgDurationHours": 1.5,
    "entryFeeINR": 10,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      9,
      10,
      11,
      12
    ],
    "popularity": 3,
    "desc_en": "A 17th-century hilltop fort with colonial-era buildings, a small museum, old cannons and views across the Madikeri rooftops.",
    "desc_kn": "17ನೇ ಶತಮಾನದ ಬೆಟ್ಟದ ಕೋಟೆ. ವಸಾಹತುಶಾಹಿ ಕಟ್ಟಡಗಳು, ಸಣ್ಣ ವಸ್ತುಸಂಗ್ರಹಾಲಯ, ಹಳೆಯ ಫಿರಂಗಿಗಳು ಮತ್ತು ಮಡಿಕೇರಿ ಮನೆಗಳ ದೃಶ್ಯ.",
    "dish_en": "Kodava Pandi Curry",
    "dish_kn": "ಪಂದಿ ಕರಿ",
    "tip_en": "The fort is in the town centre, so combine it with a walk through the old market for Coorg spices.",
    "tip_kn": "ಕೋಟೆ ಪಟ್ಟಣ ಮಧ್ಯದಲ್ಲಿದೆ; ಕೊಡಗು ಸಾಂಬಾರಿಗಾಗಿ ಹಳೆಯ ಮಾರುಕಟ್ಟೆ ನಡಿಗೆಯೊಂದಿಗೆ ಸೇರಿಸಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "talakaveri",
    "name_en": "Talakaveri",
    "name_kn": "ತಲಕಾವೇರಿ",
    "region": "Coorg",
    "categories": [
      "Spiritual",
      "Temples",
      "Hills & Trekking",
      "Photography"
    ],
    "lat": 12.3858,
    "lng": 75.493,
    "avgDurationHours": 2.5,
    "entryFeeINR": 0,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 4,
    "desc_en": "The sacred source of the Kaveri on Brahmagiri hill, with a temple tank, misty steps and a spring that is considered the river's birth.",
    "desc_kn": "ಬ್ರಹ್ಮಗಿರಿ ಬೆಟ್ಟದಲ್ಲಿ ಕಾವೇರಿಯ ಪವಿತ್ರ ಉಗಮ. ದೇವಾಲಯ ಕೊಳ, ಮಂಜಿನ ಮೆಟ್ಟಿಲುಗಳು ಮತ್ತು ನದಿಯ ಜನ್ಮವೆಂದು ಪರಿಗಣಿಸುವ ಬುಗ್ಗೆ.",
    "dish_en": "Kodava Pandi Curry",
    "dish_kn": "ಪಂದಿ ಕರಿ",
    "tip_en": "The last stretch is a steep ghat road; avoid driving it in heavy rain and fog.",
    "tip_kn": "ಕೊನೆಯ ದಾರಿ ಕಡಿದಾದ ಘಾಟ್ ರಸ್ತೆ; ಭಾರೀ ಮಳೆ ಮತ್ತು ಮಂಜಿನಲ್ಲಿ ಓಡಿಸುವುದು ತಪ್ಪಿಸಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "nagarhole",
    "name_en": "Nagarhole National Park",
    "name_kn": "ನಾಗರಹೊಳೆ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನ",
    "region": "Coorg",
    "categories": [
      "Wildlife",
      "Adventure",
      "Photography"
    ],
    "lat": 12.0499,
    "lng": 76.2491,
    "avgDurationHours": 4.5,
    "entryFeeINR": 1000,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3,
      4,
      5
    ],
    "popularity": 4,
    "desc_en": "A magnificent tiger reserve of teak forest, swamps and river valleys, with high chances of elephants, gaur, deer and the occasional leopard.",
    "desc_kn": "ತೇಗು ಅರಣ್ಯ, ಜೌಗು ಮತ್ತು ನದಿ ಕಣಿವೆಗಳ ಭವ್ಯ ಹುಲಿ ಸಂರಕ್ಷಿತ ಪ್ರದೇಶ. ಆನೆ, ಕಾಡುಕೋಣ, ಜಿಂಕೆ ಮತ್ತು ಚಿರತೆ ಕಾಣುವ ಸಾಧ್ಯತೆ ಹೆಚ್ಚು.",
    "dish_en": "Kodava Pandi Curry",
    "dish_kn": "ಪಂದಿ ಕರಿ",
    "tip_en": "Forest safari slots are limited; book online and choose the 6 AM or 3 PM jeep.",
    "tip_kn": "ಅರಣ್ಯ ಸಫಾರಿ ಸ್ಲಾಟ್‌ಗಳು ಸೀಮಿತ; ಆನ್‌ಲೈನ್ ಕಾಯ್ದಿರಿಸಿ, ಬೆಳಗ್ಗೆ 6 ಅಥವಾ ಮಧ್ಯಾಹ್ನ 3 ಗಂಟೆಯ ಜೀಪ್ ಆಯ್ಕೆಮಾಡಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "udupi-krishna",
    "name_en": "Udupi Sri Krishna Temple",
    "name_kn": "ಉಡುಪಿ ಶ್ರೀ ಕೃಷ್ಣ ದೇವಾಲಯ",
    "region": "Mangaluru",
    "categories": [
      "Spiritual",
      "Temples",
      "Food",
      "Heritage",
      "Photography"
    ],
    "lat": 13.3409,
    "lng": 74.7519,
    "avgDurationHours": 2,
    "entryFeeINR": 0,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "popularity": 5,
    "desc_en": "The famed Krishna Mutt, where the child Krishna is seen through a nine-holed window; the surrounding car streets pulse with temple life.",
    "desc_kn": "ಪ್ರಸಿದ್ಧ ಕೃಷ್ಣ ಮಠ. ಒಂಬತ್ತು ರಂಧ್ರಗಳ ಕಿಟಕಿಯ ಮೂಲಕ ಬಾಲಕೃಷ್ಣನ ದರ್ಶನ; ಸುತ್ತಲಿನ ರಥಬೀದಿಗಳಲ್ಲಿ ದೇವಾಲಯದ ಜೀವನ.",
    "dish_en": "Neer Dosa",
    "dish_kn": "ನೀರ್ ದೋಸೆ",
    "tip_en": "Eat the temple prasadam in the dining hall; the afternoon meal is simple, sacred and unforgettable.",
    "tip_kn": "ದೇವಾಲಯದ ಭೋಜನಾಲಯದಲ್ಲಿ ಪ್ರಸಾದ ಸವಿಯಿರಿ; ಮಧ್ಯಾಹ್ನದ ಊಟ ಸರಳ, ಪವಿತ್ರ ಮತ್ತು ಮರೆಯಲಾಗದ್ದು.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "malpe-beach",
    "name_en": "Malpe Beach",
    "name_kn": "ಮಲ್ಪೆ ಕಡಲತೀರ",
    "region": "Mangaluru",
    "categories": [
      "Beaches",
      "Food",
      "Adventure",
      "Photography"
    ],
    "lat": 13.3494,
    "lng": 74.7048,
    "avgDurationHours": 2.5,
    "entryFeeINR": 0,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 4,
    "desc_en": "A long golden beach near Udupi with fishing life, water sports, sunset snacks and ferries to St Mary's Island.",
    "desc_kn": "ಉಡುಪಿ ಸಮೀಪದ ಉದ್ದನೆಯ ಚಿನ್ನದ ಕಡಲತೀರ. ಮೀನುಗಾರಿಕೆ ಜೀವನ, ಜಲ ಕ್ರೀಡೆಗಳು, ಸೂರ್ಯಾಸ್ತ ತಿಂಡಿ ಮತ್ತು ಸೇಂಟ್ ಮೇರಿಸ್ ದ್ವೀಪಕ್ಕೆ ದೋಣಿ.",
    "dish_en": "Neer Dosa",
    "dish_kn": "ನೀರ್ ದೋಸೆ",
    "tip_en": "The ferry to St Mary's Island is weather-dependent; check sea conditions before buying a ticket.",
    "tip_kn": "ಸೇಂಟ್ ಮೇರಿಸ್ ದ್ವೀಪಕ್ಕೆ ದೋಣಿ ಹವಾಮಾನ ಅವಲಂಬಿತ; ಟಿಕೆಟ್ ಖರೀದಿಸುವ ಮೊದಲು ಸಮುದ್ರ ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "st-marys-island",
    "name_en": "St Mary's Island",
    "name_kn": "ಸೇಂಟ್ ಮೇರಿಸ್ ದ್ವೀಪ",
    "region": "Mangaluru",
    "categories": [
      "Beaches",
      "Adventure",
      "Photography"
    ],
    "lat": 13.3805,
    "lng": 74.6735,
    "avgDurationHours": 3,
    "entryFeeINR": 300,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 4,
    "desc_en": "A tiny Arabian Sea island of hexagonal basalt columns, clear water and shell-strewn beaches, reached by a short ferry from Malpe.",
    "desc_kn": "ಅರೇಬಿಯನ್ ಸಮುದ್ರದ ಸಣ್ಣ ದ್ವೀಪ. ಷಡ್ಕೋನ ಬಸಾಲ್ಟ್ ಕಲ್ಲಿನ ಕಂಬಗಳು, ಸ್ವಚ್ಛ ನೀರು ಮತ್ತು ಶಂಖಗಳ ಕಡಲತೀರ; ಮಲ್ಪೆಯಿಂದ ಸಣ್ಣ ದೋಣಿ.",
    "dish_en": "Neer Dosa",
    "dish_kn": "ನೀರ್ ದೋಸೆ",
    "tip_en": "Carry your own water and snacks, avoid littering, and return on the last ferry before dusk.",
    "tip_kn": "ನೀರು ಮತ್ತು ತಿಂಡಿ ಒಯ್ಯಿರಿ, ಕಸ ಹಾಕಬೇಡಿ; ಸಂಜೆ ಮೊದಲು ಕೊನೆಯ ದೋಣಿಯಲ್ಲಿ ವಾಪಸ್ ಬನ್ನಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "murudeshwar",
    "name_en": "Murudeshwar Temple & Beach",
    "name_kn": "ಮುರುಡೇಶ್ವರ ದೇವಾಲಯ ಮತ್ತು ಕಡಲತೀರ",
    "region": "Uttara Kannada",
    "categories": [
      "Spiritual",
      "Temples",
      "Beaches",
      "Photography"
    ],
    "lat": 14.0952,
    "lng": 74.495,
    "avgDurationHours": 2.5,
    "entryFeeINR": 0,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 4,
    "desc_en": "A colossal Shiva statue and towering gopuram beside the sea, with a hilltop lift, painted temple interiors and sunset views.",
    "desc_kn": "ಸಮುದ್ರದ ಪಕ್ಕದಲ್ಲಿ ಭಾರಿ ಶಿವ ಪ್ರತಿಮೆ ಮತ್ತು ಎತ್ತರದ ಗೋಪುರ. ಬೆಟ್ಟದ ಲಿಫ್ಟ್, ಬಣ್ಣದ ದೇವಾಲಯ ಒಳಾಂಗಣ ಮತ್ತು ಸೂರ್ಯಾಸ್ತ ದೃಶ್ಯ.",
    "dish_en": "Neer Dosa",
    "dish_kn": "ನೀರ್ ದೋಸೆ",
    "tip_en": "Take the lift up the statue for coastal views; the beach below is better at low tide.",
    "tip_kn": "ಕರಾವಳಿ ದೃಶ್ಯಕ್ಕೆ ಪ್ರತಿಮೆಯ ಲಿಫ್ಟ್ ಏರಿ; ಕೆಳಗಿನ ಕಡಲತೀರ ಭರತ ಕಡಿಮೆಯಾದಾಗ ಉತ್ತಮ.",
    "seasonAlert_en": "Beach water sports operate Oct–May. Sea is rough during June–Aug monsoon.",
    "seasonAlert_kn": "ಅಕ್ಟೋಬರ್-ಮೇ ಜಲಕ್ರೀಡೆಗಳು ಲಭ್ಯ. ಜೂನ್-ಆಗಸ್ಟ್ ಮಳೆಗಾಲದಲ್ಲಿ ಸಮುದ್ರ ಪ್ರಕ್ಷುಬ್ಧವಾಗಿರುತ್ತದೆ.",
    "crowdTip_en": "Take the 18th floor Rajagopura lift early morning for aerial temple and sea vista.",
    "crowdTip_kn": "ಬೆಳಗ್ಗೆಯೇ ರಾಜಗೋಪುರದ 18ನೇ ಮಹಡಿಯ ಲಿಫ್ಟ್ ಮೂಲಕ ಕಡಲ ನೋಟವನ್ನು ಆನಂದಿಸಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI"
  },
  {
    "id": "om-beach",
    "name_en": "Om Beach, Gokarna",
    "name_kn": "ಗೋಕರ್ಣ ಓಂ ಕಡಲತೀರ",
    "region": "Uttara Kannada",
    "categories": [
      "Beaches",
      "Adventure",
      "Spiritual",
      "Photography"
    ],
    "lat": 14.5129,
    "lng": 74.3239,
    "avgDurationHours": 3,
    "entryFeeINR": 0,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 5,
    "desc_en": "A twin-crescent beach shaped like the Om symbol, backed by rocky headlands, beach cafes and a lively backpacker trail.",
    "desc_kn": "ಓಂ ಚಿಹ್ನೆಯ ಆಕಾರದ ಎರಡು ಅರ್ಧಚಂದ್ರಾಕಾರ ಕಡಲತೀರ. ಬಂಡೆ ತುದಿಗಳು, ಕಡಲತೀರ ಕೆಫೆಗಳು ಮತ್ತು ಚೈತನ್ಯಮಯ ಪ್ರಯಾಣಿಕರ ಹಾದಿ.",
    "dish_en": "Neer Dosa",
    "dish_kn": "ನೀರ್ ದೋಸೆ",
    "tip_en": "The beach is a steep walk from the road; pack light and stay for sunset if you are not driving back.",
    "tip_kn": "ರಸ್ತೆಯಿಂದ ಕಡಲತೀರಕ್ಕೆ ಕಡಿದಾದ ನಡಿಗೆ; ಹಗುರ ಸಾಮಾನು ಒಯ್ಯಿರಿ, ವಾಪಸ್ ಓಡಿಸದಿದ್ದರೆ ಸೂರ್ಯಾಸ್ತ ನೋಡಿ.",
    "seasonAlert_en": "Pleasant sea breeze Oct–March. Sunset beach shacks active in winter.",
    "seasonAlert_kn": "ಅಕ್ಟೋಬರ್-ಮಾರ್ಚ್ ತಂಪಾದ ಕಡಲ ಗಾಳಿ; ಚಳಿಗಾಲದಲ್ಲಿ ಕಡಲತೀರ ಅತ್ಯಂತ ಆಹ್ಲಾದಕರ.",
    "crowdTip_en": "Hike the cliff trail from Om Beach to Half Moon Beach for tranquil secluded sands.",
    "crowdTip_kn": "ಓಂ ಬೀಚ್‌ನಿಂದ ಹಾಫ್ ಮೂನ್ ಬೀಚ್‌ಗೆ ಬೆಟ್ಟದ ಹಾದಿಯಲ್ಲಿ ನಡೆದು ಪ್ರಶಾಂತ ಕಡಲತೀರ ಅನುಭವಿಸಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI"
  },
  {
    "id": "panambur-beach",
    "name_en": "Panambur Beach",
    "name_kn": "ಪಣಂಬೂರು ಕಡಲತೀರ",
    "region": "Mangaluru",
    "categories": [
      "Beaches",
      "Food",
      "Adventure",
      "Photography"
    ],
    "lat": 12.9514,
    "lng": 74.8075,
    "avgDurationHours": 2,
    "entryFeeINR": 30,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 4,
    "desc_en": "Mangaluru's breezy city beach beside the port, known for kites, camel rides, seafood stalls and a lively sunset crowd.",
    "desc_kn": "ಬಂದರು ಪಕ್ಕದ ಮಂಗಳೂರಿನ ಗಾಳಿಯುಸುರುವ ನಗರ ಕಡಲತೀರ. ಗಾಳಿಪಟ, ಒಂಟೆ ಸವಾರಿ, ಸಮುದ್ರಾಹಾರ ಅಂಗಡಿಗಳು ಮತ್ತು ಸೂರ್ಯಾಸ್ತ ಜನಸಂದಣಿ.",
    "dish_en": "Neer Dosa",
    "dish_kn": "ನೀರ್ ದೋಸೆ",
    "tip_en": "Swimming can be unsafe because of currents; enjoy the food stalls and keep an eye on children.",
    "tip_kn": "ಪ್ರವಾಹದಿಂದ ಈಜು ಅಪಾಯಕಾರಿ; ಆಹಾರ ಅಂಗಡಿಗಳನ್ನು ಸವಿಯಿರಿ, ಮಕ್ಕಳ ಮೇಲೆ ಕಣ್ಣಿಡಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "dharmasthala",
    "name_en": "Dharmasthala Manjunatha Temple",
    "name_kn": "ಧರ್ಮಸ್ಥಳ ಮಂಜುನಾಥ ದೇವಾಲಯ",
    "region": "Mangaluru",
    "categories": [
      "Spiritual",
      "Temples",
      "Heritage",
      "Food",
      "Photography"
    ],
    "lat": 12.9603,
    "lng": 75.381,
    "avgDurationHours": 3,
    "entryFeeINR": 0,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "popularity": 5,
    "desc_en": "A major pilgrimage centre on the Nethravathi, renowned for its free annadana meal, charity traditions and Manjunatha worship.",
    "desc_kn": "ನೇತ್ರಾವತಿ ತೀರದ ಪ್ರಮುಖ ತೀರ್ಥಕ್ಷೇತ್ರ. ಉಚಿತ ಅನ್ನದಾನ ಭೋಜನ, ದಾನ ಸಂಪ್ರದಾಯ ಮತ್ತು ಮಂಜುನಾಥ ಆರಾಧನೆಗೆ ಪ್ರಸಿದ್ಧ.",
    "dish_en": "Neer Dosa",
    "dish_kn": "ನೀರ್ ದೋಸೆ",
    "tip_en": "The free meal is part of the experience; dress traditionally and keep enough time for the queue.",
    "tip_kn": "ಉಚಿತ ಭೋಜನ ಅನುಭವದ ಭಾಗ; ಸಾಂಪ್ರದಾಯಿಕ ಉಡುಗೆ ಧರಿಸಿ, ಸಾಲಿಗೆ ಸಮಯ ಬಿಡಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "kukke-subramanya",
    "name_en": "Kukke Subramanya Temple",
    "name_kn": "ಕುಕ್ಕೆ ಸುಬ್ರಹ್ಮಣ್ಯ ದೇವಾಲಯ",
    "region": "Mangaluru",
    "categories": [
      "Spiritual",
      "Temples",
      "Hills & Trekking",
      "Photography"
    ],
    "lat": 12.6647,
    "lng": 75.6105,
    "avgDurationHours": 2.5,
    "entryFeeINR": 0,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "popularity": 4,
    "desc_en": "A riverside Subramanya temple at the foot of Kumaraparvatha, the starting point for a famous Western Ghats trek.",
    "desc_kn": "ಕುಮಾರಪರ್ವತದ ತಪ್ಪಲಿನಲ್ಲಿ ನದಿ ತೀರದ ಸುಬ್ರಹ್ಮಣ್ಯ ದೇವಾಲಯ. ಪ್ರಸಿದ್ಧ ಪಶ್ಚಿಮ ಘಟ್ಟ ಟ್ರೆಕ್‌ನ ಆರಂಭ ಸ್ಥಳ.",
    "dish_en": "Neer Dosa",
    "dish_kn": "ನೀರ್ ದೋಸೆ",
    "tip_en": "If trekking Kumaraparvatha, register at the forest office and never go without a guide in monsoon.",
    "tip_kn": "ಕುಮಾರಪರ್ವತ ಟ್ರೆಕ್ ಮಾಡುವುದಾದರೆ ಅರಣ್ಯ ಕಚೇರಿಯಲ್ಲಿ ನೋಂದಣಿ ಮಾಡಿ; ಮಳೆಗಾಲದಲ್ಲಿ ಮಾರ್ಗದರ್ಶಿ ಇಲ್ಲದೆ ಹೋಗಬೇಡಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "maravanthe",
    "name_en": "Maravanthe Beach",
    "name_kn": "ಮರವಂತೆ ಕಡಲತೀರ",
    "region": "Mangaluru",
    "categories": [
      "Beaches",
      "Photography"
    ],
    "lat": 13.7058,
    "lng": 74.6367,
    "avgDurationHours": 1.5,
    "entryFeeINR": 0,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 3,
    "desc_en": "A rare coastal drive with the Arabian Sea on one side and the Suvarnamukhi river on the other, framed by a curve of golden sand.",
    "desc_kn": "ಅಪರೂಪದ ಕರಾವಳಿ ರಸ್ತೆ. ಒಂದು ಬದಿ ಅರೇಬಿಯನ್ ಸಮುದ್ರ, ಇನ್ನೊಂದು ಬದಿ ಸುವರ್ಣಮುಖಿ ನದಿ; ಚಿನ್ನದ ಮರಳಿನ ಬಾಗು.",
    "dish_en": "Neer Dosa",
    "dish_kn": "ನೀರ್ ದೋಸೆ",
    "tip_en": "Stop at the viewpoint early in the morning for soft light and much less traffic.",
    "tip_kn": "ಮೆದುವಾದ ಬೆಳಕು ಮತ್ತು ಕಡಿಮೆ ಸಂಚಾರಕ್ಕಾಗಿ ಬೆಳಗ್ಗೆ ವೀಕ್ಷಣಾ ಸ್ಥಳದಲ್ಲಿ ನಿಲ್ಲಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "kaup-beach",
    "name_en": "Kaup Beach & Lighthouse",
    "name_kn": "ಕಾಪು ಕಡಲತೀರ ಮತ್ತು ದೀಪಗೃಹ",
    "region": "Mangaluru",
    "categories": [
      "Beaches",
      "Photography"
    ],
    "lat": 13.2245,
    "lng": 74.7425,
    "avgDurationHours": 1.5,
    "entryFeeINR": 20,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 3,
    "desc_en": "A rocky beach crowned by a 100-year-old lighthouse, with tide pools, sunset silhouettes and a quieter Udupi-coast mood.",
    "desc_kn": "100 ವರ್ಷ ಹಳೆಯ ದೀಪಗೃಹದಿಂದ ಅಲಂಕೃತ ಬಂಡೆ ಕಡಲತೀರ. ಭರತ ಕೊಳಗಳು, ಸೂರ್ಯಾಸ್ತ ಛಾಯೆ ಮತ್ತು ಶಾಂತ ಉಡುಪಿ ಕರಾವಳಿ ಭಾವ.",
    "dish_en": "Neer Dosa",
    "dish_kn": "ನೀರ್ ದೋಸೆ",
    "tip_en": "The lighthouse climb has fixed hours; check before travelling and wear grip shoes on the rocks.",
    "tip_kn": "ದೀಪಗೃಹ ಏರಿಕೆಗೆ ನಿಗದಿತ ಸಮಯ; ಹೊರಡುವ ಮೊದಲು ಪರಿಶೀಲಿಸಿ, ಬಂಡೆಗಳಲ್ಲಿ ಹಿಡಿತದ ಶೂ ಧರಿಸಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "yana-rocks",
    "name_en": "Yana Rocks",
    "name_kn": "ಯಾಣ ಬಂಡೆಗಳು",
    "region": "Uttara Kannada",
    "categories": [
      "Hills & Trekking",
      "Spiritual",
      "Adventure",
      "Photography"
    ],
    "lat": 14.5906,
    "lng": 74.5663,
    "avgDurationHours": 3,
    "entryFeeINR": 0,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3,
      4,
      5
    ],
    "popularity": 3,
    "desc_en": "Two dramatic black limestone monoliths rising from a rainforest, with a cave shrine and a short stream-side trek to reach them.",
    "desc_kn": "ಮಳೆಕಾಡಿನಿಂದ ಎದ್ದು ನಿಂತ ಎರಡು ಕಪ್ಪು ಸುಣ್ಣಕಲ್ಲಿನ ಬೃಹತ್ ಬಂಡೆಗಳು. ಗುಹಾ ದೇವಾಲಯ ಮತ್ತು ಸಣ್ಣ ತೊರೆ ಪಕ್ಕದ ಟ್ರೆಕ್.",
    "dish_en": "Neer Dosa",
    "dish_kn": "ನೀರ್ ದೋಸೆ",
    "tip_en": "Wear trekking shoes and avoid the trail during heavy rain; leeches are common.",
    "tip_kn": "ಟ್ರೆಕಿಂಗ್ ಶೂ ಧರಿಸಿ, ಭಾರೀ ಮಳೆಯಲ್ಲಿ ಹಾದಿ ತಪ್ಪಿಸಿ; ಜಿಗಣೆ ಸಾಮಾನ್ಯ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "devbagh",
    "name_en": "Devbagh Beach",
    "name_kn": "ದೇವಬಾಗ್ ಕಡಲತೀರ",
    "region": "Uttara Kannada",
    "categories": [
      "Beaches",
      "Adventure",
      "Wildlife",
      "Photography"
    ],
    "lat": 14.551,
    "lng": 74.315,
    "avgDurationHours": 3,
    "entryFeeINR": 0,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3
    ],
    "popularity": 3,
    "desc_en": "A secluded sand spit near Gokarna where the Kali river meets the sea, backed by casuarina groves and calm sunset waters.",
    "desc_kn": "ಗೋಕರ್ಣ ಸಮೀಪದ ಏಕಾಂತ ಮರಳು ದಿಬ್ಬ. ಕಾಳಿ ನದಿ ಸಮುದ್ರ ಸೇರುವ ಸ್ಥಳ, ಸವರಿ ಮರಗಳ ನಡುವೆ ಶಾಂತ ಸೂರ್ಯಾಸ್ತ ಜಲ.",
    "dish_en": "Neer Dosa",
    "dish_kn": "ನೀರ್ ದೋಸೆ",
    "tip_en": "Take the boat from the Kali river bank and check return timings before settling in for sunset.",
    "tip_kn": "ಕಾಳಿ ನದಿ ದಡದಿಂದ ದೋಣಿ ಹತ್ತಿ; ಸೂರ್ಯಾಸ್ತಕ್ಕೆ ಕುಳಿತುಕೊಳ್ಳುವ ಮೊದಲು ವಾಪಸ್ ಸಮಯ ಪರಿಶೀಲಿಸಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "gokarna-temple",
    "name_en": "Mahabaleshwar Temple, Gokarna",
    "name_kn": "ಗೋಕರ್ಣ ಮಹಾಬಲೇಶ್ವರ ದೇವಾಲಯ",
    "region": "Uttara Kannada",
    "categories": [
      "Spiritual",
      "Temples",
      "Heritage",
      "Photography"
    ],
    "lat": 14.5432,
    "lng": 74.3185,
    "avgDurationHours": 1.5,
    "entryFeeINR": 0,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "popularity": 4,
    "desc_en": "One of India's most sacred Shiva temples, an ancient stone sanctuary in the heart of Gokarna's temple town.",
    "desc_kn": "ಭಾರತದ ಅತ್ಯಂತ ಪವಿತ್ರ ಶಿವ ದೇವಾಲಯಗಳಲ್ಲಿ ಒಂದು. ಗೋಕರ್ಣ ದೇವಾಲಯ ಪಟ್ಟಣದ ಹೃದಯದಲ್ಲಿರುವ ಪ್ರಾಚೀನ ಕಲ್ಲಿನ ಪುಣ್ಯಕ್ಷೇತ್ರ.",
    "dish_en": "Neer Dosa",
    "dish_kn": "ನೀರ್ ದೋಸೆ",
    "tip_en": "Dress modestly and follow the local ritual rules; the town is a pilgrimage centre, not only a beach stop.",
    "tip_kn": "ಸಭ್ಯ ಉಡುಗೆ ಧರಿಸಿ, ಸ್ಥಳೀಯ ಆಚರಣೆ ನಿಯಮ ಪಾಲಿಸಿ; ಪಟ್ಟಣ ಕೇವಲ ಕಡಲತೀರ ತಾಣವಲ್ಲ, ತೀರ್ಥಕ್ಷೇತ್ರ.",
    "seasonAlert_en": "Pleasant sea breeze Oct–March. Sunset beach shacks active in winter.",
    "seasonAlert_kn": "ಅಕ್ಟೋಬರ್-ಮಾರ್ಚ್ ತಂಪಾದ ಕಡಲ ಗಾಳಿ; ಚಳಿಗಾಲದಲ್ಲಿ ಕಡಲತೀರ ಅತ್ಯಂತ ಆಹ್ಲಾದಕರ.",
    "crowdTip_en": "Hike the cliff trail from Om Beach to Half Moon Beach for tranquil secluded sands.",
    "crowdTip_kn": "ಓಂ ಬೀಚ್‌ನಿಂದ ಹಾಫ್ ಮೂನ್ ಬೀಚ್‌ಗೆ ಬೆಟ್ಟದ ಹಾದಿಯಲ್ಲಿ ನಡೆದು ಪ್ರಶಾಂತ ಕಡಲತೀರ ಅನುಭವಿಸಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI"
  },
  {
    "id": "dandeli",
    "name_en": "Dandeli",
    "name_kn": "ದಾಂಡೇಲಿ",
    "region": "Uttara Kannada",
    "categories": [
      "Adventure",
      "Wildlife",
      "Waterfalls",
      "Hills & Trekking"
    ],
    "lat": 15.2468,
    "lng": 74.619,
    "avgDurationHours": 6,
    "entryFeeINR": 600,
    "bestMonths": [
      10,
      11,
      12,
      1,
      2,
      3,
      4,
      5
    ],
    "popularity": 4,
    "desc_en": "Karnataka's adventure capital on the Kali river, with white-water rafting, coracle rides, jungle camps and hornbill-rich forests.",
    "desc_kn": "ಕಾಳಿ ನದಿ ತೀರದ ಕರ್ನಾಟಕದ ಸಾಹಸ ರಾಜಧಾನಿ. ವೈಟ್ ವಾಟರ್ ರಾಫ್ಟಿಂಗ್, ದೋಣಿ ಸವಾರಿ, ಕಾಡು ಶಿಬಿರ ಮತ್ತು ಹಾರ್ನ್‌ಬಿಲ್ ಪಕ್ಷಿಗಳ ಅರಣ್ಯ.",
    "dish_en": "Dharwad Pedha",
    "dish_kn": "ಧಾರವಾಡ ಪೇಡಾ",
    "tip_en": "Choose a certified rafting operator and confirm river release timings; carry a dry bag.",
    "tip_kn": "ಪ್ರಮಾಣೀಕೃತ ರಾಫ್ಟಿಂಗ್ ಸಂಸ್ಥೆ ಆಯ್ಕೆಮಾಡಿ, ನದಿ ಬಿಡುಗಡೆ ಸಮಯ ಖಚಿತಪಡಿಸಿ; ಒಣ ಚೀಲ ಒಯ್ಯಿರಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "belagavi-fort",
    "name_en": "Belagavi Fort",
    "name_kn": "ಬೆಳಗಾವಿ ಕೋಟೆ",
    "region": "Belagavi",
    "categories": [
      "Heritage",
      "Spiritual",
      "Photography"
    ],
    "lat": 15.8525,
    "lng": 74.504,
    "avgDurationHours": 2,
    "entryFeeINR": 25,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      9,
      10,
      11,
      12
    ],
    "popularity": 3,
    "desc_en": "A layered old fort in the city centre with Chalukyan, Bahmani and Maratha additions, mosques, temples and a large moat.",
    "desc_kn": "ನಗರ ಮಧ್ಯದ ಪದರಗಳ ಕೋಟೆ. ಚಾಲುಕ್ಯ, ಬಹಮನಿ ಮತ್ತು ಮರಾಠಾ ಸೇರ್ಪಡೆಗಳು, ಮಸೀದಿಗಳು, ದೇವಾಲಯಗಳು ಮತ್ತು ದೊಡ್ಡ ಕಂದಕ.",
    "dish_en": "Belagavi Kunda",
    "dish_kn": "ಬೆಳಗಾವಿ ಕುಂಡ",
    "tip_en": "Combine the fort with a walk through the old town and pick up Belagavi kunda for the journey.",
    "tip_kn": "ಕೋಟೆ ನೋಡಿದ ನಂತರ ಹಳೆ ಪಟ್ಟಣದಲ್ಲಿ ನಡೆಯಿರಿ, ಪ್ರಯಾಣಕ್ಕೆ ಬೆಳಗಾವಿ ಕುಂಡ ಖರೀದಿಸಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "gokak-falls",
    "name_en": "Gokak Falls",
    "name_kn": "ಗೋಕಾಕ್ ಜಲಪಾತ",
    "region": "Belagavi",
    "categories": [
      "Waterfalls",
      "Heritage",
      "Photography"
    ],
    "lat": 16.1918,
    "lng": 74.8003,
    "avgDurationHours": 2,
    "entryFeeINR": 25,
    "bestMonths": [
      7,
      8,
      9,
      10,
      11,
      12,
      1
    ],
    "popularity": 3,
    "desc_en": "A horseshoe waterfall on the Ghataprabha, with a historic suspension bridge, old mill buildings and a rocky gorge viewpoint.",
    "desc_kn": "ಘಟಪ್ರಭಾ ನದಿಯ ಕುದುರೆಲಾಳ ಜಲಪಾತ. ಐತಿಹಾಸಿಕ ತೂಗು ಸೇತುವೆ, ಹಳೆಯ ಗಿರಣಿ ಕಟ್ಟಡಗಳು ಮತ್ತು ಬಂಡೆ ಕಮರಿ ವೀಕ್ಷಣಾ ಸ್ಥಳ.",
    "dish_en": "Belagavi Kunda",
    "dish_kn": "ಬೆಳಗಾವಿ ಕುಂಡ",
    "tip_en": "The bridge and rocks get slippery in monsoon; enjoy the falls from the fenced viewpoint.",
    "tip_kn": "ಮಳೆಗಾಲದಲ್ಲಿ ಸೇತುವೆ ಮತ್ತು ಬಂಡೆಗಳು ಜಾರುತ್ತವೆ; ಬೇಲಿ ಹಾಕಿದ ವೀಕ್ಷಣಾ ಸ್ಥಳದಿಂದ ಜಲಪಾತ ನೋಡಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "kittur-fort",
    "name_en": "Kittur Fort",
    "name_kn": "ಕಿತ್ತೂರು ಕೋಟೆ",
    "region": "Belagavi",
    "categories": [
      "Heritage",
      "Photography"
    ],
    "lat": 15.6,
    "lng": 74.7833,
    "avgDurationHours": 2,
    "entryFeeINR": 20,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      9,
      10,
      11,
      12
    ],
    "popularity": 2,
    "desc_en": "The ruined fort of Rani Chennamma, a symbol of early resistance to colonial rule, set amid quiet fields and old ramparts.",
    "desc_kn": "ರಾಣಿ ಚೆನ್ನಮ್ಮನ ಅವಶೇಷ ಕೋಟೆ. ವಸಾಹತುಶಾಹಿ ಆಳ್ವಿಕೆಗೆ ಆರಂಭಿಕ ಪ್ರತಿರೋಧದ ಪ್ರತೀಕ; ಶಾಂತ ಹೊಲಗಳು ಮತ್ತು ಹಳೆಯ ಕೋಟೆ ಗೋಡೆಗಳ ನಡುವೆ.",
    "dish_en": "Belagavi Kunda",
    "dish_kn": "ಬೆಳಗಾವಿ ಕುಂಡ",
    "tip_en": "Read up on Rani Chennamma before visiting; the site's story is more powerful than its surviving stones.",
    "tip_kn": "ಭೇಟಿಗೆ ಮೊದಲು ರಾಣಿ ಚೆನ್ನಮ್ಮನ ಇತಿಹಾಸ ಓದಿ; ಉಳಿದ ಕಲ್ಲುಗಳಿಗಿಂತ ಸ್ಥಳದ ಕಥೆ ಹೆಚ್ಚು ಶಕ್ತಿಶಾಲಿ.",
    "lastVerified": "Verified for 2026 Season • KSTDC / ASI",
    "crowdTip_en": "Morning hours (8 AM–10:30 AM) offer peaceful exploration and soft lighting.",
    "crowdTip_kn": "ಬೆಳಗ್ಗಿನ ವೇಳೆ (8 ರಿಂದ 10:30) ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು ಲಭ್ಯ.",
    "seasonAlert_en": "Ideal travel months: October to March.",
    "seasonAlert_kn": "ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್."
  },
  {
    "id": "chitradurga-fort",
    "name_en": "Chitradurga Fort (Kallina Kote)",
    "name_kn": "ಚಿತ್ರದುರ್ಗದ ಕಲ್ಲಿನ ಕೋಟೆ",
    "region": "Chitradurga",
    "categories": [
      "Heritage",
      "Photography",
      "Adventure"
    ],
    "lat": 14.2185,
    "lng": 76.3986,
    "avgDurationHours": 3.5,
    "entryFeeINR": 25,
    "bestMonths": [
      1,
      2,
      9,
      10,
      11,
      12
    ],
    "popularity": 5,
    "desc_en": "The formidable 'Fort of Seven Rounds' (Elusuttina Kote) built across granite hills, famous for heroic legend of Onake Obavva, rainwater harvesting tanks, and massive stone gateways.",
    "desc_kn": "ಏಳು ಸುತ್ತಿನ ಕಲ್ಲಿನ ಕೋಟೆ. ಗ್ರಾನೈಟ್ ಬಂಡೆಗಳ ಮೇಲೆ ನಿರ್ಮಿತವಾದ ಈ ಕೋಟೆ ಒನಕೆ ಓಬವ್ವನ ಶೌರ್ಯದ ಗಾಥೆ, ಮಳೆನೀರು ಸಂಗ್ರಹದ ಹೊಂಡಗಳು ಮತ್ತು ಬೃಹತ್ ಹೆಬ್ಬಾಗಿಲುಗಳಿಗೆ ಪ್ರಸಿದ್ಧ.",
    "dish_en": "Davanagere Benne Dosa",
    "dish_kn": "ದಾವಣಗೆರೆ ಬೆಣ್ಣೆ ದೋಸೆ",
    "tip_en": "Hire a local guide to uncover the secret slit (Obavvana Kindi) and ancient gun-powder granary.",
    "tip_kn": "ಓಬವ್ವನ ಕಿಂಡಿ ಮತ್ತು ಪ್ರಾಚೀನ ಮದ್ದುಗುಂಡಿನ ಉಗ್ರಾಣಗಳನ್ನು ನೋಡಲು ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಕರನ್ನು ಪಡೆದುಕೊಳ್ಳಿ.",
    "seasonAlert_en": "Sunny and warm; Oct–Feb is ideal. Carry walking shoes and water bottle.",
    "seasonAlert_kn": "ಅಕ್ಟೋಬರ್-ಫೆಬ್ರವರಿ ಸೂಕ್ತ. ನಡಿಗೆಗೆ ಅನುಕೂಲಕರವಾದ ಶೂ ಮತ್ತು ನೀರಿನ ಬಾಟಲಿ ಕೊಂಡೊಯ್ಯಿರಿ.",
    "crowdTip_en": "Start your climb at 7:30 AM to beat the mid-day sun on the granite boulders.",
    "crowdTip_kn": "ಬಂಡೆಗಳ ಬಿಸಿಲನ್ನು ತಪ್ಪಿಸಲು ಬೆಳಗ್ಗೆ 7:30 ಕ್ಕೆ ಕೋಟೆ ಹತ್ತಲು ಪ್ರಾರಂಭಿಸಿ.",
    "lastVerified": "Verified for 2026 Season • ASI Karnataka",
    "artisanOrHomestay_en": "Chitradurga handloom blankets & Davanagere butter dosas",
    "artisanOrHomestay_kn": "ಚಿತ್ರದುರ್ಗದ ಕೈಮಗ್ಗದ ಕಂಬಳಿಗಳು ಮತ್ತು ದಾವಣಗೆರೆ ಬೆಣ್ಣೆ ದೋಸೆ"
  },
  {
    "id": "ibrahim-rauza",
    "name_en": "Ibrahim Rauza",
    "name_kn": "ಇಬ್ರಾಹಿಂ ರೋಜಾ",
    "region": "Vijayapura",
    "categories": [
      "Heritage",
      "Photography",
      "Spiritual"
    ],
    "lat": 16.8282,
    "lng": 75.6983,
    "avgDurationHours": 1.5,
    "entryFeeINR": 25,
    "bestMonths": [
      1,
      2,
      3,
      10,
      11,
      12
    ],
    "popularity": 4,
    "desc_en": "Often called the 'Taj Mahal of the Deccan', this graceful 17th-century Adil Shahi complex features intricate stone lattice carvings, acoustic minarets, and tranquil landscaped gardens.",
    "desc_kn": "ದಖ್ಖನ್‌ನ ತಾಜ್ ಮಹಲ್ ಎಂದೇ ಖ್ಯಾತವಾದ 17ನೇ ಶತಮಾನದ ಅದಿಲ್ ಶಾಹಿ ವಾಸ್ತುಶಿಲ್ಪ. ಕೆತ್ತನೆಯ ಕಲ್ಲಿನ ಜಾಲರಿಗಳು ಮತ್ತು ಶಾಂತ ಉದ್ಯಾನವನಗಳಿಗೆ ಹೆಸರುವಾಸಿ.",
    "dish_en": "Jowar Rotti with Shengad Chutney",
    "dish_kn": "ಜೋಳದ ರೊಟ್ಟಿ ಮತ್ತು ಶೇಂಗಾ ಚಟ್ನಿ",
    "tip_en": "The Quranic calligraphy carved inside the stone door frames is an engineering marvel.",
    "tip_kn": "ಕಲ್ಲಿನ ಬಾಗಿಲ ಚೌಕಟ್ಟಿನಲ್ಲಿ ಕೆತ್ತಲಾದ ಕುರಾನ್ ಲಿಪಿ ಅದ್ಭುತ ಕೆತ್ತನೆಯಾಗಿದೆ.",
    "seasonAlert_en": "Winter evenings offer breathtaking golden-hour light against sandstone.",
    "seasonAlert_kn": "ಚಳಿಗಾಲದ ಸಂಜೆಯ ಗೋಲ್ಡನ್ ಅವರ್‌ನಲ್ಲಿ ಮರಳುಗಲ್ಲಿನ ಹೊಳಪು ಅದ್ಭುತವಾಗಿ ಕಾಣುತ್ತದೆ.",
    "crowdTip_en": "Combine with Gol Gumbaz in a single morning circuit before 11 AM.",
    "crowdTip_kn": "ಬೆಳಗ್ಗೆ 11 ರ ಮೊದಲು ಗೋಲ ಗುಂಬಜ್ ಮತ್ತು ಇಬ್ರಾಹಿಂ ರೋಜಾವನ್ನು ಒಟ್ಟಿಗೆ ವೀಕ್ಷಿಸಿ.",
    "lastVerified": "Verified for 2026 Season • ASI Vijayapura",
    "artisanOrHomestay_en": "Vijayapura Lambani embroidery & hand-pressed cold peanut oil",
    "artisanOrHomestay_kn": "ವಿಜಯಪುರದ ಲಂಬಾಣಿ ಕಸೂತಿ ಕಲೆ"
  },
  {
    "id": "hubballi-heritage",
    "name_en": "Chandramouleshwara Temple & Unkal Lake",
    "name_kn": "ಚಂದ್ರಮೌಳೇಶ್ವರ ದೇವಾಲಯ ಮತ್ತು ಉಣಕಲ್ ಕೆರೆ",
    "region": "Hubballi-Dharwad",
    "categories": [
      "Heritage",
      "Temples",
      "Photography"
    ],
    "lat": 15.3725,
    "lng": 75.1245,
    "avgDurationHours": 2,
    "entryFeeINR": 0,
    "bestMonths": [
      1,
      2,
      9,
      10,
      11,
      12
    ],
    "popularity": 4,
    "desc_en": "A 900-year-old Chalukyan architectural marvel of carved black granite columns on the banks of Unkal Lake, dedicated to Lord Shiva, featuring 4 sculpted doorways.",
    "desc_kn": "ಉಣಕಲ್ ಕೆರೆಯ ದಂಡೆಯಲ್ಲಿರುವ 900 ವರ್ಷಗಳ ಹಳೆಯ ಚಾಲುಕ್ಯ ಶೈಲಿಯ ಕಪ್ಪು ಗ್ರಾನೈಟ್ ಕೆತ್ತನೆಯ ಶಿವಾಲಯ. ನಾಲ್ಕು ಭವ್ಯ ದ್ವಾರಗಳಿಗೆ ಪ್ರಸಿದ್ಧ.",
    "dish_en": "Dharwad Pedha & Girmit",
    "dish_kn": "ಧಾರವಾಡ ಪೇಡಾ ಮತ್ತು ಗಿರ್ಮಿಟ್",
    "tip_en": "Visit the legendary Babusingh Thakur Pedha store near Dharwad Line Bazaar for the authentic taste.",
    "tip_kn": "ಅಸಲಿ ರುಚಿಗಾಗಿ ಧಾರವಾಡ ಲೈನ್ ಬಜಾರ್‌ನ ಠಾಕೂರ್ ಪೇಡಾ ಅಂಗಡಿಗೆ ಭೇಟಿ ನೀಡಿ.",
    "seasonAlert_en": "Cool evenings year-round; boating available at Unkal Lake.",
    "seasonAlert_kn": "ಉಣಕಲ್ ಕೆರೆಯಲ್ಲಿ ದೋಣಿ ವಿಹಾರ ಮತ್ತು ಸಂಜೆಯ ತಂಪಾದ ಗಾಳಿ ಆಹ್ಲಾದಕರ.",
    "crowdTip_en": "Morning pujas at 7:30 AM offer meditative temple acoustics.",
    "crowdTip_kn": "ಬೆಳಗ್ಗೆ 7:30 ರ ಪೂಜೆಯ ಸಮಯದಲ್ಲಿ ದೇವಾಲಯ ಅತ್ಯಂತ ಪ್ರಶಾಂತವಾಗಿರುತ್ತದೆ.",
    "lastVerified": "Verified for 2026 Season • Dharwad Heritage Cell",
    "artisanOrHomestay_en": "Dharwad Kasuti embroidery & Babusingh Thakur Pedha",
    "artisanOrHomestay_kn": "ಧಾರವಾಡ ಕಸೂತಿ ಕಲೆ ಮತ್ತು ಬಾಬುಸಿಂಗ್ ಠಾಕೂರ್ ಪೇಡಾ"
  },
  {
    "id": "kalaburagi-fort",
    "name_en": "Kalaburagi Fort & Jami Masjid",
    "name_kn": "ಕಲಬುರಗಿ ಕೋಟೆ ಮತ್ತು ಜಾಮಿ ಮಸೀದಿ",
    "region": "Kalaburagi",
    "categories": [
      "Heritage",
      "Photography",
      "Spiritual"
    ],
    "lat": 17.3402,
    "lng": 76.8285,
    "avgDurationHours": 2.5,
    "entryFeeINR": 15,
    "bestMonths": [
      1,
      2,
      10,
      11,
      12
    ],
    "popularity": 4,
    "desc_en": "Built by the Bahmani Sultanate in 1347, featuring a deep moat, huge cannons, and the unique Spanish-influenced Jami Masjid with 68 domed bays.",
    "desc_kn": "1347 ರಲ್ಲಿ ಬಹಮನಿ ಸುಲ್ತಾನರು ನಿರ್ಮಿಸಿದ ಕೋಟೆ. ಆಳವಾದ ಕಂದಕ, ಬೃಹತ್ ಫಿರಂಗಿಗಳು ಮತ್ತು ಸ್ಪ್ಯಾನಿಷ್ ಶೈಲಿಯ ಜಾಮಿ ಮಸೀದಿಗೆ ಪ್ರಸಿದ್ಧ.",
    "dish_en": "Kalaburagi Jolada Rotti & Mutton Tahari",
    "dish_kn": "ಕಲಬುರಗಿ ಜೋಳದ ರೊಟ್ಟಿ ಮತ್ತು ತಹಾರಿ",
    "tip_en": "Explore the ancient Bara Gazi Toph (29-foot bronze cannon), one of India's largest.",
    "tip_kn": "ಭಾರತದ ಅತಿ ದೊಡ್ಡ ಫಿರಂಗಿಗಳಲ್ಲಿ ಒಂದಾದ 29 ಅಡಿ ಉದ್ದದ ಬಾರಾ ಗಾಜಿ ತೋಫನ್ನು ನೋಡಿ.",
    "seasonAlert_en": "Best visited Oct–Feb; avoid hot summer afternoons.",
    "seasonAlert_kn": "ಅಕ್ಟೋಬರ್-ಫೆಬ್ರವರಿ ಭೇಟಿಗೆ ಅತ್ಯುತ್ತಮ ಸಮಯ.",
    "crowdTip_en": "Visit around 4 PM for soft daylight filtering through the mosque archways.",
    "crowdTip_kn": "ಮಸೀದಿಯ ಕಮಾನುಗಳಲ್ಲಿ ಬೆಳಕು ಹರಿಯುವ ಸಂಜೆ 4 ಗಂಟೆಗೆ ಭೇಟಿ ನೀಡಿ.",
    "lastVerified": "Verified for 2026 Season • ASI Gulbarga",
    "artisanOrHomestay_en": "Bidriware silver inlay artisans & GI tagged Kalaburagi Red Gram",
    "artisanOrHomestay_kn": "ಬಿದ್ರಿ ಕಲೆ ಮತ್ತು ಜಿ.ಐ. ಮಾನ್ಯತೆ ಪಡೆದ ಕಲಬುರಗಿ ತೊಗರಿ ಬೇಳೆ"
  },
  {
    "id": "channapatna-crafts",
    "name_en": "Channapatna Toy & Crafts Village",
    "name_kn": "ಚನ್ನಪಟ್ಟಣ ಬೊಂಬೆ ಕರಕುಶಲ ಗ್ರಾಮ",
    "region": "Bengaluru",
    "categories": [
      "Artisans & Crafts",
      "Heritage",
      "Photography"
    ],
    "lat": 12.6518,
    "lng": 77.2089,
    "avgDurationHours": 2,
    "entryFeeINR": 0,
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "popularity": 5,
    "desc_en": "The historic 'Gombegala Ooru' (City of Toys). World-famous GI-tagged wooden toys handcrafted on turning lathes using ivory wood and non-toxic vegetable dyes, promoted since Tipu Sultan's era.",
    "desc_kn": "ವಿಶ್ವಪ್ರಸಿದ್ಧ 'ಗೊಂಬೆಗಳ ಊರು'. ಟಿಪ್ಪು ಸುಲ್ತಾನರ ಕಾಲದಿಂದ ಬೆಳೆದು ಬಂದ ನೈಸರ್ಗಿಕ ತರಕಾರಿ ಬಣ್ಣಗಳ ಐವರಿ ಮರದ ಆಟಿಕೆಗಳ ಜಿ.ಐ. ಟ್ಯಾಗ್ ಕರಕುಶಲ ಕಲೆ.",
    "dish_en": "Maddur Vada & Filter Coffee",
    "dish_kn": "ಮದ್ದೂರು ವಡೆ ಮತ್ತು ಫಿಲ್ಟರ್ ಕಾಫಿ",
    "tip_en": "Visit artisan workshops in Maya Organic or artisan clusters near the highway to see live woodturning.",
    "tip_kn": "ಲೈವ್ ಮರದ ಗೊಂಬೆ ತಯಾರಿಕೆ ವೀಕ್ಷಿಸಲು ಕುಶಲಕರ್ಮಿಗಳ ಕಾರ್ಯಾಗಾರಗಳಿಗೆ ಭೇಟಿ ನೀಡಿ.",
    "seasonAlert_en": "Year-round indoor workshop visits; pleasant morning stop en route from Bengaluru to Mysuru.",
    "seasonAlert_kn": "ವರ್ಷಪೂರ್ತಿ ಭೇಟಿ ನೀಡಬಹುದು; ಬೆಂಗಳೂರು-ಮೈಸೂರು ಪ್ರಯಾಣದ ನಡುವೆ ಅತ್ಯುತ್ತಮ ನಿಲುಗಡೆ.",
    "crowdTip_en": "Direct purchases from artisan cooperatives support generational craft families.",
    "crowdTip_kn": "ಕುಶಲಕರ್ಮಿಗಳ ಸಹಕಾರ ಸಂಘಗಳಿಂದ ನೇರವಾಗಿ ಖರೀದಿಸಿ ಸ್ಥಳೀಯ ಕಲೆಗೆ ಪ್ರೋತ್ಸಾಹ ನೀಡಿ.",
    "lastVerified": "Verified for 2026 Season • Karnataka Handloom & Crafts Dev Corp",
    "artisanOrHomestay_en": "Channapatna GI Wooden Toys Artisans Guild",
    "artisanOrHomestay_kn": "ಚನ್ನಪಟ್ಟಣ ಮರದ ಆಟಿಕೆಗಳ ಕುಶಲಕರ್ಮಿ ಸಂಘ"
  },
  {
    "id": "ilkal-weaving",
    "name_en": "Ilkal Handloom Saree Weaving Center",
    "name_kn": "ಇಳಕಲ್ ಕೈಮಗ್ಗ ಸೀರೆ ನೇಯ್ಗೆ ಕೇಂದ್ರ",
    "region": "Badami",
    "categories": [
      "Artisans & Crafts",
      "Heritage",
      "Photography"
    ],
    "lat": 15.9612,
    "lng": 76.1284,
    "avgDurationHours": 2,
    "entryFeeINR": 0,
    "bestMonths": [
      1,
      2,
      9,
      10,
      11,
      12
    ],
    "popularity": 4,
    "desc_en": "Home to the 8th-century GI-tagged Ilkal saree, renowned for its distinctive 'Tope Teni' pallu joint weaving technique and Kasuti embroidery, woven by traditional Devanga weaver families.",
    "desc_kn": "8ನೇ ಶತಮಾನದಿಂದ ಬೆಳೆದುಬಂದ ಜಿ.ಐ. ಟ್ಯಾಗ್ ಇಳಕಲ್ ಸೀರೆಗಳ ನೇಯ್ಗೆ ಕೇಂದ್ರ. ವಿಶಿಷ್ಟ 'ಟೋಪೇ ತೇನಿ' ಪಲ್ಲು ಮತ್ತು ಕಸೂತಿ ಕಲೆಗೆ ಜಗತ್ಪ್ರಸಿದ್ಧ.",
    "dish_en": "Shenga Chutney Rotti & Mirchi",
    "dish_kn": "ಶೇಂಗಾ ಚಟ್ನಿ ರೊಟ್ಟಿ ಮತ್ತು ಮಿರ್ಚಿ",
    "tip_en": "Watch weavers master the intricate 'Konde' interlock technique connecting silk warp to body cotton.",
    "tip_kn": "ರೇಷ್ಮೆ ಮತ್ತು ಹತ್ತಿಯನ್ನು ಬೆಸೆಯುವ ವಿಶಿಷ್ಟ 'ಕೊಂಡೆ' ನೇಯ್ಗೆ ವಿಧಾನವನ್ನು ನೇರವಾಗಿ ನೋಡಿ.",
    "seasonAlert_en": "Combine easily with Badami and Aihole circuit.",
    "seasonAlert_kn": "ಬದಾಮಿ ಮತ್ತು ಐಹೊಳೆ ಪ್ರವಾಸದ ಜೊತೆಗೆ ಸುಲಭವಾಗಿ ಭೇಟಿ ನೀಡಬಹುದು.",
    "crowdTip_en": "Morning 9 AM–12 PM is the most active time in weaver households.",
    "crowdTip_kn": "ಬೆಳಗ್ಗೆ 9 ರಿಂದ 12 ರ ನಡುವೆ ನೇಕಾರರ ಮಗ್ಗಗಳು ಪೂರ್ಣ ಚಟುವಟಿಕೆಯಲ್ಲಿರುತ್ತವೆ.",
    "lastVerified": "Verified for 2026 Season • Karnataka Handloom Board",
    "artisanOrHomestay_en": "Ilkal Weavers Cooperative Society & Guledgudd Khun",
    "artisanOrHomestay_kn": "ಇಳಕಲ್ ನೇಕಾರರ ಸಹಕಾರ ಸಂಘ ಮತ್ತು ಗುಳೇದಗುಡ್ಡ ಖಣ"
  },
  {
    "id": "bidri-crafts",
    "name_en": "Bidriware Silver Inlay Craft Village",
    "name_kn": "ಬಿದ್ರಿ ಕಲೆ ಬೆಳ್ಳಿ ಕೆತ್ತನೆ ಗ್ರಾಮ",
    "region": "Kalaburagi",
    "categories": [
      "Artisans & Crafts",
      "Heritage",
      "Photography"
    ],
    "lat": 17.915,
    "lng": 77.518,
    "avgDurationHours": 2,
    "entryFeeINR": 0,
    "bestMonths": [
      1,
      2,
      10,
      11,
      12
    ],
    "popularity": 4,
    "desc_en": "Centuries-old metal handicraft originating in Bidar under Bahmani rule. Pure silver wire inlaid into blackened zinc-copper alloy, using soil collected exclusively from Bidar Fort grounds.",
    "desc_kn": "ಬಹಮನಿ ಸುಲ್ತಾನರ ಕಾಲದ ಬೆಳ್ಳಿ ಕೆತ್ತನೆಯ ವಿಶಿಷ್ಟ ಲೋಹ ಕಲೆ. ಬಿದರ್ ಕೋಟೆಯ ಪ್ರಾಚೀನ ಮಣ್ಣಿನಿಂದ ಕಪ್ಪಾಗಿಸಿದ ಲೋಹದ ಮೇಲೆ ಶುದ್ಧ ಬೆಳ್ಳಿಯ ಚಿತ್ತಾರ.",
    "dish_en": "Bidar Biryani & Sheermal",
    "dish_kn": "ಬೀದರ್ ಬಿರಿಯಾನಿ ಮತ್ತು ಶೀರ್ಮಾಲ್",
    "tip_en": "Meet National Awardee master craftsmen in Old Bidar town demonstrating the blackening chemical oxidation with fort soil.",
    "tip_kn": "ಹಳೆ ಬೀದರ್‌ನಲ್ಲಿ ರಾಷ್ಟ್ರ ಪ್ರಶಸ್ತಿ ವಿಜೇತ ಕುಶಲಕರ್ಮಿಗಳು ಕೋಟೆಯ ಮಣ್ಣಿನಿಂದ ಮಾಡುವ ರಸಾಯನಿಕ ಪ್ರಕ್ರಿಯೆಯನ್ನು ವೀಕ್ಷಿಸಿ.",
    "seasonAlert_en": "Combine with Bidar Fort exploration.",
    "seasonAlert_kn": "ಬೀದರ್ ಕೋಟೆಯ ಭೇಟಿಯೊಂದಿಗೆ ಒಟ್ಟಿಗೆ ಪ್ಲಾನ್ ಮಾಡಿ.",
    "crowdTip_en": "Artisans welcome curious travelers into courtyard workshops without commercial pressure.",
    "crowdTip_kn": "ಕುಶಲಕರ್ಮಿಗಳು ಪ್ರವಾಸಿಗರನ್ನು ಪ್ರೀತಿಯಿಂದ ತಮ್ಮ ಕಾರ್ಯಾಗಾರಕ್ಕೆ ಸ್ವಾಗತಿಸುತ್ತಾರೆ.",
    "lastVerified": "Verified for 2026 Season • Development Commissioner for Handicrafts",
    "artisanOrHomestay_en": "Bidri Artisans Welfare Association Workshops",
    "artisanOrHomestay_kn": "ಬಿದ್ರಿ ಕುಶಲಕರ್ಮಿಗಳ ಕ್ಷೇಮಾಭಿವೃದ್ಧಿ ಸಂಘ"
  },
  {
    "id": "mysuru-silk",
    "name_en": "Mysore Silk Weaving & Sandalwood Heritage",
    "name_kn": "ಮೈಸೂರು ಸಿಲ್ಕ್ ಮತ್ತು ಶ್ರೀಗಂಧ ಪರಂಪರೆ",
    "region": "Mysuru",
    "categories": [
      "Artisans & Crafts",
      "Heritage",
      "Photography"
    ],
    "lat": 12.308,
    "lng": 76.643,
    "avgDurationHours": 2,
    "entryFeeINR": 50,
    "bestMonths": [
      1,
      2,
      3,
      8,
      9,
      10,
      11,
      12
    ],
    "popularity": 5,
    "desc_en": "Established by Maharaja Nalwadi Krishnaraja Wadiyar in 1912. Experience the century-old KSIC factory weaving pure mulberry silk with 100% pure gold zari threads, alongside sandalwood oil extraction.",
    "desc_kn": "1912 ರಲ್ಲಿ ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್ ಸ್ಥಾಪಿಸಿದ ಕೆಎಸ್‌ಐಸಿ ಸಿಲ್ಕ್ ಫ್ಯಾಕ್ಟರಿ. ಶುದ್ಧ ಚಿನ್ನದ ಜರಿಯಿಂದ ನೇಯ್ದ ಮೈಸೂರು ರೇಷ್ಮೆ ಮತ್ತು ಶ್ರೀಗಂಧದ ಪರಿಮಳ.",
    "dish_en": "Mylari Dosa & Filter Coffee",
    "dish_kn": "ಮೈಲಾರಿ ಬೆಣ್ಣೆ ದೋಸೆ ಮತ್ತು ಫಿಲ್ಟರ್ ಕಾಫಿ",
    "tip_en": "Every genuine Mysore Silk saree features a unique embroidered security code.",
    "tip_kn": "ಪ್ರತಿ ಅಸಲಿ ಮೈಸೂರು ಸಿಲ್ಕ್ ಸೀರೆಯಲ್ಲೂ ಪ್ರತ್ಯೇಕ ಭದ್ರತಾ ಕೋಡ್ ಇರುತ್ತದೆ.",
    "seasonAlert_en": "Air-conditioned indoor heritage showroom and active weaving floor.",
    "seasonAlert_kn": "ವರ್ಷಪೂರ್ತಿ ಭೇಟಿ ನೀಡಲು ಸುಸಜ್ಜಿತ ಪರಂಪರೆ ಕೇಂದ್ರ.",
    "crowdTip_en": "Visit on weekday mornings to watch the Jacquard loom shuttles at maximum rhythm.",
    "crowdTip_kn": "ವಾರದ ದಿನಗಳಲ್ಲಿ ಬೆಳಗ್ಗೆ ಭೇಟಿ ನೀಡಿದರೆ ನೇಕಾರರ ಚಟುವಟಿಕೆಗಳನ್ನು ಆನಂದಿಸಬಹುದು.",
    "lastVerified": "Verified for 2026 Season • KSIC Govt of Karnataka",
    "artisanOrHomestay_en": "KSIC Silk Weaving Factory & Govt Sandalwood Depot",
    "artisanOrHomestay_kn": "ಕೆಎಸ್‌ಐಸಿ ರೇಷ್ಮೆ ಕಾರ್ಖಾನೆ ಮತ್ತು ಶ್ರೀಗಂಧದ ಡಿಪೋ"
  },
  {
    "id": "kinnal-crafts",
    "name_en": "Kinnal Wooden Toys & Chitragars Heritage",
    "name_kn": "ಕಿನ್ನಾಳ ಕಲೆ ಮತ್ತು ಚಿತ್ರಗಾರರ ಪರಂಪರೆ",
    "region": "Hampi",
    "categories": [
      "Artisans & Crafts",
      "Heritage",
      "Photography"
    ],
    "lat": 15.362,
    "lng": 76.082,
    "avgDurationHours": 2,
    "entryFeeINR": 0,
    "bestMonths": [
      1,
      2,
      10,
      11,
      12
    ],
    "popularity": 4,
    "desc_en": "A 500-year-old Vijayanagara royal craft tradition in Koppal. Intricately carved wooden figurines and religious idols painted with natural tamarind-paste lacquer by traditional Chitragar artists.",
    "desc_kn": "ಕೊಪ್ಪಳದ 500 ವರ್ಷಗಳ ವಿಜಯನಗರ ಕಾಲದ ರಾಜಮನೆತನದ ಕಲೆ. ಹುಣಸೆ ಬೀಜದ ಅಂಟು ಮತ್ತು ಮರದಿಂದ ತಯಾರಿಸಿದ ಜಿ.ಐ. ಟ್ಯಾಗ್ ಕಿನ್ನಾಳ ಗೊಂಬೆಗಳು.",
    "dish_en": "North Karnataka Shengad Holige",
    "dish_kn": "ಉತ್ತರ ಕರ್ನಾಟಕದ ಶೇಂಗಾ ಹೋಳಿಗೆ",
    "tip_en": "Located just 40 km from Hampi; a must-stop for lovers of authentic Indian folk art.",
    "tip_kn": "ಹಂಪಿಯಿಂದ ಕೇವಲ 40 ಕಿಮೀ ದೂರದಲ್ಲಿದೆ; ಜಾನಪದ ಕಲಾಪ್ರಿಯರಿಗೆ ಅತ್ಯುತ್ತಮ ಅನುಭವ.",
    "seasonAlert_en": "Winter months provide pleasant countryside driving from Hospete.",
    "seasonAlert_kn": "ಚಳಿಗಾಲದಲ್ಲಿ ಹೊಸಪೇಟೆಯಿಂದ ಸುಂದರ ಗ್ರಾಮೀಣ ಪ್ರಯಾಣ.",
    "crowdTip_en": "Chitragar families welcome visitors to paint your own miniature Kinnal keepsake.",
    "crowdTip_kn": "ಚಿತ್ರಗಾರ ಕುಟುಂಬಗಳು ಪ್ರವಾಸಿಗರಿಗೆ ಸಣ್ಣ ಗೊಂಬೆಗಳಿಗೆ ಬಣ್ಣ ಹಚ್ಚುವ ಅವಕಾಶ ನೀಡುತ್ತವೆ.",
    "lastVerified": "Verified for 2026 Season • Koppal District Handicrafts Cell",
    "artisanOrHomestay_en": "Kinnal Traditional Chitragar Cooperative",
    "artisanOrHomestay_kn": "ಕಿನ್ನಾಳ ಸಾಂಪ್ರದಾಯಿಕ ಚಿತ್ರಗಾರರ ಸಂಘ"
  }
];

export const REGION_COSTS: Record<Region, RegionCost> = {
  "Bengaluru": {
    "stay": [
      1500,
      3200,
      7500
    ],
    "food": [
      600,
      1100,
      2200
    ],
    "transportPerKm": [
      15,
      22,
      45
    ]
  },
  "Mysuru": {
    "stay": [
      1200,
      2800,
      6000
    ],
    "food": [
      500,
      950,
      1900
    ],
    "transportPerKm": [
      14,
      20,
      40
    ]
  },
  "Mangaluru": {
    "stay": [
      1300,
      2900,
      6200
    ],
    "food": [
      550,
      1000,
      2000
    ],
    "transportPerKm": [
      14,
      21,
      42
    ]
  },
  "Uttara Kannada": {
    "stay": [
      1200,
      2600,
      5800
    ],
    "food": [
      450,
      850,
      1750
    ],
    "transportPerKm": [
      15,
      22,
      45
    ]
  },
  "Chikkamagaluru": {
    "stay": [
      1500,
      3400,
      7200
    ],
    "food": [
      550,
      1000,
      2000
    ],
    "transportPerKm": [
      16,
      24,
      48
    ]
  },
  "Hassan": {
    "stay": [
      1200,
      2600,
      5400
    ],
    "food": [
      450,
      850,
      1700
    ],
    "transportPerKm": [
      14,
      20,
      40
    ]
  },
  "Shivamogga": {
    "stay": [
      1100,
      2400,
      5000
    ],
    "food": [
      450,
      800,
      1600
    ],
    "transportPerKm": [
      14,
      20,
      42
    ]
  },
  "Coorg": {
    "stay": [
      1800,
      3800,
      8500
    ],
    "food": [
      650,
      1200,
      2500
    ],
    "transportPerKm": [
      16,
      25,
      50
    ]
  },
  "Hampi": {
    "stay": [
      1200,
      2700,
      5800
    ],
    "food": [
      500,
      900,
      1800
    ],
    "transportPerKm": [
      14,
      21,
      42
    ]
  },
  "Hubballi-Dharwad": {
    "stay": [
      1100,
      2400,
      5000
    ],
    "food": [
      450,
      800,
      1600
    ],
    "transportPerKm": [
      13,
      19,
      38
    ]
  },
  "Badami": {
    "stay": [
      1100,
      2300,
      4800
    ],
    "food": [
      450,
      750,
      1500
    ],
    "transportPerKm": [
      13,
      19,
      38
    ]
  },
  "Vijayapura": {
    "stay": [
      1000,
      2200,
      4600
    ],
    "food": [
      400,
      750,
      1500
    ],
    "transportPerKm": [
      13,
      19,
      38
    ]
  },
  "Kalaburagi": {
    "stay": [
      1000,
      2200,
      4500
    ],
    "food": [
      420,
      780,
      1550
    ],
    "transportPerKm": [
      13,
      19,
      38
    ]
  },
  "Chitradurga": {
    "stay": [
      950,
      2000,
      4200
    ],
    "food": [
      400,
      700,
      1400
    ],
    "transportPerKm": [
      12,
      18,
      36
    ]
  },
  "Belagavi": {
    "stay": [
      1100,
      2400,
      5000
    ],
    "food": [
      450,
      850,
      1700
    ],
    "transportPerKm": [
      13,
      19,
      38
    ]
  }
};

export const DISHES_BY_REGION: Record<Region, Dish[]> = {
  "Bengaluru": [
    {
      "id": "masala-dosa",
      "name_en": "Masala Dosa",
      "name_kn": "ಮಸಾಲೆ ದೋಸೆ",
      "desc_en": "Crisp fermented rice crepe folded around spiced potato, served with coconut chutney and sambar.",
      "desc_kn": "ಆಲೂಗಡ್ಡೆ ಪಲ್ಯ ತುಂಬಿದ ಗರಿಗರಿಯಾದ ದೋಸೆ; ತೆಂಗಿನ ಚಟ್ನಿ ಮತ್ತು ಬಿಸಿ ಸಾಂಬಾರ್ ಜೊತೆ.",
      "region": "Bengaluru",
      "diet": "Veg"
    },
    {
      "id": "benne-dose",
      "name_en": "Benne Dose",
      "name_kn": "ಬೆಣ್ಣೆ ದೋಸೆ",
      "desc_en": "Thick, soft dosa toasted in generous fresh butter until edges turn golden.",
      "desc_kn": "ತಾಜಾ ಬೆಣ್ಣೆಯಲ್ಲಿ ಬೇಯಿಸಿದ ದಪ್ಪನೆಯ ಘಮಘಮಿಸುವ ದೋಸೆ.",
      "region": "Bengaluru",
      "diet": "Veg"
    }
  ],
  "Mysuru": [
    {
      "id": "mysore-pak",
      "name_en": "Mysore Pak",
      "name_kn": "ಮೈಸೂರು ಪಾಕ್",
      "desc_en": "Royal ghee-rich sweet of gram flour and sugar, born in the Mysuru palace kitchens.",
      "desc_kn": "ಮೈಸೂರು ಅರಮನೆಯಲ್ಲಿ ಜನಿಸಿದ ತುಪ್ಪದ ರಾಯಲ್ ಸಿಹಿತಿಂಡಿ.",
      "region": "Mysuru",
      "diet": "Veg"
    },
    {
      "id": "mylari-dosa",
      "name_en": "Mylari Dosa",
      "name_kn": "ಮೈಲಾರಿ ದೋಸೆ",
      "desc_en": "Cloud-soft textured dosa served with signature butter dollop and onion sagu.",
      "desc_kn": "ಮೈಸೂರಿನ ಪ್ರಸಿದ್ಧ ಹತ್ತಿಯಂತಹ ಮೃದು ದೋಸೆ ಮತ್ತು ಸಾಗು.",
      "region": "Mysuru",
      "diet": "Veg"
    }
  ],
  "Mangaluru": [
    {
      "id": "neer-dosa",
      "name_en": "Neer Dosa",
      "name_kn": "ನೀರ್ ದೋಸೆ",
      "desc_en": "Lace-thin delicate rice crepes served with coconut chutney or coastal curry.",
      "desc_kn": "ಕರಾವಳಿಯ ಮೃದುವಾದ ಜರೀ ಅಕ್ಕಿ ದೋಸೆ; ತೆಂಗಿನ ಚಟ್ನಿಯೊಂದಿಗೆ.",
      "region": "Mangaluru",
      "diet": "Veg"
    },
    {
      "id": "mangalore-buns",
      "name_en": "Mangalore Buns",
      "name_kn": "ಮಂಗಳೂರು ಬನ್ಸ್",
      "desc_en": "Mildly sweet, fluffy banana-dough puris fried golden, paired with spicy chutney.",
      "desc_kn": "ಬಾಳೆಹಣ್ಣಿನ ಮೃದುವಾದ ಸಿಹಿ ಪೂರಿಗಳು ಮತ್ತು ಖಾರವಾದ ಚಟ್ನಿ.",
      "region": "Mangaluru",
      "diet": "Veg"
    }
  ],
  "Uttara Kannada": [
    {
      "id": "kotte-kadubu",
      "name_en": "Kotte Kadubu",
      "name_kn": "ಕೊಟ್ಟೆ ಕಡುಬು",
      "desc_en": "Steamed rice cakes cooked inside aromatic jackfruit leaf woven baskets.",
      "desc_kn": "ಹಲಸಿನ ಎಲೆಯ ಬುಟ್ಟಿಯಲ್ಲಿ ಹಬೆಯಲ್ಲಿ ಬೇಯಿಸಿದ ಸುವಾಸನೆಯ ಕಡುಬು.",
      "region": "Uttara Kannada",
      "diet": "Veg"
    },
    {
      "id": "todadevu",
      "name_en": "Todadevu Sweet Crepe",
      "name_kn": "ತೊಡದೇವು",
      "desc_en": "Paper-thin sweet jaggery-infused sugarcane crepe, a culinary jewel of Sirsi.",
      "desc_kn": "ಶಿರಸಿಯ ಕಬ್ಬಿನ ಹಾಲಿನಿಂದ ಮಾಡಿದ ಕಾಗದದಂತಹ ತೆಳುವಾದ ಸಾಂಪ್ರದಾಯಿಕ ಸಿಹಿ.",
      "region": "Uttara Kannada",
      "diet": "Veg"
    }
  ],
  "Chikkamagaluru": [
    {
      "id": "ragi-mudde",
      "name_en": "Malnad Ragi Mudde",
      "name_kn": "ಮಲೆನಾಡಿನ ರಾಗಿ ಮುದ್ದೆ",
      "desc_en": "Steamed finger-millet ball, nutritious staple eaten with bas saaru, ghee, and greens.",
      "desc_kn": "ಬಸ್ಸಾರು, ತುಪ್ಪ ಮತ್ತು ಸೊಪ್ಪಿನೊಂದಿಗೆ ಸವಿಯುವ ಪೌಷ್ಟಿಕ ರಾಗಿ ಮುದ್ದೆ.",
      "region": "Chikkamagaluru",
      "diet": "Veg"
    },
    {
      "id": "malnad-kaapi",
      "name_en": "Estate Filter Coffee",
      "name_kn": "ತೋಟದ ಫಿಲ್ಟರ್ ಕಾಫಿ",
      "desc_en": "Freshly brewed peaberry coffee decoction from local high-altitude shade plantations.",
      "desc_kn": "ಸ್ಥಳೀಯ ತೋಟಗಳ ತಾಜಾ ಕಾಫಿ ಬೀಜಗಳಿಂದ ತಯಾರಿಸಿದ ಘಮಘಮಿಸುವ ಫಿಲ್ಟರ್ ಕಾಫಿ.",
      "region": "Chikkamagaluru",
      "diet": "Veg"
    }
  ],
  "Hassan": [
    {
      "id": "hassan-akki-roti",
      "name_en": "Akki Roti with Kaalu Saaru",
      "name_kn": "ಅಕ್ಕಿ ರೊಟ್ಟಿ ಮತ್ತು ಕಾಳು ಸಾರು",
      "desc_en": "Crisp hand-flattened rice flour bread with dill leaves, onions, and sprouted bean curry.",
      "desc_kn": "ಸಬ್ಬಸಿಗೆ ಸೊಪ್ಪು, ಈರುಳ್ಳಿ ಬೆರೆಸಿದ ಅಕ್ಕಿ ರೊಟ್ಟಿ ಮತ್ತು ಮೊಳಕೆ ಕಾಳು ಸಾರು.",
      "region": "Hassan",
      "diet": "Veg"
    }
  ],
  "Shivamogga": [
    {
      "id": "halasina-kadubu",
      "name_en": "Jackfruit Kadubu",
      "name_kn": "ಹಲಸಿನ ಹಣ್ಣಿನ ಕಡುಬು",
      "desc_en": "Sweet ripe jackfruit and broken rice steamed in teak leaves with pure ghee.",
      "desc_kn": "ಹಲಸಿನ ಹಣ್ಣಿನ ತಿರುಳಿನಿಂದ ಮಾಡಿದ ಸಾಂಪ್ರದಾಯಿಕ ಮಲೆನಾಡು ಸಿಹಿ ಕಡುಬು.",
      "region": "Shivamogga",
      "diet": "Veg"
    }
  ],
  "Coorg": [
    {
      "id": "kadambuttu",
      "name_en": "Kadambuttu (Steamed Rice Dumplings)",
      "name_kn": "ಕದಂಬುಟ್ಟು",
      "desc_en": "Cracked rice steamed spheres laced with cardamom, served with wild mango or spicy curry.",
      "desc_kn": "ಏಲಕ್ಕಿ ಸುವಾಸನೆಯ ಹಬೆಯುಂಡೆಗಳು ಮತ್ತು ಕಾಡು ಮಾವಿನಕಾಯಿ ಸಾರು.",
      "region": "Coorg",
      "diet": "Veg"
    },
    {
      "id": "kodava-pandi-curry",
      "name_en": "Kodava Pandi Curry",
      "name_kn": "ಕೊಡವ ಪಂದಿ ಕರಿ",
      "desc_en": "Traditional dark pork curry enriched with kachampuli fruit vinegar and crushed pepper.",
      "desc_kn": "ಕಚಂಪುಳಿ ಹುಳಿ ಮತ್ತು ಕರಿಮೆಣಸು ಮಿಶ್ರಿತ ಪ್ರಸಿದ್ಧ ಕೊಡವ ಕರಿ.",
      "region": "Coorg",
      "diet": "Non-Veg"
    }
  ],
  "Hampi": [
    {
      "id": "jolada-rotti",
      "name_en": "Jolada Rotti Oota",
      "name_kn": "ಜೋಳದ ರೊಟ್ಟಿ ಊಟ",
      "desc_en": "Jowar flatbread with spicy stuffed brinjal (enne badnekai), shengad chutney, and butter.",
      "desc_kn": "ಎಣ್ಣೆ ಬದನೆಕಾಯಿ, ಶೇಂಗಾ ಚಟ್ನಿ ಪುಡಿ ಮತ್ತು ಬೆಣ್ಣೆಯೊಂದಿಗೆ ಜೋಳದ ರೊಟ್ಟಿ.",
      "region": "Hampi",
      "diet": "Veg"
    }
  ],
  "Hubballi-Dharwad": [
    {
      "id": "dharwad-pedha",
      "name_en": "Babusingh Dharwad Pedha",
      "name_kn": "ಧಾರವಾಡ ಪೇಡಾ",
      "desc_en": "Slow-caramelised milk khoa sweet rolled in castor sugar, a century-old pride of Dharwad.",
      "desc_kn": "ಧಾರವಾಡದ ಹೆಮ್ಮೆಯ ಸಾಂಪ್ರದಾಯಿಕ ಕಂದು ಬಣ್ಣದ ಹಾಲು ಪೇಡಾ.",
      "region": "Hubballi-Dharwad",
      "diet": "Veg"
    },
    {
      "id": "hubballi-girmit",
      "name_en": "Hubballi Girmit & Mirchi",
      "name_kn": "ಹುಬ್ಬಳ್ಳಿ ಗಿರ್ಮಿಟ್ ಮತ್ತು ಮಿರ್ಚಿ",
      "desc_en": "Crisp puffed rice tossed in spicy onion-chilli sauce, served with hot chilli fritters.",
      "desc_kn": "ಉತ್ತರ ಕರ್ನಾಟಕದ ಜನಪ್ರಿಯ ಸಂಜೆ ತಿಂಡಿ ಗಿರ್ಮಿಟ್ ಮತ್ತು ಗರಿಗರಿ ಮಿರ್ಚಿ ಬಜ್ಜಿ.",
      "region": "Hubballi-Dharwad",
      "diet": "Veg"
    }
  ],
  "Badami": [
    {
      "id": "ilkal-shenga-rotti",
      "name_en": "Shengad Chutney Rotti",
      "name_kn": "ಶೇಂಗಾ ಚಟ್ನಿ ರೊಟ್ಟಿ",
      "desc_en": "Thin sun-baked jowar crisp rotti paired with dry peanut garlic condiment.",
      "desc_kn": "ಗರಿಗರಿ ಕಡಕ್ ರೊಟ್ಟಿ ಮತ್ತು ಖಾರದ ಶೇಂಗಾ ಚಟ್ನಿ ಪುಡಿ.",
      "region": "Badami",
      "diet": "Veg"
    }
  ],
  "Vijayapura": [
    {
      "id": "ennegayi-rotti",
      "name_en": "Vijayapura Ennegayi Rotti",
      "name_kn": "ವಿಜಯಪುರ ಎಣ್ಣೆಗಾಯಿ ರೊಟ್ಟಿ",
      "desc_en": "Spiced baby brinjals simmered in peanut-sesame gravy with hot jowar bread.",
      "desc_kn": "ಘಮಘಮಿಸುವ ಎಣ್ಣೆಗಾಯಿ ಪಲ್ಯ ಮತ್ತು ಬಿಸಿ ಜೋಳದ ರೊಟ್ಟಿ.",
      "region": "Vijayapura",
      "diet": "Veg"
    }
  ],
  "Kalaburagi": [
    {
      "id": "kalaburagi-tahari",
      "name_en": "Kalaburagi Tahari",
      "name_kn": "ಕಲಬುರಗಿ ತಹಾರಿ",
      "desc_en": "Fragrant spiced rice layered with tender meat, cooked in traditional copper handi.",
      "desc_kn": "ಕಲಬುರಗಿಯ ಸಾಂಪ್ರದಾಯಿಕ ಸುವಾಸನೆಯ ತಹಾರಿ.",
      "region": "Kalaburagi",
      "diet": "Non-Veg"
    }
  ],
  "Chitradurga": [
    {
      "id": "davanagere-benne-dosa",
      "name_en": "Davanagere Benne Dosa",
      "name_kn": "ದಾವಣಗೆರೆ ಬೆಣ್ಣೆ ದೋಸೆ",
      "desc_en": "Iconic porous golden crispy dosa smeared with dollops of white farm butter.",
      "desc_kn": "ಬಿಳಿ ಬೆಣ್ಣೆ, ಆಲೂಗಡ್ಡೆ ಪಲ್ಯ ಮತ್ತು ತೆಂಗಿನ ಚಟ್ನಿ ಜೊತೆ ದಾವಣಗೆರೆ ಬೆಣ್ಣೆ ದೋಸೆ.",
      "region": "Chitradurga",
      "diet": "Veg"
    }
  ],
  "Belagavi": [
    {
      "id": "belagavi-kunda",
      "name_en": "Belagavi Kunda",
      "name_kn": "ಬೆಳಗಾವಿ ಕುಂಡ",
      "desc_en": "Slow-roasted milk and sugar halwa cooked over open firewood embers.",
      "desc_kn": "ಬೆಳಗಾವಿಯ ಪ್ರಸಿದ್ಧ ಕರಗಿಸಿದ ಹಾಲಿನ ಸಾಂಪ್ರದಾಯಿಕ ಕುಂಡ ಸಿಹಿ.",
      "region": "Belagavi",
      "diet": "Veg"
    }
  ]
};

export const FESTIVALS: Festival[] = [
  {
    "id": "mysuru-dasara",
    "name_en": "Mysuru Dasara (Nada Habba)",
    "name_kn": "ಮೈಸೂರು ದಸರಾ (ನಾಡಹಬ್ಬ)",
    "region": "Mysuru",
    "months": [
      9,
      10
    ],
    "desc_en": "Royal festival celebrated for 400+ years since the Vijayanagara kings. Features the famous 750-kg Golden Howdah Jumboo Savari elephant procession and 100,000 bulbs illuminating Mysuru Palace.",
    "desc_kn": "ವಿಜಯನಗರ ಅರಸರ ಕಾಲದಿಂದ ನಡೆದುಬಂದ 400 ವರ್ಷಗಳ ಐತಿಹಾಸಿಕ ನಾಡಹಬ್ಬ. ಚಿನ್ನದ ಅಂಬಾರಿಯ ಜಂಬೂ ಸವಾರಿ ಮತ್ತು ಅರಮನೆಯ ಭವ್ಯ ದೀಪಾಲಂಕಾರ.",
    "timingNote_en": "Concluded for Oct 2026; next grand edition begins Oct 2027. Last verified: Karnataka Tourism.",
    "timingNote_kn": "ಅಕ್ಟೋಬರ್ 2026 ಕ್ಕೆ ಮುಕ್ತಾಯವಾಗಿದೆ; ಮುಂದಿನ ಸೀಸನ್ ಅಕ್ಟೋಬರ್ 2027 ಕ್ಕೆ ಆರಂಭ."
  },
  {
    "id": "kambala",
    "name_en": "Coastal Kambala Buffalo Race",
    "name_kn": "ಕರಾವಳಿ ಕಂಬಳ",
    "region": "Mangaluru",
    "months": [
      11,
      12,
      1,
      2,
      3
    ],
    "desc_en": "Thrilling traditional wet-field buffalo sprint through flooded paddy tracks across Dakshina Kannada and Udupi. Celebrates agrarian heritage with folk drums and electrifying cheers.",
    "desc_kn": "ನೀರು ತುಂಬಿದ ಗದ್ದೆಯಲ್ಲಿ ನಡೆಯುವ ಸಾಂಪ್ರದಾಯಿಕ ಕೋಣಗಳ ವೇಗದ ಓಟ. ಕರಾವಳಿ ಕರ್ನಾಟಕದ ಜಾನಪದ ಸಂಸ್ಕೃತಿಯ ಪ್ರತೀಕ.",
    "timingNote_en": "Active Season is LIVE NOW (Nov–March weekends)! Verified for 2026 Kambala Samithi.",
    "timingNote_kn": "ಪ್ರಸ್ತುತ ಸೀಸನ್ ಚಾಲ್ತಿಯಲ್ಲಿದೆ (ನವೆಂಬರ್-ಮಾರ್ಚ್ ವಾರಾಂತ್ಯ)! ಸ್ಥಳೀಯ ಕಂಬಳ ವೇಳಾಪಟ್ಟಿ ಪರಿಶೀಲಿಸಿ."
  },
  {
    "id": "hampi-utsav",
    "name_en": "Hampi Utsav (Vijaya Utsava)",
    "name_kn": "ಹಂಪಿ ಉತ್ಸವ (ವಿಜಯ ಉತ್ಸವ)",
    "region": "Hampi",
    "months": [
      1,
      2
    ],
    "desc_en": "Grand celebration of Vijayanagara empire glory. Classical music maestros, Janapada dance troupes, shadow puppetry, and night-lit ruins by the Tungabhadra river.",
    "desc_kn": "ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ವೈಭವದ ಆಚರಣೆ. ಶಾಸ್ತ್ರೀಯ ಸಂಗೀತ, ಜಾನಪದ ನೃತ್ಯ ಮತ್ತು ರಾತ್ರಿಯ ಬೆಳಕಿನಲ್ಲಿ ಮಿರುಗುವ ಸ್ಮಾರಕಗಳು.",
    "timingNote_en": "Scheduled every January/February. Verified for 2026 Season • Vijayanagara District Administration.",
    "timingNote_kn": "ಜನವರಿ/ಫೆಬ್ರವರಿ ತಿಂಗಳಲ್ಲಿ ಆಯೋಜನೆ. ಅಧಿಕೃತ ದಿನಾಂಕಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ."
  },
  {
    "id": "pattadakal-utsav",
    "name_en": "Pattadakal Dance Festival",
    "name_kn": "ಪಟ್ಟದಕಲ್ಲು ನೃತ್ಯೋತ್ಸವ",
    "region": "Badami",
    "months": [
      1,
      2
    ],
    "desc_en": "A prestigious national classical dance festival staged against the backdrop of 8th-century UNESCO World Heritage stone temple facades.",
    "desc_kn": "ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣವಾದ ಪಟ್ಟದಕಲ್ಲಿನ 8ನೇ ಶತಮಾನದ ದೇವಾಲಯಗಳ ಹಿನ್ನೆಲೆಯಲ್ಲಿ ನಡೆಯುವ ಶಾಸ್ತ್ರೀಯ ನೃತ್ಯೋತ್ಸವ.",
    "timingNote_en": "Annual winter cultural festival. Verified: Kannada & Culture Dept 2026.",
    "timingNote_kn": "ವಾರ್ಷಿಕ ಚಳಿಗಾಲದ ನೃತ್ಯೋತ್ಸವ. ಅಧಿಕೃತವಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ."
  },
  {
    "id": "karaga",
    "name_en": "Bengaluru Karaga Shaktyotsava",
    "name_kn": "ಬೆಂಗಳೂರು ಕರಗ ಶಕ್ತ್ಯೋತ್ಸವ",
    "region": "Bengaluru",
    "months": [
      3,
      4
    ],
    "desc_en": "Bengaluru's oldest cultural festival celebrating Draupadi. A floral earthen pot is balanced on the priest's head in a dramatic midnight barefoot procession through the historic Pete area.",
    "desc_kn": "ಬೆಂಗಳೂರಿನ ಅತ್ಯಂತ ಪ್ರಾಚೀನ ಉತ್ಸವ. ಹೂವಿನ ಕರಗವನ್ನು ಹೊತ್ತು ಹಳೆ ಪೇಟೆಯ ಬೀದಿಗಳಲ್ಲಿ ಸಾಗುವ ಅದ್ಭುತ ಮಧ್ಯರಾತ್ರಿಯ ಮೆರವಣಿಗೆ.",
    "timingNote_en": "Chaitra Poornima (March/April). Verified: Dharmaraya Swamy Temple Trust 2026.",
    "timingNote_kn": "ಚೈತ್ರ ಪೂರ್ಣಿಮೆಯಂದು ಆಚರಣೆ. ಅಧಿಕೃತವಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ."
  },
  {
    "id": "gokarna-shivaratri",
    "name_en": "Gokarna Mahashivaratri & Car Festival",
    "name_kn": "ಗೋಕರ್ಣ ಮಹಾಶಿವರಾತ್ರಿ ಮಹಾರಥೋತ್ಸವ",
    "region": "Uttara Kannada",
    "months": [
      2,
      3
    ],
    "desc_en": "Huge ceremonial wooden chariot pulled along temple corridors to Main Beach by thousands of pilgrims celebrating Lord Mahabaleshwar's Atmalinga.",
    "desc_kn": "ಮಹಾಬಲೇಶ್ವರನ ಆತ್ಮಾಲಿಂಗ ಸನ್ನಿಧಿಯಲ್ಲಿ ಸಮುದ್ರ ತೀರದವರೆಗೆ ನಡೆಯುವ ಬೃಹತ್ ಮರದ ರಥೋತ್ಸವ.",
    "timingNote_en": "February/March lunar cycle. Verified for 2026 • Gokarna Temple Administration.",
    "timingNote_kn": "ಫೆಬ್ರವರಿ/ಮಾರ್ಚ್‌ನಲ್ಲಿ ಆಚರಣೆ. ಪರಿಶೀಲಿಸಲಾಗಿದೆ."
  },
  {
    "id": "ugadi",
    "name_en": "Ugadi (Kannada New Year)",
    "name_kn": "ಯುಗಾದಿ ಹಬ್ಬ",
    "region": "All",
    "months": [
      3,
      4
    ],
    "desc_en": "The auspicious commencement of the Kannada calendar, celebrated with Bevu-Bella (bitter neem and sweet jaggery symbolising life's dualities), mango toranas, and family feasts.",
    "desc_kn": "ಕನ್ನಡ ಹೊಸ ವರ್ಷದ ಆರಂಭ. ಬೇವು-ಬೆಲ್ಲ, ಮಾವಿನ ತೋರಣ ಮತ್ತು ಹೋಳಿಗೆ ಊಟದೊಂದಿಗೆ ಇಡೀ ರಾಜ್ಯದಲ್ಲಿ ಸಂಭ್ರಮದ ಆಚರಣೆ.",
    "timingNote_en": "Spring equinox celebration across Karnataka. Verified: 2026 Panchanga.",
    "timingNote_kn": "ಕರ್ನಾಟಕದಾದ್ಯಂತ ಸಂಭ್ರಮದ ನೂತನ ಸಂವತ್ಸರ."
  }
];

export const PHRASES: Phrase[] = [
  {
    "id": "hello",
    "kn": "ನಮಸ್ಕಾರ",
    "translit": "Namaskara",
    "en": "Hello / Greetings",
    "category": "greetings"
  },
  {
    "id": "thanks",
    "kn": "ಧನ್ಯವಾದಗಳು",
    "translit": "Dhanyavadagalu",
    "en": "Thank you very much",
    "category": "greetings"
  },
  {
    "id": "howareyou",
    "kn": "ಹೇಗಿದ್ದೀರಾ?",
    "translit": "Hegiddira?",
    "en": "How are you?",
    "category": "greetings"
  },
  {
    "id": "iamfine",
    "kn": "ನಾನು ಆರಾಮಾಗಿದ್ದೇನೆ",
    "translit": "Naanu aaramagiddene",
    "en": "I am doing well",
    "category": "greetings"
  },
  {
    "id": "busstand",
    "kn": "ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?",
    "translit": "Bus nildana ellide?",
    "en": "Where is the bus stand?",
    "category": "directions"
  },
  {
    "id": "railway",
    "kn": "ರೈಲ್ವೆ ಸ್ಟೇಷನ್‌ಗೆ ಹೇಗೆ ಹೋಗಬೇಕು?",
    "translit": "Railway station-ge hege hogabeku?",
    "en": "How do I get to the railway station?",
    "category": "directions"
  },
  {
    "id": "stophere",
    "kn": "ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ",
    "translit": "Illi nillisi",
    "en": "Please stop here",
    "category": "directions"
  },
  {
    "id": "gostraight",
    "kn": "ನೇರವಾಗಿ ಹೋಗಿ",
    "translit": "Neravagi hogi",
    "en": "Go straight ahead",
    "category": "directions"
  },
  {
    "id": "vegfood",
    "kn": "ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಊಟ ಸಿಗುತ್ತಾ?",
    "translit": "Shuddha sasyaahaari oota sigutta?",
    "en": "Is pure vegetarian food available?",
    "category": "food"
  },
  {
    "id": "water",
    "kn": "ಕುಡಿಯುವ ನೀರು ಕೊಡಿ",
    "translit": "Kudiyuva neeru kodi",
    "en": "Please give drinking water",
    "category": "food"
  },
  {
    "id": "lessspicy",
    "kn": "ಖಾರ ಕಡಿಮೆ ಮಾಡಿ",
    "translit": "Khaara kadime maadi",
    "en": "Make it less spicy please",
    "category": "food"
  },
  {
    "id": "bill",
    "kn": "ಬಿಲ್ ಎಷ್ಟು ಆಯಿತು?",
    "translit": "Bill eshtu aayitu?",
    "en": "What is the bill amount?",
    "category": "food"
  },
  {
    "id": "price",
    "kn": "ಇದರ ಬೆಲೆ ಎಷ್ಟು?",
    "translit": "Idara bele eshtu?",
    "en": "How much is this?",
    "category": "shopping"
  },
  {
    "id": "discount",
    "kn": "ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ",
    "translit": "Swalpa kadime maadi",
    "en": "Please reduce the price a little",
    "category": "shopping"
  },
  {
    "id": "upi",
    "kn": "ಚಿಲ್ಲರೆ ಇಲ್ಲ, ಯುಪಿಐ ಇದೆಯಾ?",
    "translit": "Chillare illa, UPI ideya?",
    "en": "I don't have change, do you take UPI?",
    "category": "shopping"
  },
  {
    "id": "authentic",
    "kn": "ಇದು ಅಸಲಿ ಕೈಮಗ್ಗವೇ?",
    "translit": "Idu asali kaimaggave?",
    "en": "Is this authentic handloom / handmade?",
    "category": "shopping"
  },
  {
    "id": "help",
    "kn": "ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಹಾಯ ಮಾಡಿ",
    "translit": "Dayavittu swalpa sahaaya maadi",
    "en": "Please help me a little",
    "category": "emergency"
  },
  {
    "id": "hospital",
    "kn": "ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?",
    "translit": "Aaspatre ellide?",
    "en": "Where is the nearest hospital?",
    "category": "emergency"
  },
  {
    "id": "lostway",
    "kn": "ನನಗೆ ದಾರಿ ಗೊತ್ತಿಲ್ಲ",
    "translit": "Nanage daari gottilla",
    "en": "I have lost my way",
    "category": "emergency"
  },
  {
    "id": "police",
    "kn": "ಪೊಲೀಸ್ ಠಾಣೆ ಎಲ್ಲಿದೆ?",
    "translit": "Police thaane ellide?",
    "en": "Where is the police station?",
    "category": "emergency"
  },
  {
    "id": "learnkannada",
    "kn": "ಕನ್ನಡ ಸ್ವಲ್ಪ ಬರುತ್ತೆ",
    "translit": "Kannada swalpa barutte",
    "en": "I speak a little Kannada",
    "category": "culture"
  },
  {
    "id": "nice",
    "kn": "ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ!",
    "translit": "Tumba chennagide!",
    "en": "It is wonderful!",
    "category": "culture"
  },
  {
    "id": "seeagain",
    "kn": "ಮತ್ತೆ ಸಿಗೋಣ",
    "translit": "Matte sigona",
    "en": "See you again",
    "category": "culture"
  },
  {
    "id": "beautiful",
    "kn": "ಕರ್ನಾಟಕ ತುಂಬಾ ಸುಂದರವಾಗಿದೆ",
    "translit": "Karnataka tumba sundaravaagide",
    "en": "Karnataka is very beautiful",
    "category": "culture"
  }
];

export const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const MONTHS_KN = [
  "ಜನವರಿ",
  "ಫೆಬ್ರವರಿ",
  "ಮಾರ್ಚ್",
  "ಏಪ್ರಿಲ್",
  "ಮೇ",
  "ಜೂನ್",
  "ಜುಲೈ",
  "ಆಗಸ್ಟ್",
  "ಸೆಪ್ಟೆಂಬರ್",
  "ಅಕ್ಟೋಬರ್",
  "ನವೆಂಬರ್",
  "ಡಿಸೆಂಬರ್"
];

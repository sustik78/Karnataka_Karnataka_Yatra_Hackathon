import type { Lang } from "@/lib/types";

const KANNADA_DIGITS = ["೦", "೧", "೨", "೩", "೪", "೫", "೬", "೭", "೮", "೯"];
const NUMBER_FORMATTER = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

export function toKannadaDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (digit) => KANNADA_DIGITS[Number(digit)]);
}

export function localizeDigits(value: string | number, lang: Lang): string {
  return lang === "kn" ? toKannadaDigits(value) : String(value);
}

export function localizeTime(value: string, lang: Lang): string {
  const localized = localizeDigits(value, lang);
  if (lang === "en") return localized;
  return localized.replace(/\bAM\b/g, "ಪೂರ್ವಾಹ್ನ").replace(/\bPM\b/g, "ಅಪರಾಹ್ನ");
}

export function formatNumber(value: number, lang: Lang = "en"): string {
  const formatted = NUMBER_FORMATTER.format(Math.round(value));
  return lang === "kn" ? toKannadaDigits(formatted) : formatted;
}

export function formatINR(value: number, lang: Lang = "en"): string {
  return `₹${formatNumber(value, lang)}`;
}

export function formatDuration(hours: number, lang: Lang = "en"): string {
  const rounded = Math.round(hours * 10) / 10;
  const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  return lang === "kn" ? `${toKannadaDigits(text)} ಗಂಟೆ` : `${text} ${rounded === 1 ? "hour" : "hours"}`;
}

export function formatTime(totalMinutes: number): string {
  const normalized = ((Math.round(totalMinutes) % 1440) + 1440) % 1440;
  const hours24 = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  const suffix = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export function dayLabel(day: number, lang: Lang): string {
  return lang === "kn" ? `ದಿನ ${toKannadaDigits(day)}` : `Day ${day}`;
}

export function monthName(month: number, lang: Lang): string {
  const months =
    lang === "kn"
      ? ["ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಮಾರ್ಚ್", "ಏಪ್ರಿಲ್", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟೆಂಬರ್", "ಅಕ್ಟೋಬರ್", "ನವೆಂಬರ್", "ಡಿಸೆಂಬರ್"]
      : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[Math.max(0, Math.min(11, month - 1))];
}

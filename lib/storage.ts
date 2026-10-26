export const SAVED_PLACES_KEY = "karnataka-yatra:saved-places";
export const SAVED_PLACES_EVENT = "karnataka-yatra:saved-change";
export const ADD_TO_TRIP_EVENT = "karnataka-yatra:add-place";

export function readSavedPlaceIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    let raw = window.localStorage.getItem(SAVED_PLACES_KEY);
    if (!raw) {
      raw = window.sessionStorage.getItem(SAVED_PLACES_KEY);
    }
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((value): value is string => typeof value === "string");
  } catch {
    return [];
  }
}

export function writeSavedPlaceIds(ids: string[]): void {
  if (typeof window === "undefined") return;
  const unique = Array.from(new Set(ids));
  try {
    window.localStorage.setItem(SAVED_PLACES_KEY, JSON.stringify(unique));
  } catch {
    // Local storage can be unavailable in privacy-restricted browsers.
  }
  window.dispatchEvent(new CustomEvent(SAVED_PLACES_EVENT, { detail: { ids: unique } }));
}

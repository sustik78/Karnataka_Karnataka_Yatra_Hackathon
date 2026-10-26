"use client";

import type { CSSProperties } from "react";
import type { Day, Itinerary, Stop } from "@/lib/types";
import { REGION_NAMES_KN } from "@/data/places";
import { HERO_PHOTOS, PHOTO_CREDIT, placePhoto, regionPhoto } from "@/data/photos";
import { useLang } from "@/i18n/LangProvider";
import { formatDuration, formatINR, localizeDigits, localizeTime } from "@/lib/format";

const INK = "#14211c";
const MUTED = "#6b6a60";
const PAPER = "#f8f3e8";
const GOLD = "#a97700";
const FOREST = "#123b2f";
const LINE = "#ded4c1";
const DARK = "#071019";

function chunkStops(stops: Stop[], size: number): Stop[][] {
  const chunks: Stop[][] = [];
  for (let index = 0; index < stops.length; index += size) {
    chunks.push(stops.slice(index, index + size));
  }
  return chunks;
}

function uniquePlaces(days: Day[]) {
  const seen = new Set<string>();
  const places: Stop["place"][] = [];
  days.forEach((day) => {
    day.stops.forEach((stop) => {
      if (seen.has(stop.place.id)) return;
      seen.add(stop.place.id);
      places.push(stop.place);
    });
  });
  return places;
}

export function ItineraryPdf({ plan }: { plan: Itinerary }) {
  const { lang, t } = useLang();
  const isKn = lang === "kn";
  const bodyFont = isKn
    ? "var(--font-noto-kannada), var(--font-baloo-tamma), sans-serif"
    : "var(--font-poppins), Arial, sans-serif";
  const displayFont = isKn
    ? "var(--font-baloo-tamma), var(--font-noto-kannada), sans-serif"
    : "var(--font-playfair), Georgia, serif";

  const intro = isKn ? plan.intro_kn : plan.intro_en;
  const coverPlace = plan.days[0]?.stops[0]?.place;
  const coverFallback = coverPlace ? regionPhoto(coverPlace.region) : HERO_PHOTOS.mysuru;
  const coverPhoto = coverPlace ? placePhoto(coverPlace.id, coverFallback) : HERO_PHOTOS.mysuru;
  const dayPages = plan.days.flatMap((day) => {
    const groups = chunkStops(day.stops, 4);
    return groups.map((stops, index) => ({
      day,
      stops,
      part: index + 1,
      totalParts: groups.length
    }));
  });
  const totalPages = dayPages.length + 2;
  const regions = Array.from(new Set(plan.days.map((day) => day.region)));
  const gallery = uniquePlaces(plan.days).slice(0, 3);
  const statusLabel =
    plan.budget.status === "over"
      ? t.result.summary.over
      : plan.budget.status === "exact"
        ? t.result.summary.exact
        : t.result.summary.under;
  const budgetUsedPercent = Math.round(
    (plan.budget.total / Math.max(1, plan.prefs.budget)) * 100
  );
  const breakdown = [
    { label: t.result.budgetChart.stay, value: plan.budget.stay, color: GOLD },
    { label: t.result.budgetChart.food, value: plan.budget.food, color: "#c05b3a" },
    { label: t.result.budgetChart.transport, value: plan.budget.transport, color: FOREST },
    { label: t.result.budgetChart.entry, value: plan.budget.entry, color: "#327a91" }
  ];
  const maxBreakdown = Math.max(1, ...breakdown.map((item) => item.value));

  const pageStyle: CSSProperties = {
    width: "794px",
    height: "1123px",
    boxSizing: "border-box",
    overflow: "hidden",
    position: "relative",
    fontFamily: bodyFont,
    color: INK,
    backgroundColor: PAPER
  };

  const brand = (
    <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
      <span
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "999px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: isKn ? GOLD : FOREST,
          color: isKn ? DARK : "#f7e7ba",
          fontFamily: "var(--font-baloo-tamma), sans-serif",
          fontSize: "18px",
          fontWeight: 700
        }}
      >
        ಕ
      </span>
      <span>
        <span style={{ display: "block", fontSize: "15px", fontWeight: 700, lineHeight: 1.1 }}>
          {t.brand}
        </span>
        <span
          style={{
            display: "block",
            marginTop: "4px",
            fontSize: "8px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: MUTED
          }}
        >
          {t.brandSubtitle}
        </span>
      </span>
    </div>
  );

  return (
    <div data-pdf-root="true">
      <section
        data-pdf-page="true"
        style={{
          ...pageStyle,
          backgroundColor: DARK,
          color: "#fffaf0",
          padding: "40px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <header style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "20px" }}>
          {brand}
          <span
            style={{
              border: "1px solid rgba(245,179,1,0.38)",
              borderRadius: "999px",
              padding: "8px 13px",
              color: "#f5c45a",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase"
            }}
          >
            {isKn
              ? `ಕರ್ನಾಟಕ · ಭಾರತ · ${localizeDigits(new Date().getFullYear(), lang)}`
              : `Karnataka · India · ${new Date().getFullYear()}`}
          </span>
        </header>

        <div
          style={{
            position: "relative",
            height: "392px",
            marginTop: "26px",
            borderRadius: "26px",
            overflow: "hidden",
            flexShrink: 0
          }}
        >
          <div
            role="img"
            aria-label={t.result.pdf.coverAlt}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("${coverPhoto}")`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(7,16,25,0.12) 0%, rgba(7,16,25,0.15) 42%, rgba(7,16,25,0.94) 100%)"
            }}
          />
          <div style={{ position: "absolute", left: "30px", right: "30px", bottom: "27px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.3)",
                backgroundColor: "rgba(0,0,0,0.28)",
                padding: "7px 12px",
                color: "#f7cf77",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase"
              }}
            >
              {t.result.pdf.coverEyebrow}
            </span>
            <h1
              style={{
                margin: "13px 0 0",
                fontFamily: displayFont,
                fontSize: isKn ? "43px" : "53px",
                lineHeight: isKn ? 1.35 : 1.03,
                fontWeight: 700,
                letterSpacing: isKn ? 0 : "-0.02em"
              }}
            >
              {t.brand}
            </h1>
            <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.75)", fontSize: "16px" }}>
              {t.result.pdf.coverLine}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "26px",
            marginTop: "26px"
          }}
        >
          <div style={{ flex: "1 1 0", minWidth: 0 }}>
            <p
              style={{
                margin: 0,
                color: "#f5c45a",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase"
              }}
            >
              {t.result.introLabel}
            </p>
            <p style={{ margin: "10px 0 0", color: "rgba(255,255,255,0.76)", fontSize: "13px", lineHeight: 1.7 }}>
              {intro}
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "9px", width: "282px", flexShrink: 0 }}>
            {[
              { label: t.result.summary.days, value: localizeDigits(plan.summary.days, lang) },
              { label: t.result.summary.places, value: localizeDigits(plan.summary.places, lang) },
              { label: t.result.summary.estimated, value: formatINR(plan.budget.total, lang) },
              { label: t.result.summary.match, value: `${localizeDigits(plan.summary.matchScore, lang)}%` }
            ].map((cell) => (
              <div
                key={cell.label}
                style={{
                  width: "136px",
                  boxSizing: "border-box",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "14px",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  padding: "12px"
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "8px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.43)"
                  }}
                >
                  {cell.label}
                </p>
                <p style={{ margin: "6px 0 0", fontSize: "15px", fontWeight: 700, color: "#fff8e8" }}>
                  {cell.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <footer
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: "16px",
            color: "rgba(255,255,255,0.44)",
            fontSize: "9px"
          }}
        >
          <span>{t.result.pdf.prepared}</span>
          <span>{t.result.copyFooter}</span>
          <span>
            {t.result.pdf.page} {localizeDigits(1, lang)} {t.result.pdf.of} {localizeDigits(totalPages, lang)}
          </span>
        </footer>
      </section>

      {dayPages.map((page, pageIndex) => {
        const { day, stops, part, totalParts } = page;
        const dayPhotoId = stops[0]?.place.id ?? day.stops[0]?.place.id;
        const dayFallback = regionPhoto(day.region);
        const dayPhoto = dayPhotoId ? placePhoto(dayPhotoId, dayFallback) : dayFallback;
        const theme = isKn ? day.theme_kn : day.theme_en;
        return (
          <section
            key={`${day.day}-${part}`}
            data-pdf-page="true"
            style={{ ...pageStyle, display: "flex", flexDirection: "column" }}
          >
            <div style={{ position: "relative", height: "232px", flexShrink: 0, overflow: "hidden" }}>
              <div
                role="img"
                aria-label={theme}
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("${dayPhoto}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(7,16,25,0.45) 0%, rgba(7,16,25,0.04) 38%, rgba(7,16,25,0.9) 100%)"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "40px",
                  right: "40px",
                  top: "28px",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "18px",
                  color: "#fff"
                }}
              >
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.72)"
                  }}
                >
                  {t.result.timeline.dayPlan}
                </span>
                {totalParts > 1 ? (
                  <span
                    style={{
                      border: "1px solid rgba(255,255,255,0.34)",
                      borderRadius: "999px",
                      backgroundColor: "rgba(0,0,0,0.28)",
                      padding: "6px 10px",
                      fontSize: "8px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase"
                    }}
                  >
                    {t.result.pdf.part} {localizeDigits(part, lang)} / {localizeDigits(totalParts, lang)}
                  </span>
                ) : null}
              </div>
              <div style={{ position: "absolute", left: "40px", right: "40px", bottom: "26px", color: "#fff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "43px",
                      height: "43px",
                      borderRadius: "13px",
                      backgroundColor: GOLD,
                      color: "#171108",
                      fontFamily: displayFont,
                      fontSize: "20px",
                      fontWeight: 700
                    }}
                  >
                    {localizeDigits(day.day, lang)}
                  </span>
                  <div>
                    <p style={{ margin: 0, fontSize: "9px", fontWeight: 700, letterSpacing: "0.17em", textTransform: "uppercase", color: "#f6cd72" }}>
                      {lang === "kn" ? `ದಿನ ${localizeDigits(day.day, lang)}` : `Day ${day.day}`}
                    </p>
                    <h2
                      style={{
                        margin: "5px 0 0",
                        fontFamily: displayFont,
                        fontSize: isKn ? "27px" : "32px",
                        lineHeight: 1.18,
                        fontWeight: 700
                      }}
                    >
                      {theme}
                    </h2>
                  </div>
                </div>
                <div style={{ marginTop: "13px", display: "flex", flexWrap: "wrap", gap: "8px", fontSize: "9px", fontWeight: 600 }}>
                  <span style={{ border: "1px solid rgba(255,255,255,0.28)", borderRadius: "999px", backgroundColor: "rgba(0,0,0,0.25)", padding: "6px 10px" }}>
                    {isKn ? REGION_NAMES_KN[day.region] : day.region}
                  </span>
                  <span style={{ border: "1px solid rgba(255,255,255,0.28)", borderRadius: "999px", backgroundColor: "rgba(0,0,0,0.25)", padding: "6px 10px" }}>
                    {localizeDigits(day.stops.length, lang)} {t.result.timeline.stops}
                  </span>
                  <span style={{ border: "1px solid rgba(255,255,255,0.28)", borderRadius: "999px", backgroundColor: "rgba(0,0,0,0.25)", padding: "6px 10px" }}>
                    {localizeDigits(day.travelKm, lang)} {isKn ? "ಕಿಮೀ" : "km"} {t.result.timeline.travel}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ flex: 1, padding: "25px 40px 0" }}>
              {stops.map((stop, stopIndex) => {
                const place = stop.place;
                const name = isKn ? place.name_kn : place.name_en;
                const why = isKn ? stop.why_kn : stop.why_en;
                const dish = isKn ? place.dish_kn : place.dish_en;
                const tip = isKn ? place.tip_kn : place.tip_en;
                return (
                  <div
                    key={`${place.id}-${stopIndex}`}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "16px",
                      padding: "10px 0 11px",
                      borderBottom: stopIndex === stops.length - 1 ? "none" : `1px solid ${LINE}`
                    }}
                  >
                    <div
                      role="img"
                      aria-label={name}
                      style={{
                        width: "140px",
                        height: "108px",
                        flexShrink: 0,
                        borderRadius: "15px",
                        backgroundImage: `url("${placePhoto(place.id, regionPhoto(place.region))}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                    />
                    <div style={{ flex: "1 1 0", minWidth: 0 }}>
                      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px" }}>
                        <span style={{ borderRadius: "999px", backgroundColor: "rgba(169,119,0,0.11)", padding: "4px 8px", color: GOLD, fontSize: "8px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                          {t.result.slots[stop.slot]}
                        </span>
                        <span style={{ color: MUTED, fontSize: "9px", fontWeight: 600 }}>
                          {localizeTime(stop.startTime, lang)} · {formatDuration(stop.durationHours, lang)}
                        </span>
                      </div>
                      <h3
                        style={{
                          margin: "7px 0 0",
                          fontFamily: displayFont,
                          fontSize: isKn ? "20px" : "22px",
                          lineHeight: isKn ? 1.4 : 1.15,
                          fontWeight: 700,
                          color: INK
                        }}
                      >
                        {name}
                      </h3>
                      <p style={{ margin: "5px 0 0", color: "#4f554c", fontSize: "11px", lineHeight: 1.55 }}>
                        {why}
                      </p>
                      <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                        <div style={{ flex: "1 1 0", minWidth: 0 }}>
                          <p style={{ margin: 0, color: "#b25434", fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase" }}>
                            {t.result.stop.dish}
                          </p>
                          <p style={{ margin: "3px 0 0", color: "#4b5048", fontSize: "9.5px", lineHeight: 1.45 }}>
                            {dish}
                          </p>
                        </div>
                        <div style={{ flex: "1 1 0", minWidth: 0 }}>
                          <p style={{ margin: 0, color: "#327a91", fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase" }}>
                            {t.result.stop.tip}
                          </p>
                          <p style={{ margin: "3px 0 0", color: "#4b5048", fontSize: "9.5px", lineHeight: 1.45 }}>
                            {tip}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <footer
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                padding: "14px 40px 23px",
                color: MUTED,
                fontSize: "8.5px"
              }}
            >
              <span>{t.brand} · {t.brandSubtitle}</span>
              <span>{t.hero.photoCredit}</span>
              <span>
                {t.result.pdf.page} {localizeDigits(pageIndex + 2, lang)} {t.result.pdf.of} {localizeDigits(totalPages, lang)}
              </span>
            </footer>
          </section>
        );
      })}

      <section
        data-pdf-page="true"
        style={{
          ...pageStyle,
          padding: "40px 40px 24px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <header style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "20px" }}>
          {brand}
          <span style={{ maxWidth: "220px", textAlign: "right", color: MUTED, fontSize: "8.5px", lineHeight: 1.5 }}>
            {PHOTO_CREDIT[isKn ? "kn" : "en"]}
          </span>
        </header>

        <div style={{ marginTop: "26px" }}>
          <p style={{ margin: 0, color: GOLD, fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            {t.result.pdf.routeTitle}
          </p>
          <h2
            style={{
              margin: "7px 0 0",
              fontFamily: displayFont,
              fontSize: isKn ? "32px" : "38px",
              lineHeight: isKn ? 1.35 : 1.08,
              fontWeight: 700
            }}
          >
            {t.result.pdf.budgetTitle}
          </h2>
        </div>

        <div style={{ display: "flex", gap: "14px", marginTop: "20px" }}>
          <div
            style={{
              flex: "1 1 0",
              minWidth: 0,
              borderRadius: "20px",
              backgroundColor: FOREST,
              color: "#fff9ec",
              padding: "20px"
            }}
          >
            <p style={{ margin: 0, color: "#f3c45f", fontSize: "8px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
              {t.result.summary.estimated}
            </p>
            <p style={{ margin: "7px 0 0", fontFamily: displayFont, fontSize: "33px", fontWeight: 700 }}>
              {formatINR(plan.budget.total, lang)}
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginTop: "13px", color: "rgba(255,255,255,0.68)", fontSize: "9px" }}>
              <span>{t.result.pdf.budgetPerPerson}</span>
              <strong style={{ color: "#fff8e8", fontSize: "12px" }}>{formatINR(plan.budget.perPerson, lang)}</strong>
            </div>
            <div style={{ height: "6px", marginTop: "11px", overflow: "hidden", borderRadius: "999px", backgroundColor: "rgba(255,255,255,0.15)" }}>
              <div
                style={{
                  width: `${Math.min(100, budgetUsedPercent)}%`,
                  height: "100%",
                  borderRadius: "999px",
                  backgroundColor: "#f3b52f"
                }}
              />
            </div>
            <p style={{ margin: "9px 0 0", color: "#f6d68d", fontSize: "9px", fontWeight: 600 }}>
              {localizeDigits(budgetUsedPercent, lang)}% {t.result.summary.budgetUsed} · {statusLabel}
            </p>
          </div>

          <div style={{ flex: "1 1 0", minWidth: 0, border: `1px solid ${LINE}`, borderRadius: "20px", padding: "20px", backgroundColor: "#fdfaf3" }}>
            <p style={{ margin: 0, color: FOREST, fontSize: "8px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
              {t.result.pdf.routeRegions}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px" }}>
              {regions.map((region) => (
                <span
                  key={region}
                  style={{
                    border: `1px solid ${LINE}`,
                    borderRadius: "999px",
                    padding: "6px 9px",
                    color: "#3d4a40",
                    fontSize: "9px",
                    fontWeight: 600
                  }}
                >
                  {isKn ? REGION_NAMES_KN[region] : region}
                </span>
              ))}
            </div>
            <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
              <div style={{ flex: "1 1 0", minWidth: 0 }}>
                <p style={{ margin: 0, color: MUTED, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {t.result.summary.travellers}
                </p>
                <p style={{ margin: "4px 0 0", color: INK, fontSize: "14px", fontWeight: 700 }}>
                  {localizeDigits(plan.budget.travelers, lang)}
                </p>
              </div>
              <div style={{ flex: "1 1 0", minWidth: 0 }}>
                <p style={{ margin: 0, color: MUTED, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {t.result.summary.nights}
                </p>
                <p style={{ margin: "4px 0 0", color: INK, fontSize: "14px", fontWeight: 700 }}>
                  {localizeDigits(plan.budget.nights, lang)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "24px" }}>
          <h3 style={{ margin: 0, color: INK, fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {t.result.pdf.budgetBreakdown}
          </h3>
          <div style={{ marginTop: "10px" }}>
            {breakdown.map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "7px 0",
                  borderBottom: `1px solid ${LINE}`
                }}
              >
                <span style={{ width: "92px", flexShrink: 0, color: "#485047", fontSize: "9.5px", fontWeight: 600 }}>{item.label}</span>
                <span style={{ flex: "1 1 0", height: "7px", overflow: "hidden", borderRadius: "999px", backgroundColor: "#e8dfcf" }}>
                  <span
                    style={{
                      display: "block",
                      width: `${Math.max(3, (item.value / maxBreakdown) * 100)}%`,
                      height: "100%",
                      borderRadius: "999px",
                      backgroundColor: item.color
                    }}
                  />
                </span>
                <span style={{ width: "78px", flexShrink: 0, textAlign: "right", color: INK, fontSize: "9.5px", fontWeight: 700 }}>
                  {formatINR(item.value, lang)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "22px" }}>
          <h3 style={{ margin: 0, color: INK, fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {t.result.pdf.photosTitle}
          </h3>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {gallery.map((place) => {
              const name = isKn ? place.name_kn : place.name_en;
              return (
                <div key={place.id} style={{ flex: "1 1 0", minWidth: 0, position: "relative", height: "122px", overflow: "hidden", borderRadius: "14px" }}>
                  <div
                    role="img"
                    aria-label={name}
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url("${placePhoto(place.id, regionPhoto(place.region))}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 35%, rgba(7,16,25,0.82) 100%)" }} />
                  <p style={{ position: "absolute", left: "9px", right: "9px", bottom: "8px", margin: 0, color: "#fff9ec", fontSize: "9px", fontWeight: 700, lineHeight: 1.35 }}>
                    {name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: "auto", paddingTop: "18px" }}>
          <div style={{ borderLeft: `3px solid ${GOLD}`, backgroundColor: "rgba(169,119,0,0.07)", padding: "10px 12px" }}>
            <p style={{ margin: 0, color: "#4d493e", fontSize: "9px", lineHeight: 1.55 }}>{t.result.pdf.closingNote}</p>
          </div>
          <p style={{ margin: "8px 0 0", color: MUTED, fontSize: "8px", lineHeight: 1.5 }}>
            {t.result.pdf.photoNote}
          </p>
        </div>

        <footer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            borderTop: `1px solid ${LINE}`,
            marginTop: "14px",
            paddingTop: "12px",
            color: MUTED,
            fontSize: "8px"
          }}
        >
          <span>{t.result.copyFooter}</span>
          <span>
            {t.result.pdf.page} {localizeDigits(totalPages, lang)} {t.result.pdf.of} {localizeDigits(totalPages, lang)}
          </span>
        </footer>
      </section>
    </div>
  );
}

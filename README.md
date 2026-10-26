# Karnataka Yatra

A bilingual English–Kannada travel planner for Karnataka, built for the **Kannada Digital Innovation Hackathon 2026 — Problem Statement 06: Travel & Tourism**.

Karnataka Yatra turns a short travel profile into a practical day-by-day route: handpicked places, realistic timings, local food, festivals, budget estimates, a map and useful Kannada phrases. It works immediately without any API key.

## Highlights

- **Full one-tap language switch** between English and Kannada. The whole interface changes instantly, including headings, labels, planner options, itinerary content, food, festivals, phrases and footer.
- **Rule-based personal planner** with no paid API dependency. Interests, days, budget, travel pace, companions, starting city, month and saved places all influence the result.
- **Official Karnataka Tourism photography** across the hero, destination cards and detail view, with a complete local image set for all 56 places.
- **Day-by-day itinerary** with one region per day, local travel estimates, numbered stops, suggested timings, entry fees, local dishes and practical tips.
- **Illustrated PDF download** with a photographic cover, day pages, route summary, budget breakdown and source notes, rendered in the current language.
- **Interactive route map** with dark CARTO tiles, colour-coded day trails and numbered markers.
- **Budget breakdown** for stay, food, transport and entry fees, with a budget tier and a clear over/under-budget note.
- **56 handpicked Karnataka places** across eight travel regions, searchable and filterable by region and experience.
- **Saved-place wishlist** that gives chosen destinations priority when the itinerary is generated.
- **Food and festival guides**, route-aware dishes, and a Kannada phrase card with browser speech playback.
- **Share, copy, print and PDF download** actions for the finished itinerary.
- Responsive editorial travel design with photography, motion, reduced-motion support and print styles.

## Tech Stack

- Next.js 14 App Router
- React 18 and TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Leaflet and React Leaflet
- Lucide icons
- html2canvas and jsPDF for the illustrated PDF export
- Optional Google Gemini narration through `@google/generative-ai`

## Requirements

- Node.js 18.17 or newer
- npm
- Internet access for map tiles and for the first dependency install
- A modern browser

## Quick Start

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

On Windows, you can also double-click `run.bat`. It checks for Node.js, installs dependencies when the app or PDF packages are missing, opens the browser and starts the development server.

### Production build

```powershell
npm run build
npm start
```

`npm start` serves the production app at `http://localhost:3000`.

## Optional Gemini Narration

The planner, fallback narration, map data, budget and all core features work with **no API key**.

To enable optional Gemini-enhanced storytelling:

1. Copy `.env.example` to `.env.local`.
2. Add a Gemini API key:

```env
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-flash-latest
```

3. Restart the development server.

The key is used only in the server-side `/api/narrate` route and is never exposed to the browser. If the key is absent, invalid, rate-limited or the request fails, the app silently falls back to the locally generated narration. Gemini is never allowed to invent places or change the route.

## Main Features

### Planner

The planner asks for:

- Interests: heritage, temples, wildlife, beaches, hills, waterfalls, coffee, food, adventure, spirituality and photography
- Number of days
- Total group budget
- Travel pace
- Companions
- Starting city
- Travel month
- Optional saved places

The result includes an at-a-glance summary, interest-match score, budget tier, route map, cost chart, day cards and local food and festival suggestions.

### Itinerary Actions

- **Regenerate**: creates a fresh deterministic variation
- **Copy**: copies the full itinerary as text
- **Print**: uses dedicated print styles
- **Download PDF**: renders a designed A4 itinerary with photography, day-by-day stops, budget notes and photo credits
- **Share link**: opens the native share sheet when available, otherwise copies a link that reopens the same plan
- **Swap**: replaces one stop with another suitable unused place

### Kannada Experience

- The language toggle is available in the navigation, as a floating mobile control and in the footer.
- Kannada mode uses Noto Sans Kannada and Baloo Tamma 2 with adjusted line heights.
- Kannada numerals are used for day labels and localized counts.
- Pronunciation playback uses the browser's `speechSynthesis` API and gracefully explains when a Kannada voice is unavailable.

## Project Structure

```text
.
├── app/
│   ├── api/
│   │   ├── narrate/route.ts     # Optional Gemini narration with local fallback
│   │   └── plan/route.ts        # Rule-based itinerary endpoint
│   ├── globals.css              # Design tokens, glassmorphism, map and print styles
│   ├── layout.tsx               # Fonts, metadata, providers and global shell
│   └── page.tsx                 # Main page
├── components/
│   ├── BudgetChart.tsx
│   ├── CountUp.tsx
│   ├── DayCard.tsx
│   ├── Destinations.tsx
│   ├── FestivalsCard.tsx
│   ├── FoodFestivals.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ItineraryPdf.tsx          # Hidden A4 pages used for the PDF export
│   ├── ItineraryResult.tsx
│   ├── LanguageToggle.tsx
│   ├── LoadingPlan.tsx
│   ├── MapClient.tsx
│   ├── MeshBackground.tsx
│   ├── Navbar.tsx
│   ├── PhrasesCard.tsx
│   ├── PhrasesSection.tsx
│   ├── PlannerForm.tsx
│   ├── PlannerSection.tsx
│   ├── Reveal.tsx
│   ├── SectionHeading.tsx
│   ├── Skyline.tsx
│   ├── TasteCard.tsx
│   ├── ToastProvider.tsx
│   ├── TripMap.tsx
│   └── YatraApp.tsx
├── data/
│   ├── photos.ts                # Place, region, hero image and credit mapping
│   └── places.ts                # Places, regions, dishes, festivals and phrases
├── i18n/
│   ├── en.ts
│   ├── kn.ts
│   └── LangProvider.tsx
├── lib/
│   ├── format.ts                # INR, duration, date and Kannada numeral helpers
│   ├── narration.ts             # Validated narration and local template fallback
│   ├── pdf.ts                   # Font/image preparation and PDF assembly
│   ├── planner.ts               # Scoring, routing, days, budget and swaps
│   ├── storage.ts               # Saved-place session storage and events
│   └── types.ts                 # Shared domain types
├── public/
│   ├── images/
│   │   ├── hero/               # Five wide hero photographs
│   │   └── places/             # One local photograph for each of the 56 places
│   ├── hoysala-star-motif.svg
│   └── hoysala-star.svg
├── .env.example
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── run.bat
├── tailwind.config.ts
└── tsconfig.json
```

## API Routes

### `POST /api/plan`

Accepts planner preferences and returns a complete, typed itinerary. The same logic is available locally through `buildItinerary` in `lib/planner.ts`.

### `POST /api/narrate`

Accepts the current itinerary and language. It returns a sanitized narration payload with `source: "gemini" | "template"`.

Safety behavior:

- Rate-limited in memory
- Validates the plan shape
- Uses only place IDs already present in the itinerary
- Sanitizes every returned field
- Falls back to the local template on any error
- Works without `GEMINI_API_KEY`

## Data and Privacy

- The 56 places, costs, dishes, festivals and phrases are stored locally in `data/places.ts`.
- No database is required.
- Saved places are stored in browser `sessionStorage`.
- The selected language is stored in browser `localStorage`.
- Shared plans are encoded in the URL fragment; they are not uploaded or persisted on a server.
- Map tiles are loaded from CARTO/OpenStreetMap and require internet access.

## Design Notes

- Deep indigo base with maroon, gold, emerald, teal and violet mesh accents
- Full-bleed tourism photography, editorial image cards and dark image overlays
- Glass panels, gradient headings and restrained motion
- Warm paper-toned PDF pages with serif English headings and Kannada-capable typography
- Keyboard-visible focus rings and modal Escape handling
- Responsive navigation and a floating mobile language toggle
- Dedicated print styles and reduced-motion support

## Photography

Travel photography is sourced from [Karnataka Tourism](https://karnatakatourism.org/) (Government of Karnataka) and stored locally in `public/images/` so the interface and PDF export do not depend on remote image requests.

The images are representative travel imagery. Opening hours, entry rules, routes and costs can change; confirm details with the relevant site or authority before travelling. Karnataka Yatra is an independent hackathon project and is not an official Government of Karnataka website.

## Credits

Built with respect for Karnataka's people, places, food and languages.

Photography: Karnataka Tourism, Government of Karnataka.

Kannada Digital Innovation Hackathon 2026 · Problem Statement 06 — Travel & Tourism

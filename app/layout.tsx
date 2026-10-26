import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import {
  Baloo_Tamma_2,
  Noto_Sans_Kannada,
  Playfair_Display,
  Poppins
} from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { LangProvider } from "@/i18n/LangProvider";
import { ToastProvider } from "@/components/ToastProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap"
});

const notoKannada = Noto_Sans_Kannada({
  subsets: ["kannada"],
  variable: "--font-noto-kannada",
  display: "swap"
});

const balooTamma = Baloo_Tamma_2({
  subsets: ["kannada", "latin"],
  variable: "--font-baloo-tamma",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Karnataka Yatra — AI Travel Planner",
    template: "%s | Karnataka Yatra"
  },
  description:
    "Plan a personal Karnataka journey around heritage, wildlife, coast, coffee, temples and food. A bilingual English–Kannada travel planner built for the Kannada Digital Innovation Hackathon 2026.",
  applicationName: "Karnataka Yatra",
  authors: [{ name: "Karnataka Yatra" }],
  keywords: [
    "Karnataka tourism",
    "Karnataka travel planner",
    "Kannada travel app",
    "Karnataka itinerary",
    "ಕರ್ನಾಟಕ ಪ್ರವಾಸ",
    "ಕರ್ನಾಟಕ ಯಾತ್ರೆ"
  ],
  openGraph: {
    title: "Karnataka Yatra — Your Karnataka, beautifully planned",
    description:
      "A bilingual Karnataka trip planner with day-by-day routes, local food, festivals and useful Kannada phrases.",
    type: "website",
    locale: "en_IN",
    siteName: "Karnataka Yatra",
    images: [
      {
        url: "/images/hero/hero-mysuru.jpg",
        width: 2200,
        height: 1386,
        alt: "Mysuru Palace, Karnataka"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Karnataka Yatra — AI Travel Planner",
    description: "Plan a personal Karnataka journey in English or Kannada.",
    images: ["/images/hero/hero-mysuru.jpg"]
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/hoysala-star.svg",
    apple: "/hoysala-star.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b1a",
  colorScheme: "dark"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kn-IN" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${poppins.variable} ${notoKannada.variable} ${balooTamma.variable} font-sans antialiased`}
      >
        <LangProvider>
          <ToastProvider>{children}</ToastProvider>
        </LangProvider>
      </body>
    </html>
  );
}

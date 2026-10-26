"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { en } from "@/i18n/en";
import type { Dictionary } from "@/i18n/en";
import { kn } from "@/i18n/kn";
import type { Lang } from "@/lib/types";

interface LangContextValue {
  lang: Lang;
  t: Dictionary;
  toggle: () => void;
  ready: boolean;
}

const STORAGE_KEY = "karnataka-yatra-language";
const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let next: Lang = "en";
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "kn" || saved === "en") {
        next = saved;
      }
    } catch {
      next = "en";
    }
    setLang(next);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = lang === "kn" ? "kn-IN" : "en-IN";
    document.body.classList.toggle("font-kn", lang === "kn");
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Language still applies for this session when storage is unavailable.
    }
  }, [lang, ready]);

  const toggle = useCallback(() => {
    setLang((current) => (current === "en" ? "kn" : "en"));
  }, []);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      t: lang === "kn" ? kn : en,
      toggle,
      ready
    }),
    [lang, ready, toggle]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used inside LangProvider");
  }
  return context;
}

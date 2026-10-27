"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LangProvider";

const THEME_STORAGE_KEY = "karnataka-yatra-theme";

export function ThemeToggle() {
  const { t } = useLang();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as "dark" | "light" | null;
      if (saved === "light" || saved === "dark") {
        setTheme(saved);
        document.documentElement.classList.toggle("light", saved === "light");
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`${t.theme.toggle} (${theme === "dark" ? t.theme.light : t.theme.dark})`}
      title={`${t.theme.toggle} (${theme === "dark" ? t.theme.light : t.theme.dark})`}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white/80 transition hover:border-gold/50 hover:bg-gold/10 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      {theme === "dark" ? (
        <Sun size={17} className="text-gold" aria-hidden="true" />
      ) : (
        <Moon size={17} className="text-indigo-400" aria-hidden="true" />
      )}
    </button>
  );
}

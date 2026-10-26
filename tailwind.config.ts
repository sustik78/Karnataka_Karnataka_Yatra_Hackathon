import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#0b0b1a",
        "base-soft": "#111126",
        gold: "#F5B301",
        coral: "#FF7A59",
        maroon: "#8B1E3F",
        emerald: "#10B981",
        teal: "#0EA5E9",
        violet: "#7C5CFF"
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        kannada: ["var(--font-noto-kannada)", "var(--font-baloo-tamma)", "sans-serif"],
        "kannada-display": ["var(--font-baloo-tamma)", "var(--font-noto-kannada)", "sans-serif"]
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.35)",
        "glass-lg": "0 24px 70px rgba(0, 0, 0, 0.48)",
        gold: "0 0 0 1px rgba(245, 179, 1, 0.35), 0 12px 45px rgba(245, 179, 1, 0.2)"
      },
      backgroundSize: {
        "200%": "200% 200%"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        driftOne: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "33%": { transform: "translate3d(6%, -4%, 0) scale(1.08)" },
          "66%": { transform: "translate3d(-3%, 5%, 0) scale(0.96)" }
        },
        driftTwo: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "40%": { transform: "translate3d(-7%, 6%, 0) scale(1.04)" },
          "75%": { transform: "translate3d(5%, -5%, 0) scale(1.1)" }
        },
        driftThree: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(5%, 8%, 0) scale(0.94)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" }
        }
      },
      animation: {
        shimmer: "shimmer 5s linear infinite",
        float: "float 6s ease-in-out infinite",
        "drift-one": "driftOne 24s ease-in-out infinite",
        "drift-two": "driftTwo 28s ease-in-out infinite",
        "drift-three": "driftThree 22s ease-in-out infinite",
        "pulse-glow": "pulseGlow 5s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;

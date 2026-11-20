import type { Config } from "tailwindcss";

/**
 * Design-Tokens: Deep-Space-Flächen und Neon-Akzente.
 * Die Akzentfarben sind zusätzlich als CSS-Variablen in globals.css hinterlegt,
 * damit SVG/Canvas/inline-Styles dieselben Werte nutzen.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#07090E",
          900: "#0B0F17",
          850: "#0F1420",
          800: "#131A28",
          700: "#1B2436",
          600: "#27324A",
        },
        neon: {
          blue: "#3B82F6",
          orange: "#F97316",
          green: "#10B981",
        },
        ink: {
          DEFAULT: "#E6EAF2",
          muted: "#9AA6BC",
          faint: "#7B88A2",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        "glow-blue": "0 0 24px -4px rgb(59 130 246 / 0.55)",
        "glow-orange": "0 0 24px -4px rgb(249 115 22 / 0.55)",
        "glow-green": "0 0 24px -4px rgb(16 185 129 / 0.55)",
      },
      keyframes: {
        "dash-flow": { to: { strokeDashoffset: "-48" } },
        "node-ping": {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(3.2)", opacity: "0" },
        },
        blink: { "50%": { opacity: "0" } },
        "bar-scan": {
          "0%, 100%": { transform: "scaleX(0.55)" },
          "50%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "dash-flow": "dash-flow 1.1s linear infinite",
        "node-ping": "node-ping 1.6s ease-out infinite",
        blink: "blink 1s steps(1) infinite",
        "bar-scan": "bar-scan 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

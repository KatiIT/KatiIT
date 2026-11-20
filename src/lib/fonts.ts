import localFont from "next/font/local";

/** Selbst gehostete Schriften (woff2 liegen in src/fonts). Keine Requests an Google. */
export const inter = localFont({
  src: [
    {
      path: "../fonts/inter-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../fonts/inter-latin-ext-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = localFont({
  src: [
    {
      path: "../fonts/jetbrains-mono-latin-wght-normal.woff2",
      weight: "100 800",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

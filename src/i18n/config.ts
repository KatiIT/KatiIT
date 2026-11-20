export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Schreibrichtung je Sprache. Für zukünftige RTL-Sprachen (z. B. "ar") hier ergänzen. */
export const dirOf = (_locale: Locale): "ltr" | "rtl" => "ltr";

/**
 * Zentrale Stammdaten. Alle Werte in [[doppelten eckigen Klammern]] sind PLATZHALTER
 * und werden auf der Website gelb hervorgehoben, bis sie ersetzt sind.
 */
export const site = {
  name: "KatiIT",
  domain: "katiit.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://katiit.com",
  owner: "[[VORNAME NACHNAME]]",
  legalName: "[[FIRMENNAME / INHABER, ggf. RECHTSFORM]]",
  street: "[[STRASSE HAUSNUMMER]]",
  city: "[[PLZ ORT]]",
  country: "Deutschland",
  email: "[[KONTAKT@KATIIT.COM]]",
  phone: "[[+49 …]]",
  vatId: "[[USt-IdNr. gemäß § 27a UStG oder „nicht vorhanden“]]",
  /** Cal.com: <benutzername>/<event-slug>. Per Umgebungsvariable überschreibbar. */
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "[[CAL-BENUTZERNAME]]/[[EVENT-SLUG]]",
  /** Pfad unter /public, z. B. "/images/portrait.jpg". Leer = Platzhalter. */
  portrait: "",
  hosting: "[[HOSTING-ANBIETER, Rechenzentrum Frankfurt am Main]]",
  supervisoryAuthority: "[[ZUSTÄNDIGE LANDESDATENSCHUTZBEHÖRDE]]",
} as const;

export const hasPlaceholder = (value: string) => value.includes("[[");

export const calUrl = `https://cal.com/${site.calLink}`;
export const calEmbedUrl = `${calUrl}?embed=true&layout=month_view&theme=dark`;

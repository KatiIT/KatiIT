export const site = {
  name: "KatiIT",
  domain: "katiit.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://katiit.com",
  owner: "Masoud Roosta",
  legalName: "KatiIT – Masoud Roosta",
  street: "Velsenstraße 2",
  city: "51469 Bergisch Gladbach",
  country: "Deutschland",
  email: "mr@katiit.com",
  phone: "+4915510204397",
  vatId: "nicht vorhanden",
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "katiit/15min",
  portrait: "/images/masoud-roosta.jpg",
  hosting: "IONOS SE, Elgendorfer Str. 57, 56410 Montabaur, Deutschland",
  supervisoryAuthority: "Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)",
} as const;

export const hasPlaceholder = (value: string) => value.includes("[[");

export const calUrl = `https://cal.com/${site.calLink.replace(/^https?:\/\/cal\.com\//i, "")}`;
export const calEmbedUrl = `${calUrl}?embed=true&layout=month_view&theme=dark`;

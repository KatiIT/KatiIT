import type { Locale } from "./config";

export type Reference = { id: string; name: string; url: string; host: string; kind: string; summary: string; role: string; result: string; tech: string };
export type TrustCopy = {
  eyebrow: string; title: string; lead: string;
  labels: { role: string; result: string; tech: string; visit: string; quote: string };
  quote: string;
  refs: Reference[];
  team: { eyebrow: string; title: string; text: string; points: string[]; visit: string; url: string; host: string; note: string };
};

/**
 * Referenzen. Nur belegbare Angaben stehen fest im Text (Name, Art, Kurzbeschreibung aus dem Seitentitel).
 * Alles andere ist ein [[Platzhalter]] und wird vor dem Livegang von Ihnen ersetzt.
 */
export const trust: Record<Locale, TrustCopy> = {
  de: {
    eyebrow: "Referenzen",
    title: "Projekte, die online laufen.",
    lead: "Eine Auswahl aus meiner Arbeit. Aufgabe, Vorgehen und Ergebnis erkläre ich gern im Gespräch.",
    labels: { role: "Meine Rolle", result: "Ergebnis", tech: "Technik", visit: "Website ansehen", quote: "Kundenstimme" },
    quote: "[[Kundenzitat, z. B. „…“ – Name, Funktion, Unternehmen]]",
    refs: [
      {
        id: "phoenix", name: "Phoenix Physio", url: "https://www.phoenixphysio.ca/", host: "phoenixphysio.ca", kind: "Website für eine Praxis",
        summary: "Auftritt einer Physiotherapie-Praxis an der Rutherford Rd in Concord, Ontario (Kanada).",
        role: "Projektleitung. [[ergänzen: z. B. Konzept, Design, Umsetzung im Team]]", result: "[[Ergebnis mit Zahl, z. B. mehr Online-Anfragen, Ladezeit]]", tech: "[[Technologien]]",
      },
      {
        id: "pse", name: "Plastic Surgery Exams", url: "https://www.plasticsurgeryexams.com/", host: "plasticsurgeryexams.com", kind: "Web-Plattform",
        summary: "Online-Fragenbank zur Prüfungsvorbereitung für FRCS (Plast) und EBOPRAS.",
        role: "Projektleitung. [[ergänzen: z. B. Architektur, Umsetzung im Team, Betrieb]]", result: "[[Ergebnis mit Zahl, z. B. Nutzer, Fragen, Verfügbarkeit]]", tech: "[[Technologien]]",
      },
    ],
    team: {
      eyebrow: "Team",
      title: "Verstärkung durch mein Team in Iran: Niso Web",
      text: "Für größere Web-Projekte arbeite ich mit einem eingespielten Team zusammen, das professionelles Webdesign, SEO und die Entwicklung von Online-Plattformen anbietet und laufend an neuen Projekten arbeitet.",
      points: ["Zusätzliche Kapazität für Web-Projekte", "Webdesign, SEO und Plattform-Entwicklung", "Ein Ansprechpartner: ich"],
      visit: "Niso Web ansehen", url: "https://nisoweb.com/", host: "nisoweb.com",
      note: "[[Zusammenarbeit: Teamgröße, Abstimmung, Zeitzonen, Qualitätssicherung]]",
    },
  },
  en: {
    eyebrow: "References",
    title: "Projects that are live.",
    lead: "A selection of my work. I'm happy to explain task, approach and result in a call.",
    labels: { role: "My role", result: "Result", tech: "Tech", visit: "Visit website", quote: "Client voice" },
    quote: "[[Client quote, e.g. “…” – name, role, company]]",
    refs: [
      {
        id: "phoenix", name: "Phoenix Physio", url: "https://www.phoenixphysio.ca/", host: "phoenixphysio.ca", kind: "Clinic website",
        summary: "Online presence of a physiotherapy clinic on Rutherford Rd in Concord, Ontario (Canada).",
        role: "Project lead. [[add: e.g. concept, design, delivery with the team]]", result: "[[Result with a number, e.g. more online enquiries, load time]]", tech: "[[Technologies]]",
      },
      {
        id: "pse", name: "Plastic Surgery Exams", url: "https://www.plasticsurgeryexams.com/", host: "plasticsurgeryexams.com", kind: "Web platform",
        summary: "Online question bank for exam preparation for FRCS (Plast) and EBOPRAS.",
        role: "Project lead. [[add: e.g. architecture, delivery with the team, operations]]", result: "[[Result with a number, e.g. users, questions, uptime]]", tech: "[[Technologies]]",
      },
    ],
    team: {
      eyebrow: "Team",
      title: "Backed by my team in Iran: Niso Web",
      text: "For larger web projects I work with an established team that offers professional web design, SEO and development of online platforms, and is continuously working on new projects.",
      points: ["Additional capacity for web projects", "Web design, SEO and platform development", "One point of contact: me"],
      visit: "Visit Niso Web", url: "https://nisoweb.com/", host: "nisoweb.com",
      note: "[[Collaboration: team size, coordination, time zones, quality assurance]]",
    },
  },
};

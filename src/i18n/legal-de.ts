import type { LegalDoc } from "./types";

const imprint: LegalDoc = {
  title: "Impressum",
  notice: "Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz).",
  updated: "Stand: November 2026",
  sections: [
    {
      heading: "Anbieter / Verantwortlich",
      paragraphs: [
        "Masoud Roosta",
        "Freiberuflicher IT-Engineer & Berater (KatiIT)",
        "Velsenstraße 2",
        "51469 Bergisch Gladbach, Deutschland",
      ],
    },
    {
      heading: "Kontakt",
      paragraphs: [
        "E-Mail: mr@katiit.com",
        "Telefon: +4915510204397",
      ],
    },
    {
      heading: "Hinweis zur Tätigkeit",
      paragraphs: [
        "Freiberufliche Tätigkeit im Bereich IT-Engineering, Softwareentwicklung und digitale Beratung (kein Eintrag im Handelsregister).",
      ],
    },
  ],
};

const privacy: LegalDoc = {
  title: "Datenschutzerklärung",
  notice: "Informationen zum Datenschutz gemäß DSGVO.",
  updated: "Stand: November 2026",
  sections: [
    {
      heading: "1. Verantwortlicher",
      paragraphs: [
        "Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:",
        "Masoud Roosta – KatiIT",
        "Velsenstraße 2, 51469 - Bergisch Gladbach, Deutschland",
        "E-Mail: mr@katiit.com",
        "Telefon: +4915510204397",
      ],
    },
    {
      heading: "2. Hosting und Server-Logfiles",
      paragraphs: [
        "Diese Website wird bei IONOS SE (Elgendorfer Str. 57, 56410 Montabaur, Deutschland) gehostet. Beim Aufruf dieser Website erfasst IONOS automatisch technische Daten (z. B. IP-Adresse, Datum und Uhrzeit des Abrufs, Browsertyp, Betriebssystem, Referrer-URL) in Server-Logfiles, um den sicheren und störungsfreien Betrieb der Website zu gewährleisten (Art. 6 Abs. 1 lit. f DSGVO). Die Server befinden sich in Rechenzentren innerhalb Deutschlands bzw. der Europäischen Union. Die Logfiles werden nach spätestens 7 bis 14 Tagen automatisch gelöscht bzw. anonymisiert.",
      ],
    },
    {
      heading: "3. Lokale Schriftarten (Self-Hosted Fonts)",
      paragraphs: [
        "Diese Website verwendet lokal eingebundene Schriftarten (z. B. Inter, JetBrains Mono). Eine Verbindung zu Servern Dritter allein zum Laden dieser Schriftarten findet nicht statt.",
      ],
    },
    {
      heading: "4. Kontaktaufnahme und Terminbuchung (Cal.com)",
      paragraphs: [
        "Wenn Sie per E-Mail (ebenfalls über Mailserver von IONOS SE) Kontakt aufnehmen oder einen Termin über Cal.com buchen, werden Ihre Angaben zur Bearbeitung der Anfrage bzw. Terminvereinbarung verarbeitet (Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO). Die Einbindung von Cal.com erfolgt erst nach Ihrer ausdrücklichen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO); dabei werden Verbindungsdaten (insbesondere Ihre IP-Adresse sowie Browser-/Anfragedaten) an Cal.com übertragen. Ihre Anfragedaten werden gelöscht, sobald Ihr Anliegen abschließend geklärt ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
      ],
    },
    {
      heading: "5. Ihre Rechte als betroffene Person",
      paragraphs: [
        "Sie haben im Rahmen der DSGVO insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung (Art. 15–21 DSGVO) und das Recht auf Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft. Zudem steht Ihnen ein Beschwerderecht bei einer zuständigen Datenschutz-Aufsichtsbehörde zu.",
      ],
    },
  ],
};

export const legalDe = { imprint, privacy };

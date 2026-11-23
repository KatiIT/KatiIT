import type { Locale } from "./config";

export type AuditPage = {
  meta: { title: string; description: string };
  back: string;
  eyebrow: string;
  title: string;
  lead: string;
  stepsTitle: string;
  steps: { title: string; text: string }[];
  bringTitle: string;
  bring: string[];
  getTitle: string;
  get: string[];
  contactTitle: string;
  contactLead: string;
  contactLabels: {
    provider: string;
    address: string;
    email: string;
    phone: string;
  };
  effort: {
    title: string;
    lead: string;
    cols: [string, string, string];
    rows: [string, string, string][];
    note: string;
  };
  faqTitle: string;
  faq: { q: string; a: string }[];
  bookTitle: string;
  other: string;
  links: { label: string; href: string }[];
};

export const auditPages: Record<Locale, AuditPage> = {
  de: {
    meta: {
      title: "Audit buchen",
      description: "Kurzes Erstgespräch zu Architektur, Zielen und nächsten Schritten. Termin direkt online wählen.",
    },
    back: "Zur Startseite",
    eyebrow: "Audit",
    title: "Architektur-Audit buchen.",
    lead: "In einem kurzen Erstgespräch klären wir Ausgangslage, Ziele und sinnvolle nächste Schritte. Sie wählen unten direkt einen Termin.",
    stepsTitle: "So läuft das Gespräch ab",
    steps: [
      { title: "1. Ausgangslage", text: "Sie schildern Ihr Vorhaben: ein Bereich (Industrie, Web oder Mobile) oder mehrere zusammen." },
      { title: "2. Einordnung", text: "Wir ordnen Technologien, Risiken und Abhängigkeiten ein." },
      { title: "3. Nächster Schritt", text: "Sie erhalten eine begründete Empfehlung, wie es sinnvoll weitergeht." },
    ],
    bringTitle: "Hilfreich, wenn Sie mitbringen",
    bring: [
      "Eine kurze Beschreibung Ihres Ziels",
      "Vorhandene Systeme oder Anlagen (grob)",
      "Zeitrahmen und Beteiligte",
      "Offene Fragen, die Sie klären möchten",
    ],
    getTitle: "Das nehmen Sie mit",
    get: [
      "Eine klare Einordnung Ihres Vorhabens",
      "Empfehlung zu Technologie und Vorgehen",
      "Hinweise auf Risiken und Stolpersteine",
      "Konkrete nächste Schritte",
    ],
    contactTitle: "Direkter Kontakt",
    contactLead: "Lieber direkt per E-Mail oder Telefon abstimmen? Hier sind die direkten Kontaktdaten:",
    contactLabels: {
      provider: "Anbieter",
      address: "Adresse",
      email: "E-Mail",
      phone: "Telefon",
    },
    effort: {
      title: "Aufwand und Zeitrahmen",
      lead: "Richtwerte für die Einordnung vorab. Ein konkretes Angebot folgt nach dem Audit anhand Ihres tatsächlichen Umfangs.",
      cols: ["Projektart", "Modell", "Ablauf"],
      rows: [
        ["Firmen-Website", "Projektbasiert / Festpreis nach Scope", "Schneller Einstieg nach Audit & Zielbild"],
        ["App oder Web-Plattform", "Iterativ / Meilensteine", "Schrittweise Umsetzung mit klaren Releases"],
        ["Industrie-Anbindung / Analytik", "Audit-gestützt / Pilotphase", "Validierung im Betrieb vor voller Rollout-Planung"],
      ],
      note: "Genaue Konditionen, Zeitpläne und optionale NDA- oder Betreuungsvereinbarungen legen wir transparent im Erstgespräch fest.",
    },
    faqTitle: "Häufige Fragen",
    faq: [
      { q: "Ist das Gespräch verbindlich?", a: "Nein, das Erstgespräch ist unverbindlich." },
      { q: "Wird vertraulich mit meinen Informationen umgegangen?", a: "Ja. Auf Wunsch schließen wir vorab eine Vertraulichkeitsvereinbarung (NDA)." },
      { q: "Remote oder vor Ort?", a: "Beides ist möglich. Das klären wir bei der Terminvereinbarung." },
      { q: "Was passiert mit meinen Daten bei der Buchung?", a: "Der Kalender wird erst nach Ihrer Einwilligung geladen. Alternativ erreichen Sie uns direkt per E-Mail oder Telefon." },
    ],
    bookTitle: "Termin wählen",
    other: "Weiterlesen",
    links: [
      { label: "Mobile & Apps", href: "/services/mobile" },
      { label: "Web & Backend", href: "/services/engineering" },
      { label: "Industrie & Automation", href: "/services/industrial" },
    ],
  },
  en: {
    meta: {
      title: "Book an audit",
      description: "A short intro call about architecture, goals and next steps. Pick a slot online.",
    },
    back: "Back to home",
    eyebrow: "Audit",
    title: "Book an architecture audit.",
    lead: "In a short intro call we clarify your starting point, goals and sensible next steps. Pick a slot directly below.",
    stepsTitle: "How the call works",
    steps: [
      { title: "1. Starting point", text: "You describe your project: one area (industrial, web or mobile) or several together." },
      { title: "2. Assessment", text: "We size up technologies, risks and dependencies." },
      { title: "3. Next step", text: "You get a reasoned recommendation on how to proceed." },
    ],
    bringTitle: "Helpful to bring",
    bring: [
      "A short description of your goal",
      "Existing systems or plants (roughly)",
      "Timeframe and people involved",
      "Open questions you want answered",
    ],
    getTitle: "What you take away",
    get: [
      "A clear assessment of your project",
      "Recommendation on technology and approach",
      "Pointers to risks and pitfalls",
      "Concrete next steps",
    ],
    contactTitle: "Direct contact",
    contactLead: "Prefer to reach out directly by email or phone? Use the contact details below:",
    contactLabels: {
      provider: "Provider",
      address: "Address",
      email: "Email",
      phone: "Phone",
    },
    effort: {
      title: "Effort and timeline",
      lead: "Scope guidelines to help you plan ahead. A tailored proposal follows after the audit based on your actual requirements.",
      cols: ["Project type", "Engagement model", "Delivery approach"],
      rows: [
        ["Company website", "Scope-based / fixed milestone", "Fast kickoff following audit & target architecture"],
        ["App or web platform", "Iterative / milestone-based", "Incremental delivery with verifiable releases"],
        ["Industrial connection / analytics", "Audit-led / pilot-first", "Operational validation before broader rollout"],
      ],
      note: "Exact scope, timeline, NDA terms, and ongoing support options are defined transparently during the initial discussion.",
    },
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Is the call binding?", a: "No, the intro call is non-binding." },
      { q: "Is my information treated confidentially?", a: "Yes. On request we sign a non-disclosure agreement (NDA) beforehand." },
      { q: "Remote or on site?", a: "Both are possible. We clarify this when booking." },
      { q: "What happens to my data when booking?", a: "The calendar only loads after your consent. Alternatively you can reach out directly by email or phone." },
    ],
    bookTitle: "Pick a slot",
    other: "Keep reading",
    links: [
      { label: "Mobile & apps", href: "/services/mobile" },
      { label: "Web & backend", href: "/services/engineering" },
      { label: "Industrial & automation", href: "/services/industrial" },
    ],
  },
};

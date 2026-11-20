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
  effort: { title: string; lead: string; cols: [string, string, string]; rows: [string, string, string][]; note: string };
  faqTitle: string;
  faq: { q: string; a: string }[];
  bookTitle: string;
  other: string;
  links: { label: string; href: string }[];
};

export const auditPages: Record<Locale, AuditPage> = {
  de: {
    meta: { title: "Audit buchen", description: "Kurzes Erstgespräch zu Architektur, Zielen und nächsten Schritten. Termin direkt online wählen." },
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
    bring: ["Eine kurze Beschreibung Ihres Ziels", "Vorhandene Systeme oder Anlagen (grob)", "Zeitrahmen und Beteiligte", "Offene Fragen, die Sie klären möchten"],
    getTitle: "Das nehmen Sie mit",
    get: ["Eine klare Einordnung Ihres Vorhabens", "Empfehlung zu Technologie und Vorgehen", "Hinweise auf Risiken und Stolpersteine", "Konkrete nächste Schritte"],
    effort: {
      title: "Aufwand und Zeitrahmen",
      lead: "Grobe Richtwerte, damit Sie vorab einordnen können. Ein verbindliches Angebot gibt es nach dem Audit.",
      cols: ["Projektart", "Investition", "Dauer bis Start / Umsetzung"],
      rows: [
        ["Firmen-Website", "[[von … bis … €]]", "[[Start in … Wochen, Umsetzung … Wochen]]"],
        ["App oder Web-Plattform", "[[von … bis … €]]", "[[Start in … Wochen, Umsetzung … Monate]]"],
        ["Industrie-Anbindung / Analytik", "[[von … bis … €]]", "[[Start in … Wochen, Pilot in … Wochen]]"],
      ],
      note: "[[Optional: Abrechnung (Festpreis / Tagessatz), Zahlungsplan, Betreuung nach Livegang]]",
    },
    faqTitle: "Häufige Fragen",
    faq: [
      { q: "Ist das Gespräch verbindlich?", a: "Nein, das Erstgespräch ist unverbindlich." },
      { q: "Wird vertraulich mit meinen Informationen umgegangen?", a: "Ja. Auf Wunsch schließen wir vorab eine Vertraulichkeitsvereinbarung (NDA)." },
      { q: "Remote oder vor Ort?", a: "Beides ist möglich. Das klären wir bei der Terminvereinbarung." },
      { q: "Was passiert mit meinen Daten bei der Buchung?", a: "Der Kalender wird erst nach Ihrer Einwilligung geladen. Alternativ erreichen Sie uns per E-Mail." },
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
    meta: { title: "Book an audit", description: "A short intro call about architecture, goals and next steps. Pick a slot online." },
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
    bring: ["A short description of your goal", "Existing systems or plants (roughly)", "Timeframe and people involved", "Open questions you want answered"],
    getTitle: "What you take away",
    get: ["A clear assessment of your project", "Recommendation on technology and approach", "Pointers to risks and pitfalls", "Concrete next steps"],
    effort: {
      title: "Effort and timeline",
      lead: "Rough guidelines so you can size things up in advance. A binding quote follows after the audit.",
      cols: ["Project type", "Investment", "Time to start / delivery"],
      rows: [
        ["Company website", "[[from … to … €]]", "[[Start in … weeks, delivery … weeks]]"],
        ["App or web platform", "[[from … to … €]]", "[[Start in … weeks, delivery … months]]"],
        ["Industrial connection / analytics", "[[from … to … €]]", "[[Start in … weeks, pilot in … weeks]]"],
      ],
      note: "[[Optional: billing (fixed price / day rate), payment plan, support after go-live]]",
    },
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Is the call binding?", a: "No, the intro call is non-binding." },
      { q: "Is my information treated confidentially?", a: "Yes. On request we sign a non-disclosure agreement (NDA) beforehand." },
      { q: "Remote or on site?", a: "Both are possible. We clarify this when booking." },
      { q: "What happens to my data when booking?", a: "The calendar only loads after your consent. Alternatively you can reach us by email." },
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

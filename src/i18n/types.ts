export type ColumnId = "industrial" | "backend" | "mobile";

export type ColumnCopy = {
  index: string;
  title: string;
  kicker: string;
  short: string;
  summary: string;
  stack: string[];
  focus: { label: string; weight: number }[];
  terminal: string[];
  cta: string;
};

export type Dictionary = {
  benefit: { eyebrow: string; title: string; note: string; items: { value: string; label: string; detail: string }[] };
  about: {
    eyebrow: string;
    title: string;
    bio: string;
    text: string;
    facts: string[];
    photoAlt: string;
    photoPlaceholder: string;
    refsTitle: string;
    refPlaceholder: string;
    ctaTitle: string;
    ctaButton: string;
  };
  meta: { title: string; description: string; ogLocale: string };
  a11y: { skip: string; mainNav: string; langSwitch: string; openMenu: string; closeMenu: string };
  nav: { services: string; references: string; process: string; about: string; audit: string; cta: string };
  hero: {
    eyebrow: string;
    tagline: string;
    pillars: [string, string, string];
    title: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    chips: string[];
    terminalCaption: string;
    terminalTitle: string;
    terminalLines: string[];
    meters: string[];
  };
  services: {
    eyebrow: string;
    title: string;
    lead: string;
    hint: string;
    tapHint: string;
    openPage: string;
    busLabel: string;
    columns: Record<ColumnId, ColumnCopy>;
  };
  process: { eyebrow: string; title: string; steps: { title: string; text: string }[] };
  engagement: {
    eyebrow: string;
    title: string;
    lead: string;
    audience: string;
    models: { title: string; text: string; fit: string }[];
    stepsTitle: string;
    steps: { title: string; text: string }[];
    cta: string;
  };
  audit: {
    eyebrow: string;
    title: string;
    lead: string;
    bullets: string[];
    gate: {
      title: string;
      text: string;
      once: string;
      always: string;
      external: string;
      mail: string;
      loaded: string;
      revoke: string;
      iframeTitle: string;
    };
  };
  consent: {
    title: string;
    text: string;
    essential: string;
    accept: string;
    privacy: string;
    saved: string;
  };
  footer: { tagline: string; imprint: string; privacy: string; settings: string; rights: string };
};

export type LegalSection = { heading: string; paragraphs: string[]; list?: string[] };
export type LegalDoc = { title: string; notice: string; updated: string; sections: LegalSection[] };

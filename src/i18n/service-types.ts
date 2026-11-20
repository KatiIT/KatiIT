import type { ColumnId } from "./types";

export type Option = {
  id: string;
  name: string;
  kind: string;
  summary: string;
  tech: string[];
  pros: string[];
  cons: string[];
  use: string[];
  avoid: string[];
};
export type OptionGroup = { title: string; lead: string; items: Option[] };

export type ServicePage = {
  column: ColumnId;
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string; chips: string[]; stats: string[] };
  groups: OptionGroup[];
  layers: { title: string; lead: string; items: { name: string; detail: string }[] };
  guide: { title: string; lead: string; criteria: string[]; rows: { id: string; name: string; scores: number[] }[] };
  process: { title: string; lead: string; steps: { title: string; text: string; tech: string }[] };
  methods: { title: string; items: { title: string; text: string }[] };
  cta: { title: string; text: string; button: string };
};

export type ServiceUi = {
  back: string;
  toc: { options: string; layers: string; guide: string; process: string; methods: string };
  pros: string;
  cons: string;
  use: string;
  avoid: string;
  guideHint: string;
  guideBest: string;
  guideScore: string;
  layersHint: string;
  others: string;
  stepLabel: string;
  more: string;
  tocLabel: string;
  /** Options-Zeilen, Popups und Vergleich */
  info: string;
  close: string;
  compare: string;
  compareTitle: string;
  compareLead: string;
  kindLabel: string;
  stackLabel: string;
  scoresLabel: string;
};

/** URL-Segmente der Detailseiten */
export const SERVICE_SLUGS = ["industrial", "engineering", "mobile"] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export const slugToColumn: Record<ServiceSlug, ColumnId> = { industrial: "industrial", engineering: "backend", mobile: "mobile" };
export const columnToSlug: Record<ColumnId, ServiceSlug> = { industrial: "industrial", backend: "engineering", mobile: "mobile" };
export const isServiceSlug = (v: string): v is ServiceSlug => (SERVICE_SLUGS as readonly string[]).includes(v);

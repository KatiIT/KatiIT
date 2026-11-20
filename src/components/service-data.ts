import type { ColumnId } from "@/i18n/types";
import { roundedPath, type Point } from "@/lib/circuit";

/** Koordinatensystem aller Overlays = Pixelmaße der Bilddatei (1380 × 752). */
export const IMAGE = { width: 1380, height: 752 } as const;

export type ColumnDef = {
  id: ColumnId;
  accent: string;
  rgb: string; // "r g b" für rgb(… / alpha)
  /** Mittelpunkt und Radien des Neon-Glühens in % der Bildfläche */
  glow: { x: number; y: number; rx: number; ry: number };
  /** Ausschnitt der Spalte im Bild (px), für die Mobile-Ansicht */
  crop: { x: number; w: number };
};

/** Reihenfolge entspricht dem Bild (links → rechts). */
export const COLUMNS: readonly ColumnDef[] = [
  { id: "industrial", accent: "#3B82F6", rgb: "59 130 246", glow: { x: 21, y: 50, rx: 22, ry: 64 }, crop: { x: 0, w: 500 } },
  { id: "backend", accent: "#F97316", rgb: "249 115 22", glow: { x: 47.5, y: 50, rx: 22, ry: 64 }, crop: { x: 480, w: 400 } },
  { id: "mobile", accent: "#10B981", rgb: "16 185 129", glow: { x: 81, y: 48, rx: 22, ry: 64 }, crop: { x: 860, w: 520 } },
];

/** Drei exakt gleich breite Spalten (minmax(0,…) verhindert, dass Inhalt eine Spalte aufweitet). */
export const GRID_TEMPLATE = "repeat(3, minmax(0, 1fr))";

/** Sichtfenster des Mobile-Ausschnitts: Seitenverhältnis 5:6, Breite in Bild-Pixeln. */
export const CROP_RATIO = 5 / 6;
export const CROP_VISIBLE_PX = IMAGE.height * CROP_RATIO;

export type Bridge = {
  id: string;
  between: readonly [ColumnId, ColumnId];
  colors: readonly [string, string];
  /** Leiterbahnen (Wegpunkte in Bild-Pixeln) */
  routes: readonly string[];
  /** Einstiegsknoten */
  nodes: readonly { x: number; y: number; column: ColumnId }[];
  /** Zwischenknoten (Kreuzungen) */
  junctions: readonly Point[];
  gradient: { x1: number; x2: number };
};

export const BRIDGES: readonly Bridge[] = [
  {
    id: "industrial-backend",
    between: ["industrial", "backend"],
    colors: ["#3B82F6", "#F97316"],
    routes: [
      roundedPath([[361, 259], [440, 262], [506, 312], [512, 432], [532, 462], [553, 466]], 18),
      roundedPath([[361, 271], [432, 274], [495, 320], [500, 436], [524, 474], [553, 478]], 18),
    ],
    nodes: [
      { x: 361, y: 259, column: "industrial" },
      { x: 553, y: 466, column: "backend" },
    ],
    junctions: [[512, 372]],
    gradient: { x1: 361, x2: 553 },
  },
  {
    id: "backend-mobile",
    between: ["backend", "mobile"],
    colors: ["#F97316", "#10B981"],
    routes: [
      roundedPath([[832, 466], [872, 466], [886, 450], [886, 304], [902, 286], [962, 286]], 18),
      roundedPath([[832, 478], [880, 478], [898, 460], [898, 312], [912, 298], [962, 298]], 18),
    ],
    nodes: [
      { x: 832, y: 466, column: "backend" },
      { x: 962, y: 286, column: "mobile" },
    ],
    junctions: [[886, 378]],
    gradient: { x1: 832, x2: 962 },
  },
];

/**
 * Hero-Bilder der Unterseiten (5:6, 1000×1200). Dateien in /public/hero/.
 * Zum Austauschen (z. B. gegen generierte PNG/JPG/WebP): Datei gleichen Namens ersetzen oder hier den Pfad ändern.
 * Erzeugt werden die SVGs von scripts/generate-hero-art.mjs.
 */
export const HERO_IMAGES: Record<ColumnId, { src: string; width: number; height: number }> = {
  industrial: { src: "/hero/industrial.svg", width: 1000, height: 1200 },
  backend: { src: "/hero/web.svg", width: 1000, height: 1200 },
  mobile: { src: "/hero/mobile.svg", width: 1000, height: 1200 },
};

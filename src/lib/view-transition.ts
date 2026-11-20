"use client";

import circuit from "@/assets/katiit-circuit.jpg";
import { COLUMNS, IMAGE } from "@/components/service-data";
import type { ColumnId } from "@/i18n/types";

/** Gemeinsamer Name des "geteilten Elements": Spaltenbild (Startseite) ⇄ Hero-Bild (Unterseite). */
export const VT_NAME = "svc-hero";

type Router = { push: (href: string) => void };
type Pending = { path: string; resolve: () => void } | null;
let pending: Pending = null;

const pathOf = (href: string) => href.split("#")[0].split("?")[0];

/** Wird von <TransitionSettler/> bei jedem Routenwechsel aufgerufen. */
export function settleTransition(pathname: string) {
  if (pending && pathOf(pending.path) === pathname) {
    const p = pending;
    pending = null;
    p.resolve();
  }
}

export function canMorph() {
  return typeof document !== "undefined" && "startViewTransition" in document && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Zeichnet den Bildausschnitt der Spalte (Hintergrundbild + Farbglühen) als schwebende Ebene über `rect`. */
function makeGhost(colId: ColumnId, rect: DOMRect) {
  const col = COLUMNS.find((c) => c.id === colId)!;
  const cx = col.crop.x + col.crop.w / 2;
  const s = rect.height / IMAGE.height;
  const el = document.createElement("div");
  el.setAttribute("aria-hidden", "true");
  Object.assign(el.style, {
    position: "fixed",
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    zIndex: "80",
    pointerEvents: "none",
    borderRadius: "16px",
    overflow: "hidden",
    border: `1px solid rgb(${col.rgb} / .6)`,
    backgroundColor: "#07090E",
    backgroundImage: `radial-gradient(ellipse 75% 70% at 50% 45%, rgb(${col.rgb} / .5), transparent 100%), url(${circuit.src})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `100% 100%, auto 100%`,
    backgroundPosition: `0 0, ${rect.width / 2 - cx * s}px 0`,
    viewTransitionName: VT_NAME,
  });
  document.body.appendChild(el);
  return el;
}

function rectOf(origin: HTMLElement | null) {
  if (!origin) return null;
  const r = origin.getBoundingClientRect();
  return r.width > 8 && r.height > 8 ? r : null;
}

/** Bild der Spalte auf der Startseite: mobil der Bildausschnitt, am Desktop die ganze Karte. */
export function columnOrigin(from: HTMLElement | null): HTMLElement | null {
  if (!from) return null;
  const article = from.closest<HTMLElement>("[data-column]") ?? from;
  const crop = article.querySelector<HTMLElement>("[data-vt-source]");
  return rectOf(crop) ? crop : article;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const jump = (y: number) => window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });

async function whenHeroReady(selector: string) {
  const deadline = performance.now() + 1500;
  let el: HTMLElement | null = null;
  // Hinweis: Während des DOM-Updates einer View Transition ist das Rendering angehalten, requestAnimationFrame feuert nicht.
  while (performance.now() < deadline && !(el = document.querySelector<HTMLElement>(selector))) await sleep(16);
  const img = el?.querySelector("img");
  if (img) await Promise.race([img.decode().catch(() => undefined), new Promise((r) => setTimeout(r, 600))]);
}

/**
 * Navigation mit Übergang.
 *  - forward: Spaltenbild (Startseite) wird zum Hero-Bild der Unterseite.
 *  - back: Hero-Bild fliegt zurück in die Spalte.
 * Ohne View-Transitions-Unterstützung oder bei "Bewegung reduzieren": normale Navigation
 * (der Fallback-Fade kommt aus globals.css).
 */
export function navigateWithTransition(opts: { router: Router; href: string; colId: ColumnId; mode: "forward" | "back"; origin?: HTMLElement | null }) {
  const { router, href, colId, mode, origin } = opts;
  if (!canMorph()) {
    router.push(href);
    return;
  }
  const doc = document as Document & { startViewTransition: (cb: () => Promise<void>) => { finished: Promise<void> } };
  let ghost: HTMLElement | null = null;
  if (mode === "forward") {
    const r = rectOf(origin ?? null);
    if (!r) {
      router.push(href);
      return;
    }
    ghost = makeGhost(colId, r);
  }
  if (mode === "forward") document.querySelectorAll<HTMLElement>("[data-vt-hero]").forEach((e) => (e.style.viewTransitionName = "none"));
  document.documentElement.dataset.vt = mode;
  const t = doc.startViewTransition(async () => {
    ghost?.remove(); // alter Zustand ist erfasst
    await new Promise<void>((resolve) => {
      pending = { path: href, resolve };
      setTimeout(() => settleTransition(pathOf(href)), 2500); // Sicherheitsnetz
      router.push(href);
    });
    if (mode === "forward") {
      jump(0);
      await whenHeroReady("[data-vt-hero]");
      await sleep(30); // Next setzt die Scrollposition nach dem Commit selbst
      jump(0);
    } else {
      await sleep(60);
      document.getElementById("services")?.scrollIntoView({ block: "start", behavior: "instant" as ScrollBehavior });
      const rect = rectOf(columnOrigin(document.querySelector<HTMLElement>(`[data-column="${colId}"]`)));
      if (rect) ghost = makeGhost(colId, rect); // neuer Zustand: Ziel in der Spalte
    }
  });
  t.finished.finally(() => {
    ghost?.remove();
    delete document.documentElement.dataset.vt;
  });
}

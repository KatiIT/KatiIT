"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/** Hydration-sicher: Server und erster Client-Render liefern false, danach der echte Wert. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(QUERY);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

/**
 * Bewegungsstärke für scroll-gesteuerte 3D-Effekte. Bei "Bewegung reduzieren" (macOS/iOS) bleibt der Effekt
 * sichtbar, aber deutlich sanfter, statt komplett zu entfallen. Er wird nur durch den Nutzer-Scroll ausgelöst.
 */
export function useMotionScale() {
  return usePrefersReducedMotion() ? 0.5 : 1;
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/** Leiterbahn zwischen Abschnitten. Zeichnet sich beim Scrollen und zündet die Endknoten. */
export function TraceDivider({ flip = false }: { flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 96%", "start 50%"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  const nodeOn = useTransform(p, [0.85, 1], [0.35, 1]);
  const startOn = useTransform(p, [0, 0.1], [0.35, 1]);
  const d = flip ? "M1000 8 H920 L896 32 H104 L80 56 H0" : "M0 8 H80 L104 32 H896 L920 56 H1000";
  const a = flip ? { left: "100%", top: "12.5%" } : { left: "0%", top: "12.5%" };
  const b = flip ? { left: "0%", top: "87.5%" } : { left: "100%", top: "87.5%" };
  const node = (pos: { left: string; top: string }, opacity: typeof nodeOn) => (
    <motion.span style={{ ...pos, opacity }} className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-space-950 sv-accent" aria-hidden="true">
      <span className="absolute inset-0.5 rounded-full bg-current" />
    </motion.span>
  );
  return (
    <div ref={ref} aria-hidden="true" className="relative mx-auto my-10 h-14 w-full max-w-7xl px-4 sm:px-6">
      <div className="relative h-full w-full">
        <svg viewBox="0 0 1000 64" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          <path d={d} fill="none" stroke="rgb(var(--rgb) / 0.2)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
          <motion.path d={d} fill="none" stroke="var(--accent)" strokeWidth={2} strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{ pathLength: p, filter: "drop-shadow(0 0 6px var(--accent))" }} />
        </svg>
        {node(a, startOn)}
        {node(b, nodeOn)}
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { ServicePage, ServiceUi } from "@/i18n/service-types";
import { Depth } from "./Depth";

/** Vertikale Leiterbahn mit Knoten je Prozessschritt. Die Leitung füllt sich beim Scrollen. */
export function ProcessTimeline({ steps, ui }: { steps: ServicePage["process"]["steps"]; ui: ServiceUi }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative space-y-6 pl-10 sm:pl-14">
      <span aria-hidden="true" className="absolute bottom-2 left-[15px] top-2 w-px bg-white/10 sm:left-[23px]" />
      <motion.span aria-hidden="true" className="absolute bottom-2 left-[14px] top-2 w-0.5 origin-top rounded-full sm:left-[22px]" style={{ scaleY: fill, background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} />
      {steps.map((s, i) => (
        <li key={s.title} className="relative">
          <span aria-hidden="true" className="absolute -left-10 top-5 grid h-8 w-8 place-items-center rounded-full border-2 bg-space-950 font-mono text-[11px] sv-accent sv-border sm:-left-14 sm:h-12 sm:w-12 sm:text-xs" style={{ borderColor: "var(--accent)" }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <Depth tilt={10} depth={80}>
            <div className="sv-glass rounded-2xl p-5">
              <p className="sr-only">
                {ui.stepLabel} {i + 1}
              </p>
              <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.text}</p>
              <p className="sv-accent mt-3 font-mono text-[11px] uppercase tracking-wider">{s.tech}</p>
            </div>
          </Depth>
        </li>
      ))}
    </ol>
  );
}

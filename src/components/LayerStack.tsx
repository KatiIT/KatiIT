"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useMotionScale } from "@/lib/use-reduced-motion";

type Item = { name: string; detail: string };

function Plane({ item, index, count, gap }: { item: Item; index: number; count: number; gap: MotionValue<number> }) {
  const z = useTransform(gap, (g) => (count - 1 - index) * g);
  return (
    <motion.div
      style={{ x: "-50%", y: "-50%", z, opacity: 0.94 - index * 0.04 }}
      className="sv-glass sv-pcb absolute left-1/2 top-1/2 flex aspect-[16/10] w-[min(80%,480px)] flex-col justify-between rounded-xl p-3 sm:p-4"
    >
      <span className="sv-accent font-mono text-[10px] uppercase tracking-wider sm:text-xs">0{index + 1}</span>
      <span className="text-sm font-semibold leading-tight text-ink sm:text-base">{item.name}</span>
    </motion.div>
  );
}

/** Isometrischer Schichtenstapel: Die Ebenen fahren beim Scrollen in der Tiefe auseinander. */
export function LayerStack({ items, hint, fixed = false }: { items: Item[]; hint: string; /** true: feste Staffelung ohne Scroll-Effekt (z. B. im Popup) */ fixed?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const k = useMotionScale();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "center 45%"] });
  const scrolled = useTransform(scrollYProgress, [0, 1], [10, 30 + 48 * k]);
  const still = useMotionValue(44);
  const gap = fixed ? still : scrolled;

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative mx-auto h-[400px] w-full max-w-xl sm:h-[500px]" style={{ perspective: 1700 }} aria-hidden="true">
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: "rotateX(58deg) rotateZ(-36deg) translateY(8%)" }}>
          {items.map((it, i) => (
            <Plane key={it.name} item={it} index={i} count={items.length} gap={gap} />
          ))}
        </div>
        {!fixed && <p className="absolute inset-x-0 bottom-0 text-center font-mono text-[11px] text-ink-faint">{hint}</p>}
      </div>
      <ol className="min-w-0 space-y-3">
        {items.map((it, i) => (
          <li key={it.name} className="flex gap-4 rounded-xl border border-white/10 bg-space-900/60 p-4">
            <span className="sv-accent font-mono text-xs">0{i + 1}</span>
            <div className="min-w-0">
              <p className="font-medium text-ink">{it.name}</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink-muted">{it.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

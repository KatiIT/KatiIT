"use client";

import { motion } from "framer-motion";
import type { ColumnId } from "@/i18n/types";
import { BRIDGES, COLUMNS, IMAGE } from "./service-data";

const accentOf = (id: ColumnId) => COLUMNS.find((c) => c.id === id)!.accent;

type Props = { active: ColumnId | null; reduce: boolean; inView: boolean };

/**
 * Inline-SVG-Leiterbahnen exakt im Koordinatensystem des Hintergrundbilds (1380 × 752).
 * Ruhe: Linien/Knoten bei ~50 %. Aktiv: Linien, die die aktive Spalte mit ihren Nachbarn
 * verbinden, glühen auf und zeigen Dash-Flow + pulsierende Einstiegsknoten.
 */
export function CircuitOverlay({ active, reduce, inView }: Props) {
  const t = reduce ? { duration: 0 } : { duration: 0.6, ease: "easeOut" as const };

  return (
    <svg
      viewBox={`0 0 ${IMAGE.width} ${IMAGE.height}`}
      className="absolute inset-0 h-full w-full overflow-visible"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id="circuit-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        {BRIDGES.map((b) => (
          <linearGradient key={b.id} id={`grad-${b.id}`} gradientUnits="userSpaceOnUse" x1={b.gradient.x1} y1="0" x2={b.gradient.x2} y2="0">
            <stop offset="0" stopColor={b.colors[0]} />
            <stop offset="1" stopColor={b.colors[1]} />
          </linearGradient>
        ))}
      </defs>

      {BRIDGES.map((b) => {
        const on = active !== null && b.between.includes(active);
        return (
          <g key={b.id}>
            {b.routes.map((d, i) => (
              <g key={i} fill="none" strokeLinecap="round" strokeLinejoin="round">
                {/* Neon-Schein */}
                <motion.path d={d} stroke={`url(#grad-${b.id})`} strokeWidth={7} filter="url(#circuit-blur)" initial={false} animate={{ opacity: on ? 0.85 : 0 }} transition={t} />
                {/* Leiterbahn (zeichnet sich beim Einblenden) */}
                <motion.path
                  d={d}
                  stroke={`url(#grad-${b.id})`}
                  strokeWidth={on ? 2.6 : 1.8}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: inView || reduce ? 1 : 0, opacity: inView || reduce ? (on ? 1 : 0.5) : 0 }}
                  transition={reduce ? { duration: 0 } : { pathLength: { duration: 1.4, delay: i * 0.2, ease: "easeInOut" }, opacity: { duration: 0.5 } }}
                />
                {/* Datenfluss */}
                {!reduce && (
                  <>
                    <path
                      d={d}
                      stroke={`url(#grad-${b.id})`}
                      strokeWidth={4}
                      strokeDasharray="14 34"
                      className={on ? "animate-dash-flow" : ""}
                      style={{ opacity: on ? 0.95 : 0, transition: "opacity .45s ease" }}
                    />
                    <path
                      d={d}
                      stroke="#fff"
                      strokeWidth={1.6}
                      strokeDasharray="3 45"
                      className={on ? "animate-dash-flow" : ""}
                      style={{ opacity: on ? 0.9 : 0, transition: "opacity .45s ease" }}
                    />
                  </>
                )}
              </g>
            ))}

            {b.junctions.map(([x, y], i) => (
              <motion.rect key={i} x={x - 3.5} y={y - 3.5} width={7} height={7} rx={1.5} transform={`rotate(45 ${x} ${y})`} fill="#07090E" stroke={`url(#grad-${b.id})`} strokeWidth={1.6} initial={false} animate={{ opacity: on ? 1 : 0.5 }} transition={t} />
            ))}

            {b.nodes.map((n) => {
              const color = accentOf(n.column);
              return (
                <g key={`${n.x}-${n.y}`} transform={`translate(${n.x} ${n.y})`}>
                  <motion.circle r={15} fill={color} initial={false} animate={{ opacity: on ? 0.28 : 0.1 }} transition={t} />
                  <motion.g initial={false} animate={{ opacity: on ? 1 : 0.6 }} transition={t}>
                    <circle r={6} fill="#07090E" stroke={color} strokeWidth={2} />
                    <circle r={2.4} fill={color} />
                  </motion.g>
                  {on && !reduce && <circle r={6} fill="none" stroke={color} strokeWidth={1.5} className="animate-node-ping" style={{ transformBox: "fill-box", transformOrigin: "center" }} />}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

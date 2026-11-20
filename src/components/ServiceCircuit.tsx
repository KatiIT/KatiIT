"use client";

import { useCallback, useEffect, useRef, useState, type FocusEvent } from "react";
import Image from "next/image";
import { TransitionLink } from "./TransitionLink";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import circuit from "@/assets/katiit-circuit.jpg";
import type { Locale } from "@/i18n/config";
import type { ColumnId, Dictionary } from "@/i18n/types";
import { useMediaQuery } from "@/lib/use-media-query";
import { columnToSlug } from "@/i18n/service-types";
import { CircuitOverlay } from "./CircuitOverlay";
import { ColumnCard } from "./ColumnCard";
import { COLUMNS, GRID_TEMPLATE, IMAGE } from "./service-data";

const CARDS_OFFSET = `${(IMAGE.height / IMAGE.width) * 100 - 13}%`; // Bildhöhe minus Überlappung (in % der Breite)

type Props = {
  dict: Dictionary["services"];
  lang: Locale;
  /** Kehrt die Spaltenreihenfolge um (z. B. für Right-to-Left). Das Bild wird dabei gespiegelt. */
  reversed?: boolean;
};

const ASPECT = `${IMAGE.width} / ${IMAGE.height}`;

export function ServiceCircuit({ dict, lang, reversed = false }: Props) {
  const reduce = usePrefersReducedMotion();
  const isStage = useMediaQuery("(min-width: 768px)");
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, margin: "0px 0px -20% 0px" });

  const [hover, setHover] = useState<ColumnId | null>(null);
  const [focus, setFocus] = useState<ColumnId | null>(null);
  const [demo, setDemo] = useState<ColumnId | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  const active = hover ?? focus;
  /** Auto-Demo (nur Touch) steuert Glühen/Verbinder, klappt aber nichts auf */
  const lit = active ?? demo;

  const enter = useCallback((id: ColumnId) => {
    clearTimeout(leaveTimer.current);
    setHover(id);
  }, []);
  const leave = useCallback(() => {
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setHover(null), 60);
  }, []);

  const bind = (id: ColumnId) => ({
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && enter(id),
    onPointerLeave: (e: React.PointerEvent) => e.pointerType === "mouse" && leave(),
    onFocus: () => setFocus(id),
    onBlur: (e: FocusEvent<HTMLElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocus(null);
    },
  });

  const t = reduce ? { duration: 0 } : { duration: 0.6, ease: "easeOut" as const };

  // Touch-Geräte ohne Hover: Verbindungen kurz automatisch vorführen, bis zur ersten Interaktion.
  const touchOnly = useMediaQuery("(hover: none)");
  const interacted = useRef(false);
  useEffect(() => {
    if (!touchOnly || reduce || !inView) return;
    let step = 0;
    const id = setInterval(() => {
      if (interacted.current || step >= 4) {
        clearInterval(id);
        setDemo(null);
        return;
      }
      setDemo(COLUMNS[step % COLUMNS.length].id);
      step++;
    }, 1400);
    return () => clearInterval(id);
  }, [touchOnly, reduce, inView]);

  return (
    <section id="services" aria-labelledby="services-title" className="relative z-10 scroll-mt-16 pb-20 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neon-blue">{dict.eyebrow}</p>
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="services-title" className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {dict.title}
          </h2>
          <p className="max-w-md text-pretty text-ink-muted">{dict.lead}</p>
        </div>
        <p className="mt-6 flex items-center gap-2 font-mono text-xs text-ink-muted md:hidden [@media(hover:hover)]:hidden">
          <span aria-hidden="true" className="h-2 w-2 animate-blink rounded-full bg-neon-green shadow-[0_0_8px_#10B981]" />
          {dict.tapHint}
        </p>
      </div>

      <div ref={stageRef} dir={reversed ? "rtl" : "ltr"} className="relative mx-auto flow-root max-w-[1440px]">
        {/* ── Bühne: Hintergrundbild + Glühen + Isolation + SVG-Circuit (nur ab md) ── */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 hidden md:block" style={{ aspectRatio: ASPECT }}>
          <div
            className="absolute inset-0"
            style={{ maskImage: "linear-gradient(to bottom, transparent 0, #000 5%, #000 62%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 5%, #000 62%, transparent 100%)" }}
          >
            <div className={`absolute inset-0 ${reversed ? "[transform:scaleX(-1)]" : ""}`}>
              <Image src={circuit} alt="" fill priority={false} sizes="(min-width: 1440px) 1440px, 100vw" quality={90} placeholder="blur" className="select-none object-cover" draggable={false} />

              {/* Glühen je Spalte: Ruhe 50 %, aktiv 80 % */}
              {COLUMNS.map((c) => (
                <motion.div
                  key={`glow-${c.id}`}
                  className="absolute inset-0 mix-blend-screen"
                  style={{
                    background: `radial-gradient(ellipse ${c.glow.rx}% ${c.glow.ry}% at ${c.glow.x}% ${c.glow.y}%, rgb(${c.rgb} / 0.55) 0%, rgb(${c.rgb} / 0.22) 45%, transparent 100%)`,
                  }}
                  initial={false}
                  animate={{ opacity: lit === c.id ? 0.8 : 0.5 }}
                  transition={t}
                />
              ))}

              {/* Fokus-Isolation: inaktive Spalten entsättigt & abgedunkelt */}
              <div className="absolute inset-0 grid" style={{ gridTemplateColumns: GRID_TEMPLATE }}>
                {COLUMNS.map((c) => (
                  <motion.div
                    key={`dim-${c.id}`}
                    initial={false}
                    animate={{ opacity: active !== null && active !== c.id ? 1 : 0 }}
                    transition={t}
                    style={{
                      backdropFilter: "saturate(0.5) brightness(0.58)",
                      WebkitBackdropFilter: "saturate(0.5) brightness(0.58)",
                      maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
                      WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
                    }}
                  />
                ))}
              </div>

              <CircuitOverlay active={lit} reduce={reduce} inView={inView} />
            </div>
          </div>
          {/* seitlicher Weichzeichner zum Seitenhintergrund */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #07090E 0, transparent 4%, transparent 96%, #07090E 100%)" }} />
        </div>

        {/* ── Trefferflächen über dem Bild (Maus/Touch) ── */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 hidden md:grid" style={{ aspectRatio: ASPECT, gridTemplateColumns: GRID_TEMPLATE }}>
          {COLUMNS.map((c) => (
            <TransitionLink key={`hit-${c.id}`} colId={c.id} href={`/${lang}/services/${columnToSlug[c.id]}`} prefetch={false} tabIndex={-1} aria-hidden="true" className="block cursor-pointer" onPointerEnter={(e) => e.pointerType === "mouse" && enter(c.id)} onPointerLeave={(e) => e.pointerType === "mouse" && leave()} />
          ))}
        </div>

        {/* ── Karten: gestapelt auf Mobile, 3-Spalten-Raster auf Desktop/Tablet ── */}
        <div
          className={`relative flex gap-0 md:[grid-template-columns:var(--cols)] md:mt-[var(--offset)] px-4 sm:px-6 md:grid md:items-stretch md:gap-3 md:px-3 lg:px-4 ${reversed ? "flex-col-reverse" : "flex-col"}`}
          style={{ ["--cols" as string]: GRID_TEMPLATE, ["--offset" as string]: CARDS_OFFSET }}
        >
          {COLUMNS.map((c, i) => (
            <ColumnCard
              key={c.id}
              col={c}
              copy={dict.columns[c.id]}
              lang={lang}
              active={active === c.id}
              glowing={demo === c.id}
              dimmed={isStage && active !== null && active !== c.id}
              reduce={reduce}
              isLast={reversed ? i === 0 : i === COLUMNS.length - 1}
              bind={bind(c.id)}
              openLabel={dict.openPage}
              onOpen={() => {
                interacted.current = true;
                setDemo(null);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

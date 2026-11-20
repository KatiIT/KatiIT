"use client";

import { useRef, type CSSProperties, type FocusEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TransitionLink } from "./TransitionLink";
import { columnOrigin, navigateWithTransition } from "@/lib/view-transition";
import { motion, useInView } from "framer-motion";
import circuit from "@/assets/katiit-circuit.jpg";
import type { ColumnCopy } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { columnToSlug } from "@/i18n/service-types";
import { CROP_RATIO, CROP_VISIBLE_PX, IMAGE, type ColumnDef } from "./service-data";

type Props = {
  col: ColumnDef;
  copy: ColumnCopy;
  lang: Locale;
  active: boolean;
  /** Nur Glühen/Verbinder (z. B. Auto-Demo auf Mobile), ohne Aufklappen */
  glowing: boolean;
  dimmed: boolean;
  reduce: boolean;
  isLast: boolean;
  bind: { onPointerEnter: (e: React.PointerEvent) => void; onPointerLeave: (e: React.PointerEvent) => void; onFocus: () => void; onBlur: (e: FocusEvent<HTMLElement>) => void };
  openLabel: string;
  onOpen: () => void;
};

/**
 * Mobile-Ausschnitt (< md): Fenster mit festem Seitenverhältnis, zentriert auf die Spalte.
 * Skaliert mit der Kartenbreite, daher auf jeder Handybreite ohne Abschneiden nutzbar.
 */
function Crop({ col, lit }: { col: ColumnDef; lit: boolean }) {
  const centre = col.crop.x + col.crop.w / 2;
  const start = Math.min(Math.max(centre - CROP_VISIBLE_PX / 2, 0), IMAGE.width - CROP_VISIBLE_PX);
  return (
    <div data-vt-source className="relative w-full overflow-hidden rounded-t-2xl [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)] md:hidden" style={{ aspectRatio: `${CROP_RATIO}` }} aria-hidden="true">
      <div className="absolute left-0 top-0 h-full" style={{ aspectRatio: `${IMAGE.width} / ${IMAGE.height}`, transform: `translateX(-${(start / IMAGE.width) * 100}%)` }}>
        <Image src={circuit} alt="" fill sizes="1000px" quality={85} className="select-none object-cover" draggable={false} />
      </div>
      <div
        className="absolute inset-0 mix-blend-screen transition-opacity duration-500"
        style={{ opacity: lit ? 0.8 : 0.5, background: `radial-gradient(ellipse 75% 70% at 50% 45%, rgb(${col.rgb} / 0.55), transparent 100%)` }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: "linear-gradient(to bottom, transparent, rgb(11 15 23 / 0.95))" }} />
    </div>
  );
}

export function ColumnCard({ col, copy, lang, active, glowing, dimmed, reduce, isLast, bind, openLabel, onOpen }: Props) {
  const router = useRouter();
  const href = `/${lang}/services/${columnToSlug[col.id]}`;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const go = (el: HTMLElement) => navigateWithTransition({ router, href, colId: col.id, mode: "forward", origin: columnOrigin(el) });
  const lit = active || glowing;
  const glow = lit ? 0.8 : 0.5;
  const titleId = `col-${col.id}-title`;
  const tr = reduce ? { duration: 0 } : { duration: 0.5, ease: "easeOut" as const };

  const style = {
    borderColor: `rgb(${col.rgb} / ${glow * 0.75})`,
    boxShadow: `0 0 ${Math.round(glow * 48)}px -8px rgb(${col.rgb} / ${glow}), inset 0 1px 0 rgb(255 255 255 / 0.07), inset 0 0 ${Math.round(glow * 40)}px -20px rgb(${col.rgb} / ${glow})`,
  } as CSSProperties;

  const chip = (s: string) => (
    <li key={s} className="rounded-md border px-2 py-0.5 text-ink-muted" style={{ borderColor: `rgb(${col.rgb} / ${lit ? 0.55 : 0.3})`, background: `rgb(${col.rgb} / ${lit ? 0.14 : 0.07})`, transition: "all .5s" }}>
      {s}
    </li>
  );

  return (
    <motion.article
      ref={ref}
      tabIndex={0}
      aria-labelledby={titleId}
      data-column={col.id}
      data-active={active || undefined}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) return;
        onOpen();
        go(e.currentTarget);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target === e.currentTarget) {
          onOpen();
          go(e.currentTarget);
        }
      }}
      onPointerEnter={bind.onPointerEnter}
      onPointerLeave={bind.onPointerLeave}
      onFocus={bind.onFocus}
      onBlur={bind.onBlur}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={inView || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={reduce ? { duration: 0 } : { duration: 0.7, ease: "easeOut" }}
      className={`group relative mx-auto cursor-pointer flex w-full max-w-[520px] flex-col outline-offset-4 focus-visible:outline focus-visible:outline-2 md:mx-0 md:max-w-none ${active ? "z-20" : "z-0"}`}
      style={{ outlineColor: col.accent }}
    >
      <Crop col={col} lit={lit} />

      <div
        style={style}
        className="relative flex flex-1 flex-col rounded-b-2xl border border-t-0 bg-space-900/85 p-4 backdrop-blur-xl transition-[border-color,box-shadow] duration-500 sm:p-5 md:rounded-2xl md:border-t md:bg-space-900/60 md:p-4 lg:p-5"
      >
        <motion.div initial={false} animate={{ opacity: dimmed ? 0.6 : 1, filter: dimmed ? "saturate(0.5)" : "saturate(1)" }} transition={tr} className="flex flex-col">
          <div className="flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-wider">
            <span className="min-w-0 truncate" style={{ color: col.accent }}>
              {copy.kicker}
            </span>
            <span className="shrink-0 text-ink-faint">{copy.index}</span>
          </div>
          <h3 id={titleId} className="mt-3 text-balance break-words text-[15px] font-semibold leading-snug text-ink lg:text-base xl:text-[17px]">
            {copy.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{copy.short}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5 font-mono text-[11px]" aria-label="Stack">
            {copy.stack.slice(0, 3).map(chip)}
          </ul>
          <TransitionLink
            href={href}
            colId={col.id}
            prefetch={false}
            className="mt-4 inline-flex min-h-8 items-center gap-1.5 self-start rounded-sm text-sm font-medium text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ outlineColor: col.accent }}
          >
            <span className="underline decoration-white/20 underline-offset-4 transition group-hover:decoration-current" style={{ textDecorationColor: lit ? col.accent : undefined }}>
              {openLabel}
            </span>
            <span aria-hidden="true" style={{ color: col.accent }}>→</span>
          </TransitionLink>
        </motion.div>

        {/*
          Details: ab md als schwebendes Panel (absolut, ändert die Zeilenhöhe NICHT, daher kein Springen
          der Folgeabschnitte). Unter md klappt es im Fluss auf (grid-rows 0fr → 1fr).
        */}
        <div
          className={`grid max-md:hidden transition-[grid-template-rows] duration-500 ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} md:absolute md:inset-x-0 md:top-full md:z-30 md:block md:pt-2 md:transition-opacity md:duration-300 ${
            active ? "md:opacity-100" : "md:pointer-events-none md:opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden md:overflow-visible">
            <div
              className="pt-4 md:rounded-2xl md:border md:bg-space-900/95 md:p-4 md:shadow-2xl lg:p-5"
              style={{ borderColor: `rgb(${col.rgb} / 0.6)`, boxShadow: undefined }}
            >
              <p className="text-sm leading-relaxed text-ink-muted">{copy.summary}</p>
              {copy.stack.length > 3 && (
                <ul className="mt-4 flex flex-wrap gap-1.5 font-mono text-[11px]" aria-label="Stack">
                  {copy.stack.slice(3).map(chip)}
                </ul>
              )}
              <ul className="mt-4 space-y-2.5">
                {copy.focus.map((f, i) => (
                  <li key={f.label}>
                    <div className="mb-1 text-xs text-ink-muted">{f.label}</div>
                    <div className="h-1 overflow-hidden rounded-full bg-white/[0.08]" aria-hidden="true">
                      <motion.div
                        className="h-full origin-left rounded-full"
                        style={{ background: col.accent, boxShadow: `0 0 10px ${col.accent}` }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: active || reduce ? f.weight : 0 }}
                        transition={reduce ? { duration: 0 } : { duration: 0.9, delay: 0.1 + i * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 overflow-hidden rounded-lg border border-white/[0.07] bg-black/30 px-3 py-2.5 font-mono text-[11px] leading-5" aria-hidden="true">
                {copy.terminal.map((l, i) => (
                  <div key={l} className="truncate" style={{ color: i === 0 ? "#E6EAF2" : col.accent }}>
                    {l}
                    {active && !reduce && i === copy.terminal.length - 1 && <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 animate-blink" style={{ background: col.accent }} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: kurze Datenbrücke zur nächsten Karte */}
      {!isLast && (
        <svg className="mx-auto block h-8 w-6 md:hidden" viewBox="0 0 24 32" aria-hidden="true" fill="none">
          <path d="M12 0v32" stroke={col.accent} strokeOpacity={lit ? 0.9 : 0.5} strokeWidth="1.8" />
          {!reduce && lit && <path d="M12 0v32" stroke={col.accent} strokeWidth="2.6" strokeDasharray="6 42" className="animate-dash-flow" />}
          <circle cx="12" cy="30" r="3" fill="#07090E" stroke={col.accent} strokeWidth="1.6" />
        </svg>
      )}
    </motion.article>
  );
}

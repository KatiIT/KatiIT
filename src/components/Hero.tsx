import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import circuit from "@/assets/katiit-circuit.jpg";
import type { Locale } from "@/i18n/config";
import { columnToSlug } from "@/i18n/service-types";
import type { ColumnId, Dictionary } from "@/i18n/types";
import { TransitionLink } from "./TransitionLink";
import { COLUMNS } from "./service-data";

/*
 * Hero-Komposition der Startseite, in Bausteine zerlegt. Die Unterseiten (ServiceHero) verwenden
 * dieselben Bausteine, damit beide Heros gleich aufgebaut sind und gleich aussehen:
 * Hintergrundbild + Verlauf, Eyebrow-Pille, große Headline, Lead, drei Farbbalken, zwei Buttons.
 */

export const heroBtnPrimary = "inline-flex min-h-12 items-center justify-center rounded-lg bg-ink px-6 text-sm font-medium text-space-950 shadow-[0_0_30px_-6px_rgba(230,234,242,0.5)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue";
export const heroBtnSecondary = "inline-flex min-h-12 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-6 text-sm font-medium text-ink backdrop-blur transition hover:border-white/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue";

/** Rahmen: Bild liegt hinter dem Text, ein Verlauf von links sorgt für Lesbarkeit. */
export function HeroFrame({ backdrop, overlay = true, glow, children }: { backdrop: ReactNode; overlay?: boolean; glow?: string; children: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/[0.06]">
      {backdrop}
      {glow && <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[560px]" style={{ background: `radial-gradient(45% 60% at 75% 30%, rgb(${glow} / .22), transparent 70%)` }} />}
      {overlay && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(90deg, rgba(7,9,14,.97) 0%, rgba(7,9,14,.86) 45%, rgba(7,9,14,.45) 100%), linear-gradient(180deg, rgba(7,9,14,.2) 60%, #07090E 100%)" }}
        />
      )}
      <div className="mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-24 lg:pb-24">{children}</div>
    </section>
  );
}

export function HeroEyebrow({ children, color = "#10B981" }: { children: ReactNode; color?: string }) {
  return (
    <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 font-mono text-xs text-ink-muted backdrop-blur">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
      <span className="min-w-0 break-words">{children}</span>
    </p>
  );
}

/** Drei Farbbalken (Industrie / Web / Mobile). Mit `current` leuchtet der aktuelle Bereich und ist kein Link. */
export function HeroPillars({ lang, labels, current, ariaLabel }: { lang: Locale; labels: readonly string[]; current?: ColumnId; ariaLabel?: string }) {
  return (
    <nav aria-label={ariaLabel}>
      <ul className="grid max-w-xl grid-cols-3 gap-3 sm:gap-4">
        {COLUMNS.map((c, i) => {
          const active = c.id === current;
          const bar = <span aria-hidden="true" className={`block rounded-full transition ${active ? "h-2" : "h-1.5 group-hover:h-2"}`} style={{ background: c.accent, boxShadow: `0 0 ${active ? 22 : 14}px ${c.accent}`, opacity: current && !active ? 0.55 : 1 }} />;
          const label = (
            <span className={`mt-2 flex items-start justify-between gap-1 text-[13px] font-medium leading-tight sm:text-sm ${current && !active ? "text-ink-muted" : "text-ink"}`}>
              <span className="min-w-0">{labels[i]}</span>
              <span aria-hidden="true" className={`hidden transition sm:inline ${active ? "" : "group-hover:translate-x-0.5"}`} style={{ color: c.accent }}>
                {active ? "●" : "→"}
              </span>
            </span>
          );
          return (
            <li key={c.id} className="min-w-0">
              {active ? (
                <span aria-current="page" className="block pt-1">
                  {bar}
                  {label}
                </span>
              ) : (
                <TransitionLink originSelf colId={c.id} href={`/${lang}/services/${columnToSlug[c.id]}`} className="group block rounded-lg pt-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" style={{ outlineColor: c.accent }}>
                  {bar}
                  {label}
                </TransitionLink>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function HeroActions({ primary, secondary }: { primary: { href: string; label: string }; secondary: { href: string; label: string } }) {
  return (
    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
      <Link href={primary.href} className={heroBtnPrimary}>
        {primary.label}
      </Link>
      <a href={secondary.href} className={heroBtnSecondary}>
        {secondary.label}
        <span aria-hidden="true" className="ml-2">↓</span>
      </a>
    </div>
  );
}

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary["hero"] }) {
  return (
    <HeroFrame backdrop={<Image src={circuit} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[70%_50%]" aria-hidden="true" />}>
      <HeroEyebrow>{dict.eyebrow}</HeroEyebrow>
      <p aria-hidden="true" className="mt-6 text-[clamp(3.5rem,13vw,7.5rem)] font-bold leading-none tracking-tight text-ink">
        Kati<span className="text-neon-blue">IT</span>
      </p>
      <p className="mt-3 text-xl font-medium text-ink sm:text-3xl">{dict.tagline}</p>
      <h1 className="mt-6 max-w-2xl hyphens-auto text-balance break-words text-lg font-normal leading-snug text-ink-muted sm:text-2xl">{dict.title}</h1>
      <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-ink-muted">{dict.lead}</p>
      <div className="mt-10">
        <HeroPillars lang={lang} labels={dict.pillars} />
      </div>
      <HeroActions primary={{ href: `/${lang}/audit`, label: dict.ctaPrimary }} secondary={{ href: `/${lang}#services`, label: dict.ctaSecondary }} />
    </HeroFrame>
  );
}

import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { site } from "@/config/site";
import { Ph } from "./Placeholder";

export function About({ dict, lang }: { dict: Dictionary["about"]; lang: Locale }) {
  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-16 border-t border-white/[0.06] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:gap-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
          <div className="relative mx-auto aspect-[16/11] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-space-900 md:aspect-[4/5] md:max-w-none">
            {site.portrait ? (
              <Image src={site.portrait} alt={dict.photoAlt} fill sizes="(min-width: 1024px) 340px, (min-width: 768px) 280px, 90vw" className="object-cover" />
            ) : (
              <div
                className="grid h-full w-full place-items-center p-6 text-center font-mono text-xs text-ink-faint"
                style={{ background: "radial-gradient(60% 50% at 50% 35%, rgb(59 130 246 / .22), transparent 70%), radial-gradient(50% 40% at 80% 90%, rgb(16 185 129 / .2), transparent 70%)" }}
              >
                <div>
                  <svg className="mx-auto mb-3 h-14 w-14 text-ink-faint" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="32" cy="24" r="10" />
                    <path d="M12 54c2-11 10-17 20-17s18 6 20 17" />
                  </svg>
                  <Ph>{dict.photoPlaceholder}</Ph>
                </div>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-neon-green">{dict.eyebrow}</p>
            <h2 id="about-title" className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              {dict.title}
            </h2>
            <p className="mt-5 max-w-prose text-pretty leading-relaxed text-ink-muted">
              <Ph>{dict.bio}</Ph>
            </p>
            <p className="mt-3 max-w-prose text-pretty leading-relaxed text-ink-muted">
              <Ph>{dict.text}</Ph>
            </p>
            <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-ink-muted">
              {dict.facts.map((f) => (
                <li key={f} className="rounded-lg border border-white/10 px-3 py-1.5">
                  <Ph>{f}</Ph>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12" role="group" aria-label={dict.refsTitle}>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">{dict.refsTitle}</p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }, (_, i) => (
              <li key={i} className="grid h-14 place-items-center rounded-xl border border-dashed border-white/15 px-2 text-center font-mono text-[11px] text-ink-faint">
                <Ph>{dict.refPlaceholder}</Ph>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/10 p-6 sm:flex-row sm:items-center sm:p-8" style={{ background: "linear-gradient(120deg, rgb(59 130 246 / .12), rgb(249 115 22 / .1), rgb(16 185 129 / .12))" }}>
          <h3 className="max-w-md text-balance text-xl font-semibold">{dict.ctaTitle}</h3>
          <a
            href={`/${lang}/audit`}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-ink px-6 text-sm font-medium text-space-950 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue sm:w-auto"
          >
            {dict.ctaButton}
          </a>
        </div>
      </div>
    </section>
  );
}

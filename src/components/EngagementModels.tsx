import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function EngagementModels({ lang, dict }: { lang: Locale; dict: Dictionary["engagement"] }) {
  return (
    <section id="engagement" aria-labelledby="engagement-title" className="relative scroll-mt-16 border-t border-white/[0.06] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neon-blue">{dict.eyebrow}</p>
        <h2 id="engagement-title" className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {dict.title}
        </h2>
        <p className="mt-4 max-w-3xl text-ink-muted">{dict.lead}</p>
        <p className="mt-2 max-w-3xl text-ink-muted">{dict.audience}</p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dict.models.map((m) => (
            <li key={m.title} className="rounded-2xl border border-white/10 bg-space-900/60 p-6">
              <h3 className="text-lg font-semibold text-ink">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{m.text}</p>
              <p className="mt-3 font-mono text-[11px] text-ink-faint">{m.fit}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-14 text-xl font-semibold text-ink">{dict.stepsTitle}</h3>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dict.steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-white/10 bg-space-900/40 p-5">
              <span className="font-mono text-xs text-neon-orange">0{i + 1}</span>
              <h4 className="mt-2 font-semibold text-ink">{s.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{s.text}</p>
            </li>
          ))}
        </ol>

        <Link
          href={`/${lang}/audit`}
          className="mt-10 inline-flex min-h-11 items-center rounded-lg bg-neon-blue px-5 text-sm font-semibold text-space-950 transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-blue"
        >
          {dict.cta}
        </Link>
      </div>
    </section>
  );
}

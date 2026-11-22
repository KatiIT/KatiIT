import type { Locale } from "@/i18n/config";
import { trust } from "@/i18n/trust";
import { Ph } from "./Placeholder";

const accents = ["#3B82F6", "#F97316"];

export function References({ lang }: { lang: Locale }) {
  const t = trust[lang];
  const ext = "inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/15 px-4 text-sm font-medium text-ink transition hover:border-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue";
  return (
    <section id="references" aria-labelledby="ref-title" className="relative scroll-mt-16 border-t border-white/[0.06] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neon-green">{t.eyebrow}</p>
        <h2 id="ref-title" className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h2>
        <p className="mt-4 max-w-2xl text-pretty text-ink-muted">{t.lead}</p>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {t.refs.map((r, i) => (
            <li key={r.id} className="min-w-0">
              <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-space-900/60 p-6 backdrop-blur-xl">
                <span aria-hidden="true" className="absolute inset-x-6 top-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${accents[i]}, transparent)` }} />
                <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: accents[i] }}>{r.kind}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">{r.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{r.summary}</p>
                <dl className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm">
                  {([[t.labels.role, r.role], [t.labels.result, r.result], [t.labels.tech, r.tech]] as const).map(([k, v]) => (
                    <div key={k} className="grid gap-1 sm:grid-cols-[7rem_1fr]">
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">{k}</dt>
                      <dd className="min-w-0 text-ink-muted"><Ph>{v}</Ph></dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 pt-1">
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className={ext}>
                    {t.labels.visit} <span className="font-mono text-xs text-ink-muted">{r.host}</span>
                    <span aria-hidden="true">↗</span>
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {t.quote ? (
          <figure className="mt-6 rounded-2xl border border-white/10 bg-space-900/40 p-6">
            <figcaption className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">{t.labels.quote}</figcaption>
            <blockquote className="mt-2 text-lg text-ink"><Ph>{t.quote}</Ph></blockquote>
          </figure>
        ) : null}

        <div className="relative mt-6 grid gap-6 overflow-hidden rounded-2xl border border-neon-green/30 bg-space-900/60 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-wider text-neon-green">{t.team.eyebrow}</p>
            <h3 className="mt-2 text-balance text-2xl font-semibold tracking-tight">{t.team.title}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.team.text}</p>
            <p className="mt-3 text-sm text-ink-muted"><Ph>{t.team.note}</Ph></p>
          </div>
          <div className="min-w-0">
            <ul className="space-y-2 text-sm text-ink-muted">
              {t.team.points.map((p) => (
                <li key={p} className="flex gap-2"><span aria-hidden="true" className="text-neon-green">✓</span>{p}</li>
              ))}
            </ul>
            <a href={t.team.url} target="_blank" rel="noopener noreferrer" className={`${ext} mt-5`}>
              {t.team.visit} <span className="font-mono text-xs text-ink-muted">{t.team.host}</span>
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { columnToSlug, type ServicePage, type ServiceUi } from "@/i18n/service-types";
import { COLUMNS } from "./service-data";
import { Depth } from "./Depth";
import { DecisionGuide } from "./DecisionGuide";
import { OptionsExplorer } from "./OptionsExplorer";
import { ProcessTimeline } from "./ProcessTimeline";
import { ServiceHero } from "./ServiceHero";
import { TraceDivider } from "./TraceDivider";

function Section({ id, eyebrow, title, lead, children }: { id: string; eyebrow: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-7xl scroll-mt-32 px-4 sm:px-6">
      <p className="sv-accent font-mono text-xs uppercase tracking-[0.2em]">{eyebrow}</p>
      <h2 id={`${id}-title`} className="mt-3 max-w-3xl text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-ink-muted">{lead}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}

export function ServicePageView({ page, ui, lang, others, pillars }: { page: ServicePage; ui: ServiceUi; lang: Locale; pillars: [string, string, string]; others: { slug: string; title: string; column: (typeof COLUMNS)[number]["id"] }[] }) {
  const col = COLUMNS.find((c) => c.id === page.column)!;
  const vars = { "--accent": col.accent, "--rgb": col.rgb } as CSSProperties;

  return (
    <div style={vars} className="relative pb-24">
      <ServiceHero col={col} page={page} ui={ui} lang={lang} pillars={pillars} />

      <nav aria-label={ui.tocLabel} className="sticky top-16 z-30 border-y border-white/[0.06] bg-space-950/95 backdrop-blur-xl">
        <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2 sm:px-6">
          {([["options", ui.toc.options], ["guide", ui.toc.guide], ["process", ui.toc.process], ["methods", ui.toc.methods]] as const).map(([id, label]) => (
            <li key={id} className="shrink-0">
              <a href={`#${id}`} className="sv-chip inline-flex min-h-10 items-center rounded-full px-4 text-sm text-ink-muted transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="h-14" aria-hidden="true" />
      <Section id="options" eyebrow={page.hero.eyebrow} title={ui.toc.options}>
        <OptionsExplorer groups={page.groups} layers={page.layers} ui={ui} lang={lang} accent={col.accent} />
      </Section>

      <TraceDivider />
      <Section id="guide" eyebrow={ui.toc.guide} title={page.guide.title} lead={page.guide.lead}>
        <DecisionGuide guide={page.guide} ui={ui} options={page.groups.flatMap((g) => g.items)} />
      </Section>

      <TraceDivider />
      <Section id="process" eyebrow={ui.toc.process} title={page.process.title} lead={page.process.lead}>
        <ProcessTimeline steps={page.process.steps} ui={ui} />
      </Section>

      <TraceDivider flip />
      <Section id="methods" eyebrow={ui.toc.methods} title={page.methods.title}>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {page.methods.items.map((m) => (
            <li key={m.title} className="min-w-0">
              <Depth className="h-full" tilt={14} depth={100}>
                <div className="sv-glass h-full rounded-2xl p-5">
                  <h3 className="font-semibold text-ink">{m.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{m.text}</p>
                </div>
              </Depth>
            </li>
          ))}
        </ul>
      </Section>

      <div className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="sv-glass flex flex-col items-start justify-between gap-6 rounded-2xl p-6 sm:flex-row sm:items-center sm:p-10">
          <div className="min-w-0">
            <h2 className="max-w-xl text-balance text-2xl font-semibold tracking-tight">{page.cta.title}</h2>
            <p className="mt-3 max-w-xl text-ink-muted">{page.cta.text}</p>
          </div>
          <a href={`/${lang}/audit`} className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-ink px-6 text-sm font-medium text-space-950 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue sm:w-auto">
            {page.cta.button}
          </a>
        </div>

        <nav aria-label={ui.others} className="mt-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">{ui.others}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {others.map((o) => {
              const c = COLUMNS.find((x) => x.id === o.column)!;
              return (
                <li key={o.slug}>
                  <Link
                    href={`/${lang}/services/${o.slug}`}
                    className="flex items-center justify-between gap-4 rounded-xl border bg-space-900/60 p-4 transition hover:bg-space-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{ borderColor: `rgb(${c.rgb} / 0.4)`, outlineColor: c.accent }}
                  >
                    <span className="min-w-0 font-medium text-ink">{o.title}</span>
                    <span aria-hidden="true" style={{ color: c.accent }}>→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export { columnToSlug };

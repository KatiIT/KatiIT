import type { Option, ServiceUi } from "@/i18n/service-types";

function List({ title, items, glyph, tone }: { title: string; items: string[]; glyph: string; tone: string }) {
  return (
    <div>
      <h4 className={`font-mono text-[11px] uppercase tracking-wider ${tone}`}>{title}</h4>
      <ul className="mt-2 space-y-1.5 text-[13.5px] leading-relaxed text-ink-muted">
        {items.map((t) => (
          <li key={t} className="flex gap-2">
            <span aria-hidden="true" className={`mt-px shrink-0 font-mono ${tone}`}>
              {glyph}
            </span>
            <span className="min-w-0">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OptionCard({ option, ui }: { option: Option; ui: ServiceUi }) {
  return (
    <article id={option.id} className="sv-glass flex h-full flex-col rounded-2xl p-5 sm:p-6">
      <p className="sv-accent font-mono text-[11px] uppercase tracking-wider">{option.kind}</p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">{option.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{option.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5 font-mono text-[11px]" aria-label="Stack">
        {option.tech.map((t) => (
          <li key={t} className="sv-chip rounded-md px-2 py-0.5 text-ink-muted">
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-5 space-y-5 border-t border-white/10 pt-5">
        <List title={ui.pros} items={option.pros} glyph="+" tone="text-neon-green" />
        <List title={ui.cons} items={option.cons} glyph="−" tone="text-neon-orange" />
      </div>
      <details className="group mt-5 border-t border-white/10 pt-4">
        <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 rounded-md font-mono text-[11px] uppercase tracking-wider text-ink-muted transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue">
          {ui.more}
          <span aria-hidden="true" className="sv-accent text-base transition group-open:rotate-45">+</span>
        </summary>
        <div className="mt-4 space-y-5">
          <List title={ui.use} items={option.use} glyph="→" tone="sv-accent" />
          <List title={ui.avoid} items={option.avoid} glyph="×" tone="text-ink-faint" />
        </div>
      </details>
    </article>
  );
}

import type { Option, ServicePage, ServiceUi } from "@/i18n/service-types";

/**
 * Vergleich aller Optionen nebeneinander. Bewertungen stammen aus der Entscheidungs-Matrix (guide.rows,
 * zugeordnet über die Options-ID), Art/Stack/Vor- und Nachteile aus den Optionskarten.
 * Optionen ohne Matrix-Zeile zeigen "–" bei der Bewertung.
 */
export function ComparePanel({ options, guide, ui }: { options: Option[]; guide: ServicePage["guide"]; ui: ServiceUi }) {
  const rowOf = (id: string) => guide.rows.find((r) => r.id === id);
  const th = "sticky left-0 z-10 w-32 min-w-[8rem] border-r border-white/10 bg-space-950 px-3 py-3 text-left align-top font-mono text-[11px] font-normal uppercase tracking-wider text-ink-faint sm:w-40";
  const td = "min-w-[11rem] px-3 py-3 align-top text-[13px] leading-snug text-ink-muted sm:min-w-[13rem]";
  const band = "border-t border-white/10";

  return (
    <div>
      <p className="mb-5 max-w-2xl text-pretty text-sm leading-relaxed text-ink-muted">{ui.compareLead}</p>
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="border-collapse text-left">
          <caption className="sr-only">{ui.compareTitle}</caption>
          <thead>
            <tr className="bg-white/[0.03]">
              <td className={`${th} bg-space-900`} />
              {options.map((o) => (
                <th key={o.id} scope="col" className="min-w-[11rem] px-3 py-3 align-top sm:min-w-[13rem]">
                  <span className="block text-[15px] font-semibold text-ink">{o.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className={band}>
              <th scope="row" className={th}>{ui.kindLabel}</th>
              {options.map((o) => <td key={o.id} className={td}>{o.kind}</td>)}
            </tr>
            <tr className={band}>
              <th scope="row" className={th}>{ui.stackLabel}</th>
              {options.map((o) => (
                <td key={o.id} className={td}>
                  <span className="flex flex-wrap gap-1">
                    {o.tech.slice(0, 5).map((t) => <span key={t} className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[11px] text-ink-muted">{t}</span>)}
                  </span>
                </td>
              ))}
            </tr>
            {guide.criteria.map((c, ci) => (
              <tr key={c} className={band}>
                <th scope="row" className={th}>{c}</th>
                {options.map((o) => {
                  const s = rowOf(o.id)?.scores[ci];
                  return (
                    <td key={o.id} className={td}>
                      {s == null ? (
                        <span aria-label="–">–</span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <span className="flex gap-0.5" role="img" aria-label={`${s} / 5`}>
                            {[1, 2, 3, 4, 5].map((n) => <span key={n} className="h-1.5 w-3 rounded-full" style={{ background: n <= s ? "var(--accent)" : "rgb(255 255 255 / 0.1)" }} />)}
                          </span>
                          <span className="font-mono text-xs text-ink">{s}</span>
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr className={band}>
              <th scope="row" className={th}>+</th>
              {options.map((o) => (
                <td key={o.id} className={td}>
                  <ul className="space-y-1.5">{o.pros.map((p) => <li key={p} className="flex gap-1.5"><span aria-hidden="true" className="font-mono text-neon-green">+</span><span className="min-w-0">{p}</span></li>)}</ul>
                </td>
              ))}
            </tr>
            <tr className={band}>
              <th scope="row" className={th}>−</th>
              {options.map((o) => (
                <td key={o.id} className={td}>
                  <ul className="space-y-1.5">{o.cons.map((p) => <li key={p} className="flex gap-1.5"><span aria-hidden="true" className="font-mono text-neon-orange">−</span><span className="min-w-0">{p}</span></li>)}</ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

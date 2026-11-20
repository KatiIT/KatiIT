"use client";

import { useMemo, useState } from "react";
import type { Option, ServicePage, ServiceUi } from "@/i18n/service-types";
import { ComparePanel } from "./ComparePanel";
import { Modal } from "./Modal";

export function DecisionGuide({ guide, ui, options }: { guide: ServicePage["guide"]; ui: ServiceUi; options: Option[] }) {
  const [sel, setSel] = useState<number[]>([0, 1]);
  const [cmp, setCmp] = useState(false);

  const totals = useMemo(() => guide.rows.map((r) => sel.reduce((sum, i) => sum + r.scores[i], 0)), [guide.rows, sel]);
  const max = Math.max(...totals);
  const best = sel.length ? guide.rows.filter((_, i) => totals[i] === max).map((r) => r.name) : [];

  const toggle = (i: number) => setSel((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  return (
    <div>
      <p className="max-w-2xl text-sm text-ink-muted">{ui.guideHint}</p>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label={guide.title}>
        {guide.criteria.map((c, i) => {
          const on = sel.includes(i);
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(i)}
              className={`min-h-10 rounded-full border px-4 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue ${
                on ? "sv-chip text-ink [border-color:var(--accent)]" : "border-white/15 bg-white/[0.03] text-ink-muted hover:border-white/30"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      <p className="sv-glass mt-6 rounded-xl px-4 py-3 text-sm" aria-live="polite">
        <span className="sv-accent font-mono text-[11px] uppercase tracking-wider">{ui.guideBest}</span>
        <span className="ml-3 font-semibold text-ink">{best.length ? best.join(" · ") : "–"}</span>
      </p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-white/[0.03] font-mono text-[11px] uppercase tracking-wider text-ink-faint">
              <th scope="col" className="px-4 py-3 font-normal" />
              {guide.criteria.map((c, i) => (
                <th key={c} scope="col" className={`px-3 py-3 font-normal ${sel.includes(i) ? "sv-accent" : ""}`}>
                  {c}
                </th>
              ))}
              <th scope="col" className="px-4 py-3 text-right font-normal">
                {ui.guideScore}
              </th>
            </tr>
          </thead>
          <tbody>
            {guide.rows.map((r, ri) => {
              const isBest = sel.length > 0 && totals[ri] === max;
              return (
                <tr key={r.name} className={`border-t border-white/10 ${isBest ? "bg-white/[0.05]" : ""}`}>
                  <th scope="row" className="whitespace-nowrap px-4 py-3 font-medium text-ink">
                    <span className="inline-flex items-center gap-2">
                      {r.name}
                      <button
                        type="button"
                        onClick={() => setCmp(true)}
                        aria-haspopup="dialog"
                        aria-label={`${ui.compare}: ${r.name}`}
                        title={ui.compare}
                        className="grid h-8 w-8 place-items-center rounded-md border border-white/10 text-ink-muted transition hover:border-white/30 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="3" y="4" width="7" height="16" rx="1.5" />
                          <rect x="14" y="4" width="7" height="16" rx="1.5" />
                          <path d="M6.5 9v6M17.5 12v3" />
                        </svg>
                      </button>
                    </span>
                  </th>
                  {r.scores.map((s, ci) => (
                    <td key={ci} className="px-3 py-3">
                      <span className="flex gap-0.5" role="img" aria-label={`${s} / 5`}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span
                            key={n}
                            className="h-1.5 w-3 rounded-full"
                            style={{ background: n <= s ? (sel.includes(ci) ? "var(--accent)" : "#7B88A2") : "rgb(255 255 255 / 0.1)" }}
                          />
                        ))}
                      </span>
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right font-mono text-ink">{totals[ri]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal open={cmp} onClose={() => setCmp(false)} title={ui.compareTitle} closeLabel={ui.close} size="xl">
        <ComparePanel options={options} guide={guide} ui={ui} />
      </Modal>
    </div>
  );
}

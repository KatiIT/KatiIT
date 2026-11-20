import type { LegalDoc } from "@/i18n/types";
import { Ph } from "./Placeholder";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{doc.title}</h1>
      <p className="mt-3 text-sm text-ink-faint">
        <Ph>{doc.updated}</Ph>
      </p>
      <p role="note" className="mt-6 rounded-lg border border-amber-300/40 bg-amber-300/10 p-4 text-sm text-amber-100">
        {doc.notice}
      </p>
      <div className="mt-10 space-y-10">
        {doc.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-lg font-semibold text-ink">{s.heading}</h2>
            <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink-muted">
              {s.paragraphs.map((p, i) => (
                <p key={i}>
                  <Ph>{p}</Ph>
                </p>
              ))}
              {s.list && (
                <ul className="list-disc space-y-1 pl-5">
                  {s.list.map((li) => (
                    <li key={li}>
                      <Ph>{li}</Ph>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

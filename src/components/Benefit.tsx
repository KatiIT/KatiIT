import type { Dictionary } from "@/i18n/types";
import { Ph } from "./Placeholder";

export function Benefit({ dict }: { dict: Dictionary["benefit"] }) {
  return (
    <section aria-labelledby="benefit-title" className="relative border-t border-white/[0.06] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neon-blue">{dict.eyebrow}</p>
        <h2 id="benefit-title" className="mt-3 max-w-2xl text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
          {dict.title}
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((item) => (
            <li key={item.label} className="min-w-0 rounded-2xl border border-white/10 bg-space-900/60 p-5">
              <p className="break-words font-mono text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                <Ph>{item.value}</Ph>
              </p>
              <p className="mt-3 text-sm font-medium text-ink">{item.label}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-faint">
                <Ph>{item.detail}</Ph>
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-[11px] text-ink-faint">{dict.note}</p>
      </div>
    </section>
  );
}

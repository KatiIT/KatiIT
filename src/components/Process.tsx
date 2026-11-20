import type { Dictionary } from "@/i18n/types";

const accents = ["#3B82F6", "#F97316", "#10B981"];

export function Process({ dict }: { dict: Dictionary["process"] }) {
  return (
    <section id="process" aria-labelledby="process-title" className="relative scroll-mt-16 border-t border-white/[0.06] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neon-orange">{dict.eyebrow}</p>
        <h2 id="process-title" className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {dict.title}
        </h2>
        <ol className="relative mt-12 grid gap-6 md:grid-cols-3">
          {dict.steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-white/10 bg-space-900/60 p-6 backdrop-blur-xl">
              <span className="font-mono text-xs" style={{ color: accents[i] }}>
                0{i + 1}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.text}</p>
              <span aria-hidden="true" className="absolute inset-x-6 top-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${accents[i]}, transparent)` }} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

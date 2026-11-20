import type { Dictionary } from "@/i18n/types";
import { CalEmbed } from "./CalEmbed";

export function AuditSection({ dict }: { dict: Dictionary["audit"] }) {
  return (
    <section id="audit" aria-labelledby="audit-title" className="relative scroll-mt-16 overflow-hidden border-t border-white/[0.06] py-24">
      <div className="absolute inset-0 -z-10" aria-hidden="true" style={{ background: "radial-gradient(50% 60% at 80% 40%, rgba(16,185,129,.1), transparent 70%), radial-gradient(40% 50% at 10% 60%, rgba(59,130,246,.1), transparent 70%)" }} />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neon-green">{dict.eyebrow}</p>
          <h2 id="audit-title" className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {dict.title}
          </h2>
          <p className="mt-4 max-w-md text-ink-muted">{dict.lead}</p>
          <ul className="mt-8 space-y-3 text-sm text-ink-muted">
            {dict.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-green shadow-[0_0_8px_#10B981]" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <CalEmbed dict={dict.gate} />
      </div>
    </section>
  );
}

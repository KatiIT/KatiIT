"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/** Live-Terminal: tippt Zeile für Zeile, wiederholt sich. Bei reduzierter Bewegung statisch. */
export function TerminalPreview({ title, lines, caption }: { title: string; lines: string[]; caption: string }) {
  const reduce = usePrefersReducedMotion();
  const [state, setState] = useState({ line: 0, chars: 0 });

  useEffect(() => {
    if (reduce) return;
    const current = lines[state.line] ?? "";
    let t: ReturnType<typeof setTimeout>;
    if (state.line >= lines.length) {
      t = setTimeout(() => setState({ line: 0, chars: 0 }), 4200);
    } else if (state.chars < current.length) {
      const typing = current.startsWith("$");
      t = setTimeout(() => setState((s) => ({ ...s, chars: s.chars + 1 })), typing ? 38 : 12);
    } else {
      t = setTimeout(() => setState((s) => ({ line: s.line + 1, chars: 0 })), current.startsWith("$") ? 420 : 260);
    }
    return () => clearTimeout(t);
  }, [state, lines, reduce]);

  const shown = reduce ? lines : lines.map((l, i) => (i < state.line ? l : i === state.line ? l.slice(0, state.chars) : ""));

  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-space-900/70 shadow-[0_0_60px_-20px_rgba(59,130,246,0.45)] backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <figcaption className="ml-2 font-mono text-xs text-ink-faint">{title}</figcaption>
      </div>
      <pre className="min-h-[148px] overflow-x-auto px-4 py-4 font-mono text-[13px] leading-6 text-ink-muted" aria-label={lines.join(". ")}>
        {shown.map((l, i) => (
          <div key={i} aria-hidden="true" className={l.startsWith("✓") ? "text-neon-green" : l.startsWith("$") ? "text-ink" : undefined}>
            {l || " "}
            {!reduce && i === Math.min(state.line, lines.length - 1) && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-neon-blue/80" />}
          </div>
        ))}
      </pre>
      <p className="border-t border-white/[0.07] px-4 py-2 font-mono text-[11px] text-ink-faint">{caption}</p>
    </figure>
  );
}

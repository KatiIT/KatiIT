"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import { guides, type GuideNode, type GuideOption } from "@/i18n/guide";

type Mode = "menu" | "tour" | "quick" | "find";
type Step = { node: string; chosen?: string };

function Robot({ size = 40, wave = false }: { size?: number; wave?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <line x1="24" y1="4" x2="24" y2="10" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="4" r="2.6" fill="#10B981" className={wave ? "guide-blink" : ""} />
      <rect x="8" y="10" width="32" height="26" rx="9" fill="#0B0F17" stroke="#3B82F6" strokeWidth="2" />
      <rect x="13" y="17" width="22" height="12" rx="6" fill="#07090E" stroke="#F97316" strokeOpacity=".7" />
      <circle cx="19" cy="23" r="2.6" fill="#10B981" className={wave ? "guide-eye" : ""} />
      <circle cx="29" cy="23" r="2.6" fill="#10B981" className={wave ? "guide-eye" : ""} />
      <path d="M20 31.5c2.5 1.6 5.5 1.6 8 0" stroke="#3B82F6" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4 22v6M44 22v6" stroke="#F97316" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M17 40h14v3a2 2 0 0 1-2 2H19a2 2 0 0 1-2-2z" fill="#0B0F17" stroke="#3B82F6" strokeWidth="1.6" />
    </svg>
  );
}

const optionBtn = "group flex min-h-14 w-full items-center gap-3 rounded-xl border border-white/12 bg-space-900/80 px-3 py-2.5 text-left transition hover:border-neon-blue/70 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue";

function Options({ options, onPick }: { options: GuideOption[]; onPick: (o: GuideOption) => void }) {
  return (
    <ul className="grid gap-2 guide-in">
      {options.map((o) => (
        <li key={o.label}>
          <button type="button" onClick={() => onPick(o)} className={optionBtn}>
            <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-xl">{o.emoji}</span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-ink">{o.label}</span>
              {o.hint && <span className="block text-xs text-ink-muted">{o.hint}</span>}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

const matches = (q: string, w: string) => {
  const nw = norm(w);
  if (nw.includes(" ") || nw.length > 4) return q.includes(nw);
  return q.split(/[^a-z0-9]+/).includes(nw);
};
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export function GuideBot({ lang }: { lang: Locale }) {
  const data = guides[lang];
  const ui = data.ui;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [mode, setMode] = useState<Mode>("menu");
  const [trail, setTrail] = useState<Step[]>([]);
  const [tourIdx, setTourIdx] = useState(0);
  const [text, setText] = useState("");
  const [miss, setMiss] = useState(false);
  const fabRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const nodes = useMemo(() => new Map(data.nodes.map((n) => [n.id, n] as const)), [data]);
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const href = useCallback((h: string) => `/${lang}${h}`, [lang]);

  // Sprechblase einmalig nach kurzer Zeit
  useEffect(() => {
    const t = setTimeout(() => setTeaser(true), 4500);
    const h = setTimeout(() => setTeaser(false), 14000);
    return () => {
      clearTimeout(t);
      clearTimeout(h);
    };
  }, []);

  const reset = useCallback(() => {
    setMode("menu");
    setTrail([]);
    setTourIdx(0);
    setMiss(false);
    setText("");
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    fabRef.current?.focus();
  }, []);

  useEffect(() => {
    if (open) {
      setTeaser(false);
      panelRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Nach jedem Schritt zum Ende der Unterhaltung scrollen
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [trail, mode, tourIdx, miss]);

  // Rundgang: Zielabschnitt zeigen und kurz hervorheben
  useEffect(() => {
    if (!open || mode !== "tour") return;
    const target = data.tour[tourIdx]?.target;
    if (!target) return;
    if (!isHome) {
      router.push(href(target === "#main" ? "" : target));
      return;
    }
    const el = document.querySelector<HTMLElement>(target);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: target === "#main" ? "start" : "start" });
    if (target === "#main") return;
    el.setAttribute("data-guide-hl", "");
    const t = setTimeout(() => el.removeAttribute("data-guide-hl"), 2600);
    return () => {
      clearTimeout(t);
      el.removeAttribute("data-guide-hl");
    };
  }, [open, mode, tourIdx, isHome, data.tour, router, href]);

  const startMode = (next: string) => {
    setMiss(false);
    if (next === "tour") {
      setMode("tour");
      setTourIdx(0);
    } else if (next === "quick") setMode("quick");
    else {
      setMode("find");
      setTrail([{ node: next }]);
    }
  };

  const choose = (opt: GuideOption) => {
    setMiss(false);
    setTrail((t) => [...t.slice(0, -1), { ...t[t.length - 1], chosen: `${opt.emoji} ${opt.label}` }, { node: opt.next }]);
  };

  const back = () => {
    setMiss(false);
    if (mode === "find" && trail.length > 1) {
      setTrail((t) => {
        const c = t.slice(0, -2);
        const prev = t[t.length - 2];
        return [...c, { node: prev.node }];
      });
    } else reset();
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = norm(text.trim());
    if (!q) return;
    const hit = data.intents.find((i) => i.words.some((w) => matches(q, w)));
    setText("");
    if (!hit) {
      setMiss(false);
      setMode("find");
      setTrail([{ node: "find", chosen: `💬 ${text.trim()}` }, { node: "clarify" }]);
      return;
    }
    setMiss(false);
    setMode("find");
    setTrail([{ node: "find", chosen: `💬 ${text.trim()}` }, { node: hit.next }]);
  };

  const onLink = () => {
    // Auf kleinen Bildschirmen den Guide einklappen, damit der Inhalt sichtbar wird
    if (window.matchMedia("(max-width: 639px)").matches) setOpen(false);
  };

  const bubble = "max-w-[92%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.05] px-3.5 py-2.5 text-sm leading-relaxed text-ink guide-in";
  const renderResult = (n: Extract<GuideNode, { kind: "result" }>) => (
    <div className="guide-in rounded-2xl border border-neon-blue/40 bg-space-900/90 p-4 shadow-[0_0_30px_-12px_rgba(59,130,246,.6)]">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neon-green">{ui.recommendation}</p>
      <h3 className="mt-1.5 text-base font-semibold text-ink">{n.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{n.text}</p>
      {n.points && (
        <ul className="mt-3 space-y-1.5 text-[13px] text-ink-muted">
          {n.points.map((p) => (
            <li key={p} className="flex gap-2">
              <span aria-hidden="true" className="text-neon-green">✓</span>
              {p}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex flex-col gap-2">
        {n.links.map((l, i) => (
          <Link key={l.href + l.label} href={href(l.href)} onClick={onLink} className={`inline-flex min-h-10 items-center justify-between gap-3 rounded-lg px-3 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue ${i === n.links.length - 1 ? "bg-ink text-space-950 hover:bg-white" : "border border-white/15 text-ink hover:border-white/35"}`}>
            {l.label}
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </div>
  );

  const step = data.tour[tourIdx];
  const last = trail[trail.length - 1];
  const lastNode = last ? nodes.get(last.node) : undefined;

  return (
    <>
      <div className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[60] flex flex-col items-end gap-3">
        {open && (
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="false"
            aria-label={ui.title}
            tabIndex={-1}
            className="pointer-events-auto flex max-h-[min(84dvh,660px)] w-[min(calc(100vw-2rem),400px)] flex-col overflow-hidden rounded-2xl border border-neon-blue/40 bg-space-950/95 shadow-[0_20px_60px_-10px_rgba(0,0,0,.8),0_0_50px_-15px_rgba(59,130,246,.7)] backdrop-blur-xl guide-pop outline-none"
          >
            <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]"><Robot size={34} wave /></span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">{ui.title}</p>
                <p className="truncate text-xs text-ink-muted">{mode === "tour" ? ui.tourTitle : mode === "quick" ? ui.quickTitle : ui.subtitle}</p>
              </div>
              {mode !== "menu" && (
                <button type="button" onClick={back} className="min-h-9 rounded-lg px-2.5 text-xs text-ink-muted hover:bg-white/10 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-blue">← {ui.back}</button>
              )}
              <button type="button" onClick={reset} aria-label={ui.restart} title={ui.restart} className="grid h-9 w-9 place-items-center rounded-lg text-ink-muted hover:bg-white/10 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-blue">↻</button>
              <button type="button" onClick={close} aria-label={ui.close} className="grid h-9 w-9 place-items-center rounded-lg text-ink-muted hover:bg-white/10 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-blue">✕</button>
            </header>

            <div ref={bodyRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              <p className={bubble}>{ui.greeting}</p>

              {mode === "menu" && (
                <>
                  <p className={bubble}>{ui.menuAsk}</p>
                  <Options options={ui.menu} onPick={(o) => startMode(o.next)} />
                  {miss && <p className={bubble}>{ui.noMatch}</p>}
                </>
              )}

              {mode === "quick" && (
                <>
                  <p className={bubble}>{ui.quickIntro}</p>
                  <ul className="grid gap-2 guide-in">
                    {data.quick.map((q) => (
                      <li key={q.href}>
                        <Link href={href(q.href)} onClick={onLink} className={optionBtn}>
                          <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-xl">{q.emoji}</span>
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-ink">{q.label}</span>
                            <span className="block text-xs text-ink-muted">{q.hint}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {mode === "tour" && step && (
                <div className="guide-in rounded-2xl border border-white/10 bg-white/[0.04] p-4" key={tourIdx}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neon-blue">
                    {ui.tourStep} {tourIdx + 1} / {data.tour.length}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-ink"><span aria-hidden="true">{step.emoji}</span> {step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.text}</p>
                  <div className="mt-3 flex gap-1" aria-hidden="true">
                    {data.tour.map((_, i) => (
                      <span key={i} className={`h-1 flex-1 rounded-full ${i <= tourIdx ? "bg-neon-blue" : "bg-white/10"}`} />
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button type="button" disabled={tourIdx === 0} onClick={() => setTourIdx((i) => i - 1)} className="min-h-10 flex-1 rounded-lg border border-white/15 text-sm text-ink disabled:opacity-40 hover:border-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-blue">{ui.tourPrev}</button>
                    {tourIdx < data.tour.length - 1 ? (
                      <button type="button" onClick={() => setTourIdx((i) => i + 1)} className="min-h-10 flex-1 rounded-lg bg-ink text-sm font-medium text-space-950 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-blue">{ui.tourNext} →</button>
                    ) : (
                      <button type="button" onClick={() => { setMode("find"); setTrail([{ node: "find" }]); }} className="min-h-10 flex-1 rounded-lg bg-ink text-sm font-medium text-space-950 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-blue">{ui.tourDone} ✓</button>
                    )}
                  </div>
                </div>
              )}

              {mode === "find" &&
                trail.map((s, i) => {
                  const n = nodes.get(s.node);
                  if (!n) return null;
                  const isLast = i === trail.length - 1;
                  return (
                    <div key={`${s.node}-${i}`} className="space-y-3">
                      {n.kind === "ask" ? (
                        <>
                          <p className={bubble}>{n.text}</p>
                          {s.chosen && <p className="ml-auto w-fit max-w-[88%] rounded-2xl rounded-tr-sm bg-neon-blue/20 px-3.5 py-2 text-sm text-ink guide-in">{s.chosen}</p>}
                          {isLast && <Options options={n.options} onPick={choose} />}
                        </>
                      ) : (
                        renderResult(n)
                      )}
                    </div>
                  );
                })}

              {mode === "find" && lastNode?.kind === "result" && (
                <button type="button" onClick={reset} className="min-h-10 w-full rounded-lg border border-white/15 text-sm text-ink-muted hover:border-white/35 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-blue">↻ {ui.restart}</button>
              )}
              {mode !== "menu" && miss && <p className={bubble}>{ui.noMatch}</p>}
            </div>

            <form onSubmit={submit} className="border-t border-white/10 px-3 py-3">
              <label htmlFor="guide-input" className="sr-only">{ui.inputLabel}</label>
              <div className="flex gap-2">
                <input id="guide-input" value={text} onChange={(e) => setText(e.target.value)} placeholder={ui.inputPlaceholder} autoComplete="off" className="min-h-11 min-w-0 flex-1 rounded-lg border border-white/15 bg-space-900 px-3 text-sm text-ink placeholder:text-ink-faint focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-blue" />
                <button type="submit" className="min-h-11 rounded-lg bg-neon-blue px-4 text-sm font-medium text-space-950 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{ui.send}</button>
              </div>
              <p className="mt-2 text-[11px] leading-snug text-ink-faint">{ui.footnote}</p>
            </form>
          </div>
        )}

        {!open && teaser && (
          <p className="pointer-events-auto max-w-[240px] rounded-xl rounded-br-sm border border-neon-blue/40 bg-space-900/95 px-3.5 py-2.5 text-sm text-ink shadow-xl guide-pop">{ui.teaser}</p>
        )}

        <button
          ref={fabRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? ui.close : ui.fab}
          className="pointer-events-auto group relative grid h-16 w-16 place-items-center rounded-full border border-neon-blue/60 bg-space-900 shadow-[0_0_30px_-4px_rgba(59,130,246,.8)] transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-blue"
        >
          <span className="guide-float"><Robot size={42} wave={!open} /></span>
          {!open && <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full bg-neon-green ring-2 ring-space-950" />}
        </button>
      </div>
    </>
  );
}

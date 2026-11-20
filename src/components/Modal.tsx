"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  closeLabel: string;
  /** Breite auf großen Bildschirmen */
  size?: "md" | "lg" | "xl";
  eyebrow?: string;
  children: ReactNode;
};

const widths = { md: "sm:max-w-3xl", lg: "sm:max-w-5xl", xl: "sm:max-w-6xl" } as const;

/**
 * Popup auf Basis des nativen <dialog>: Fokusfalle, Escape, Top-Layer und Rückgabe des Fokus kommen vom Browser.
 * Zusätzlich: Schließen per Button und per Klick auf den Hintergrund, Scrollen im Inhalt, Vollbild auf dem Handy.
 */
export function Modal({ open, onClose, title, closeLabel, size = "md", eyebrow, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden"; // Seite dahinter nicht mitscrollen
    return () => {
      root.style.overflow = prev;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // Klick auf den Hintergrund
      }}
      className={`m-auto w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-ink backdrop:bg-black/75 backdrop:backdrop-blur-sm max-sm:h-[100dvh] max-sm:max-h-none sm:max-h-[calc(100dvh-2rem)] sm:w-[calc(100%-2rem)] ${widths[size]}`}
    >
      {open && (
        <div className="sv-modal flex max-h-[100dvh] flex-col border border-white/10 bg-space-950 shadow-[0_30px_120px_-20px_rgba(0,0,0,0.9)] max-sm:h-[100dvh] sm:max-h-[calc(100dvh-2rem)] sm:rounded-2xl">
          <header className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
            <div className="min-w-0">
              {eyebrow && <p className="sv-accent font-mono text-[11px] uppercase tracking-[0.2em]">{eyebrow}</p>}
              <h2 id={titleId} className="mt-1 text-balance text-lg font-semibold tracking-tight text-ink sm:text-xl">
                {title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="-mr-2 -mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-lg text-ink-muted transition hover:bg-white/10 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6">{children}</div>
        </div>
      )}
    </dialog>
  );
}

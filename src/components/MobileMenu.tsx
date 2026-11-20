"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

/** Menü für kleine Bildschirme (< md): Anker-Links + CTA, per Escape/Klick schließbar. */
export function MobileMenu({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const item = "block rounded-lg px-4 py-3 text-base text-ink-muted transition hover:bg-white/5 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-blue";
  const links: [string, string][] = [
    ["services", dict.nav.services],
    ["references", dict.nav.references],
    ["process", dict.nav.process],
    ["about", dict.nav.about],
    ["audit", dict.nav.audit],
  ];

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? dict.a11y.closeMenu : dict.a11y.openMenu}
        onClick={() => setOpen((o) => !o)}
        className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-blue"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M3 3l12 12M15 3L3 15" /> : <path d="M2 5h14M2 9h14M2 13h14" />}
        </svg>
      </button>
      {open && (
        <div
          ref={panel}
          id="mobile-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-white/10 bg-space-950/95 px-4 pb-5 pt-2 backdrop-blur-xl"
        >
          <nav aria-label={dict.a11y.mainNav}>
            {links.map(([id, label]) => (
              <a key={id} href={`/${lang}#${id}`} className={item} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <a
            href={`/${lang}/audit`}
            onClick={() => setOpen(false)}
            className="mt-2 flex min-h-12 items-center justify-center rounded-lg bg-ink text-sm font-medium text-space-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue"
          >
            {dict.nav.cta}
          </a>
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useConsent } from "./ConsentProvider";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

export function ConsentBanner({ dict, lang }: { dict: Dictionary["consent"]; lang: Locale }) {
  const { bannerOpen, decide } = useConsent();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const btn =
    "inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-white/15 bg-white/5 px-4 text-sm font-medium text-ink transition hover:border-white/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue";

  return (
    <AnimatePresence>
      {mounted && bannerOpen && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-labelledby="consent-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[60] mx-auto max-h-[85dvh] max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-space-900/90 p-4 shadow-2xl backdrop-blur-xl sm:inset-x-6 sm:p-5"
        >
          <h2 id="consent-title" className="text-sm font-semibold text-ink">
            {dict.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{dict.text}</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button type="button" className={btn} onClick={() => decide("essential")}>
              {dict.essential}
            </button>
            <button type="button" className={btn} onClick={() => decide("calcom")}>
              {dict.accept}
            </button>
          </div>
          <Link href={`/${lang}/datenschutz`} className="mt-3 inline-block text-xs text-ink-faint underline-offset-4 hover:text-ink-muted hover:underline">
            {dict.privacy}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

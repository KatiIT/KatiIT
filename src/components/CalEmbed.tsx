"use client";

import { calEmbedUrl, calUrl, hasPlaceholder, site } from "@/config/site";
import type { Dictionary } from "@/i18n/types";
import { useConsent } from "./ConsentProvider";

/**
 * Cal.com wird ausschließlich als iframe und erst nach Einwilligung geladen.
 * Vorher findet keine Verbindung zu cal.com statt (auch kein Preload / Prefetch).
 */
export function CalEmbed({ dict }: { dict: Dictionary["audit"]["gate"] }) {
  const { calAllowed, decide, allowCalOnce, revokeCal } = useConsent();
  const unconfigured = !site.calLink || hasPlaceholder(site.calLink);

  if (calAllowed) {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-space-900/70 backdrop-blur-xl">
        {unconfigured ? (
          <div className="p-8 text-sm text-ink-muted">
            Cal.com is not configured yet. Please use{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-ink">
              {site.email}
            </a>
            .
          </div>
        ) : (
          <iframe
            src={calEmbedUrl}
            title={dict.iframeTitle}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            className="h-[640px] w-full bg-space-900"
          />
        )}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-xs text-ink-faint">
          <span>{dict.loaded}</span>
          <button type="button" onClick={revokeCal} className="underline underline-offset-4 hover:text-ink-muted">
            {dict.revoke}
          </button>
        </div>
      </div>
    );
  }

  const btn =
    "inline-flex min-h-11 items-center justify-center rounded-lg border px-5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue";

  return (
    <div className="rounded-2xl border border-white/10 bg-space-900/70 p-6 backdrop-blur-xl sm:p-8">
      <h3 className="text-lg font-semibold text-ink">{dict.title}</h3>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">{dict.text}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={allowCalOnce} className={`${btn} border-neon-blue/60 bg-neon-blue/15 text-ink hover:bg-neon-blue/25`}>
          {dict.once}
        </button>
        <button type="button" onClick={() => decide("calcom")} className={`${btn} border-white/15 bg-white/5 text-ink hover:bg-white/10`}>
          {dict.always}
        </button>
      </div>
      <p className="mt-5 text-xs text-ink-faint">
        {!unconfigured && (
          <>
            <a href={calUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink-muted">
              {dict.external}
            </a>
            {" · "}
          </>
        )}
        {dict.mail}{" "}
        <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-ink-muted">
          {site.email}
        </a>
      </p>
    </div>
  );
}

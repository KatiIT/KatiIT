"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

const labels: Record<Locale, { short: string; name: string }> = {
  de: { short: "DE", name: "Deutsch" },
  en: { short: "EN", name: "English" },
};

/** Segmentierter DE/EN-Umschalter. Erhält Pfad und Anker, kein Cookie. */
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname() ?? `/${current}`;
  const rest = pathname.replace(/^\/(de|en)(?=\/|$)/, "");

  return (
    <nav aria-label={label} className="flex items-center rounded-full border border-white/10 bg-white/[0.04] p-0.5 font-mono text-xs">
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={`/${locale}${rest}`}
            hrefLang={locale}
            lang={locale}
            aria-label={labels[locale].name}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-3 py-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue ${
              active ? "bg-white/12 text-ink shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]" : "text-ink-faint hover:text-ink"
            }`}
          >
            {labels[locale].short}
          </Link>
        );
      })}
    </nav>
  );
}

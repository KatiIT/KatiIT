"use client";

import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { site } from "@/config/site";
import { Logo } from "./Logo";
import { useConsent } from "./ConsentProvider";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary["footer"] }) {
  const { openBanner } = useConsent();
  const link = "rounded-sm text-ink-muted transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-blue";
  return (
    <footer className="border-t border-white/[0.06] bg-space-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-ink-faint">{dict.tagline}</p>
        </div>
        <div className="flex flex-col gap-4 text-sm md:items-end">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href={`/${lang}/impressum`} className={link}>
                {dict.imprint}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/datenschutz`} className={link}>
                {dict.privacy}
              </Link>
            </li>
            <li>
              <button type="button" onClick={openBanner} className={link}>
                {dict.settings}
              </button>
            </li>
          </ul>
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} {site.name}. {dict.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

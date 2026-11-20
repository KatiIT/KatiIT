import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const link =
    "hidden rounded-md px-3 py-2 text-sm text-ink-muted transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-blue md:inline-block";
  return (
    <header className="vt-header sticky top-0 z-50 border-b border-white/[0.06] bg-space-950/80 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">
        <Link href={`/${lang}`} aria-label="KatiIT" className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-blue">
          <Logo />
        </Link>
        <nav aria-label={dict.a11y.mainNav} className="hidden items-center gap-1 md:flex">
          <a href={`/${lang}#services`} className={link}>
            {dict.nav.services}
          </a>
          <a href={`/${lang}#references`} className={link}>
            {dict.nav.references}
          </a>
          <a href={`/${lang}#process`} className={link}>
            {dict.nav.process}
          </a>
          <a href={`/${lang}#about`} className={link}>
            {dict.nav.about}
          </a>
          <a href={`/${lang}/audit`} className={link}>
            {dict.nav.audit}
          </a>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher current={lang} label={dict.a11y.langSwitch} />
          <MobileMenu lang={lang} dict={dict} />
          <a
            href={`/${lang}/audit`}
            className="hidden min-h-10 items-center rounded-lg bg-ink px-4 text-sm font-medium text-space-950 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue md:inline-flex"
          >
            {dict.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}

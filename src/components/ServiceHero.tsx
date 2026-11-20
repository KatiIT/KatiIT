import type { Locale } from "@/i18n/config";
import type { ServicePage, ServiceUi } from "@/i18n/service-types";
import { HeroActions, HeroEyebrow, HeroFrame, HeroPillars } from "./Hero";
import { TransitionLink } from "./TransitionLink";
import { HERO_IMAGES, type ColumnDef } from "./service-data";

/**
 * Hero der Unterseiten: gleiche Komposition wie die Startseite (HeroFrame, Eyebrow, Headline, Lead, Farbbalken, Buttons),
 * mit eigener Headline, eigenem Text und eigenem Bild. Kein Scroll-3D: das Bild liegt ruhig hinter bzw. neben dem Text.
 *  - ab md: Bild rechts in voller Höhe (5:6, nicht beschnitten), weicher Auslauf nach links
 *  - darunter: Bild oben über die ganze Breite, der Text beginnt im ausgeblendeten unteren Bilddrittel
 */
export function ServiceHero({ col, page, ui, lang, pillars }: { col: ColumnDef; page: ServicePage; ui: ServiceUi; lang: Locale; pillars: readonly string[] }) {
  const hero = HERO_IMAGES[col.id];
  const backdrop = (
    <>
      <div className="pcb-grid absolute inset-0 -z-20" aria-hidden="true" />
      {/* data-vt-hero: Zielpunkt des Übergangs (siehe lib/view-transition.ts) */}
      <div data-vt-hero aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 mx-auto aspect-[5/6] max-w-[480px] md:inset-x-auto md:right-0 md:mx-0 md:aspect-auto md:h-full md:max-h-[760px] md:w-[min(52%,640px)] md:max-w-none">
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG/Rasterbild aus /public, bewusst ohne Optimizer */}
        <img
          src={hero.src}
          width={hero.width}
          height={hero.height}
          alt=""
          fetchPriority="high"
          decoding="async"
          draggable={false}
          className="h-full w-full select-none object-cover object-top opacity-90 [mask-image:linear-gradient(to_bottom,#000_45%,transparent_92%)] md:object-contain md:object-right md:opacity-100 md:[mask-image:linear-gradient(to_right,transparent,#000_28%)]"
        />
      </div>
    </>
  );

  return (
    <HeroFrame backdrop={backdrop} overlay={false} glow={col.rgb}>
      <div className="pt-[calc(min(100vw,480px)-3.5rem)] md:pt-0">
        <TransitionLink
          mode="back"
          colId={col.id}
          href={`/${lang}#services`}
          className="inline-flex items-center gap-2 rounded-md font-mono text-xs text-ink-muted transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-blue"
        >
          <span aria-hidden="true">←</span>
          {ui.back}
        </TransitionLink>
        <div className="mt-6 md:max-w-[min(50%,36rem)]">
          <HeroEyebrow color={col.accent}>{page.hero.eyebrow}</HeroEyebrow>
          <h1 className="mt-6 hyphens-auto text-balance break-words text-[2rem] font-semibold leading-[1.08] tracking-tight text-ink min-[400px]:text-4xl sm:text-[2.6rem] md:text-4xl lg:text-[2.75rem] xl:text-5xl">{page.hero.title}</h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">{page.hero.lead}</p>
          <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-ink-muted">
            {page.hero.chips.map((c) => (
              <li key={c} className="sv-chip rounded-md px-2.5 py-1">
                {c}
              </li>
            ))}
          </ul>
          <ul className="mt-4 space-y-1.5 text-sm text-ink-muted">
            {page.hero.stats.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: col.accent, boxShadow: `0 0 8px ${col.accent}` }} />
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <HeroPillars lang={lang} labels={pillars} current={col.id} ariaLabel={ui.others} />
          </div>
          <HeroActions primary={{ href: `/${lang}/audit`, label: page.cta.button }} secondary={{ href: "#options", label: ui.toc.options }} />
        </div>
      </div>
    </HeroFrame>
  );
}

import type { Locale } from "@/i18n/config";
import type { Option, ServiceUi } from "@/i18n/service-types";
import { HeroEyebrow, heroBtnPrimary, heroBtnSecondary } from "./Hero";

/** Erster Satz der Zusammenfassung: kurz genug für die Zeile, der Rest steht in der Karte. */
const firstSentence = (s: string) => s.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? s;

/**
 * Options-Zeile: gleiche Komposition wie der Hero (Text links, Bild rechts mit weichem Auslauf).
 * Die ausführliche Optionskarte (OptionCard) öffnet sich auf Wunsch im Popup.
 */
export function OptionRow({ option, ui, lang, accent, onInfo, onArchitecture }: { option: Option; ui: ServiceUi; lang: Locale; accent: string; onInfo: () => void; onArchitecture: () => void }) {
  return (
    <article id={option.id} className="sv-glass relative isolate mx-1 grid scroll-mt-40 overflow-hidden rounded-3xl sm:mx-6 md:min-h-[320px] md:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:mx-10">
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: `radial-gradient(60% 90% at 80% 50%, color-mix(in srgb, ${accent} 20%, transparent), transparent 70%)` }} />

      {/* Bild: mobil oben mit Auslauf nach unten, ab md rechts mit Auslauf nach links */}
      <div className="relative order-1 aspect-[3/2] md:order-2 md:aspect-auto">
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG aus /public, bewusst ohne Optimizer */}
        <img
          src={`/options/${lang}/${option.id}.svg`}
          alt=""
          width={1200}
          height={800}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-contain [mask-image:linear-gradient(to_bottom,#000_70%,transparent)] md:object-right md:[mask-image:linear-gradient(to_right,transparent,#000_24%)]"
        />
      </div>

      <div className="order-2 flex min-w-0 flex-col justify-center px-5 pb-6 pt-1 sm:px-8 md:order-1 md:py-9 md:pl-10 md:pr-2">
        <div>
          <HeroEyebrow color={accent}>{option.kind}</HeroEyebrow>
        </div>
        <h3 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{option.name}</h3>
        <p className="mt-3 line-clamp-3 max-w-md text-pretty text-[15px] leading-relaxed text-ink-muted">{firstSentence(option.summary)}</p>
        <ul className="mt-4 max-w-md space-y-1.5 text-[13.5px] leading-snug text-ink-muted">
          <li className="flex gap-2">
            <span aria-hidden="true" className="mt-px font-mono text-neon-green">+</span>
            <span className="min-w-0">{option.pros[0]}</span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden="true" className="mt-px font-mono text-neon-orange">−</span>
            <span className="min-w-0">{option.cons[0]}</span>
          </li>
        </ul>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={onInfo} aria-haspopup="dialog" className={heroBtnPrimary}>
            {ui.info}
          </button>
          <button type="button" onClick={onArchitecture} aria-haspopup="dialog" className={heroBtnSecondary}>
            {ui.toc.layers}
          </button>
        </div>
      </div>
    </article>
  );
}

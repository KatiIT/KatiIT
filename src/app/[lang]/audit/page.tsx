import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Ph } from "@/components/Placeholder";
import { CalEmbed } from "@/components/CalEmbed";
import { isLocale } from "@/i18n/config";
import { auditPages } from "@/i18n/audit-page";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const p = auditPages[lang];
  return {
    title: p.meta.title,
    description: p.meta.description,
    alternates: { canonical: `/${lang}/audit`, languages: { de: "/de/audit", en: "/en/audit", "x-default": "/de/audit" } },
  };
}

export default async function AuditPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const p = auditPages[lang];
  const dict = await getDictionary(lang);
  const card = "rounded-2xl border border-white/10 bg-space-900/60 p-5";

  return (
    <div className="relative pb-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px]" aria-hidden="true" style={{ background: "radial-gradient(50% 60% at 80% 20%, rgba(16,185,129,.14), transparent 70%), radial-gradient(40% 50% at 10% 40%, rgba(59,130,246,.12), transparent 70%)" }} />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12">
        <Link href={`/${lang}`} className="inline-flex items-center gap-2 rounded-md font-mono text-xs text-ink-muted transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-blue">
          <span aria-hidden="true">←</span>
          {p.back}
        </Link>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-neon-green">{p.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{p.title}</h1>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">{p.lead}</p>
        <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-ink-muted">
          {dict.audit.bullets.map((b) => (
            <li key={b} className="rounded-md border border-neon-green/40 bg-neon-green/10 px-2.5 py-1">{b}</li>
          ))}
        </ul>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="min-w-0 space-y-10">
            <section aria-labelledby="steps-t">
              <h2 id="steps-t" className="text-xl font-semibold">{p.stepsTitle}</h2>
              <ol className="mt-4 space-y-3">
                {p.steps.map((s) => (
                  <li key={s.title} className={card}>
                    <p className="font-medium text-ink">{s.title}</p>
                    <p className="mt-1 text-sm text-ink-muted">{s.text}</p>
                  </li>
                ))}
              </ol>
            </section>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {[[p.bringTitle, p.bring], [p.getTitle, p.get]].map(([t, l]) => (
                <section key={t as string} className={card}>
                  <h2 className="font-semibold">{t as string}</h2>
                  <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                    {(l as string[]).map((x) => (
                      <li key={x} className="flex gap-2">
                        <span aria-hidden="true" className="text-neon-green">✓</span>
                        {x}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
          <section aria-labelledby="book-t" className="min-w-0">
            <h2 id="book-t" className="mb-4 text-xl font-semibold">{p.bookTitle}</h2>
            <CalEmbed dict={dict.audit.gate} />
          </section>
        </div>

        <section id="effort" aria-labelledby="eff-t" className="mt-16 scroll-mt-20">
          <h2 id="eff-t" className="text-xl font-semibold">{p.effort.title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted">{p.effort.lead}</p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-white/[0.03] font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                  {p.effort.cols.map((c) => (
                    <th key={c} scope="col" className="px-4 py-3 font-normal">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.effort.rows.map((r) => (
                  <tr key={r[0]} className="border-t border-white/10">
                    <th scope="row" className="px-4 py-3 font-medium text-ink">{r[0]}</th>
                    <td className="px-4 py-3 text-ink-muted"><Ph>{r[1]}</Ph></td>
                    <td className="px-4 py-3 text-ink-muted"><Ph>{r[2]}</Ph></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-ink-muted"><Ph>{p.effort.note}</Ph></p>
        </section>

        <section aria-labelledby="faq-t" className="mt-16 max-w-3xl">
          <h2 id="faq-t" className="text-xl font-semibold">{p.faqTitle}</h2>
          <div className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10">
            {p.faq.map((f) => (
              <details key={f.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-blue">
                  {f.q}
                  <span aria-hidden="true" className="text-ink-muted transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <nav aria-label={p.other} className="mt-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">{p.other}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {p.links.map((l) => (
              <li key={l.href}>
                <Link href={`/${lang}${l.href}`} className="flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-space-900/60 p-4 transition hover:border-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-blue">
                  {l.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/ServicePageView";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary, getServices } from "@/i18n/dictionaries";
import { SERVICE_SLUGS, isServiceSlug } from "@/i18n/service-types";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => SERVICE_SLUGS.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isServiceSlug(slug)) return {};
  const { pages } = await getServices(lang);
  const page = pages[slug];
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: `/${lang}/services/${slug}`, languages: { de: `/de/services/${slug}`, en: `/en/services/${slug}`, "x-default": `/de/services/${slug}` } },
    openGraph: { title: page.meta.title, description: page.meta.description, url: `/${lang}/services/${slug}` },
  };
}

export default async function ServiceRoute({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isServiceSlug(slug)) notFound();
  const { pages, ui } = await getServices(lang);
  const dict = await getDictionary(lang);
  const others = SERVICE_SLUGS.filter((s) => s !== slug).map((s) => ({ slug: s, title: pages[s].meta.title, column: pages[s].column }));
  return <ServicePageView page={pages[slug]} ui={ui} lang={lang} others={others} pillars={dict.hero.pillars} />;
}

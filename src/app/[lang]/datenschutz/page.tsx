import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { isLocale } from "@/i18n/config";
import { getLegal } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const legal = await getLegal(lang);
  return { title: legal.privacy.title, alternates: { canonical: `/${lang}/datenschutz` }, robots: { index: true, follow: true } };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const legal = await getLegal(lang);
  return <LegalPage doc={legal.privacy} />;
}

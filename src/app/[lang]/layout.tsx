import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "../globals.css";
import { ConsentBanner } from "@/components/ConsentBanner";
import { ConsentProvider } from "@/components/ConsentProvider";
import { Footer } from "@/components/Footer";
import { GuideBot } from "@/components/GuideBot";
import { Header } from "@/components/Header";
import { TransitionSettler } from "@/components/TransitionSettler";
import { site } from "@/config/site";
import { dirOf, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { inter, jetbrainsMono } from "@/lib/fonts";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#07090E",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s · ${site.name}` },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { de: "/de", en: "/en", "x-default": "/de" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: dict.meta.ogLocale,
      url: `/${lang}`,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "KatiIT: Industrie, Web, Mobile" }],
    },
    twitter: { card: "summary_large_image", title: dict.meta.title, description: dict.meta.description, images: ["/og.jpg"] },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} dir={dirOf(lang)} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-dvh bg-space-950 font-sans text-ink antialiased">
        <ConsentProvider>
          <a href="#main" className="skip-link">
            {dict.a11y.skip}
          </a>
          <TransitionSettler />
          <Header lang={lang} dict={dict} />
          <main id="main">{children}</main>
          <Footer lang={lang} dict={dict.footer} />
          <GuideBot lang={lang} />
          <ConsentBanner dict={dict.consent} lang={lang} />
        </ConsentProvider>
      </body>
    </html>
  );
}

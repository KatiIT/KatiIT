import { notFound } from "next/navigation";
import { About } from "@/components/About";
import { AuditSection } from "@/components/AuditSection";
import { Benefit } from "@/components/Benefit";
import { Hero } from "@/components/Hero";
import { References } from "@/components/References";
import { EngagementModels } from "@/components/EngagementModels";
import { Process } from "@/components/Process";
import { ServiceCircuit } from "@/components/ServiceCircuit";
import { site } from "@/config/site";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: `${site.url}/${lang}`,
    description: dict.meta.description,
    areaServed: "DE",
    knowsAbout: ["Industrial IoT", "OPC-UA", "MQTT", "Next.js", "Kubernetes", "iOS", "Android"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Hero lang={lang} dict={dict.hero} />
      <Benefit dict={dict.benefit} />
      {/* Optional Right-to-Left: <ServiceCircuit reversed /> kehrt Reihenfolge und Bühne um. */}
      <ServiceCircuit dict={dict.services} lang={lang} />
      <References lang={lang} />
      <Process dict={dict.process} />
      <EngagementModels lang={lang} dict={dict.engagement} />
      <About dict={dict.about} lang={lang} />
      <AuditSection dict={dict.audit} />
    </>
  );
}

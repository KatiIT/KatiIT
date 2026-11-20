import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/audit", "/services/mobile", "/services/engineering", "/services/industrial", "/impressum", "/datenschutz"];
  return locales.flatMap((l) =>
    paths.map((p) => ({
      url: `${site.url}/${l}${p}`,
      lastModified: new Date(),
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${site.url}/${x}${p}`])) },
    })),
  );
}

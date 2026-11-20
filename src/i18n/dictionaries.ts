import "server-only";
import type { Locale } from "./config";
import type { Dictionary, LegalDoc } from "./types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  de: () => import("./de").then((m) => m.de),
  en: () => import("./en").then((m) => m.en),
};

const legal: Record<Locale, () => Promise<{ imprint: LegalDoc; privacy: LegalDoc }>> = {
  de: () => import("./legal-de").then((m) => m.legalDe),
  en: () => import("./legal-en").then((m) => m.legalEn),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
export const getLegal = (locale: Locale) => legal[locale]();

import type { ServicePage, ServiceUi } from "./service-types";

const services: Record<Locale, () => Promise<{ pages: Record<"mobile" | "engineering" | "industrial", ServicePage>; ui: ServiceUi }>> = {
  de: () => import("./services-de").then((m) => ({ pages: m.servicesDe, ui: m.uiDe })),
  en: () => import("./services-en").then((m) => ({ pages: m.servicesEn, ui: m.uiEn })),
};
export const getServices = (locale: Locale) => services[locale]();

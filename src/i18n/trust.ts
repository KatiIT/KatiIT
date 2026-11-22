import type { Locale } from "./config";

export type Reference = { id: string; name: string; url: string; host: string; kind: string; summary: string; role: string; result: string; tech: string };
export type TrustCopy = {
  eyebrow: string; title: string; lead: string;
  labels: { role: string; result: string; tech: string; visit: string; quote: string };
  quote: string;
  refs: Reference[];
  team: { eyebrow: string; title: string; text: string; points: string[]; visit: string; url: string; host: string; note: string };
};

export const trust: Record<Locale, TrustCopy> = {
  de: {
    eyebrow: "Referenzen",
    title: "Projekte, die online laufen.",
    lead: "Eine Auswahl aus meiner Arbeit – von Praxis-Websites bis zu spezialisierten Web-Plattformen.",
    labels: { role: "Meine Rolle", result: "Ergebnis", tech: "Technik", visit: "Website ansehen", quote: "Kundenstimme" },
    quote: "",
    refs: [
      {
        id: "phoenix",
        name: "Phoenix Physio",
        url: "https://www.phoenixphysio.ca/",
        host: "phoenixphysio.ca",
        kind: "Website für Gesundheitswesen & Praxis",
        summary: "Moderner Webauftritt und Terminerlebnis für eine Physiotherapie-Praxis an der Rutherford Rd in Concord, Ontario (Kanada).",
        role: "Projektleitung, technische Architektur & Full-Stack-Umsetzung (im Team).",
        result: "Schnell ladendes, mobile-first Patientenportal mit optimierten Online-Terminanfragen und lokaler SEO-Sichtbarkeit.",
        tech: "Next.js, React, TypeScript, Tailwind CSS",
      },
      {
        id: "pse",
        name: "Plastic Surgery Exams",
        url: "https://www.plasticsurgeryexams.com/",
        host: "plasticsurgeryexams.com",
        kind: "EdTech-Web-Plattform",
        summary: "Interaktive Online-Fragenbank und Prüfungsvorbereitungsplattform für FRCS (Plast) und EBOPRAS-Kandidaten.",
        role: "Projektleitung, Systemarchitektur, Datenbankdesign & Plattformbetrieb.",
        result: "Hochverfügbare Prüfungssimulationsplattform für strukturierte medizinische Assessments und Fortschrittstracking.",
        tech: "React, Node.js, PostgreSQL, Cloud-Hosting",
      },
    ],
    team: {
      eyebrow: "Erweiterte Kapazität",
      title: "Unterstützt durch mein festes Web-Team: Niso Web",
      text: "Bei größeren Web- und Plattform-Vorhaben arbeite ich mit meinem eingespielten Engineering- und Design-Team bei Niso Web zusammen, spezialisiert auf individuelles UI/UX-Design, technisches SEO und skalierbare Webanwendungen.",
      points: [
        "Skalierbare Engineering-Kapazität für komplexe Web-Plattformen",
        "Durchgängiges UI/UX-Design, technisches SEO & Full-Stack-Delivery",
        "Ein verantwortlicher Ansprechpartner in Deutschland: Masoud Roosta",
      ],
      visit: "Niso Web ansehen",
      url: "https://nisoweb.com/",
      host: "nisoweb.com",
      note: "Alle Architektur-Entscheidungen, Code-Reviews, Sicherheitsstandards und die Kundenkommunikation bleiben direkt bei mir in Deutschland – so erhalten Sie Enterprise-Lieferkapazität mit einem einzigen, verantwortlichen Ansprechpartner vor Ort.",
    },
  },
  en: {
    eyebrow: "References",
    title: "Projects that are live.",
    lead: "Selected production work across healthcare and specialized web platforms.",
    labels: { role: "My role", result: "Outcome", tech: "Tech stack", visit: "Visit website", quote: "Client feedback" },
    quote: "",
    refs: [
      {
        id: "phoenix",
        name: "Phoenix Physio",
        url: "https://www.phoenixphysio.ca/",
        host: "phoenixphysio.ca",
        kind: "Healthcare & Practice Website",
        summary: "Modern web presence and patient appointment experience for a physiotherapy clinic on Rutherford Rd in Concord, Ontario (Canada).",
        role: "Project Lead, Technical Architecture & Full-Stack Implementation (with team).",
        result: "Fast-loading, mobile-first patient portal with streamlined online appointment inquiries and local SEO visibility.",
        tech: "Next.js, React, TypeScript, Tailwind CSS",
      },
      {
        id: "pse",
        name: "Plastic Surgery Exams",
        url: "https://www.plasticsurgeryexams.com/",
        host: "plasticsurgeryexams.com",
        kind: "EdTech Web Platform",
        summary: "Interactive online question bank and exam preparation platform for FRCS (Plast) and EBOPRAS candidates.",
        role: "Project Lead, System Architecture, Database Design & Platform Operations.",
        result: "High-availability exam simulation platform supporting structured medical assessments and progress tracking.",
        tech: "React, Node.js, PostgreSQL, Cloud Hosting",
      },
    ],
    team: {
      eyebrow: "Extended Capacity",
      title: "Backed by My Dedicated Web Team: Niso Web",
      text: "For larger web and platform initiatives, I collaborate with my established engineering and design team at Niso Web, specializing in custom UI/UX design, technical SEO, and scalable web applications.",
      points: [
        "Scalable engineering capacity for complex web platforms",
        "End-to-end UI/UX design, technical SEO & full-stack delivery",
        "One accountable point of contact in Germany: Masoud Roosta",
      ],
      visit: "Visit Niso Web",
      url: "https://nisoweb.com/",
      host: "nisoweb.com",
      note: "All architectural decisions, code reviews, security standards, and client communications remain directly with me in Germany—giving you enterprise delivery capacity with a single, accountable German-based point of contact.",
    },
  },
};

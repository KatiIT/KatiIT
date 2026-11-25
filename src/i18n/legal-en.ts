import type { LegalDoc } from "./types";

const imprint: LegalDoc = {
  title: "Legal Notice (Impressum)",
  notice: "Information pursuant to § 5 German Digital Services Act (DDG).",
  updated: "Last updated: November 2026",
  sections: [
    {
      heading: "Information pursuant to § 5 German Digital Services Act (DDG)",
      paragraphs: [
        "Masoud Roosta",
        "KatiIT – IT Engineering & Consulting (Freelancer / Freiberufler)",
        "Velsenstraße 2",
        "51469 Bergisch Gladbach",
        "Germany",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        "Phone: +4915510204397",
        "Email: mr@katiit.com",
        "Website: https://katiit.com",
      ],
    },
    {
      heading: "Person Responsible for Content",
      paragraphs: [
        "Masoud Roosta",
        "Velsenstraße 2",
        "51469 Bergisch Gladbach",
        "Germany",
      ],
    },
    {
      heading: "Dispute Resolution",
      paragraphs: [
        "The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/.",
        "We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board. Our services are primarily aimed at businesses and commercial clients.",
      ],
    },
  ],
};

const privacy: LegalDoc = {
  title: "Privacy Policy",
  notice: "Data protection information pursuant to the GDPR.",
  updated: "Last updated: November 2026",
  sections: [
    {
      heading: "1. Data Controller",
      paragraphs: [
        "The controller responsible for data processing on this website (katiit.com and the subdomain pantry.katiit.com) within the meaning of the General Data Protection Regulation (GDPR) is:",
        "Masoud Roosta",
        "KatiIT – IT Engineering & Consulting",
        "Velsenstraße 2, 51469 Bergisch Gladbach, Germany",
        "Phone: +4915510204397",
        "Email: mr@katiit.com",
      ],
    },
    {
      heading: "2. Hosting and Server Log Files (Oracle Cloud & IONOS)",
      paragraphs: [
        "Web Server Hosting (Oracle Cloud Infrastructure): This website and the associated subdomain pantry.katiit.com are hosted on a virtual server instance operated by Oracle Corporation (server location: Frankfurt am Main, Germany / EU region eu-frankfurt-1). When you access our pages, the web server automatically records technical connection data in server log files (such as IP address, date and time of access, requested URL, referrer URL, browser type, and operating system). This processing is based on Art. 6(1)(f) GDPR, reflecting our legitimate interest in the secure, stable, and error-free delivery of our online services.",
        "Domain Management and Email Services (IONOS): For domain registration and DNS management of katiit.com as well as business email communication (mr@katiit.com), we use services provided by IONOS SE, Elgendorfer Str. 57, 56410 Montabaur, Germany.",
        "International Data Transfers: Although our server infrastructure is operated in Frankfurt, Germany, Oracle's parent company is based in the United States. Where access or data transfer to third countries cannot be completely ruled out in individual cases, such transfers are safeguarded in accordance with Art. 44 et seq. GDPR (in particular via the EU-US Data Privacy Framework and/or EU Standard Contractual Clauses).",
      ],
    },
    {
      heading: "3. Local Fonts (Self-Hosted Fonts)",
      paragraphs: [
        "This website uses locally hosted fonts (such as Inter and JetBrains Mono). No connection to third-party servers takes place solely to load these fonts.",
      ],
    },
    {
      heading: "4. Contact via Email",
      paragraphs: [
        "If you contact us by email (mr@katiit.com), the details you provide (including your email address, name, and message content) will be processed for the purpose of handling your inquiry and any follow-up questions. The legal basis is Art. 6(1)(b) GDPR (pre-contractual measures or contract performance) or Art. 6(1)(f) GDPR (legitimate interest in responding to business inquiries).",
      ],
    },
    {
      heading: "5. Appointment Scheduling via Cal.com (Consent-Based)",
      paragraphs: [
        "For online appointment booking, we use Cal.com (Cal.com, Inc.). The Cal.com booking widget and external content are only loaded after you have explicitly given your consent via our consent banner or activation control.",
        "Only once you grant consent are technical connection data (in particular your IP address) and the booking details you enter (such as name, email address, and preferred time slot) transmitted to Cal.com. The sole legal basis is your consent pursuant to Art. 6(1)(a) GDPR. You may withdraw or modify your consent at any time with future effect via the privacy settings on this website.",
      ],
    },
    {
      heading: "6. Subdomain pantry.katiit.com and Client Projects",
      paragraphs: [
        "Where functional applications are provided via the subdomain pantry.katiit.com, technical connection data and—where access or account usage takes place—the data necessary to provide the respective functionality are processed (Art. 6(1)(b) and (f) GDPR).",
        "Where we process personal data on behalf of clients in the course of IT consulting or engineering services, such processing is governed exclusively by a separate Data Processing Agreement (DPA pursuant to Art. 28 GDPR) and appropriate technical and organizational measures (TOMs).",
      ],
    },
    {
      heading: "7. Your Rights as a Data Subject",
      paragraphs: [
        "Under the GDPR, you have the right at any time to access your stored personal data (Art. 15 GDPR), rectify inaccurate personal data (Art. 16 GDPR), erase your personal data (Art. 17 GDPR), restrict processing (Art. 18 GDPR), data portability (Art. 20 GDPR), object to processing (Art. 21 GDPR), and withdraw consent at any time with future effect (Art. 7(3) GDPR).",
        "You also have the right to lodge a complaint with a data protection supervisory authority (in North Rhine-Westphalia, Germany, the competent authority is the Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen – LDI NRW).",
      ],
    },
  ],
};

export const legalEn = { imprint, privacy };

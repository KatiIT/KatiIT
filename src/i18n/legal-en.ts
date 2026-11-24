import type { LegalDoc } from "./types";

const imprint: LegalDoc = {
  title: "Legal Notice (Impressum)",
  notice: "Information pursuant to Section 5 DDG (German Digital Services Act).",
  updated: "Last updated: November 2026",
  sections: [
    {
      heading: "Provider / Responsible Party",
      paragraphs: [
        "Masoud Roosta",
        "Freelance IT Engineer & Consultant (KatiIT)",
        "Velsenstraße 2",
        "51469 - Bergisch Gladbach, Germany",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        "Email: mr@katiit.com",
        "Phone: +4915510204397",
      ],
    },
    {
      heading: "Nature of Activity",
      paragraphs: [
        "Freelance activity in IT engineering, software development, and digital consulting (not registered in the commercial register / Handelsregister).",
      ],
    },
  ],
};

const privacy: LegalDoc = {
  title: "Privacy Policy",
  notice: "Privacy information pursuant to the GDPR.",
  updated: "Last updated: November 2026",
  sections: [
    {
      heading: "1. Controller",
      paragraphs: [
        "The controller within the meaning of the General Data Protection Regulation (GDPR / DSGVO) is:",
        "Masoud Roosta – KatiIT",
        "Velsenstraße 2, 51469 - Bergisch Gladbach, Germany",
        "Email: mr@katiit.com",
        "Phone: +4915510204397",
      ],
    },
    {
      heading: "2. Hosting and Server Log Files",
      paragraphs: [
        "This website is hosted by IONOS SE (Elgendorfer Str. 57, 56410 Montabaur, Germany). When you access this website, IONOS automatically collects technical data (such as IP address, date and time of access, browser type, operating system, and referrer URL) in server log files to ensure the secure and reliable operation of the website (Art. 6(1)(f) GDPR). The servers are located in data centers within Germany or the European Union. The log files are automatically deleted or anonymized after no more than 7 to 14 days.",
      ],
    },
    {
      heading: "3. Self-Hosted Fonts",
      paragraphs: [
        "This website uses locally hosted fonts (such as Inter and JetBrains Mono). No connection is made to third-party servers solely to load these fonts.",
      ],
    },
    {
      heading: "4. Contact and Appointment Booking (Cal.com)",
      paragraphs: [
        "If you contact us by email (also via mail servers operated by IONOS SE) or book an appointment via Cal.com, your details are processed to handle your inquiry or schedule the appointment (Art. 6(1)(b) or Art. 6(1)(f) GDPR). Cal.com is only embedded after your explicit consent (Art. 6(1)(a) GDPR), at which point connection data (such as your IP address and request metadata) is transmitted to Cal.com. Your inquiry data is deleted once your matter has been finally resolved and no statutory retention obligations apply.",
      ],
    },
    {
      heading: "5. Your Rights as a Data Subject",
      paragraphs: [
        "Under the GDPR, you have in particular the right of access, rectification, erasure, restriction of processing, data portability, and objection to processing (Arts. 15–21 GDPR), as well as the right to withdraw any consent given with effect for the future. You also have the right to lodge a complaint with a competent data protection supervisory authority.",
      ],
    },
  ],
};

export const legalEn = { imprint, privacy };

import { site } from "@/config/site";
import type { LegalDoc } from "./types";

const address = `${site.legalName}, ${site.street}, ${site.city}, Germany`;

const imprint: LegalDoc = {
  title: "Legal notice",
  notice:
    "Draft with placeholders. Replace all highlighted items and have the text reviewed by a lawyer before publishing. This is not legal advice. The German version is legally binding.",
  updated: "Last updated: [[DATE]]",
  sections: [
    { heading: "Information pursuant to § 5 DDG", paragraphs: [address] },
    { heading: "Contact", paragraphs: [`Phone: ${site.phone}`, `Email: ${site.email}`] },
    { heading: "VAT ID", paragraphs: [`VAT identification number pursuant to § 27a UStG: ${site.vatId}`] },
    {
      heading: "Professional regulations",
      paragraphs: ["[[Fill in only if applicable (chamber, professional title, supervisory authority). Otherwise remove this section.]]"],
    },
    {
      heading: "Responsible for content pursuant to § 18 (2) MStV",
      paragraphs: [`${site.owner}, ${site.street}, ${site.city}`],
    },
    {
      heading: "Dispute resolution",
      paragraphs: [
        "We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board. [[Please verify this statement fits your business.]]",
      ],
    },
    {
      heading: "Liability for content and links",
      paragraphs: [
        "We are responsible for our own content under general law. We are not obliged to monitor third-party information transmitted or stored, and we remove infringing content promptly once we become aware of it. We have no influence on the content of linked external sites and accept no liability for it.",
      ],
    },
    {
      heading: "Copyright",
      paragraphs: [
        "Content and works created by the site operator are subject to German copyright law. Reproduction, editing and distribution require the written consent of the author.",
      ],
    },
  ],
};

const privacy: LegalDoc = {
  title: "Privacy policy",
  notice:
    "Draft with placeholders. Replace all highlighted items and have the text reviewed by a lawyer before publishing. This is not legal advice. The German version is legally binding.",
  updated: "Last updated: [[DATE]]",
  sections: [
    {
      heading: "1. Controller",
      paragraphs: [`Controller within the meaning of the GDPR: ${address}. Email: ${site.email}, phone: ${site.phone}.`],
    },
    {
      heading: "2. Overview",
      paragraphs: [
        "This website sets no cookies, uses no analytics or tracking services, and loads no content from external servers unless you explicitly consent (see section 6).",
      ],
    },
    {
      heading: "3. Hosting and server log files",
      paragraphs: [
        `The website is operated by ${site.hosting}. When you visit, technically required data is processed: IP address, date and time, requested URL, data volume, referrer and user agent.`,
        "The legal basis is Art. 6(1)(f) GDPR (legitimate interest in security and stable operation). Log data is deleted after [[RETENTION PERIOD, e.g. 7 days]]. A data processing agreement under Art. 28 GDPR exists with the host. [[Please confirm.]]",
      ],
    },
    {
      heading: "4. Fonts",
      paragraphs: [
        "The fonts Inter and JetBrains Mono are served locally from our own server. No connection is made to Google or other font providers.",
      ],
    },
    {
      heading: "5. Storing your privacy choice",
      paragraphs: [
        "When you make a choice in the consent banner, we store it in your browser's local storage (key “katiit:consent:v1”). The entry contains your choice and a timestamp and is not transmitted to us or third parties.",
        "Access is strictly necessary under § 25(2) no. 2 TDDDG to implement your decision. The legal basis is Art. 6(1)(c), (f) GDPR. You can change your choice at any time via “Privacy settings” in the footer.",
      ],
    },
    {
      heading: "6. Appointment booking via Cal.com",
      paragraphs: [
        "To book appointments you can load a Cal.com calendar. It only loads after you consent. Your IP address is transmitted to Cal.com, and Cal.com may store or read information on your device.",
        "The legal basis is your consent under Art. 6(1)(a) GDPR and § 25(1) TDDDG. You can withdraw it at any time with effect for the future. When you book, we process the data you provide (e.g. name, email, preferred time, message) to prepare and conduct the consultation (Art. 6(1)(b) GDPR).",
        "Provider and processing location: [[CAL.COM DETAILS PER YOUR CONTRACT, e.g. provider, EU hosting option, data processing agreement]]. Transfer to third countries (e.g. the USA) may occur. [[Verify safeguards: EU-US Data Privacy Framework or standard contractual clauses.]]",
      ],
    },
    {
      heading: "7. Contacting us",
      paragraphs: [
        "If you contact us by email, we process your details to handle the request (Art. 6(1)(b) or (f) GDPR) and delete them once the purpose lapses and no retention duties apply.",
      ],
    },
    {
      heading: "8. Your rights",
      paragraphs: [
        "You have the right to access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction (Art. 18), data portability (Art. 20) and to object (Art. 21 GDPR). You may withdraw consent at any time (Art. 7(3) GDPR).",
        `You may also lodge a complaint with a supervisory authority, e.g. ${site.supervisoryAuthority}.`,
      ],
    },
    {
      heading: "9. Updates",
      paragraphs: ["We update this policy when the website or the legal situation changes. The current version applies."],
    },
  ],
};

export const legalEn = { imprint, privacy };

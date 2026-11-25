import type { LegalDoc } from "./types";

const imprint: LegalDoc = {
  title: "Impressum",
  notice: "Angaben gemäß § 5 DDG.",
  updated: "Stand: November 2026",
  sections: [
    {
      heading: "Angaben gemäß § 5 DDG",
      paragraphs: [
        "Masoud Roosta",
        "KatiIT – IT-Engineering & Beratung (Freiberufler)",
        "Velsenstraße 2",
        "51469 Bergisch Gladbach",
        "Deutschland",
      ],
    },
    {
      heading: "Kontakt",
      paragraphs: [
        "Telefon: +4915510204397",
        "E-Mail: mr@katiit.com",
        "Web: https://katiit.com",
      ],
    },
    {
      heading: "Redaktionell verantwortlich",
      paragraphs: [
        "Masoud Roosta",
        "Velsenstraße 2",
        "51469 Bergisch Gladbach",
        "Deutschland",
      ],
    },
    {
      heading: "EU-Streitschlichtung & Verbraucherstreitbeilegung",
      paragraphs: [
        "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/.",
        "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Unser Angebot richtet sich vorwiegend an Unternehmen und gewerbliche Auftraggeber.",
      ],
    },
  ],
};

const privacy: LegalDoc = {
  title: "Datenschutzerklärung",
  notice: "Informationen zum Datenschutz gemäß DSGVO.",
  updated: "Stand: November 2026",
  sections: [
    {
      heading: "1. Verantwortlicher",
      paragraphs: [
        "Verantwortlicher für die Datenverarbeitung auf dieser Website (katiit.com sowie der Subdomain pantry.katiit.com) im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:",
        "Masoud Roosta",
        "KatiIT – IT-Engineering & Beratung",
        "Velsenstraße 2, 51469 Bergisch Gladbach, Deutschland",
        "Telefon: +4915510204397",
        "E-Mail: mr@katiit.com",
      ],
    },
    {
      heading: "2. Hosting und Server-Logfiles (Oracle Cloud & IONOS)",
      paragraphs: [
        "Webserver-Hosting (Oracle Cloud Infrastructure): Diese Website und die zugehörige Subdomain pantry.katiit.com werden auf einer virtuellen Serverinstanz der Oracle Corporation (Serverstandort: Frankfurt am Main, Deutschland / EU-Region eu-frankfurt-1) gehostet. Beim Aufruf unserer Seiten erfasst der Webserver automatisch technische Verbindungsdaten in sogenannten Server-Logfiles (z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene URL, Referrer-URL, Browsertyp und Betriebssystem). Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO aufgrund unseres berechtigten Interesses an der sicheren, stabilen und fehlerfreien Bereitstellung unserer Online-Dienste.",
        "Domainverwaltung und E-Mail-Kommunikation (IONOS): Für die Registrierung und DNS-Verwaltung der Domain katiit.com sowie für die geschäftliche E-Mail-Kommunikation (mr@katiit.com) nutzen wir Dienste der IONOS SE, Elgendorfer Str. 57, 56410 Montabaur, Deutschland.",
        "Drittlandbezug / Garantien: Obwohl die Serverinfrastruktur in Frankfurt (Deutschland) betrieben wird, ist die Muttergesellschaft von Oracle ein US-amerikanisches Unternehmen. Soweit im Einzelfall eine Datenübermittlung in die USA oder ein Zugriff aus Drittländern nicht ausgeschlossen werden kann, stützt sich diese auf geeignete Garantien gemäß Art. 44 ff. DSGVO (insbesondere EU-US Data Privacy Framework bzw. Standardvertragsklauseln der EU-Kommission).",
      ],
    },
    {
      heading: "3. Lokale Schriftarten (Self-Hosted Fonts)",
      paragraphs: [
        "Diese Website verwendet lokal eingebundene Schriftarten (z. B. Inter, JetBrains Mono). Eine Verbindung zu Servern Dritter allein zum Laden dieser Schriftarten findet nicht statt.",
      ],
    },
    {
      heading: "4. Kontaktaufnahme per E-Mail",
      paragraphs: [
        "Wenn Sie uns per E-Mail (mr@katiit.com) kontaktieren, werden Ihre Angaben (einschließlich E-Mail-Adresse, Name und Inhalt Ihrer Anfrage) zum Zwecke der Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen oder Vertragserfüllung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).",
      ],
    },
    {
      heading: "5. Terminbuchung über Cal.com (Einwilligungsbasiert)",
      paragraphs: [
        "Für die Online-Terminvereinbarung nutzen wir den Dienst Cal.com (Cal.com, Inc.). Das Buchungs-Widget bzw. externe Inhalte von Cal.com werden erst dann geladen, wenn Sie über unser Einwilligungs-Banner bzw. die entsprechende Schaltfläche ausdrücklich zugestimmt haben.",
        "Erst nach Ihrer Einwilligung werden technische Verbindungsdaten (insbesondere Ihre IP-Adresse) sowie die von Ihnen im Buchungsformular eingegebenen Daten (z. B. Name, E-Mail-Adresse, Wunschtermin) an Cal.com übertragen. Rechtsgrundlage ist ausschließlich Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft über die Datenschutz-Einstellungen auf dieser Website widerrufen.",
      ],
    },
    {
      heading: "6. Subdomain pantry.katiit.com und Kundenprojekte",
      paragraphs: [
        "Soweit über die Subdomain pantry.katiit.com funktionelle Anwendungen bereitgestellt werden, werden technische Verbindungsdaten sowie – sofern ein Zugang oder eine Nutzung erfolgt – die zur Bereitstellung der jeweiligen Funktion erforderlichen Daten verarbeitet (Art. 6 Abs. 1 lit. b und lit. f DSGVO).",
        "Sofern wir im Rahmen von IT-Dienstleistungen im Auftrag von Kunden personenbezogene Daten verarbeiten, erfolgt dies ausschließlich auf Grundlage eines gesonderten Auftragsverarbeitungsvertrags (AVV gemäß Art. 28 DSGVO) unter Einhaltung geeigneter technischer und organisatorischer Maßnahmen (TOMs).",
      ],
    },
    {
      heading: "7. Ihre Rechte als betroffene Person",
      paragraphs: [
        "Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO), Berichtigung unrichtiger Daten (Art. 16 DSGVO), Löschung Ihrer Daten (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO), Widerspruch gegen die Verarbeitung (Art. 21 DSGVO) sowie Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO).",
        "Zudem steht Ihnen ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu (zuständig in Nordrhein-Westfalen ist insbesondere die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen – LDI NRW).",
      ],
    },
  ],
};

export const legalDe = { imprint, privacy };

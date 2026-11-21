import { site } from "@/config/site";
import type { LegalDoc } from "./types";

const address = `${site.legalName}, ${site.street}, ${site.city}, ${site.country}`;

const imprint: LegalDoc = {
  title: "Impressum",
  sections: [
    {
      heading: "Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)",
      paragraphs: [],
    },
    {
      heading: "Anbieter / Verantwortlich",
      paragraphs: [
        "Masoud Roosta",
        "Freiberuflicher IT-Engineer & Berater (KatiIT)",
        "Velsenstraße 2",
        "51469 - Bergisch Gladbach, Deutschland",
      ],
    },
    {
      heading: "Kontakt",
      paragraphs: [
        "E-Mail: mr@katiit.com",
        "Telefon: +4915510204397",
      ],
    },
    {
      heading: "Hinweis zur Tätigkeit",
      paragraphs: [
        "Freiberufliche Tätigkeit im Bereich IT-Engineering, Softwareentwicklung und digitale Beratung (kein Eintrag im Handelsregister).",
      ],
    },
  ],
};

const privacy: LegalDoc = {
  title: "Datenschutzerklärung",
  notice:
    "Entwurf mit Platzhaltern. Bitte alle markierten Angaben ersetzen und den Text vor Veröffentlichung rechtlich prüfen lassen. Dies ist keine Rechtsberatung.",
  updated: "Stand: [[DATUM]]",
  sections: [
    {
      heading: "1. Verantwortlicher",
      paragraphs: [`Verantwortlich im Sinne der DSGVO ist: ${address}. E-Mail: ${site.email}, Telefon: ${site.phone}.`],
    },
    {
      heading: "2. Überblick",
      paragraphs: [
        "Diese Website setzt keine Cookies, verwendet keine Analyse- oder Tracking-Dienste und bindet keine Inhalte externer Server ein, es sei denn, Sie willigen ausdrücklich ein (siehe Abschnitt 6).",
      ],
    },
    {
      heading: "3. Hosting und Server-Logfiles",
      paragraphs: [
        `Die Website wird bei ${site.hosting} betrieben. Beim Aufruf werden technisch erforderliche Daten verarbeitet: IP-Adresse, Datum und Uhrzeit, aufgerufene URL, übertragene Datenmenge, Referrer und User-Agent.`,
        "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Sicherheit und stabilem Betrieb). Die Logdaten werden nach [[SPEICHERDAUER, z. B. 7 Tagen]] gelöscht. Mit dem Hoster besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. [[Bitte bestätigen.]]",
      ],
    },
    {
      heading: "4. Schriftarten",
      paragraphs: [
        "Die Schriften Inter und JetBrains Mono werden lokal von unserem eigenen Server ausgeliefert. Es erfolgt keine Verbindung zu Google oder anderen Schriftanbietern.",
      ],
    },
    {
      heading: "5. Speicherung Ihrer Datenschutz-Auswahl",
      paragraphs: [
        "Wenn Sie eine Auswahl im Einwilligungsbanner treffen, speichern wir diese im lokalen Speicher Ihres Browsers (Schlüssel „katiit:consent:v1“). Der Eintrag enthält Ihre Auswahl und einen Zeitstempel und wird nicht an uns oder Dritte übertragen.",
        "Der Zugriff ist nach § 25 Abs. 2 Nr. 2 TDDDG unbedingt erforderlich, um Ihre Entscheidung umzusetzen. Rechtsgrundlage der Verarbeitung ist Art. 6 Abs. 1 lit. c, f DSGVO. Sie können Ihre Auswahl jederzeit über „Datenschutz-Einstellungen“ im Footer ändern.",
      ],
    },
    {
      heading: "6. Terminbuchung über Cal.com",
      paragraphs: [
        "Zur Buchung von Terminen können Sie einen Kalender von Cal.com einbinden. Er wird erst nach Ihrer Einwilligung geladen. Dabei wird Ihre IP-Adresse an Cal.com übermittelt, und Cal.com kann Informationen auf Ihrem Endgerät speichern oder auslesen.",
        "Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Sie können sie jederzeit mit Wirkung für die Zukunft widerrufen. Bei einer Buchung verarbeiten wir die von Ihnen angegebenen Daten (z. B. Name, E-Mail, Terminwunsch, Nachricht) zur Anbahnung und Durchführung des Beratungstermins (Art. 6 Abs. 1 lit. b DSGVO).",
        "Anbieter und Verarbeitungsort: [[ANGABEN ZU CAL.COM LAUT IHREM VERTRAG, z. B. Anbieter, EU-Hosting-Option, Auftragsverarbeitung]]. Eine Übermittlung in Drittländer (z. B. USA) kann erfolgen. [[Garantien prüfen: EU-US Data Privacy Framework bzw. Standardvertragsklauseln.]]",
      ],
    },
    {
      heading: "7. Kontaktaufnahme",
      paragraphs: [
        "Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung der Anfrage (Art. 6 Abs. 1 lit. b oder f DSGVO) und löschen sie, sobald der Zweck entfällt und keine Aufbewahrungspflichten bestehen.",
      ],
    },
    {
      heading: "8. Ihre Rechte",
      paragraphs: [
        "Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO). Erteilte Einwilligungen können Sie jederzeit widerrufen (Art. 7 Abs. 3 DSGVO).",
        `Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, z. B. bei ${site.supervisoryAuthority}.`,
      ],
    },
    {
      heading: "9. Aktualität",
      paragraphs: ["Wir passen diese Erklärung an, wenn sich die Website oder die Rechtslage ändert. Es gilt die jeweils aktuelle Fassung."],
    },
  ],
};

export const legalDe = { imprint, privacy };

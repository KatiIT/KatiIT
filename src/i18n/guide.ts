import type { Locale } from "./config";

export type GuideLink = { label: string; href: string };
export type GuideOption = { emoji: string; label: string; hint?: string; next: string };
export type GuideNode =
  | { id: string; kind: "ask"; text: string; options: GuideOption[] }
  | { id: string; kind: "result"; title: string; text: string; points?: string[]; links: GuideLink[] };
export type TourStep = { emoji: string; title: string; text: string; target: string };
export type GuideData = {
  ui: {
    fab: string; teaser: string; title: string; subtitle: string; close: string; restart: string; back: string;
    greeting: string; menu: GuideOption[]; menuAsk: string; inputLabel: string; inputPlaceholder: string; send: string;
    noMatch: string; tourTitle: string; tourStep: string; tourNext: string; tourPrev: string; tourDone: string; tourEnd: string;
    quickTitle: string; quickIntro: string; findIntro: string; openPage: string; recommendation: string; footnote: string;
  };
  quick: { emoji: string; label: string; hint: string; href: string }[];
  tour: TourStep[];
  nodes: GuideNode[];
  /** Freitext → passender Knoten (einfache Schlagwort-Erkennung, läuft komplett im Browser) */
  intents: { words: string[]; next: string }[];
};

const L = (label: string, href: string): GuideLink => ({ label, href });
const o = (emoji: string, label: string, next: string, hint?: string): GuideOption => ({ emoji, label, next, hint });

export const guideDe: GuideData = {
  ui: {
    fab: "Hilfe & Guide", teaser: "Nicht sicher, wo Sie suchen sollen? Ich helfe Ihnen.", title: "KatiIT Guide", subtitle: "Ihr Weg zur passenden Leistung",
    close: "Guide schließen", restart: "Neu starten", back: "Zurück", greeting: "Hallo! Ich bin der KatiIT Guide. Ich zeige Ihnen, wo Sie finden, was Sie brauchen.",
    menuAsk: "Wie kann ich helfen?", inputLabel: "Beschreiben Sie Ihr Anliegen", inputPlaceholder: "z. B. „Ich brauche eine App für iPhone“", send: "Senden",
    noMatch: "Dazu habe ich noch keine eindeutige Antwort. Wählen Sie bitte einen Bereich, dann komme ich gezielt weiter.",
    tourTitle: "Rundgang", tourStep: "Schritt", tourNext: "Weiter", tourPrev: "Zurück", tourDone: "Fertig", tourEnd: "Das war der Rundgang. Was möchten Sie als Nächstes tun?",
    quickTitle: "Schnellzugriff", quickIntro: "Wohin soll es gehen?", findIntro: "Was möchten Sie haben oder wissen?", openPage: "Seite öffnen", recommendation: "Meine Empfehlung",
    footnote: "Der Guide arbeitet lokal in Ihrem Browser und sendet keine Eingaben an Dritte.",
    menu: [
      o("🧭", "Rundgang starten", "tour", "Ich zeige Ihnen die Seite in 5 Schritten"),
      o("⚡", "Schnellzugriff", "quick", "Direkt zu Leistungen und Kontakt"),
      o("🎯", "Lösung finden", "find", "Beantworten Sie 2–3 Fragen"),
      o("📅", "Gespräch buchen", "book", "Termin im Audit-Bereich wählen"),
    ],
  },
  quick: [
    { emoji: "📱", label: "Mobile & Apps", hint: "iOS, Android, Flutter, Web-App", href: "/services/mobile" },
    { emoji: "🌐", label: "Web & Backend", hint: "Next.js, React, Node, Go, Cloud", href: "/services/engineering" },
    { emoji: "🏭", label: "Industrie & Automation", hint: "OPC-UA, MQTT, Edge, Wartung", href: "/services/industrial" },
    { emoji: "📚", label: "Referenzen", hint: "Projekte und Team", href: "#references" },
    { emoji: "💶", label: "Aufwand & Dauer", hint: "Richtwerte vor dem Audit", href: "/audit#effort" },
    { emoji: "🧩", label: "Vorgehen", hint: "Vom Audit zum Betrieb", href: "#process" },
    { emoji: "👤", label: "Über mich", hint: "Wer steckt hinter KatiIT", href: "#about" },
    { emoji: "📅", label: "Audit buchen", hint: "Termin vereinbaren", href: "/audit" },
    { emoji: "⚖️", label: "Impressum", hint: "Rechtliche Angaben", href: "/impressum" },
    { emoji: "🔒", label: "Datenschutz", hint: "Wie wir mit Daten umgehen", href: "/datenschutz" },
  ],
  tour: [
    { emoji: "🏠", title: "Start", text: "KatiIT bietet drei Leistungsbereiche: Industrie, Web und Mobile, einzeln oder kombiniert. Oben sehen Sie den Nutzen in Zahlen.", target: "#main" },
    { emoji: "🧱", title: "Drei Leistungsbereiche", text: "Blau: Industrie. Orange: Web und Backend. Grün: Mobile. Klicken Sie eine Spalte, dann öffnet sich die Detailseite mit Technologien, Vor- und Nachteilen.", target: "#services" },
    { emoji: "📚", title: "Referenzen", text: "Hier sehen Sie Projekte, die online laufen, und das Team, das bei größeren Vorhaben unterstützt.", target: "#references" },
    { emoji: "🧩", title: "Vorgehen", text: "So läuft ein Projekt ab: vom Audit über die Architektur bis zum stabilen Betrieb.", target: "#process" },
    { emoji: "👤", title: "Über mich", text: "Hier lernen Sie die Person hinter KatiIT kennen.", target: "#about" },
    { emoji: "📅", title: "Audit buchen", text: "Der schnellste Einstieg: ein kurzes Gespräch, in dem wir Ihr Vorhaben einordnen.", target: "#audit" },
  ],
  intents: [
    { words: ["kosten", "kostet", "kostenlos", "preis", "preise", "teuer", "dauer", "dauert", "zeitrahmen", "budget", "angebot", "wie lange", "aufwand"], next: "res_cost" },
    { words: ["referenz", "referenzen", "projekte", "beispiel", "erfahrung", "kunden", "team", "iran", "niso"], next: "res_refs" },
    { words: ["alte maschine", "alte anlage", "nachrüst", "nachruest", "kaputt", "defekt", "anbindung", "anbinden"], next: "ind_conn" },
    { words: ["ios", "iphone", "swift", "apple"], next: "res_ios" },
    { words: ["android", "kotlin"], next: "res_android" },
    { words: ["flutter", "react native", "cross", "plattform"], next: "res_cross" },
    { words: ["pwa", "webapp", "web-app", "ohne store"], next: "res_pwa" },
    { words: ["app", "apps", "mobil", "mobile", "smartphone", "handy"], next: "apps" },
    { words: ["opc", "mqtt", "kafka", "sps", "s7", "plc", "retrofit"], next: "ind_conn" },
    { words: ["wartung", "ausfall", "predictive", "störung"], next: "res_pm" },
    { words: ["scada", "leitstand", "digital twin", "visualis"], next: "res_scada" },
    { words: ["maschine", "industrie", "produktion", "fabrik", "anlage", "mittelstand", "automation"], next: "ind" },
    { words: ["api", "backend", "schnittstelle", "cloud", "server", "microservice"], next: "res_backend" },
    { words: ["portal", "login", "webanwendung", "dashboard"], next: "res_web_app" },
    { words: ["website", "webseite", "homepage", "seo", "relaunch", "shop", "web"], next: "web" },
  ],
  nodes: [
    { id: "find", kind: "ask", text: "Was möchten Sie haben oder wissen?", options: [
      o("📱", "Apps", "apps", "iPhone, Android oder beides"),
      o("🌐", "Website & Web-Software", "web", "Firmenseite, Portal, Backend"),
      o("🏭", "Industrie-Services", "ind", "Maschinen, Daten, Wartung"),
      o("🤔", "Ich bin nicht sicher", "unsure", "Ich helfe beim Einordnen"),
    ] },
    { id: "apps", kind: "ask", text: "Apps entwickeln wir für iOS, Android und plattformübergreifend, vom Konzept bis zum Store-Release. Gibt es schon eine App?", options: [
      o("✅", "Ja, eine bestehende App", "apps_existing", "verbessern oder erweitern"),
      o("💡", "Nein, eine neue Idee", "apps_new", "von Grund auf starten"),
    ] },
    { id: "apps_existing", kind: "ask", text: "Was ist Ihr wichtigstes Anliegen bei der bestehenden App?", options: [
      o("🐌", "Sie ist langsam oder instabil", "res_audit_mobile"),
      o("🔄", "Sie soll auf eine weitere Plattform", "apps_both"),
      o("✨", "Sie braucht neue Funktionen", "res_audit_mobile"),
    ] },
    { id: "apps_new", kind: "ask", text: "Auf welchen Geräten soll die App laufen?", options: [
      o("🍎", "Nur iPhone / iPad", "res_ios"),
      o("🤖", "Nur Android", "res_android"),
      o("📱", "Beide", "apps_both"),
      o("🌍", "Weiß ich noch nicht", "apps_both"),
    ] },
    { id: "apps_both", kind: "ask", text: "Was ist Ihnen bei einer App für beide Systeme wichtiger?", options: [
      o("⚡", "Schnell und günstig starten", "res_cross", "eine Codebasis"),
      o("🏎️", "Beste Performance und Gerätefunktionen", "res_native", "je Plattform nativ"),
      o("🔗", "Ohne App-Store verfügbar sein", "res_pwa", "Web-App / PWA"),
    ] },
    { id: "web", kind: "ask", text: "Im Web bauen wir Front-End, Back-End und Cloud-Systeme. Haben Sie schon eine Website?", options: [
      o("🕰️", "Ja, aber veraltet oder langsam", "res_web_site", "Relaunch"),
      o("🆕", "Nein, ich brauche eine", "web_new"),
      o("⚙️", "Ja, sie braucht neue Funktionen", "web_features"),
    ] },
    { id: "web_new", kind: "ask", text: "Was soll die neue Website leisten?", options: [
      o("📰", "Mein Unternehmen präsentieren", "res_web_site", "schnell, auffindbar"),
      o("🔐", "Ein Kundenportal / eine Webanwendung", "res_web_app", "Login, Daten, Abläufe"),
      o("🔌", "Systeme verbinden, API, Cloud", "res_backend"),
    ] },
    { id: "web_features", kind: "ask", text: "Welche Art von Funktion fehlt Ihnen?", options: [
      o("👤", "Login und Benutzerbereich", "res_web_app"),
      o("🔗", "Anbindung an andere Systeme", "res_backend"),
      o("📈", "Mehr Tempo und Skalierung", "res_backend"),
    ] },
    { id: "ind", kind: "ask", text: "In der Industrie bringen wir Bestandsmaschinen in Echtzeit-Analytik, im laufenden Betrieb. Was ist Ihr Ziel?", options: [
      o("🔌", "Maschinen vernetzen", "ind_conn", "Daten verfügbar machen"),
      o("📊", "Daten auswerten", "ind_data", "Kennzahlen, Analytik"),
      o("🛠️", "Ausfälle vorhersagen", "res_pm", "Predictive Maintenance"),
      o("🖥️", "Anlage visualisieren", "res_scada", "Leitstand, Digital Twin"),
    ] },
    { id: "ind_conn", kind: "ask", text: "Wie alt sind die Anlagen?", options: [
      o("🕰️", "Älter, ohne moderne Schnittstelle", "res_retrofit"),
      o("🆕", "Modern, mit OPC-UA oder S7", "res_opc"),
    ] },
    { id: "ind_data", kind: "ask", text: "Wo sollen die Daten ausgewertet werden?", options: [
      o("🏭", "Direkt vor Ort (Edge)", "res_edge", "geringe Latenz"),
      o("☁️", "In der Cloud", "res_cloud", "skalierbar"),
      o("🤷", "Weiß ich nicht", "res_audit_ind"),
    ] },
    { id: "clarify", kind: "ask", text: "Das habe ich nicht eindeutig verstanden. In welchem Bereich liegt Ihr Anliegen am ehesten?", options: [
      o("📱", "Apps", "apps"),
      o("🌐", "Website & Web-Software", "web"),
      o("🏭", "Industrie-Services", "ind"),
      o("💶", "Kosten & Dauer", "res_cost"),
      o("📚", "Referenzen", "res_refs"),
    ] },
    { id: "res_cost", kind: "result", title: "Aufwand und Zeitrahmen", text: "Richtwerte nach Projektart finden Sie auf der Audit-Seite. Ein verbindliches Angebot gibt es nach dem Erstgespräch.", links: [L("Richtwerte ansehen", "/audit#effort"), L("Audit buchen", "/audit")] },
    { id: "res_refs", kind: "result", title: "Referenzen und Team", text: "Sie sehen Projekte, die online laufen, und das Team, das bei größeren Web-Vorhaben unterstützt.", links: [L("Zu den Referenzen", "#references"), L("Audit buchen", "/audit")] },
    { id: "unsure", kind: "ask", text: "Kein Problem. Was beschreibt Ihre Lage am besten?", options: [
      o("🚀", "Ich möchte etwas Neues bauen", "find"),
      o("🔧", "Ich möchte etwas Bestehendes verbessern", "res_audit_gen"),
      o("💬", "Ich möchte einfach reden", "book"),
    ] },
    { id: "book", kind: "result", title: "Gespräch buchen", text: "Im Audit-Bereich können Sie direkt einen Termin wählen. Wir ordnen Ihr Vorhaben ein und nennen einen sinnvollen nächsten Schritt.", links: [L("Zum Audit-Termin", "/audit")] },
    { id: "res_ios", kind: "result", title: "iOS nativ", text: "Für Apps nur für Apple-Geräte lohnt sich eine native Umsetzung in Swift.", points: ["Voller Zugriff auf alle Apple-Funktionen", "Sehr gute Performance und Bedienung", "Saubere Architektur mit MVVM-C, Combine oder RxSwift"], links: [L("Mobile-Seite: Optionen & Vor-/Nachteile", "/services/mobile#options"), L("Audit buchen", "/audit")] },
    { id: "res_android", kind: "result", title: "Android nativ", text: "Für reine Android-Apps ist Kotlin mit Coroutines und Flow der moderne Standard.", points: ["Tiefe Integration in das Android-System", "Wartbar mit MVVM", "Sehr gute Performance"], links: [L("Mobile-Seite: Optionen & Vor-/Nachteile", "/services/mobile#options"), L("Audit buchen", "/audit")] },
    { id: "res_cross", kind: "result", title: "Cross-Platform (Flutter, React Native, KMP)", text: "Eine gemeinsame Codebasis spart Zeit und Kosten und liefert die App für beide Systeme.", points: ["Schneller Marktstart", "Weniger Aufwand in der Pflege", "Native Module für Sonderfälle möglich"], links: [L("Entscheidungshilfe auf der Mobile-Seite", "/services/mobile#guide"), L("Audit buchen", "/audit")] },
    { id: "res_native", kind: "result", title: "Native Entwicklung je Plattform", text: "Wenn Performance, Sensorik oder Sicherheitsfunktionen entscheidend sind, lohnen zwei native Apps.", points: ["Maximale Kontrolle und Qualität", "Höherer Aufwand durch zwei Codebasen"], links: [L("Vor- und Nachteile ansehen", "/services/mobile#options"), L("Audit buchen", "/audit")] },
    { id: "res_pwa", kind: "result", title: "Web-App / PWA", text: "Wenn Nutzer ohne Installation starten sollen, ist eine Web-App der schnellste Weg.", points: ["Kein App-Store nötig", "Eine Codebasis für alle Geräte", "Eingeschränkter Zugriff auf Gerätefunktionen"], links: [L("Web-App auf der Mobile-Seite", "/services/mobile#options"), L("Audit buchen", "/audit")] },
    { id: "res_audit_mobile", kind: "result", title: "Bestandsaufnahme Ihrer App", text: "Zuerst prüfen wir Code, Architektur, Performance und Releases, dann gibt es eine begründete Empfehlung.", links: [L("Vorgehen bei der App-Entwicklung", "/services/mobile#process"), L("Audit buchen", "/audit")] },
    { id: "res_web_site", kind: "result", title: "Schnelle, moderne Website", text: "Mit Next.js entsteht eine schnelle, gut auffindbare und datenschutzfreundliche Firmenseite.", points: ["Gute Ladezeiten und SEO", "Zweisprachig möglich", "Saubere Basis für spätere Erweiterungen"], links: [L("Web & Backend ansehen", "/services/engineering"), L("Audit buchen", "/audit")] },
    { id: "res_web_app", kind: "result", title: "Webanwendung / Kundenportal", text: "Für Login, Daten und Abläufe kombinieren wir ein modernes Front-End mit einem soliden Backend.", links: [L("Web & Backend ansehen", "/services/engineering#options"), L("Audit buchen", "/audit")] },
    { id: "res_backend", kind: "result", title: "Backend, APIs & Cloud", text: "Schnittstellen und Cloud-Systeme baue ich mit Node.js, Go oder Rust, je nach Anforderung als Modul-Monolith, Microservices oder Serverless.", links: [L("Architektur-Optionen ansehen", "/services/engineering#guide"), L("Audit buchen", "/audit")] },
    { id: "res_opc", kind: "result", title: "Anbindung per OPC-UA / S7", text: "Moderne Anlagen sprechen meist schon OPC-UA oder S7. Wir machen die Daten für Analytik verfügbar.", links: [L("Industrie-Seite ansehen", "/services/industrial#options"), L("Audit buchen", "/audit")] },
    { id: "res_retrofit", kind: "result", title: "Retrofit-Gateway", text: "Ältere Maschinen binden wir über ein Gateway an, ohne die Anlage umzubauen und in Absprache mit der Produktion.", links: [L("Retrofit auf der Industrie-Seite", "/services/industrial#options"), L("Audit buchen", "/audit")] },
    { id: "res_edge", kind: "result", title: "Edge-Analytik", text: "Die Auswertung direkt an der Anlage liefert Ergebnisse in Echtzeit und funktioniert auch bei Netzausfall.", links: [L("Industrie-Seite ansehen", "/services/industrial#options"), L("Audit buchen", "/audit")] },
    { id: "res_cloud", kind: "result", title: "Cloud-Analytik", text: "In der Cloud skalieren Auswertungen und Dashboards über mehrere Standorte.", links: [L("Industrie-Seite ansehen", "/services/industrial#options"), L("Audit buchen", "/audit")] },
    { id: "res_audit_ind", kind: "result", title: "Industrie-Audit", text: "Wir sehen uns Anlagen, Schnittstellen und Ziele an und wählen dann Edge, Cloud oder beides.", links: [L("Entscheidungshilfe ansehen", "/services/industrial#guide"), L("Audit buchen", "/audit")] },
    { id: "res_pm", kind: "result", title: "Predictive Maintenance", text: "Aus Maschinendaten erkennen wir Muster vor dem Ausfall und planen Wartung bedarfsgerecht.", links: [L("Industrie-Seite ansehen", "/services/industrial#options"), L("Audit buchen", "/audit")] },
    { id: "res_scada", kind: "result", title: "SCADA & Digital Twin", text: "Leitstand und digitaler Zwilling machen den Zustand Ihrer Anlage auf einen Blick sichtbar.", links: [L("Industrie-Seite ansehen", "/services/industrial#options"), L("Audit buchen", "/audit")] },
    { id: "res_audit_gen", kind: "result", title: "Einstieg über das Audit", text: "Im Audit schauen wir gemeinsam auf Ihr Vorhaben und klären, ob Mobile, Web oder Industrie der richtige Hebel ist.", links: [L("Vorgehen ansehen", "#process"), L("Audit buchen", "/audit")] },
  ],
};

export const guideEn: GuideData = {
  ui: {
    fab: "Help & guide", teaser: "Not sure where to look? I can help.", title: "KatiIT Guide", subtitle: "Your way to the right service",
    close: "Close guide", restart: "Start over", back: "Back", greeting: "Hi! I'm the KatiIT Guide. I'll show you where to find what you need.",
    menuAsk: "How can I help?", inputLabel: "Describe what you need", inputPlaceholder: "e.g. “I need an app for iPhone”", send: "Send",
    noMatch: "I don't have a clear answer for that yet. Please pick an area and I'll narrow it down.",
    tourTitle: "Tour", tourStep: "Step", tourNext: "Next", tourPrev: "Back", tourDone: "Done", tourEnd: "That was the tour. What would you like to do next?",
    quickTitle: "Fast access", quickIntro: "Where to?", findIntro: "What would you like to have or know?", openPage: "Open page", recommendation: "My recommendation",
    footnote: "The guide runs locally in your browser and sends nothing to third parties.",
    menu: [
      o("🧭", "Take a tour", "tour", "I'll show you the page in 5 steps"),
      o("⚡", "Fast access", "quick", "Straight to services and contact"),
      o("🎯", "Find the solution", "find", "Answer 2–3 questions"),
      o("📅", "Book a call", "book", "Pick a slot in the audit section"),
    ],
  },
  quick: [
    { emoji: "📱", label: "Mobile & apps", hint: "iOS, Android, Flutter, web app", href: "/services/mobile" },
    { emoji: "🌐", label: "Web & backend", hint: "Next.js, React, Node, Go, cloud", href: "/services/engineering" },
    { emoji: "🏭", label: "Industrial & automation", hint: "OPC-UA, MQTT, edge, maintenance", href: "/services/industrial" },
    { emoji: "📚", label: "References", hint: "Projects and team", href: "#references" },
    { emoji: "💶", label: "Effort & timeline", hint: "Guidelines before the audit", href: "/audit#effort" },
    { emoji: "🧩", label: "Process", hint: "From audit to operations", href: "#process" },
    { emoji: "👤", label: "About me", hint: "Who is behind KatiIT", href: "#about" },
    { emoji: "📅", label: "Book an audit", hint: "Pick a time", href: "/audit" },
    { emoji: "⚖️", label: "Legal notice", hint: "Imprint", href: "/impressum" },
    { emoji: "🔒", label: "Privacy", hint: "How we handle data", href: "/datenschutz" },
  ],
  tour: [
    { emoji: "🏠", title: "Start", text: "KatiIT offers three service areas: industrial, web and mobile, separately or combined. At the top you see the benefits in numbers.", target: "#main" },
    { emoji: "🧱", title: "Three service areas", text: "Blue: industrial. Orange: web and backend. Green: mobile. Click a column to open its detail page with technologies, pros and cons.", target: "#services" },
    { emoji: "📚", title: "References", text: "Here you see projects that are live, and the team that supports larger projects.", target: "#references" },
    { emoji: "🧩", title: "Process", text: "This is how a project runs: from audit through architecture to stable operations.", target: "#process" },
    { emoji: "👤", title: "About me", text: "Get to know the person behind KatiIT.", target: "#about" },
    { emoji: "📅", title: "Book an audit", text: "The fastest way in: a short call in which we size up your project.", target: "#audit" },
  ],
  intents: [
    { words: ["cost", "costs", "price", "pricing", "expensive", "duration", "timeline", "takes", "budget", "quote", "how much", "how long", "effort"], next: "res_cost" },
    { words: ["reference", "references", "projects", "example", "experience", "clients", "team", "iran", "niso"], next: "res_refs" },
    { words: ["old machine", "old plant", "legacy", "retrofit", "broken", "connection", "connect"], next: "ind_conn" },
    { words: ["ios", "iphone", "swift", "apple"], next: "res_ios" },
    { words: ["android", "kotlin"], next: "res_android" },
    { words: ["flutter", "react native", "cross", "platform"], next: "res_cross" },
    { words: ["pwa", "webapp", "web app", "without store", "no store"], next: "res_pwa" },
    { words: ["app", "apps", "mobile", "smartphone", "phone"], next: "apps" },
    { words: ["opc", "mqtt", "kafka", "plc", "s7", "retrofit"], next: "ind_conn" },
    { words: ["maintenance", "failure", "predictive", "breakdown"], next: "res_pm" },
    { words: ["scada", "control room", "digital twin", "visualis", "visualiz"], next: "res_scada" },
    { words: ["machine", "industrial", "industry", "production", "factory", "plant", "automation"], next: "ind" },
    { words: ["api", "backend", "interface", "cloud", "server", "microservice"], next: "res_backend" },
    { words: ["portal", "login", "web application", "dashboard"], next: "res_web_app" },
    { words: ["website", "homepage", "seo", "relaunch", "shop", "web"], next: "web" },
  ],
  nodes: [
    { id: "find", kind: "ask", text: "What would you like to have or know?", options: [
      o("📱", "Apps", "apps", "iPhone, Android or both"),
      o("🌐", "Website & web software", "web", "Company site, portal, backend"),
      o("🏭", "Industrial services", "ind", "Machines, data, maintenance"),
      o("🤔", "I'm not sure", "unsure", "I'll help you sort it out"),
    ] },
    { id: "apps", kind: "ask", text: "We build apps for iOS, Android and cross-platform, from concept to store release. Do you already have an app?", options: [
      o("✅", "Yes, an existing app", "apps_existing", "improve or extend it"),
      o("💡", "No, a new idea", "apps_new", "start from scratch"),
    ] },
    { id: "apps_existing", kind: "ask", text: "What matters most for your existing app?", options: [
      o("🐌", "It is slow or unstable", "res_audit_mobile"),
      o("🔄", "It should go to another platform", "apps_both"),
      o("✨", "It needs new features", "res_audit_mobile"),
    ] },
    { id: "apps_new", kind: "ask", text: "Which devices should the app run on?", options: [
      o("🍎", "iPhone / iPad only", "res_ios"),
      o("🤖", "Android only", "res_android"),
      o("📱", "Both", "apps_both"),
      o("🌍", "Not sure yet", "apps_both"),
    ] },
    { id: "apps_both", kind: "ask", text: "For an app on both systems, what matters more?", options: [
      o("⚡", "Start fast and affordably", "res_cross", "one codebase"),
      o("🏎️", "Best performance and device features", "res_native", "native per platform"),
      o("🔗", "Be available without an app store", "res_pwa", "web app / PWA"),
    ] },
    { id: "web", kind: "ask", text: "On the web we build front-end, back-end and cloud systems. Do you already have a website?", options: [
      o("🕰️", "Yes, but outdated or slow", "res_web_site", "relaunch"),
      o("🆕", "No, I need one", "web_new"),
      o("⚙️", "Yes, it needs new features", "web_features"),
    ] },
    { id: "web_new", kind: "ask", text: "What should the new website do?", options: [
      o("📰", "Present my company", "res_web_site", "fast, findable"),
      o("🔐", "A customer portal / web application", "res_web_app", "login, data, workflows"),
      o("🔌", "Connect systems, API, cloud", "res_backend"),
    ] },
    { id: "web_features", kind: "ask", text: "What kind of feature is missing?", options: [
      o("👤", "Login and user area", "res_web_app"),
      o("🔗", "Connection to other systems", "res_backend"),
      o("📈", "More speed and scale", "res_backend"),
    ] },
    { id: "ind", kind: "ask", text: "In industry we bring existing machines into real-time analytics during operation. What is your goal?", options: [
      o("🔌", "Connect machines", "ind_conn", "make data available"),
      o("📊", "Analyse data", "ind_data", "KPIs, analytics"),
      o("🛠️", "Predict failures", "res_pm", "predictive maintenance"),
      o("🖥️", "Visualise the plant", "res_scada", "control room, digital twin"),
    ] },
    { id: "ind_conn", kind: "ask", text: "How old are the machines?", options: [
      o("🕰️", "Older, no modern interface", "res_retrofit"),
      o("🆕", "Modern, with OPC-UA or S7", "res_opc"),
    ] },
    { id: "ind_data", kind: "ask", text: "Where should the data be analysed?", options: [
      o("🏭", "On site (edge)", "res_edge", "low latency"),
      o("☁️", "In the cloud", "res_cloud", "scalable"),
      o("🤷", "Not sure", "res_audit_ind"),
    ] },
    { id: "clarify", kind: "ask", text: "I didn't quite get that. Which area does your request fit best?", options: [
      o("📱", "Apps", "apps"),
      o("🌐", "Website & web software", "web"),
      o("🏭", "Industrial services", "ind"),
      o("💶", "Cost & timeline", "res_cost"),
      o("📚", "References", "res_refs"),
    ] },
    { id: "res_cost", kind: "result", title: "Effort and timeline", text: "Guidelines by project type are on the audit page. A binding quote follows after the intro call.", links: [L("See the guidelines", "/audit#effort"), L("Book an audit", "/audit")] },
    { id: "res_refs", kind: "result", title: "References and team", text: "You'll see projects that are live and the team that supports larger web projects.", links: [L("To the references", "#references"), L("Book an audit", "/audit")] },
    { id: "unsure", kind: "ask", text: "No problem. Which describes your situation best?", options: [
      o("🚀", "I want to build something new", "find"),
      o("🔧", "I want to improve something existing", "res_audit_gen"),
      o("💬", "I'd just like to talk", "book"),
    ] },
    { id: "book", kind: "result", title: "Book a call", text: "In the audit section you can pick a slot directly. We size up your project and name a sensible next step.", links: [L("To the audit booking", "/audit")] },
    { id: "res_ios", kind: "result", title: "Native iOS", text: "For apps only for Apple devices, a native Swift implementation pays off.", points: ["Full access to all Apple features", "Very good performance and feel", "Clean architecture with MVVM-C, Combine or RxSwift"], links: [L("Mobile page: options, pros and cons", "/services/mobile#options"), L("Book an audit", "/audit")] },
    { id: "res_android", kind: "result", title: "Native Android", text: "For Android-only apps, Kotlin with coroutines and Flow is the modern standard.", points: ["Deep integration into Android", "Maintainable with MVVM", "Very good performance"], links: [L("Mobile page: options, pros and cons", "/services/mobile#options"), L("Book an audit", "/audit")] },
    { id: "res_cross", kind: "result", title: "Cross-platform (Flutter, React Native, KMP)", text: "One shared codebase saves time and cost and delivers the app for both systems.", points: ["Faster time to market", "Less maintenance effort", "Native modules for special cases"], links: [L("Decision guide on the mobile page", "/services/mobile#guide"), L("Book an audit", "/audit")] },
    { id: "res_native", kind: "result", title: "Native development per platform", text: "When performance, sensors or security features are decisive, two native apps pay off.", points: ["Maximum control and quality", "Higher effort with two codebases"], links: [L("See pros and cons", "/services/mobile#options"), L("Book an audit", "/audit")] },
    { id: "res_pwa", kind: "result", title: "Web app / PWA", text: "If users should start without installing anything, a web app is the fastest route.", points: ["No app store needed", "One codebase for all devices", "Limited access to device features"], links: [L("Web app on the mobile page", "/services/mobile#options"), L("Book an audit", "/audit")] },
    { id: "res_audit_mobile", kind: "result", title: "Review of your app", text: "First we review code, architecture, performance and releases, then you get a reasoned recommendation.", links: [L("App development process", "/services/mobile#process"), L("Book an audit", "/audit")] },
    { id: "res_web_site", kind: "result", title: "Fast, modern website", text: "With Next.js you get a fast, findable and privacy-friendly company site.", points: ["Good load times and SEO", "Bilingual if needed", "A clean base for later extensions"], links: [L("See web & backend", "/services/engineering"), L("Book an audit", "/audit")] },
    { id: "res_web_app", kind: "result", title: "Web application / customer portal", text: "For login, data and workflows we combine a modern front-end with a solid backend.", links: [L("See web & backend", "/services/engineering#options"), L("Book an audit", "/audit")] },
    { id: "res_backend", kind: "result", title: "Backend, APIs & cloud", text: "I build interfaces and cloud systems with Node.js, Go or Rust, as a modular monolith, microservices or serverless depending on needs.", links: [L("See architecture options", "/services/engineering#guide"), L("Book an audit", "/audit")] },
    { id: "res_opc", kind: "result", title: "Connection via OPC-UA / S7", text: "Modern machines usually speak OPC-UA or S7 already. We make the data available for analytics.", links: [L("See the industrial page", "/services/industrial#options"), L("Book an audit", "/audit")] },
    { id: "res_retrofit", kind: "result", title: "Retrofit gateway", text: "We connect older machines through a gateway, without rebuilding the plant, in agreement with production.", links: [L("Retrofit on the industrial page", "/services/industrial#options"), L("Book an audit", "/audit")] },
    { id: "res_edge", kind: "result", title: "Edge analytics", text: "Analysis right at the plant gives real-time results and keeps working during network outages.", links: [L("See the industrial page", "/services/industrial#options"), L("Book an audit", "/audit")] },
    { id: "res_cloud", kind: "result", title: "Cloud analytics", text: "In the cloud, analyses and dashboards scale across several sites.", links: [L("See the industrial page", "/services/industrial#options"), L("Book an audit", "/audit")] },
    { id: "res_audit_ind", kind: "result", title: "Industrial audit", text: "We look at plants, interfaces and goals, then choose edge, cloud or both.", links: [L("See the decision guide", "/services/industrial#guide"), L("Book an audit", "/audit")] },
    { id: "res_pm", kind: "result", title: "Predictive maintenance", text: "From machine data we detect patterns before a failure and plan maintenance as needed.", links: [L("See the industrial page", "/services/industrial#options"), L("Book an audit", "/audit")] },
    { id: "res_scada", kind: "result", title: "SCADA & digital twin", text: "A control room and a digital twin show the state of your plant at a glance.", links: [L("See the industrial page", "/services/industrial#options"), L("Book an audit", "/audit")] },
    { id: "res_audit_gen", kind: "result", title: "Start with the audit", text: "In the audit we look at your project together and clarify whether mobile, web or industrial is the right lever.", links: [L("See the process", "#process"), L("Book an audit", "/audit")] },
  ],
};

export const guides: Record<Locale, GuideData> = { de: guideDe, en: guideEn };

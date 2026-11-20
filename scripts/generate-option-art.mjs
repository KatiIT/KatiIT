// Erzeugt die Bilder der Options-Zeilen (24 SVGs, 600×400) nach public/options/{de,en}/<id>.svg (Beschriftungen je Sprache).
//   node scripts/generate-option-art.mjs
// Marken-Logos (Apple, Swift, Flutter, …) sind geschützt und werden hier NICHT nachgezeichnet. Stattdessen gibt es
// "Logo-Plätze": legen Sie die offiziellen Dateien (aus den Marken-Richtlinien der Hersteller) als
//   scripts/hero-logos/<schlüssel>.svg|png   ab (Schlüssel siehe Ausgabe/README) und führen Sie das Skript erneut aus.
// Ohne Datei zeigt der Platz einen neutralen Kreis mit dem Anfangsbuchstaben.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public/options");
mkdirSync(out, { recursive: true });

const SANS = "Inter, 'Segoe UI', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace";
const INK = "#E6EAF2";
const GREEN = "#10B981", ORANGE = "#F97316", BLUE = "#3B82F6";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const used = new Map();
let LNG = "de";
const L = (de, en) => (LNG === "de" ? de : en);

const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-size="${o.size ?? 13}" fill="${o.fill ?? INK}" font-family="${o.mono ? MONO : SANS}" font-weight="${o.w ?? 600}" text-anchor="${o.anchor ?? "middle"}" opacity="${o.op ?? 1}" letter-spacing="${o.ls ?? 0}">${esc(s)}</text>`;
const R = (x, y, w, h, r, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${o.fill ?? "none"}" stroke="${o.stroke ?? "none"}" stroke-width="${o.sw ?? 1.6}" opacity="${o.op ?? 1}"${o.filter ? ` filter="url(#${o.filter})"` : ""}/>`;
const C = (x, y, r, o = {}) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${o.fill ?? "none"}" stroke="${o.stroke ?? "none"}" stroke-width="${o.sw ?? 1.6}" opacity="${o.op ?? 1}"/>`;
const P = (d, o = {}) => `<path d="${d}" fill="${o.fill ?? "none"}" stroke="${o.stroke ?? "none"}" stroke-width="${o.sw ?? 2}" stroke-linecap="round" stroke-linejoin="round" opacity="${o.op ?? 1}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}/>`;

/** Leiterbahn mit laufenden Datenpunkten (statisch gestrichelt). */
const trace = (d, A, o = {}) => P(d, { stroke: A, op: 0.45, sw: 2 }) + P(d, { stroke: A, sw: 2.6, dash: "9 22", op: o.op ?? 0.95 });

/** Logo-Platz: offizielle Datei, falls vorhanden, sonst neutraler Kreis mit Anfangsbuchstabe. */
function logo(key, label, cx, cy, size, A) {
  for (const ext of ["svg", "png"]) {
    const f = join(root, "scripts/hero-logos", `${key}.${ext}`);
    if (existsSync(f)) {
      used.set(key, true);
      return `<image x="${cx - size / 2}" y="${cy - size / 2}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet" href="data:${ext === "svg" ? "image/svg+xml" : "image/png"};base64,${readFileSync(f).toString("base64")}"/>`;
    }
  }
  if (!used.has(key)) used.set(key, false);
  return C(cx, cy, size / 2, { fill: A, op: 0.12 }) + C(cx, cy, size / 2, { stroke: A, sw: 1.4, op: 0.7 }) + T(cx, cy + size * 0.17, label[0].toUpperCase(), { size: size * 0.48, fill: A, mono: true, w: 700 });
}
/** App-Symbol-Kachel (Logo + Beschriftung darunter). */
const tile = (key, label, x, y, s, A) => R(x, y, s, s, s * 0.24, { fill: "#0B111B", stroke: A, sw: 1.4 }) + logo(key, label, x + s / 2, y + s / 2, s * 0.58, A) + T(x + s / 2, y + s + 14, label, { size: 11.5, w: 600, op: 0.95 });
/** Kleine Pille mit Logo-Platz links. */
function pill(key, label, x, y, A, o = {}) {
  const w = o.w ?? Math.round(label.length * 7.6 + 46);
  return R(x, y, w, 30, 15, { fill: "#0B111B", stroke: A, sw: 1.3 }) + logo(key, label, x + 17, y + 15, 20, A) + T(x + 32, y + 20, label, { size: 12.5, anchor: "start" });
}
const box = (x, y, w, h, label, A, o = {}) => R(x, y, w, h, o.r ?? 10, { fill: o.fill ?? "#0B111B", stroke: A, sw: o.sw ?? 1.5, op: o.op }) + (label ? T(x + w / 2, y + h / 2 + 4.5, label, { size: o.size ?? 13, fill: o.fill2 ?? INK, w: 600 }) : "");
/** Telefon. screen(x0,y0,w0,h0) liefert den Bildschirminhalt. */
function phone(x, y, w, h, A, screen, o = {}) {
  let s = R(x, y, w, h, 24, { fill: A, op: 0.18, filter: "blur" }) + R(x, y, w, h, 24, { fill: "#0B111B", stroke: A, sw: 2 });
  s += R(x + 6, y + 6, w - 12, h - 12, 19, { fill: "url(#scr)", stroke: A, sw: 0.8 });
  s += o.cam === "dot" ? C(x + w / 2, y + 17, 4, { fill: "#02040A" }) : o.cam === "none" ? "" : R(x + w / 2 - 15, y + 12, 30, 9, 4.5, { fill: "#02040A" });
  s += screen(x + 6, y + 28, w - 12, h - 44);
  return s + R(x + w / 2 - 20, y + h - 14, 40, 4, 2, { fill: INK, op: 0.45 });
}
const browser = (x, y, w, h, A, inner, url = "app.example.dev") =>
  R(x, y, w, h, 12, { fill: A, op: 0.14, filter: "blur" }) + R(x, y, w, h, 12, { fill: "#0B111B", stroke: A, sw: 1.7 }) + P(`M${x} ${y + 26}H${x + w}`, { stroke: A, op: 0.4, sw: 1 }) +
  C(x + 15, y + 13, 3.5, { fill: A }) + C(x + 27, y + 13, 3.5, { fill: A, op: 0.55 }) + C(x + 39, y + 13, 3.5, { fill: A, op: 0.3 }) +
  R(x + 54, y + 6, Math.min(w - 70, 170), 14, 7, { fill: INK, op: 0.07 }) + T(x + 64, y + 16.5, url, { size: 8.5, mono: true, anchor: "start", op: 0.55, w: 500 }) + inner(x, y + 26, w, h - 26);
const server = (x, y, w, A, n = 2) => Array.from({ length: n }, (_, i) => R(x, y + i * 34, w, 28, 7, { fill: "#0B111B", stroke: A, sw: 1.4 }) + C(x + 14, y + i * 34 + 14, 3.5, { fill: A }) + C(x + 26, y + i * 34 + 14, 3.5, { fill: A, op: 0.4 }) + R(x + 40, y + i * 34 + 10, w - 54, 8, 4, { fill: INK, op: 0.13 })).join("");
const db = (cx, y, A, h = 62) => `<path d="M${cx - 32} ${y}v${h}c0 11 14 17 32 17s32-6 32-17v-${h}" fill="#0B111B" stroke="${A}" stroke-width="1.5"/><ellipse cx="${cx}" cy="${y}" rx="32" ry="10" fill="${A}" fill-opacity=".25" stroke="${A}" stroke-width="1.5"/>` + P(`M${cx - 32} ${y + h / 2}c0 11 14 17 32 17s32-6 32-17`, { stroke: A, op: 0.55, sw: 1.1 });
const cloud = (cx, cy, A, s = 1) => P(`M${cx - 46 * s} ${cy + 18 * s}a${20 * s} ${20 * s} 0 0 1 ${4 * s}-${38 * s}a${28 * s} ${28 * s} 0 0 1 ${52 * s}-${8 * s}a${22 * s} ${22 * s} 0 0 1 ${34 * s} ${46 * s}z`, { fill: "#0B111B", stroke: A, sw: 1.7 });
const hexp = (cx, cy, r) => Array.from({ length: 6 }, (_, k) => { const a = (Math.PI / 3) * k + Math.PI / 6; return `${k ? "L" : "M"}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`; }).join("") + "Z";
const hex = (cx, cy, r, A, o = {}) => P(hexp(cx, cy, r), { fill: o.fill ?? "#0B111B", stroke: A, sw: o.sw ?? 1.5, op: o.op });
const machine = (x, y, A, w = 90) => R(x, y + 30, w, 56, 6, { fill: "#0B111B", stroke: A, sw: 1.6 }) + R(x + 8, y + 12, 26, 22, 4, { fill: "#0B111B", stroke: A, sw: 1.4 }) + R(x + 12, y + 40, 30, 18, 3, { fill: A, op: 0.22 }) + C(x + w - 20, y + 50, 4, { fill: "#10B981" }) + C(x + w - 20, y + 64, 4, { fill: ORANGE, op: 0.8 }) + P(`M${x - 6} ${y + 88}H${x + w + 6}`, { stroke: A, op: 0.5, sw: 1.4 });
const dash = (x, y, w, h, A, kind = "line") => R(x, y, w, h, 10, { fill: "#0B111B", stroke: A, sw: 1.5 }) +
  (kind === "line" ? P(`M${x + 14} ${y + h - 16}L${x + w * 0.25} ${y + h * 0.55}L${x + w * 0.45} ${y + h * 0.65}L${x + w * 0.65} ${y + h * 0.3}L${x + w * 0.82} ${y + h * 0.4}L${x + w - 14} ${y + h * 0.2}`, { stroke: A, sw: 2.2 }) + P(`M${x + 14} ${y + h - 16}L${x + w * 0.25} ${y + h * 0.55}L${x + w * 0.45} ${y + h * 0.65}L${x + w * 0.65} ${y + h * 0.3}L${x + w * 0.82} ${y + h * 0.4}L${x + w - 14} ${y + h * 0.2}V${y + h - 16}Z`, { fill: A, op: 0.18 })
    : Array.from({ length: 5 }, (_, i) => R(x + 14 + i * ((w - 28) / 5), y + h - 14 - (14 + ((i * 17) % 30)), (w - 28) / 5 - 6, 14 + ((i * 17) % 30), 3, { fill: A, op: 0.6 })).join(""));

function frame(A, rgb, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="1200" height="800" role="img" aria-hidden="true">
<defs>
<radialGradient id="glow" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="${A}" stop-opacity=".28"/><stop offset="1" stop-color="${A}" stop-opacity="0"/></radialGradient>
<linearGradient id="scr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgb(${rgb})" stop-opacity=".18"/><stop offset="1" stop-color="#070A10"/></linearGradient>
<pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="${A}" stroke-opacity=".07"/></pattern>
<filter id="blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9"/></filter>
</defs>
<rect width="600" height="400" fill="url(#grid)"/><rect width="600" height="400" fill="url(#glow)"/>
${body}
</svg>
`;
}
const cap = (s, A) => T(24, 30, s, { anchor: "start", mono: true, size: 11, fill: A, ls: 2, op: 0.9, w: 500 });

/* ───────── Mobile (grün) ───────── */
const mobile = {
  ios(A) {
    const scr = (x, y, w) => tile("apple", "Apple", x + 14, y + 6, 54, A) + tile("xcode", "Xcode", x + w - 68, y + 6, 54, A) + tile("swift", "Swift", x + 14, y + 98, 54, A) + tile("swiftui", "SwiftUI", x + w - 68, y + 98, 54, A) + R(x + 14, y + 190, w - 28, 10, 5, { fill: INK, op: 0.14 }) + R(x + 14, y + 210, w - 60, 10, 5, { fill: INK, op: 0.1 }) + R(x + 14, y + 250, w - 28, 40, 12, { fill: A, op: 0.2, stroke: A, sw: 1 });
    return cap("iOS · NATIVE", A) + phone(215, 22, 170, 352, A, scr) + trace("M215 200H120", A) + T(70, 205, "Swift", { mono: true, anchor: "middle", size: 14, fill: A, w: 700 }) + trace("M385 200H480", A) + T(530, 205, "SwiftUI", { mono: true, size: 14, fill: A, w: 700 });
  },
  android(A) {
    const scr = (x, y, w) => tile("android", "Android", x + 14, y + 6, 54, A) + tile("androidstudio", "Studio", x + w - 68, y + 6, 54, A) + tile("kotlin", "Kotlin", x + 14, y + 98, 54, A) + tile("compose", "Compose", x + w - 68, y + 98, 54, A) + R(x + 14, y + 190, w - 28, 10, 5, { fill: INK, op: 0.14 }) + R(x + 14, y + 210, w - 60, 10, 5, { fill: INK, op: 0.1 }) + R(x + 14, y + 250, w - 28, 40, 12, { fill: A, op: 0.2, stroke: A, sw: 1 });
    return cap("ANDROID · NATIVE", A) + phone(215, 22, 170, 352, A, scr, { cam: "dot" }) + trace("M215 200H120", A) + T(70, 205, "Kotlin", { mono: true, size: 14, fill: A, w: 700 }) + trace("M385 200H480", A) + T(530, 205, "Compose", { mono: true, size: 14, fill: A, w: 700 });
  },
  flutter(A) {
    const mini = (k1, l1, k2, l2) => (x, y, w) => tile(k1, l1, x + w / 2 - 22, y + 4, 44, A) + tile(k2, l2, x + w / 2 - 22, y + 84, 44, A);
    let s = cap("ONE CODEBASE · 3 PLATFORMS", A) + pill("dart", "Dart", 190, 40, A, { w: 96 }) + pill("flutter", "Flutter", 300, 40, A, { w: 112 }) + P("M286 55H300", { stroke: A, sw: 2 });
    s += trace("M300 72V100H110V150M300 100V150M300 100H490V150", A);
    s += phone(55, 150, 110, 240, A, mini("apple", "Apple", "flutter", "Flutter")) + phone(245, 150, 110, 240, A, mini("android", "Android", "flutter", "Flutter"), { cam: "dot" }) + phone(435, 150, 110, 240, A, mini("windows", "Windows", "flutter", "Flutter"), { cam: "none" });
    return s;
  },
  rn(A) {
    const scr = (x, y, w) => R(x + 12, y + 10, w - 24, 14, 5, { fill: A, op: 0.5 }) + R(x + 12, y + 32, w - 24, 50, 8, { fill: INK, op: 0.08, stroke: A, sw: 0.8 }) + R(x + 12, y + 92, (w - 30) / 2, 40, 8, { fill: A, op: 0.25 }) + R(x + w / 2 + 3, y + 92, (w - 30) / 2, 40, 8, { fill: A, op: 0.25 });
    return cap("JAVASCRIPT → NATIVE UI", A) + pill("react", "React Native", 30, 50, A) + pill("typescript", "TypeScript", 30, 96, A) + R(30, 150, 170, 150, 14, { fill: "#0B111B", stroke: A, sw: 1.5 }) + T(115, 178, "ONE CODEBASE", { mono: true, size: 12, fill: A }) + [0, 1, 2, 3, 4].map((i) => R(48, 196 + i * 18, 60 + ((i * 37) % 70), 6, 3, { fill: i % 2 ? INK : A, op: i % 2 ? 0.18 : 0.6 })).join("") + trace("M200 225H270", A) + phone(290, 60, 120, 270, A, scr) + phone(440, 60, 120, 270, A, scr, { cam: "dot" }) + T(350, 362, "iOS", { mono: true, size: 12, fill: A }) + T(500, 362, "Android", { mono: true, size: 12, fill: A });
  },
  kmp(A) {
    const ui = (x, y, w) => R(x + 10, y + 8, w - 20, 12, 5, { fill: A, op: 0.5 }) + R(x + 10, y + 30, w - 20, 40, 8, { fill: INK, op: 0.08, stroke: A, sw: 0.8 }) + R(x + 10, y + 80, w - 20, 8, 4, { fill: INK, op: 0.18 });
    return cap("SHARED LOGIC · NATIVE UI", A) + phone(80, 48, 130, 220, A, ui) + phone(390, 48, 130, 220, A, ui, { cam: "dot" }) + T(145, 290, "SwiftUI", { mono: true, size: 12, fill: A }) + T(455, 290, "Compose", { mono: true, size: 12, fill: A }) +
      trace("M145 270V310M455 270V310", A) + R(80, 310, 440, 64, 14, { fill: "#0B111B", stroke: A, sw: 1.8 }) + logo("kotlin", "Kotlin", 118, 342, 30, A) + T(300, 336, "Kotlin Multiplatform", { size: 15 }) + T(300, 358, "Ktor · SQLDelight · " + L("Business-Logik", "business logic"), { mono: true, size: 11, fill: A, w: 500 });
  },
  pwa(A) {
    const page = (x, y, w, h) => R(x + 14, y + 12, w - 28, 40, 8, { fill: A, op: 0.22 }) + R(x + 14, y + 62, (w - 40) / 2, 34, 6, { fill: INK, op: 0.09, stroke: A, sw: 0.7 }) + R(x + w / 2 + 6, y + 62, (w - 40) / 2, 34, 6, { fill: INK, op: 0.09, stroke: A, sw: 0.7 }) + R(x + 14, y + h - 40, 90, 22, 11, { fill: A });
    const home = (x, y, w) => tile("browser", "App", x + w / 2 - 28, y + 20, 56, A) + R(x + 14, y + 130, w - 28, 8, 4, { fill: INK, op: 0.15 }) + R(x + 14, y + 146, w - 60, 8, 4, { fill: INK, op: 0.1 });
    return cap("WEB-APP · INSTALLABLE", A) + browser(30, 70, 330, 250, A, page) + trace("M360 195H400", A) + T(380, 180, "Install", { mono: true, size: 11, fill: A }) + phone(410, 52, 150, 300, A, home) + pill("serviceworker", "Service Worker", 30, 338, A) + pill("push", "Web Push", 220, 338, A);
  },
};

/* ───────── Web (orange) ───────── */
const web = {
  next(A) {
    const page = (x, y, w, h) => R(x + 14, y + 10, 50, 8, 4, { fill: A }) + R(x + 14, y + 28, w - 28, 54, 8, { fill: A, op: 0.2 }) + R(x + 24, y + 40, 120, 9, 4, { fill: INK, op: 0.8 }) + R(x + 24, y + 56, 180, 5, 2.5, { fill: INK, op: 0.3 }) + [0, 1, 2].map((i) => R(x + 14 + i * ((w - 28) / 3), y + 92, (w - 28) / 3 - 8, 44, 6, { fill: INK, op: 0.07, stroke: A, sw: 0.7 })).join("");
    return cap("SERVER-RENDERED · EDGE", A) + browser(30, 50, 330, 180, A, page) + trace("M395 140H360", A) + R(395, 90, 120, 100, 14, { fill: "#0B111B", stroke: A, sw: 1.6 }) + T(455, 122, "Server", { size: 14 }) + T(455, 142, L("HTML vorab","HTML upfront"), { mono: true, size: 10.5, fill: A, w: 500 }) + [0, 1, 2].map((i) => R(412 + i * 32, 158, 26, 18, 4, { fill: A, op: 0.4 })).join("") +
      [90, 190, 300, 410, 510].map((x, i) => C(x, 300 + (i % 2) * 14, 6, { fill: "#07090E", stroke: A, sw: 2 }) + P(`M${x} ${300 + (i % 2) * 14}L${i < 2 ? 140 : 455} ${i < 2 ? 230 : 190}`, { stroke: A, op: 0.35, sw: 1.2, dash: "4 5" })).join("") + T(300, 352, "Edge", { mono: true, size: 12, fill: A }) + pill("nextjs", "Next.js", 120, 366, A) + pill("react", "React", 262, 366, A) + pill("typescript", "TypeScript", 390, 366, A);
  },
  spa(A) {
    const app = (x, y, w, h) => R(x + 10, y + 8, w - 20, 10, 5, { fill: A, op: 0.55 }) + [0, 1, 2, 3].map((i) => R(x + 10 + (i % 2) * ((w - 28) / 2 + 8), y + 28 + Math.floor(i / 2) * 58, (w - 28) / 2, 50, 7, { fill: INK, op: 0.07, stroke: A, sw: 0.8 })).join("");
    return cap("CLIENT-SIDE APP", A) + browser(30, 50, 300, 230, A, app) + trace("M330 165H400", A) + T(365, 152, "JSON", { mono: true, size: 11, fill: A }) + server(400, 110, 150, A, 3) + db(475, 232, A, 40) + pill("react", "React", 40, 306, A) + pill("vite", "Vite", 150, 306, A) + pill("tanstack", "TanStack Query", 40, 350, A, { w: 190 });
  },
  node(A) {
    const fe = (x, y, w, h) => R(x + 10, y + 10, w - 20, 10, 5, { fill: A, op: 0.5 }) + R(x + 10, y + 30, w - 20, 40, 7, { fill: INK, op: 0.07, stroke: A, sw: 0.8 }) + R(x + 10, y + 78, 70, 18, 9, { fill: A });
    return cap(L("JAVASCRIPT / TYPESCRIPT ÜBERALL","JAVASCRIPT / TYPESCRIPT EVERYWHERE"), A) + R(20, 40, 150, 22, 11, { fill: A, op: 0.2 }) + T(95, 56, "FRONTEND", { mono: true, size: 11, fill: A }) + browser(20, 70, 150, 150, A, fe, "app") +
      R(430, 40, 150, 22, 11, { fill: A, op: 0.2 }) + T(505, 56, "BACKEND", { mono: true, size: 11, fill: A }) + server(440, 80, 130, A, 2) + db(505, 170, A, 36) +
      hex(300, 190, 62, A, { sw: 2.2 }) + hex(300, 190, 46, A, { fill: A, op: 0.18 }) + logo("nodejs", "Node.js", 300, 180, 40, A) + T(300, 232, "Node.js", { size: 13 }) +
      trace("M170 150H238", A) + trace("M362 150H430", A) + R(205, 290, 190, 44, 12, { fill: "#0B111B", stroke: A, sw: 1.4 }) + T(300, 310, "TypeScript", { size: 13.5 }) + T(300, 326, L("geteilte Typen & Code","shared types & code"), { mono: true, size: 10, fill: A, w: 500 }) + P("M300 252V290", { stroke: A, sw: 1.6, op: 0.6 }) + P("M120 220V312H205M480 232V312H395", { stroke: A, sw: 1.4, op: 0.5, dash: "4 5" }) + pill("graphql", "GraphQL", 60, 360, A) + pill("postgres", "PostgreSQL", 250, 360, A);
  },
  go(A) {
    let s = cap("COMPILED · CONCURRENT", A) + R(30, 130, 120, 110, 14, { fill: "#0B111B", stroke: A, sw: 1.7 }) + T(90, 175, "Go", { size: 34, fill: A, w: 700 }) + T(90, 205, "1 Binary", { mono: true, size: 12, fill: INK, w: 500 }) + T(90, 223, L("kleines Image","small image"), { mono: true, size: 10, fill: INK, op: 0.6, w: 500 });
    for (let i = 0; i < 6; i++) s += trace(`M150 ${185}C210 ${185} 210 ${70 + i * 52} 280 ${70 + i * 52}H430`, A, { op: 0.8 }) + R(430, 56 + i * 52, 80, 28, 8, { fill: "#0B111B", stroke: A, sw: 1.2 }) + T(470, 74 + i * 52, "req " + (i + 1), { mono: true, size: 10.5, fill: INK, op: 0.8, w: 500 });
    return s + T(335, 385, L("Goroutines · tausende Verbindungen parallel","Goroutines · thousands of connections in parallel"), { mono: true, size: 11, fill: A, w: 500 }) + pill("grpc", "gRPC", 530 - 60, 8, A, { w: 70 }).replace(/x="/g, 'x="');
  },
  rust(A) {
    const wasm = (x, y, w) => R(x + 20, y + 14, w - 40, 60, 10, { fill: A, op: 0.2, stroke: A, sw: 1.2 }) + T(x + w / 2, y + 50, "WASM", { mono: true, size: 18, fill: A, w: 700 }) + R(x + 20, y + 90, w - 40, 8, 4, { fill: INK, op: 0.15 });
    return cap("SAFE · FAST", A) + P("M120 60L200 82V150C200 200 165 232 120 252C75 232 40 200 40 150V82Z", { fill: "#0B111B", stroke: A, sw: 2 }) + P("M95 150l18 18 34-38", { stroke: A, sw: 4 }) + T(120, 285, L("Memory-sicher","Memory-safe"), { mono: true, size: 12, fill: A }) + T(120, 303, L("ohne Garbage Collector","no garbage collector"), { mono: true, size: 10, fill: INK, op: 0.65, w: 500 }) +
      server(260, 70, 150, A, 3) + T(335, 190, "Axum · Tokio", { mono: true, size: 11, fill: A, w: 500 }) + trace("M200 140H260", A) + browser(300, 215, 270, 150, A, wasm) + trace("M335 172V215", A) + pill("rust", "Rust", 440, 70, A, { w: 100 }) + pill("wasm", "WebAssembly", 430, 120, A, { w: 140 });
  },
  monolith(A) {
    return cap(L("EIN DEPLOYMENT","ONE DEPLOYMENT"), A) + R(140, 50, 320, 230, 18, { fill: "#0B111B", stroke: A, sw: 2 }) + T(300, 78, L("Modularer Monolith","Modular monolith"), { size: 14 }) + ["Auth", "Orders", "Billing", "Search"].map((m, i) => R(162 + (i % 2) * 150, 96 + Math.floor(i / 2) * 78, 126, 62, 10, { fill: A, op: 0.18, stroke: A, sw: 1.2 }) + T(225 + (i % 2) * 150, 132 + Math.floor(i / 2) * 78, m, { size: 13 })).join("") + P("M300 280V312", { stroke: A, sw: 2 }) + db(300, 318, A, 28) + pill("docker", "Docker", 30, 330, A, { w: 110 }) + pill("terraform", "Terraform", 460, 330, A, { w: 120 });
  },
  micro(A) {
    const pts = [[100, 90], [260, 60], [440, 90], [60, 220], [220, 190], [380, 210], [520, 230], [150, 330], [320, 320], [470, 340]];
    const links = [[0, 1], [1, 2], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6], [3, 4], [4, 5], [4, 7], [5, 8], [5, 9], [7, 8], [8, 9], [3, 0]];
    return cap(L("VIELE KLEINE DIENSTE","MANY SMALL SERVICES"), A) + links.map(([a, b]) => P(`M${pts[a]}L${pts[b]}`, { stroke: A, op: 0.4, sw: 1.4, dash: "4 5" })).join("") + pts.map(([x, y], i) => hex(x, y, 30, A, { fill: i === 4 ? A : "#0B111B", op: i === 4 ? 0.75 : 1 }) + T(x, y + 4, ["API", "Auth", "Pay", "User", "Gate", "Search", "Mail", "DB", "Queue", "Log"][i], { size: 11.5, fill: i === 4 ? "#07090E" : INK })).join("") + pill("kubernetes", "Kubernetes", 20, 368, A, { w: 150 }) + pill("kafka", "Kafka", 190, 368, A, { w: 100 });
  },
  edge(A) {
    let s = cap(L("NAH AM NUTZER · EREIGNISBASIERT","CLOSE TO THE USER · EVENT-DRIVEN"), A) + cloud(300, 90, A, 1.1) + T(300, 100, "Origin", { mono: true, size: 12, fill: A });
    const nodes = [[70, 270], [190, 290], [300, 300], [410, 290], [530, 270]];
    nodes.forEach(([x, y], i) => (s += P(`M300 120L${x} ${y - 20}`, { stroke: A, op: 0.35, sw: 1.3, dash: "4 5" }) + hex(x, y, 28, A) + P(`M${x - 8} ${y + 7}L${x} ${y - 9}L${x + 8} ${y + 7}`, { stroke: A, sw: 2 }) + R(x - 14, y + 40, 28, 38, 5, { fill: "#0B111B", stroke: INK, sw: 1, op: 0.5 }) + C(x, y + 52, 3, { fill: INK, op: 0.6 })));
    return s + T(300, 385, L("Funktionen laufen dort, wo der Nutzer ist","Functions run where the user is"), { mono: true, size: 11, fill: A, w: 500 });
  },
};

/* ───────── Industrie (blau) ───────── */
const ind = {
  opcua(A) {
    return cap(L("STANDARD-SCHNITTSTELLE","STANDARD INTERFACE"), A) + machine(30, 70, A) + machine(30, 200, A) + trace("M120 130H215M120 260H215", A) + box(215, 120, 170, 150, "", A, { r: 16, sw: 2 }) + T(300, 150, "OPC-UA", { size: 18 }) + [L("Anlage","Plant"), L("Linie","Line"), "Sensor"].map((n, i) => R(235 + i * 4, 165 + i * 28, 130 - i * 8, 20, 6, { fill: A, op: 0.18 + i * 0.05 }) + T(300, 179 + i * 28, n, { mono: true, size: 10.5, fill: INK, w: 500 })).join("") + trace("M385 195H460", A) + dash(460, 140, 110, 110, A, "bar") + pill("certificate", L("Zertifikate","Certificates"), 215, 300, A, { w: 150 }) + T(300, 372, L("ein Informationsmodell · jeder Hersteller","one information model · every vendor"), { mono: true, size: 11, fill: A, w: 500 });
  },
  s7(A) {
    let s = cap(L("STEUERUNG · SPS","CONTROL · PLC"), A) + R(30, 70, 250, 250, 12, { fill: "#0B111B", stroke: A, sw: 2 }) + T(155, 98, "SIEMENS S7 · SPS", { mono: true, size: 12, fill: A, w: 700 });
    ["CPU", "DI", "DO", "AI"].forEach((m, i) => (s += R(46 + i * 58, 115, 50, 120, 6, { fill: A, op: 0.12, stroke: A, sw: 1.2 }) + R(52 + i * 58, 125, 38, 14, 3, { fill: "#07090E" }) + C(58 + i * 58, 158, 3, { fill: i === 0 ? "#10B981" : A }) + C(70 + i * 58, 158, 3, { fill: i === 1 ? ORANGE : A, op: 0.6 }) + T(71 + i * 58, 222, m, { mono: true, size: 10.5 })));
    s += [0, 1, 2, 3, 4, 5, 6, 7].map((i) => R(46 + i * 29, 252, 20, 10, 2, { fill: INK, op: 0.2 })).join("") + P("M46 285H264", { stroke: A, sw: 1.4, op: 0.5 });
    return s + trace("M280 195H350", A) + hex(400, 195, 48, A, { sw: 2 }) + T(400, 192, "Gateway", { size: 12 }) + T(400, 208, "S7 → IT", { mono: true, size: 10, fill: A, w: 500 }) + trace("M448 195H500", A) + cloud(540, 190, A, 0.55) + pill("profinet", "PROFINET", 30, 340, A, { w: 140 });
  },
  mqtt(A) {
    let s = cap("PUBLISH / SUBSCRIBE", A);
    [90, 170, 250].forEach((y, i) => (s += C(50, y, 16, { fill: "#0B111B", stroke: A, sw: 1.5 }) + C(50, y, 5, { fill: A }) + T(50, y + 34, ["Temp", L("Druck","Pressure"), L("Strom","Current")][i], { mono: true, size: 10.5, op: 0.7, w: 500 }) + trace(`M66 ${y}H${i === 1 ? 190 : 170}L${i === 1 ? 210 : 220} 185`, A)));
    s += hex(300, 185, 70, A, { sw: 2.2 }) + hex(300, 185, 52, A, { fill: A, op: 0.18 }) + T(300, 180, "Broker", { size: 15 }) + T(300, 198, "MQTT", { mono: true, size: 11, fill: A }) + "";
    [90, 170, 250].forEach((y, i) => (s += trace(`M${i === 1 ? 410 : 380} 185L${i === 1 ? 390 : 380} 185L430 ${y}H520`, A) + R(522, y - 22, 66, 44, 8, { fill: "#0B111B", stroke: A, sw: 1.4 }) + T(555, y + 4, ["Dash", "Alarm", "DB"][i], { size: 12 })));
    return s + pill("sparkplug", "Sparkplug B", 220, 340, A, { w: 160 }) + T(300, 392, L("Topics statt Punkt-zu-Punkt","Topics instead of point-to-point"), { mono: true, size: 10.5, fill: A, w: 500, op: 0.9 });
  },
  kafka(A) {
    let s = cap("EVENT-STREAMING", A) + [80, 150, 220].map((y, i) => box(30, y - 20, 70, 40, [L("Anlage","Plant"), "ERP", "Sensor"][i], A, { size: 12 }) + trace(`M100 ${y}H190`, A)).join("");
    s += R(190, 50, 220, 230, 16, { fill: "#0B111B", stroke: A, sw: 2 }) + T(300, 76, "Kafka-Cluster", { size: 14 });
    [0, 1, 2].forEach((i) => { s += T(212, 112 + i * 56, "P" + i, { mono: true, size: 10.5, fill: A, anchor: "start" }); for (let k = 0; k < 7; k++) s += R(236 + k * 24, 98 + i * 56, 20, 20, 4, { fill: A, op: 0.15 + k * 0.1, stroke: A, sw: 0.8 }); });
    s += [80, 150, 220].map((y, i) => trace(`M410 ${y}H480`, A) + box(480, y - 20, 90, 40, [L("Analytik","Analytics"), "Dashboard", "Archiv"][i], A, { size: 12 })).join("");
    return s + pill("connectors", "Connectors", 200, 320, A, { w: 150 }) + pill("streams", "Streams", 370, 320, A, { w: 120 });
  },
  retrofit(A) {
    return cap(L("BESTANDSMASCHINE NACHRÜSTEN","RETROFIT EXISTING MACHINES"), A) + machine(30, 110, A, 120) + R(166, 150, 40, 30, 6, { fill: A, op: 0.3, stroke: A, sw: 1.5 }) + T(186, 143, "Clip-on", { mono: true, size: 10, fill: A }) + C(186, 165, 4, { fill: "#10B981" }) + trace("M206 165H260", A) + hex(310, 165, 50, A, { sw: 2.2 }) + T(310, 162, "Gateway", { size: 12 }) + T(310, 178, "OPC-UA·MQTT", { mono: true, size: 9, fill: A, w: 500 }) + trace("M360 165H410", A) + cloud(470, 150, A, 0.9) + dash(410, 215, 150, 90, A, "line") + R(30, 250, 150, 50, 10, { fill: "#0B111B", stroke: INK, sw: 1, op: 0.5 }) + T(105, 270, L("Maschine bleibt","Machine stays"), { size: 12, op: 0.8 }) + T(105, 286, L("unverändert","unchanged"), { size: 12, op: 0.8 }) + pill("siemens", "S7 · Modbus", 220, 340, A, { w: 150 });
  },
  edgeanalytics(A) {
    return cap(L("AUSWERTUNG VOR ORT","ANALYTICS ON SITE"), A) + machine(30, 130, A) + trace("M120 180H190", A) + R(190, 90, 200, 190, 16, { fill: "#0B111B", stroke: A, sw: 2 }) + T(290, 116, "Edge-Box", { size: 14 }) + dash(206, 128, 168, 80, A, "line") + ["Container", L("Zeitreihen","Time series")].map((n, i) => pill(i ? "timeseries" : "container", n, 206 + i * 90, 224, A, { w: i ? 92 : 94 }).replace(/font-size="12.5"/g, 'font-size="9.5"')).join("") + trace("M390 150H450", A, { op: 0.5 }) + cloud(510, 150, A, 0.8) + P("M450 110L470 190", { stroke: ORANGE, sw: 3, op: 0.9 }) + T(520, 215, "optional", { mono: true, size: 10.5, fill: INK, op: 0.6, w: 500 }) + T(290, 330, L("läuft auch ohne Internet","works without internet too"), { mono: true, size: 12, fill: A, w: 500 });
  },
  cloudanalytics(A) {
    const site = (x, y, n) => R(x, y, 100, 60, 10, { fill: "#0B111B", stroke: A, sw: 1.4 }) + P(`M${x + 12} ${y + 44}V${y + 26}L${x + 30} ${y + 36}V${y + 26}L${x + 48} ${y + 36}V${y + 26}L${x + 66} ${y + 36}V${y + 14}H${x + 80}V${y + 44}Z`, { stroke: A, sw: 1.3, fill: A, op: 0.2 }) + T(x + 50, y + 76, n, { mono: true, size: 10.5, op: 0.7, w: 500 });
    return cap(L("ZENTRALE AUSWERTUNG","CENTRAL ANALYTICS"), A) + site(30, 40, L("Werk A","Plant A")) + site(30, 150, L("Werk B","Plant B")) + site(30, 260, L("Werk C","Plant C")) + trace("M130 70H260V190M130 180H260M130 290H260V190", A) + cloud(330, 150, A, 1.1) + T(330, 160, "Cloud", { size: 14 }) + trace("M330 200V250", A) + dash(250, 250, 320, 110, A, "bar").replace("</rect>", "") + pill("timeseries", L("Zeitreihen-DB","Time-series DB"), 400, 168, A, { w: 160 }) + pill("twin", "Digital Twin", 400, 120, A, { w: 150 });
  },
  scada(A) {
    return cap(L("LEITSTAND · ÜBERWACHUNG","CONTROL ROOM · MONITORING"), A) + R(70, 40, 460, 250, 14, { fill: A, op: 0.16, filter: "blur" }) + R(70, 40, 460, 250, 14, { fill: "#0B111B", stroke: A, sw: 2 }) + dash(86, 56, 200, 100, A, "line") + dash(300, 56, 114, 100, A, "bar") + C(470, 106, 36, { stroke: A, sw: 8, op: 0.25 }) + P("M470 70a36 36 0 1 1-34 24", { stroke: A, sw: 8 }) + T(470, 112, "OK", { size: 16 }) + R(86, 172, 428, 100, 10, { fill: "#07090E", stroke: A, sw: 1 }) + [0, 1, 2].map((i) => C(106, 192 + i * 28, 5, { fill: [ORANGE, "#10B981", "#10B981"][i] }) + R(122, 187 + i * 28, 150 + i * 40, 10, 5, { fill: INK, op: 0.2 }) + R(400, 187 + i * 28, 90, 10, 5, { fill: INK, op: 0.1 })).join("") + P("M300 290V320H220M300 320H400", { stroke: A, sw: 1.6, op: 0.6 }) + pill("alarm", L("Alarmierung","Alerting"), 150, 335, A, { w: 150 }) + pill("dashboard", "Dashboards", 320, 335, A, { w: 150 });
  },
  pdm(A) {
    return cap(L("AUSFALL VORHERSAGEN","PREDICT FAILURES"), A) + machine(30, 80, A, 100) + P("M150 150H190L205 120L220 180L235 90L250 190L265 130H300L315 150H380", { stroke: A, sw: 2.4 }) + trace("M130 150H150", A) + P("M380 150C400 150 410 90 430 90", { stroke: ORANGE, sw: 2.6 }) + C(430, 90, 8, { fill: ORANGE }) + T(430, 66, L("Anomalie","Anomaly"), { mono: true, size: 11, fill: ORANGE }) + R(400, 120, 170, 120, 12, { fill: "#0B111B", stroke: A, sw: 1.6 }) + T(485, 148, L("Wartung in","Maintenance"), { size: 12, op: 0.8 }) + T(485, 186, L("geplant","planned"), { size: 26, fill: A, w: 700 }) + P("M455 215H515", { stroke: A, sw: 3, op: 0.5 }) + R(40, 240, 250, 110, 10, { fill: "#0B111B", stroke: A, sw: 1.3 }) + P("M56 330L90 300L124 312L158 278L192 290L226 262L274 270", { stroke: A, sw: 2 }) + T(165, 262, "Trend", { mono: true, size: 10.5, fill: INK, op: 0.6 }) + T(430, 300, L("Zeitreihen · Modelle","Time series · models"), { mono: true, size: 11, fill: A, w: 500 });
  },
  twin(A) {
    return cap(L("PHYSISCH ⇄ DIGITAL","PHYSICAL ⇄ DIGITAL"), A) + R(30, 70, 220, 230, 16, { fill: "#0B111B", stroke: A, sw: 1.6 }) + machine(70, 120, A, 140) + T(140, 100, "REAL", { mono: true, size: 12, fill: A }) + R(350, 70, 220, 230, 16, { fill: "#0B111B", stroke: A, sw: 1.6, op: 0.95 }) + P("M400 220l50-30 50 30v50l-50 30-50-30z", { stroke: A, sw: 1.6, fill: A, op: 0.18 }) + P("M400 220l50 30 50-30M450 250v50", { stroke: A, sw: 1.2, op: 0.7 }) + P("M410 190l40-26 40 26", { stroke: A, sw: 1.2, dash: "3 4" }) + T(460, 100, "DIGITAL", { mono: true, size: 12, fill: A }) + trace("M250 150H350", A) + trace("M350 210H250", A) + T(300, 135, L("Daten","Data"), { mono: true, size: 10.5, fill: INK, op: 0.7, w: 500 }) + T(300, 230, "Simulation", { mono: true, size: 10.5, fill: INK, op: 0.7, w: 500 }) + pill("modell", L("Informationsmodell","Information model"), 200, 335, A, { w: 200 });
  },
};

const groups = [[mobile, GREEN, "16 185 129"], [web, ORANGE, "249 115 22"], [ind, BLUE, "59 130 246"]];
let n = 0;
for (const lng of ["de", "en"]) {
  LNG = lng;
  mkdirSync(join(out, lng), { recursive: true });
  for (const [set, A, rgb] of groups)
    for (const [id, fn] of Object.entries(set)) {
      writeFileSync(join(out, lng, `${id}.svg`), frame(A, rgb, fn(A)));
      n++;
    }
}
console.log(`${n} SVGs → public/options/{de,en}/`);
const missing = [...used].filter(([, ok]) => !ok).map(([k]) => k);
console.log(`Logo-Plätze ohne Datei (scripts/hero-logos/<schlüssel>.svg|png): ${missing.join(", ") || "–"}`);

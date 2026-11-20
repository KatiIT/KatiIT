// Erzeugt die Hero-Grafiken der drei Unterseiten als SVG (500×600, Seitenverhältnis 5:6).
//   node scripts/generate-hero-art.mjs
// Optional: offizielle Plattform-Logos in scripts/hero-logos/{ios,android,windows}.{svg,png} ablegen,
// dann erscheinen sie in der Mitte der Handy-Bildschirme (ohne Datei: neutrales Namensschild).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public/hero");
mkdirSync(out, { recursive: true });

const SANS = "Inter, 'Segoe UI', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace";
const INK = "#E6EAF2";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const T = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}" font-size="${o.size ?? 11}" fill="${o.fill ?? INK}" font-family="${o.mono ? MONO : SANS}" font-weight="${o.w ?? 500}" text-anchor="${o.anchor ?? "start"}" letter-spacing="${o.ls ?? 0}" opacity="${o.op ?? 1}">${esc(s)}</text>`;
const R = (x, y, w, h, r, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${o.fill ?? "none"}" stroke="${o.stroke ?? "none"}" stroke-width="${o.sw ?? 1.5}" opacity="${o.op ?? 1}"${o.filter ? ` filter="url(#${o.filter})"` : ""}/>`;
const C = (x, y, r, o = {}) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${o.fill ?? "none"}" stroke="${o.stroke ?? "none"}" stroke-width="${o.sw ?? 1.5}" opacity="${o.op ?? 1}"/>`;
const P = (d, o = {}) => `<path d="${d}" fill="${o.fill ?? "none"}" stroke="${o.stroke ?? "none"}" stroke-width="${o.sw ?? 1.6}" stroke-linecap="round" stroke-linejoin="round" opacity="${o.op ?? 1}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}/>`;

function frame(A, rgb, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 600" width="1000" height="1200" role="img" aria-hidden="true">
<defs>
<radialGradient id="glow" cx="50%" cy="38%" r="62%"><stop offset="0" stop-color="${A}" stop-opacity=".34"/><stop offset="1" stop-color="${A}" stop-opacity="0"/></radialGradient>
<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0C111C"/><stop offset="1" stop-color="#070A10"/></linearGradient>
<linearGradient id="scr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgb(${rgb})" stop-opacity=".16"/><stop offset="1" stop-color="#070A10"/></linearGradient>
<linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${A}" stop-opacity=".45"/><stop offset="1" stop-color="${A}" stop-opacity="0"/></linearGradient>
<pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="${A}" stroke-opacity=".07"/></pattern>
<filter id="blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9"/></filter>
</defs>
<rect width="500" height="600" fill="url(#bg)"/><rect width="500" height="600" fill="url(#grid)"/><rect width="500" height="600" fill="url(#glow)"/>
${body}
</svg>
`;
}

/* ---------- Mobile: iOS · Android · Windows ---------- */
function logoImage(name, cx, cy) {
  for (const ext of ["svg", "png"]) {
    const f = join(root, "scripts/hero-logos", `${name}.${ext}`);
    if (existsSync(f)) {
      const mime = ext === "svg" ? "image/svg+xml" : "image/png";
      return `<image x="${cx - 32}" y="${cy - 32}" width="64" height="64" preserveAspectRatio="xMidYMid meet" href="data:${mime};base64,${readFileSync(f).toString("base64")}"/>`;
    }
  }
  return null;
}

function mobile() {
  const A = "#10B981";
  const phones = [
    { x: 20, key: "ios", name: "iOS", lang: "Swift", fw: "SwiftUI", cam: "pill", bar: "pill" },
    { x: 180, key: "android", name: "Android", lang: "Kotlin", fw: "Jetpack Compose", cam: "dot", bar: "pill" },
    { x: 340, key: "windows", name: "Windows", lang: "C#", fw: ".NET MAUI", cam: "none", bar: "flat" },
  ];
  const y = 96, w = 140, h = 300;
  let s = T(24, 40, "NATIVE APPS · ONE API", { mono: true, size: 10, fill: A, ls: 2, op: 0.9 });
  // Leiterbahnen unter den Geräten
  const cxs = phones.map((p) => p.x + w / 2);
  s += P(`M${cxs[0]} ${y + h}V${y + h + 34}H${cxs[2]}V${y + h}`, { stroke: A, op: 0.5, sw: 1.8 });
  s += P(`M${cxs[1]} ${y + h}V${y + h + 58}`, { stroke: A, op: 0.5, sw: 1.8 });
  s += P(`M${cxs[0]} ${y + h}V${y + h + 34}H${cxs[2]}`, { stroke: A, sw: 2.4, dash: "10 26", op: 0.9 });
  for (const cx of cxs) s += C(cx, y + h + 6, 4, { fill: "#07090E", stroke: A, sw: 2 });
  s += R(150, y + h + 58, 200, 52, 12, { fill: "#0C1320", stroke: A, sw: 1.6 }) + R(150, y + h + 58, 200, 52, 12, { stroke: A, op: 0.4, sw: 6, filter: "blur" });
  s += T(250, y + h + 81, "Shared API", { anchor: "middle", size: 14, w: 700 });
  s += T(250, y + h + 98, "REST · GraphQL · Push", { anchor: "middle", size: 10.5, mono: true, fill: A });

  for (const p of phones) {
    const cx = p.x + w / 2;
    s += R(p.x, y, w, h, 28, { fill: A, op: 0.28, filter: "blur" });
    s += R(p.x, y, w, h, 28, { fill: "#0B111B", stroke: A, sw: 2 });
    s += R(p.x + 7, y + 7, w - 14, h - 14, 22, { fill: "url(#scr)", stroke: A, sw: 0.8, op: 1 });
    s += T(cx, y - 14, p.name.toUpperCase(), { anchor: "middle", mono: true, size: 11, ls: 2.5, fill: A, w: 700 });
    // Kamera / Gehäuse
    if (p.cam === "pill") s += R(cx - 18, y + 14, 36, 11, 5.5, { fill: "#02040A" });
    if (p.cam === "dot") s += C(cx, y + 20, 5, { fill: "#02040A" });
    // App-Gerüst
    s += R(p.x + 20, y + 40, 60, 7, 3.5, { fill: A, op: 0.55 }) + R(p.x + 20, y + 54, 90, 5, 2.5, { fill: INK, op: 0.18 });
    s += R(p.x + 20, y + 66, 100, 5, 2.5, { fill: INK, op: 0.12 });
    // Logo-Mitte
    const ly = y + 142;
    s += C(cx, ly, 44, { fill: A, op: 0.09 }) + C(cx, ly, 44, { stroke: A, op: 0.35, sw: 1 });
    const img = logoImage(p.key, cx, ly);
    if (img) s += img;
    else s += C(cx, ly, 32, { fill: "#0B111B", stroke: A, sw: 1.6 }) + T(cx, ly + 4.5, p.name, { anchor: "middle", size: p.name.length > 5 ? 11.5 : 14, w: 700 });
    // Native Sprache + Framework am unteren Rand
    const by = y + h - 92;
    s += R(p.x + 14, by, w - 28, 66, 12, { fill: "#04070C", stroke: A, sw: 1, op: 0.95 });
    s += T(p.x + 24, by + 22, "NATIVE", { mono: true, size: 8, fill: INK, op: 0.5, ls: 1.5 });
    s += T(p.x + 24, by + 40, p.lang, { mono: true, size: 14, fill: A, w: 700 });
    s += T(p.x + 24, by + 56, p.fw, { size: p.fw.length > 10 ? 11 : 12, fill: INK, w: 600 });
    // Home-Indikator
    s += p.bar === "pill" ? R(cx - 22, y + h - 17, 44, 4, 2, { fill: INK, op: 0.5 }) : R(p.x + 7, y + h - 22, w - 14, 15, 0, { fill: INK, op: 0.06 }) + R(cx - 14, y + h - 17, 28, 4, 2, { fill: INK, op: 0.4 });
  }
  return frame(A, "16 185 129", s);
}

/* ---------- Web: Browser + Gerät + Backend ---------- */
function web() {
  const A = "#F97316";
  let s = T(24, 30, "FRONT-END & BACK-END", { mono: true, size: 10, fill: A, ls: 2, op: 0.9 });
  // Browserfenster
  s += R(28, 44, 444, 268, 14, { fill: A, op: 0.18, filter: "blur" });
  s += R(28, 44, 444, 268, 14, { fill: "#0C121D", stroke: A, sw: 1.8 });
  s += P("M28 74H472", { stroke: A, op: 0.4, sw: 1 });
  s += C(46, 59, 4, { fill: A }) + C(60, 59, 4, { fill: A, op: 0.6 }) + C(74, 59, 4, { fill: A, op: 0.3 });
  s += R(96, 50, 250, 18, 9, { fill: INK, op: 0.07 }) + T(110, 63, "https://app.example.dev", { mono: true, size: 9, fill: INK, op: 0.6 });
  // Code-Panel
  s += R(40, 86, 170, 214, 8, { fill: "#05080D", stroke: A, sw: 1, op: 0.9 });
  const code = [
    ["export async function GET() {", INK, 0.9],
    ["  const rows = await db.query(", INK, 0.7],
    ["    'select * from orders')", A, 0.9],
    ["  return Response.json(rows)", INK, 0.7],
    ["}", INK, 0.9],
  ];
  code.forEach(([t, f, o], i) => (s += T(50, 106 + i * 15, t, { mono: true, size: 8.4, fill: f, op: o })));
  [[50, 190, 120], [50, 204, 90], [50, 218, 140], [50, 232, 70], [50, 246, 110], [50, 260, 60], [50, 274, 100]].forEach(([x, yy, ww], i) => (s += R(x, yy, ww, 5, 2.5, { fill: i % 3 === 0 ? A : INK, op: i % 3 === 0 ? 0.55 : 0.16 })));
  // Gerenderte Seite
  s += R(222, 86, 238, 214, 8, { fill: "#0A0F18", stroke: INK, sw: 0.8, op: 0.9 });
  s += R(232, 96, 40, 8, 4, { fill: A }) + R(380, 98, 20, 4, 2, { fill: INK, op: 0.35 }) + R(408, 98, 20, 4, 2, { fill: INK, op: 0.35 }) + R(436, 98, 14, 4, 2, { fill: INK, op: 0.35 });
  s += R(232, 116, 218, 70, 8, { fill: A, op: 0.22 }) + R(244, 130, 110, 9, 4.5, { fill: INK, op: 0.85 }) + R(244, 146, 150, 5, 2.5, { fill: INK, op: 0.35 }) + R(244, 158, 70, 16, 8, { fill: A });
  [0, 1, 2].forEach((i) => (s += R(232 + i * 75, 198, 68, 52, 8, { fill: INK, op: 0.06, stroke: A, sw: 0.8 }) + R(240 + i * 75, 208, 30, 5, 2.5, { fill: A, op: 0.7 }) + R(240 + i * 75, 220, 50, 4, 2, { fill: INK, op: 0.3 }) + R(240 + i * 75, 230, 40, 4, 2, { fill: INK, op: 0.2 })));
  // Smartphone-Ansicht (responsive)
  s += R(394, 214, 80, 142, 14, { fill: "#0C121D", stroke: A, sw: 1.8 }) + R(400, 224, 68, 122, 9, { fill: "url(#scr)" });
  s += R(408, 234, 30, 6, 3, { fill: A }) + R(408, 250, 52, 28, 6, { fill: A, op: 0.28 }) + R(408, 286, 52, 4, 2, { fill: INK, op: 0.3 }) + R(408, 296, 40, 4, 2, { fill: INK, op: 0.2 }) + R(408, 308, 34, 12, 6, { fill: A });
  // Verbindung Front → Back
  s += P("M250 312V352H110V392M250 352H250V392M250 352H400V392", { stroke: A, op: 0.5, sw: 1.8 });
  s += P("M250 312V352H110V392M250 352H400V392M250 352V392", { stroke: A, sw: 2.4, dash: "10 26" });
  s += R(190, 336, 120, 22, 11, { fill: "#07090E", stroke: A, sw: 1.4 }) + T(250, 351, "REST · GraphQL", { anchor: "middle", mono: true, size: 9.5, fill: A });
  // Server-Stack (Go · Rust)
  for (let i = 0; i < 3; i++) {
    const yy = 398 + i * 40;
    s += R(52, yy, 116, 32, 8, { fill: "#0C121D", stroke: A, sw: 1.4 }) + C(68, yy + 16, 3.5, { fill: A }) + C(80, yy + 16, 3.5, { fill: A, op: 0.4 }) + R(96, yy + 12, 56, 8, 4, { fill: INK, op: 0.14 });
  }
  s += T(110, 536, "Go · Rust", { anchor: "middle", mono: true, size: 10, fill: INK, op: 0.85 });
  // Datenbank
  const dbx = 250;
  s += `<path d="M${dbx - 40} 410v78c0 12 18 20 40 20s40-8 40-20v-78" fill="#0C121D" stroke="${A}" stroke-width="1.6"/><ellipse cx="${dbx}" cy="410" rx="40" ry="12" fill="${A}" fill-opacity=".25" stroke="${A}" stroke-width="1.6"/>`;
  s += P(`M${dbx - 40} 440c0 12 18 20 40 20s40-8 40-20M${dbx - 40} 468c0 12 18 20 40 20s40-8 40-20`, { stroke: A, op: 0.6, sw: 1.2 });
  s += T(dbx, 536, "SQL · Cache", { anchor: "middle", mono: true, size: 10, fill: INK, op: 0.85 });
  // Kubernetes-ähnlicher Cluster aus Sechsecken
  const hex = (cx, cy, r, o) => P(Array.from({ length: 6 }, (_, k) => { const a = (Math.PI / 3) * k + Math.PI / 6; return `${k ? "L" : "M"}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`; }).join("") + "Z", o);
  [[400, 430], [434, 450], [434, 490], [400, 510], [366, 490], [366, 450], [400, 470]].forEach(([cx, cy], i) => (s += hex(cx, cy, 19, { fill: i === 6 ? A : "#0C121D", stroke: A, sw: 1.4, op: i === 6 ? 0.85 : 1 })));
  s += T(400, 536, "Kubernetes", { anchor: "middle", mono: true, size: 10, fill: INK, op: 0.85 });
  s += T(250, 572, "Next.js · TypeScript · Cloud", { anchor: "middle", mono: true, size: 10, fill: A, op: 0.8, ls: 0.5 });
  return frame(A, "249 115 22", s);
}

/* ---------- Industrie: Fabrik · Edge · Dashboard ---------- */
function industrial() {
  const B = "#3B82F6";
  let s = T(24, 30, "INDUSTRIAL DIGITALIZATION", { mono: true, size: 10, fill: B, ls: 2, op: 0.9 });
  // Dashboard
  s += R(28, 44, 444, 150, 14, { fill: B, op: 0.18, filter: "blur" }) + R(28, 44, 444, 150, 14, { fill: "#0C121D", stroke: B, sw: 1.8 });
  s += R(42, 56, 34, 8, 4, { fill: B }) + T(88, 64, "LIVE · LINE 01", { mono: true, size: 8.5, fill: INK, op: 0.6, ls: 1 }) + C(452, 60, 3.5, { fill: "#10B981" });
  s += P("M44 170L84 150L124 158L164 128L204 138L244 112L284 124L324 102L364 112L404 92L456 98", { stroke: B, sw: 2.4 });
  s += P("M44 170L84 150L124 158L164 128L204 138L244 112L284 124L324 102L364 112L404 92L456 98V182H44Z", { fill: "url(#area)" });
  [44, 124, 204, 284, 364, 456].forEach((x) => (s += P(`M${x} 182V86`, { stroke: B, op: 0.1, sw: 1 })));
  s += C(404, 92, 4, { fill: "#07090E", stroke: B, sw: 2 });
  ["OEE", "TAKT", "ALARM"].forEach((t, i) => (s += R(300 + i * 54, 70, 48, 20, 6, { fill: i === 2 ? "#F97316" : B, op: 0.16, stroke: i === 2 ? "#F97316" : B, sw: 0.8 }) + T(324 + i * 54, 84, t, { anchor: "middle", mono: true, size: 7.5, fill: INK, op: 0.9 })));
  // Edge-Gateway
  const gx = 250, gy = 262;
  s += P(`M${gx} 194V${gy - 34}`, { stroke: B, op: 0.5, sw: 1.8 }) + P(`M${gx} 194V${gy - 34}`, { stroke: B, sw: 2.4, dash: "8 22" });
  const hexp = (cx, cy, r) => Array.from({ length: 6 }, (_, k) => { const a = (Math.PI / 3) * k; return `${k ? "L" : "M"}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`; }).join("") + "Z";
  s += P(hexp(gx, gy, 38), { fill: B, op: 0.35 }) + `<path d="${hexp(gx, gy, 38)}" fill="#0C121D" stroke="${B}" stroke-width="2"/><path d="${hexp(gx, gy, 26)}" fill="${B}" fill-opacity=".2" stroke="${B}" stroke-width="1"/>`;
  s += T(gx, gy + 4, "EDGE", { anchor: "middle", mono: true, size: 12, w: 700, fill: INK });
  s += R(gx + 52, gy - 26, 96, 22, 11, { fill: "#07090E", stroke: B, sw: 1.2 }) + T(gx + 100, gy - 11, "MQTT · TLS", { anchor: "middle", mono: true, size: 9, fill: B });
  s += R(gx - 148, gy - 26, 96, 22, 11, { fill: "#07090E", stroke: B, sw: 1.2 }) + T(gx - 100, gy - 11, "OPC-UA", { anchor: "middle", mono: true, size: 9, fill: B });
  // Fabrikhalle (Sägezahndach)
  s += P("M30 500V400L80 372V400L130 372V400L180 372V400L230 372V400L280 372V400L330 372V400L380 372V400L430 372V400L470 380V500Z", { fill: B, op: 0.07, stroke: B, sw: 1.2 });
  s += R(404, 330, 14, 42, 2, { fill: "#0C121D", stroke: B, sw: 1.2, op: 0.9 }) + R(432, 344, 14, 28, 2, { fill: "#0C121D", stroke: B, sw: 1.2, op: 0.9 });
  // Datenleitungen von Maschinen zum Gateway
  s += P(`M120 440V330H${gx - 20}V${gy + 38}M250 440V${gy + 38}M390 440V330H${gx + 20}V${gy + 38}`, { stroke: B, op: 0.5, sw: 1.8 });
  s += P(`M120 440V330H${gx - 20}V${gy + 38}M390 440V330H${gx + 20}V${gy + 38}M250 440V${gy + 38}`, { stroke: B, sw: 2.4, dash: "8 24" });
  [[120, 440], [250, 440], [390, 440]].forEach(([x, yy]) => (s += C(x, yy, 5, { fill: "#07090E", stroke: B, sw: 2 })));
  // Roboterarm (links)
  s += R(60, 468, 70, 14, 3, { fill: "#0C121D", stroke: B, sw: 1.4 }) + P("M95 468V440L130 410L168 436", { stroke: B, sw: 6, op: 0.4 }) + P("M95 468V440L130 410L168 436", { stroke: B, sw: 2.4 });
  s += C(95, 440, 8, { fill: "#0C121D", stroke: B, sw: 2 }) + C(130, 410, 7, { fill: "#0C121D", stroke: B, sw: 2 }) + P("M168 436l8 10M168 436l-8 10", { stroke: B, sw: 2.4 });
  // SPS-Schaltschrank (Mitte)
  s += R(212, 450, 76, 100, 6, { fill: "#0C121D", stroke: B, sw: 1.6 }) + R(220, 460, 60, 20, 3, { fill: B, op: 0.2 });
  [0, 1, 2, 3].forEach((i) => (s += C(228 + i * 14, 494, 3, { fill: i === 1 ? "#F97316" : "#10B981" })));
  [0, 1, 2, 3, 4, 5].forEach((i) => (s += R(220 + i * 10, 512, 6, 28, 1.5, { fill: B, op: i % 2 ? 0.5 : 0.25 })));
  s += T(250, 468, "PLC", { anchor: "middle", mono: true, size: 9, fill: INK, w: 700 });
  // Förderband mit Paketen (rechts)
  s += R(318, 520, 150, 16, 8, { fill: "#0C121D", stroke: B, sw: 1.6 });
  [334, 366, 398, 430, 454].forEach((x) => (s += C(x, 528, 3, { fill: B, op: 0.7 })));
  [[336, 494], [380, 494], [424, 494]].forEach(([x, yy]) => (s += R(x, yy, 32, 26, 3, { fill: B, op: 0.18, stroke: B, sw: 1.4 }) + P(`M${x} ${yy + 9}H${x + 32}`, { stroke: B, op: 0.6, sw: 1 })));
  // Sensor
  s += P("M330 456V440", { stroke: B, sw: 2 }) + C(330, 436, 5, { fill: "#07090E", stroke: "#10B981", sw: 2 }) + P("M330 441L336 490", { stroke: "#10B981", op: 0.35, sw: 1, dash: "3 4" });
  // Boden und Beschriftungen
  s += P("M28 552H472", { stroke: B, op: 0.45, sw: 1.4 });
  s += T(95, 574, "Robot", { anchor: "middle", mono: true, size: 9.5, fill: INK, op: 0.75 }) + T(250, 574, "SPS / PLC", { anchor: "middle", mono: true, size: 9.5, fill: INK, op: 0.75 }) + T(393, 574, "Conveyor", { anchor: "middle", mono: true, size: 9.5, fill: INK, op: 0.75 });
  return frame(B, "59 130 246", s);
}

for (const [name, svg] of [["mobile", mobile()], ["web", web()], ["industrial", industrial()]]) {
  writeFileSync(join(out, `${name}.svg`), svg);
  console.log("public/hero/" + name + ".svg", (svg.length / 1024).toFixed(1) + " KB");
}

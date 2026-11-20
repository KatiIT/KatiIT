export type Point = readonly [number, number];

/**
 * Baut aus Wegpunkten einen SVG-Pfad mit abgerundeten Ecken (Leiterbahn-Optik).
 * Der Radius wird pro Ecke auf die halbe Segmentlänge begrenzt.
 */
export function roundedPath(points: readonly Point[], radius = 14): string {
  if (points.length < 2) return "";
  const [first, ...rest] = points;
  let d = `M${first[0]} ${first[1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const cur = points[i];
    const next = points[i + 1];
    const lenIn = Math.hypot(cur[0] - prev[0], cur[1] - prev[1]);
    const lenOut = Math.hypot(next[0] - cur[0], next[1] - cur[1]);
    const r = Math.min(radius, lenIn / 2, lenOut / 2);
    const inX = cur[0] - ((cur[0] - prev[0]) / lenIn) * r;
    const inY = cur[1] - ((cur[1] - prev[1]) / lenIn) * r;
    const outX = cur[0] + ((next[0] - cur[0]) / lenOut) * r;
    const outY = cur[1] + ((next[1] - cur[1]) / lenOut) * r;
    d += ` L${inX.toFixed(1)} ${inY.toFixed(1)} Q${cur[0]} ${cur[1]} ${outX.toFixed(1)} ${outY.toFixed(1)}`;
  }
  const last = rest[rest.length - 1];
  d += ` L${last[0]} ${last[1]}`;
  return d;
}

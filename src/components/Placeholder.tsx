import { Fragment } from "react";

/**
 * Rendert Text und hebt Tokens der Form [[…]] als Platzhalter hervor.
 * So bleibt jede noch offene Angabe vor dem Livegang sichtbar.
 */
export function Ph({ children }: { children: string }) {
  const parts = children.split(/(\[\[[^\]]+\]\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[[") ? (
          <mark
            key={i}
            className="rounded-sm bg-amber-300/90 px-1 font-mono text-[0.92em] text-space-950"
            title="Platzhalter / placeholder"
          >
            {part.slice(2, -2)}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

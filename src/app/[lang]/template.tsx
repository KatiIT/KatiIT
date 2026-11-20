import type { ReactNode } from "react";

/** Wird bei jeder Navigation neu gemountet: liefert den Fallback-Fade (nur ohne View-Transitions-Unterstützung, siehe globals.css). */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-fade">{children}</div>;
}

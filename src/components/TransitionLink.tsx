"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import type { ColumnId } from "@/i18n/types";
import { columnOrigin, navigateWithTransition } from "@/lib/view-transition";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  colId: ColumnId;
  mode?: "forward" | "back";
  /** Element, aus dem das Bild "startet" (Standard: Spaltenkarte, sonst der Link selbst) */
  originSelector?: string;
  /** Der Link selbst ist der Startpunkt (z. B. Farbbalken im Hero, Leiste auf Unterseiten) */
  originSelf?: boolean;
};

/** Link mit Bildübergang. Strg/Cmd/Mittelklick und Tastatur-Aktivierung verhalten sich wie normale Links. */
export function TransitionLink({ href, colId, mode = "forward", originSelector, originSelf, onClick, ...rest }: Props) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        const el = e.currentTarget;
        const origin = mode === "back" ? null : originSelf ? el : originSelector ? document.querySelector<HTMLElement>(originSelector) : columnOrigin(el.closest("[data-column]") ? el : document.querySelector<HTMLElement>(`[data-column="${colId}"]`)) ?? el;
        navigateWithTransition({ router, href, colId, mode, origin });
      }}
      {...rest}
    />
  );
}

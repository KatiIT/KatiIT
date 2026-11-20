"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { settleTransition } from "@/lib/view-transition";

/** Meldet dem Übergang, dass die neue Route gerendert ist. Rendert nichts. */
export function TransitionSettler() {
  const pathname = usePathname();
  useEffect(() => {
    settleTransition(pathname);
  }, [pathname]);
  return null;
}

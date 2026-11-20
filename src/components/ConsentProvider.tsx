"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";

/**
 * Cookie-freies Consent-Konzept:
 * - Es werden keinerlei Cookies gesetzt.
 * - Die Auswahl liegt im localStorage (nur lokal, wird nirgends übertragen).
 * - Einziger optionaler Dienst: Cal.com (iframe), erst nach Einwilligung geladen.
 */
export type ConsentChoice = "unset" | "essential" | "calcom";

const STORAGE_KEY = "katiit:consent:v1";
const listeners = new Set<() => void>();
let memoryChoice: ConsentChoice = "unset"; // Fallback, falls localStorage blockiert ist

function readChoice(): ConsentChoice {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return memoryChoice;
    const parsed = JSON.parse(raw) as { calcom?: boolean };
    return parsed.calcom ? "calcom" : "essential";
  } catch {
    return memoryChoice;
  }
}

function writeChoice(choice: Exclude<ConsentChoice, "unset">) {
  memoryChoice = choice;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ calcom: choice === "calcom", ts: new Date().toISOString() }));
  } catch {
    /* Speicher blockiert: Auswahl gilt nur für diese Sitzung */
  }
  listeners.forEach((l) => l());
}

function clearChoice() {
  memoryChoice = "unset";
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

type ConsentContextValue = {
  choice: ConsentChoice;
  /** true, sobald Cal.com geladen werden darf (dauerhaft oder einmalig) */
  calAllowed: boolean;
  bannerOpen: boolean;
  openBanner: () => void;
  decide: (choice: Exclude<ConsentChoice, "unset">) => void;
  allowCalOnce: () => void;
  revokeCal: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const choice = useSyncExternalStore(subscribe, readChoice, () => "unset" as ConsentChoice);
  const [onceAllowed, setOnceAllowed] = useState(false);
  const [reopened, setReopened] = useState(false);

  const decide = useCallback((c: Exclude<ConsentChoice, "unset">) => {
    writeChoice(c);
    if (c === "essential") setOnceAllowed(false);
    setReopened(false);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      choice,
      calAllowed: choice === "calcom" || onceAllowed,
      bannerOpen: choice === "unset" || reopened,
      openBanner: () => setReopened(true),
      decide,
      allowCalOnce: () => setOnceAllowed(true),
      revokeCal: () => {
        setOnceAllowed(false);
        if (choice === "calcom") writeChoice("essential");
        else if (choice === "unset") clearChoice();
      },
    }),
    [choice, onceAllowed, reopened, decide],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent muss innerhalb von <ConsentProvider> verwendet werden");
  return ctx;
}

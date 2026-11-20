"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { OptionGroup, ServicePage, ServiceUi } from "@/i18n/service-types";
import { LayerStack } from "./LayerStack";
import { Modal } from "./Modal";
import { OptionCard } from "./OptionCard";
import { OptionRow } from "./OptionRow";

type Open = { kind: "info"; id: string } | { kind: "arch" } | null;

/**
 * Optionen als Zeilen. Zwei Popups, je einmal pro Seite:
 *  - "Mehr Infos": die bisherige Optionskarte (OptionCard) der gewählten Option
 *  - "Architektur": der bisherige Architektur-Abschnitt (LayerStack), nicht mehr inline auf der Seite
 */
export function OptionsExplorer({ groups, layers, ui, lang, accent }: { groups: OptionGroup[]; layers: ServicePage["layers"]; ui: ServiceUi; lang: Locale; accent: string }) {
  const [open, setOpen] = useState<Open>(null);
  const close = () => setOpen(null);
  const current = open?.kind === "info" ? groups.flatMap((g) => g.items).find((o) => o.id === open.id) : undefined;

  return (
    <>
      <div className="space-y-14">
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="text-xl font-semibold text-ink">{g.title}</h3>
            <p className="mt-2 max-w-2xl text-sm text-ink-muted">{g.lead}</p>
            <ul className="mt-6 space-y-6">
              {g.items.map((it) => (
                <li key={it.id} className="min-w-0">
                  <OptionRow option={it} ui={ui} lang={lang} accent={accent} onInfo={() => setOpen({ kind: "info", id: it.id })} onArchitecture={() => setOpen({ kind: "arch" })} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Modal open={open?.kind === "info" && !!current} onClose={close} title={current?.name ?? ""} eyebrow={current?.kind} closeLabel={ui.close} size="md">
        {current && <OptionCard option={current} ui={ui} />}
      </Modal>

      <Modal open={open?.kind === "arch"} onClose={close} title={layers.title} eyebrow={ui.toc.layers} closeLabel={ui.close} size="xl">
        <p className="mb-6 max-w-2xl text-pretty leading-relaxed text-ink-muted">{layers.lead}</p>
        <LayerStack items={layers.items} hint={ui.layersHint} fixed />
      </Modal>
    </>
  );
}

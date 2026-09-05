"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { parseCardCsv } from "@/lib/import/csvImporter";

export function ImportAdminPage() {
  const [csv, setCsv] = useState("");

  const parsedRows = useMemo(() => {
    if (!csv.trim()) {
      return [];
    }

    try {
      return parseCardCsv(csv);
    } catch {
      return [];
    }
  }, [csv]);

  function handleValidate() {
    try {
      const rows = parseCardCsv(csv);
      toast.success(`CSV valid: ${rows.length} row(s) ready for import.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid CSV.";
      toast.error(message);
    }
  }

  return (
    <div className="space-y-4">
      <section className="border-2 border-[var(--ink)] bg-[var(--paper)] p-5">
        <h1 className="text-3xl font-semibold tracking-tight">CSV Import Admin</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Paste CSV rows to validate schema before connecting import mutations.
        </p>
      </section>

      <section className="border border-[var(--ink)] bg-[var(--paper)] p-4">
        <textarea
          className="h-64 w-full resize-y border border-[var(--ink)] bg-[var(--paper-strong)] p-3 font-mono text-xs"
          placeholder="tcg,card_name,card_slug,printing_slug,set_name,set_code,card_number,rarity,illustrator,width_mm,height_mm,weight_grams,printed_at,variant,language,image_url"
          value={csv}
          onChange={(event) => setCsv(event.target.value)}
        />
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-[var(--muted)]">Preview rows: {parsedRows.length}</p>
          <button
            type="button"
            onClick={handleValidate}
            className="border border-[var(--ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            Validate
          </button>
        </div>
      </section>
    </div>
  );
}

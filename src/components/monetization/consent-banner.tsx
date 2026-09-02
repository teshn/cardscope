"use client";

import { useEffect, useState } from "react";

import {
  getConsentState,
  onConsentChange,
  setConsentState,
  type ConsentState,
} from "@/lib/consent/cmp";

export function ConsentBanner() {
  const [state, setState] = useState<ConsentState>(() => {
    if (typeof window === "undefined") {
      return "unset";
    }
    return getConsentState();
  });

  useEffect(() => {
    return onConsentChange((nextState) => setState(nextState));
  }, []);

  if (state !== "unset") {
    return null;
  }

  return (
    <aside
      className="fixed inset-x-3 bottom-3 z-50 border-2 border-[var(--ink)] bg-[var(--paper)] p-4 shadow-[8px_8px_0_0_var(--ink)] md:inset-x-auto md:right-3 md:max-w-xl"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.24em]">Cookie Preferences</p>
      <p className="mt-2 text-sm text-[var(--muted)]">
        CardScope uses analytics and ad cookies only after consent. You can change this later in settings.
      </p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em]">
        <button
          type="button"
          className="border border-[var(--ink)] px-3 py-1 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          onClick={() => setConsentState("accepted")}
        >
          Accept
        </button>
        <button
          type="button"
          className="border border-[var(--ink)] px-3 py-1"
          onClick={() => setConsentState("rejected")}
        >
          Reject
        </button>
      </div>
    </aside>
  );
}

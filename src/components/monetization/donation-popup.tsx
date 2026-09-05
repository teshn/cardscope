"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  dismissDonationPopup,
  shouldSuppressDonationPopup,
  suppressDonationPopup,
} from "@/lib/consent/cmp";

type DonationPopupProps = {
  pageViews: number;
};

const VISIT_STARTED_KEY = "cardscope_visit_started_at";
const ONE_MINUTE = 1000 * 60;

function getVisitStartedAt() {
  if (typeof window === "undefined") {
    return null;
  }

  const visitStartedRaw = window.sessionStorage.getItem(VISIT_STARTED_KEY);
  const visitStartedAt = visitStartedRaw ? Number(visitStartedRaw) : Date.now();

  return Number.isNaN(visitStartedAt) ? Date.now() : visitStartedAt;
}

export function DonationPopup({ pageViews }: DonationPopupProps) {
  const [dismissed, setDismissed] = useState(() => shouldSuppressDonationPopup());
  const [visitStartedAt] = useState(() => getVisitStartedAt());
  const [timeOnSiteReached, setTimeOnSiteReached] = useState(() => {
    if (visitStartedAt === null) {
      return false;
    }

    return Date.now() >= visitStartedAt + ONE_MINUTE;
  });

  useEffect(() => {
    if (dismissed || visitStartedAt === null) {
      return;
    }

    const visitStartedRaw = window.sessionStorage.getItem(VISIT_STARTED_KEY);
    if (!visitStartedRaw || Number.isNaN(Number(visitStartedRaw))) {
      window.sessionStorage.setItem(VISIT_STARTED_KEY, String(visitStartedAt));
    }

    const delay = Math.max(0, visitStartedAt + ONE_MINUTE - Date.now());
    if (delay === 0) {
      return;
    }

    const timerId = window.setTimeout(() => {
      setTimeOnSiteReached(true);
    }, delay);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [dismissed, visitStartedAt]);

  function onLater() {
    dismissDonationPopup();
    setDismissed(true);
  }

  function onNever() {
    suppressDonationPopup();
    setDismissed(true);
  }

  const open = !dismissed && (pageViews >= 2 || timeOnSiteReached);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-x-4 bottom-5 z-50 mx-auto max-w-sm border-2 border-[var(--ink)] bg-[var(--paper)] p-4 shadow-[10px_10px_0_0_var(--ink)]"
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-live="polite"
        >
          <h3 className="font-mono text-sm uppercase tracking-[0.18em]">Support CardScope</h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Keep this project independent and fast. Your support funds data quality and media hosting.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <a className="border border-[var(--ink)] px-3 py-1 hover:bg-[var(--ink)] hover:text-[var(--paper)]" href="https://www.buymeacoffee.com/" target="_blank" rel="noreferrer">
              Buy Me a Coffee
            </a>
            <a className="border border-[var(--ink)] px-3 py-1 hover:bg-[var(--ink)] hover:text-[var(--paper)]" href="https://ko-fi.com/" target="_blank" rel="noreferrer">
              Ko-fi
            </a>
            <a className="border border-[var(--ink)] px-3 py-1 hover:bg-[var(--ink)] hover:text-[var(--paper)]" href="https://ethereum.org/" target="_blank" rel="noreferrer">
              Ethereum
            </a>
          </div>
          <div className="mt-4 flex gap-2 text-xs uppercase tracking-[0.15em]">
            <button className="border border-[var(--ink)] px-2 py-1" onClick={onLater}>
              Later
            </button>
            <button className="border border-[var(--ink)] px-2 py-1" onClick={onNever}>
              Never
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

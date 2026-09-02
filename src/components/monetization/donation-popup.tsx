"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { shouldSuppressDonationPopup, suppressDonationPopup } from "@/lib/consent/cmp";

type DonationPopupProps = {
  pageViews: number;
};

const DISMISS_KEY = "cardscope_donation_next_show";
const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;

export function DonationPopup({ pageViews }: DonationPopupProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (shouldSuppressDonationPopup()) {
      return;
    }

    const nextShowRaw = window.localStorage.getItem(DISMISS_KEY);
    const nextShowAt = nextShowRaw ? Number(nextShowRaw) : 0;
    const canShow = Date.now() >= nextShowAt;

    if (canShow && pageViews >= 2) {
      const timerId = window.setTimeout(() => {
        setOpen(true);
      }, 0);

      return () => {
        window.clearTimeout(timerId);
      };
    }
  }, [pageViews]);

  function onLater() {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now() + SEVEN_DAYS));
    setOpen(false);
  }

  function onNever() {
    suppressDonationPopup();
    setOpen(false);
  }

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

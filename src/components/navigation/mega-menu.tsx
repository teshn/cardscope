"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useMemo, useState } from "react";

import { localeLabels } from "@/lib/i18n/config";
import type { Locale, TcgSummary } from "@/types/card";

type MegaMenuProps = {
  locale: Locale;
  tcgs: TcgSummary[];
};

export function MegaMenu({ locale, tcgs }: MegaMenuProps) {
  const [open, setOpen] = useState(false);

  const importantLinks = useMemo(
    () => [
      { href: `/${locale}/category/illustrator`, label: "Illustrators" },
      { href: `/${locale}/category/rarity`, label: "Rarity" },
      { href: `/${locale}/admin/import`, label: "Admin Import" },
    ],
    [locale],
  );

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-2 border border-[var(--ink)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition hover:bg-[var(--ink)] hover:text-[var(--paper)]"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="main-mega-menu"
      >
        {open ? <X size={14} /> : <Menu size={14} />}
        Browse
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="main-mega-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 z-30 mt-3 w-[min(92vw,840px)] border-2 border-[var(--ink)] bg-[var(--paper)] p-5 shadow-[8px_8px_0_0_var(--ink)]"
          >
            <div className="grid gap-5 md:grid-cols-[2fr_1fr]">
              <section>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
                  Popular TCGs
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {tcgs.map((tcg) => (
                    <Link
                      key={tcg.slug}
                      href={`/${locale}/tcg/${tcg.slug}`}
                      className="group border border-[var(--ink)] p-3 transition hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                      onClick={() => setOpen(false)}
                    >
                      <p className="font-semibold">{tcg.name}</p>
                      <p className="mt-1 text-xs text-[var(--muted)] group-hover:text-[var(--paper)]/80">
                        {tcg.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="border-l-0 border-t border-[var(--ink)] pt-4 md:border-l md:border-t-0 md:pl-4 md:pt-0">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">Important</p>
                <div className="mt-3 flex flex-col gap-2">
                  {importantLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="border border-[var(--ink)] px-3 py-2 text-sm transition hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <p className="mt-4 text-xs text-[var(--muted)]">
                  Locale: {localeLabels[locale]}
                </p>
              </section>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

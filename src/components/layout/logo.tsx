import Link from "next/link";

import type { Locale } from "@/types/card";

type LogoProps = {
  locale: Locale;
};

export function Logo({ locale }: LogoProps) {
  return (
    <Link href={`/${locale}`} aria-label="CardScope Home" className="group inline-flex items-center gap-3">
      <span className="relative inline-grid h-10 w-10 grid-cols-4 grid-rows-4 border-2 border-[var(--ink)] bg-[var(--paper)] p-1">
        <span className="col-start-1 row-start-1 h-1.5 w-1.5 bg-[var(--ink)]" />
        <span className="col-start-2 row-start-2 h-1.5 w-1.5 bg-[var(--ink)]" />
        <span className="col-start-3 row-start-3 h-1.5 w-1.5 bg-[var(--ink)]" />
        <span className="col-start-4 row-start-4 h-1.5 w-1.5 bg-[var(--ink)]" />
      </span>
      <span className="font-mono text-sm uppercase tracking-[0.32em] transition group-hover:tracking-[0.36em]">
        CardScope
      </span>
    </Link>
  );
}

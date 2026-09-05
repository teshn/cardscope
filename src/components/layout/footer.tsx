import Link from "next/link";

import { defaultLocale } from "@/lib/i18n/config";

export function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-[var(--ink)] bg-[var(--paper-strong)]">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em]">CardScope</h2>
          <p className="mt-3 text-sm text-[var(--muted)]">
            A collector-first index focused on card authenticity signals and print transparency.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em]">Important Links</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/category/illustrator" className="hover:underline">
                Illustrator Index
              </Link>
            </li>
            <li>
              <Link href={`/${defaultLocale}/admin/import`} className="hover:underline">
                CSV Import Admin
              </Link>
            </li>
            <li>
              <Link href="/legal/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/legal/cookies" className="hover:underline">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em]">Support</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="https://www.buymeacoffee.com/" target="_blank" rel="noreferrer" className="hover:underline">
                Buy Me a Coffee
              </a>
            </li>
            <li>
              <a href="https://ko-fi.com/" target="_blank" rel="noreferrer" className="hover:underline">
                Ko-fi
              </a>
            </li>
            <li>
              <a href="https://ethereum.org/" target="_blank" rel="noreferrer" className="hover:underline">
                Ethereum
              </a>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
}

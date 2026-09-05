import { tcgs } from "@/data/mock-cards";
import { getMessages } from "@/lib/i18n/config";
import type { Locale } from "@/types/card";

import { Logo } from "./logo";
import { MegaMenu } from "../navigation/mega-menu";

//Test

type HeaderProps = {
  locale: Locale;
};

export function Header({ locale }: HeaderProps) {
  const messages = getMessages(locale);

  return (
    <header className="sticky top-0 z-20 border-b-2 border-[var(--ink)] bg-[var(--paper)]/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Logo />
        <div className="flex items-center gap-3">
          <p className="hidden text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] md:block">
            {messages.nav.popularTcgs}
          </p>
          <MegaMenu tcgs={tcgs} />
        </div>
      </div>
    </header>
  );
}

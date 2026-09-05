import Link from "next/link";

import { AdSlot } from "@/components/monetization/ad-slot";
import { cardPrintings, tcgs } from "@/data/mock-cards";
import { getMessages } from "@/lib/i18n/config";
import type { Locale } from "@/types/card";

type HomePageProps = {
  locale: Locale;
};

export function HomePage({ locale }: HomePageProps) {
  const messages = getMessages(locale);

  return (
    <div className="space-y-10">
      <section className="grid gap-6 border-2 border-[var(--ink)] bg-[var(--paper)] p-6 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.26em] text-[var(--muted)]">
            {messages.hero.kicker}
          </p>
          <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
            {messages.hero.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-[var(--muted)] md:text-base">
            {messages.hero.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#popular-tcgs"
              className="border border-[var(--ink)] px-4 py-2 text-sm font-semibold hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              {messages.hero.ctaPrimary}
            </a>
            <a
              href="#trending-cards"
              className="border border-[var(--ink)] px-4 py-2 text-sm font-semibold hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              {messages.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <AdSlot variant="banner" label="Homepage Banner Ad" />
      </section>

      <section id="popular-tcgs" className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.26em]">Popular TCGs</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tcgs.map((tcg) => (
            <Link
              key={tcg.slug}
              href={`/tcg/${tcg.slug}`}
              className="border-2 border-[var(--ink)] bg-[var(--paper)] p-4 transition-transform duration-200 hover:-translate-y-1"
            >
              <p className="font-semibold">{tcg.name}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">{tcg.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="trending-cards" className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.26em]">Trending Cards</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {cardPrintings.slice(0, 4).map((card) => (
            <Link
              key={card.id}
              href={`/card/${card.cardSlug}/${card.printingSlug}`}
              className="group border border-[var(--ink)] bg-[var(--paper)] p-4 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{card.cardName}</p>
                  <p className="mt-1 text-xs text-[var(--muted)] group-hover:text-[var(--paper)]/70">
                    {card.setName} • {card.cardNumber}
                  </p>
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em]">Inspect</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

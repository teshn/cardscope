import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { AdSlot } from "@/components/monetization/ad-slot";
import { getCardsByTcg, tcgs } from "@/data/mock-cards";
import { defaultLocale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";

type PublicTcgPageParams = Promise<{ tcgSlug: string }>;

export async function generateMetadata({
  params,
}: {
  params: PublicTcgPageParams;
}) {
  const { tcgSlug } = await params;
  const tcg = tcgs.find((entry) => entry.slug === tcgSlug);

  if (!tcg) {
    return {};
  }

  return pageMetadata(`/tcg/${tcgSlug}`, {
    title: `${tcg.name} Card Database`,
    description: `${tcg.description} Explore print variants, authenticity indicators, and detailed card facts on CardScope.`,
    keywords: [tcg.name, tcg.slug, "card set lookup", "card print variants"],
  });
}

export default async function PublicTcgPage({
  params,
}: {
  params: PublicTcgPageParams;
}) {
  const { tcgSlug } = await params;
  const tcg = tcgs.find((entry) => entry.slug === tcgSlug);

  if (!tcg) {
    notFound();
  }

  const cards = getCardsByTcg(tcg.slug);

  return (
    <PageShell locale={defaultLocale}>
      <div className="space-y-6">
        <section className="border-2 border-[var(--ink)] bg-[var(--paper)] p-5">
          <h1 className="text-3xl font-semibold tracking-tight">{tcg.name}</h1>
          <p className="mt-2 max-w-3xl text-sm text-[var(--muted)]">{tcg.description}</p>
        </section>

        <AdSlot variant="feature" label={`${tcg.name} Featured Ad`} />

        <section className="grid gap-3 md:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.id}
              href={`/card/${card.cardSlug}/${card.printingSlug}`}
              className="border border-[var(--ink)] bg-[var(--paper)] p-4 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              <p className="font-semibold">{card.cardName}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {card.setName} • {card.cardNumber} • {card.rarity}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </PageShell>
  );
}

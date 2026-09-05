import { notFound } from "next/navigation";

import { CardHoverLink } from "@/components/card/card-hover-link";
import { AdSlot } from "@/components/monetization/ad-slot";
import { getCardsByTcg, tcgs } from "@/data/mock-cards";
import { isLocale } from "@/lib/i18n/config";

type TcgPageParams = Promise<{ locale: string; tcgSlug: string }>;

export default async function TcgPage({
  params,
}: {
  params: TcgPageParams;
}) {
  const { locale, tcgSlug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const tcg = tcgs.find((entry) => entry.slug === tcgSlug);
  if (!tcg) {
    notFound();
  }

  const cards = getCardsByTcg(tcg.slug);

  return (
    <div className="space-y-6">
      <section className="border-2 border-[var(--ink)] bg-[var(--paper)] p-5">
        <h1 className="text-3xl font-semibold tracking-tight">{tcg.name}</h1>
        <p className="mt-2 max-w-3xl text-sm text-[var(--muted)]">{tcg.description}</p>
      </section>

      <AdSlot variant="feature" label={`${tcg.name} Featured Ad`} />

      <section className="grid gap-3 md:grid-cols-2">
        {cards.map((card) => (
          <CardHoverLink
            key={card.id}
            href={`/${locale}/card/${card.cardSlug}/${card.printingSlug}`}
            imageUrl={card.imageUrl}
            className="border border-[var(--ink)] bg-[var(--paper)] p-4 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            <p className="font-semibold">{card.cardName}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {card.setName} • {card.cardNumber} • {card.rarity}
            </p>
          </CardHoverLink>
        ))}
      </section>
    </div>
  );
}

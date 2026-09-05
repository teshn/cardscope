import Link from "next/link";
import { notFound } from "next/navigation";

import { getCardsByIllustrator, illustrators } from "@/data/mock-cards";

type IllustratorPageContentProps = {
  slug: string;
  pathPrefix?: string;
};

export function IllustratorPageContent({
  slug,
  pathPrefix = "",
}: IllustratorPageContentProps) {
  const illustrator = illustrators.find((entry) => entry.slug === slug);
  if (!illustrator) {
    notFound();
  }

  const cards = getCardsByIllustrator(slug);

  return (
    <div className="space-y-6">
      <section className="border-2 border-[var(--ink)] bg-[var(--paper)] p-5">
        <h1 className="text-3xl font-semibold tracking-tight">{illustrator.name}</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">{illustrator.biography}</p>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.id}
            href={`${pathPrefix}/card/${card.cardSlug}/${card.printingSlug}`}
            className="border border-[var(--ink)] bg-[var(--paper)] p-4 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            <p className="font-semibold">{card.cardName}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{card.setName} • {card.cardNumber}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

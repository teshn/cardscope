import Link from "next/link";
import { notFound } from "next/navigation";

import { getCardsByCategory, illustrators } from "@/data/mock-cards";
import { isLocale } from "@/lib/i18n/config";

type CategoryPageParams = Promise<{ locale: string; slug: string }>;

export default async function CategoryPage({
  params,
}: {
  params: CategoryPageParams;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const cards = getCardsByCategory(slug);

  if (!cards.length) {
    notFound();
  }

  const isIllustratorCategory = slug === "illustrator";

  return (
    <div className="space-y-6">
      <section className="border-2 border-[var(--ink)] bg-[var(--paper)] p-5">
        <h1 className="text-3xl font-semibold tracking-tight">Category: {slug}</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Filtered results for cards that match the selected category.
        </p>
      </section>

      {isIllustratorCategory ? (
        <section className="space-y-3 border border-[var(--ink)] bg-[var(--paper)] p-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em]">Browse By Illustrator</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {illustrators.map((illustrator) => (
              <Link
                key={illustrator.slug}
                href={`/${locale}/illustrator/${illustrator.slug}`}
                className="border border-[var(--ink)] px-3 py-2 text-sm hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              >
                {illustrator.name}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="grid gap-3 md:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.id}
            href={`/${locale}/card/${card.cardSlug}/${card.printingSlug}`}
            prefetch={false}
            className="border border-[var(--ink)] bg-[var(--paper)] p-4 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            <p className="font-semibold">{card.cardName}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{card.tcgSlug} • {card.setName}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

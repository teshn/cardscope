import { cardPrintings } from "@/data/mock-cards";

type Counter = {
  cardId: string;
  tcgSlug: string;
  count: number;
};

export function computeTopViewedCards(events: Array<{ cardPrintingId: string }>, limit = 6) {
  const lookup = new Map<string, Counter>();

  for (const event of events) {
    const card = cardPrintings.find((entry) => entry.id === event.cardPrintingId);
    if (!card) {
      continue;
    }

    const existing = lookup.get(event.cardPrintingId);
    if (existing) {
      existing.count += 1;
      continue;
    }

    lookup.set(event.cardPrintingId, {
      cardId: event.cardPrintingId,
      tcgSlug: card.tcgSlug,
      count: 1,
    });
  }

  return Array.from(lookup.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map((entry) => ({
      ...entry,
      card: cardPrintings.find((card) => card.id === entry.cardId),
    }));
}

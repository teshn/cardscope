export type Locale = "en";

export type TcgSummary = {
  slug: string;
  name: string;
  description: string;
};

export type CardCategory = {
  slug: string;
  label: string;
};

export type CardFacts = {
  widthMm: number;
  heightMm: number;
  weightGrams: number;
  printedAt: string;
  variant: string;
  language: string;
};

export type CardPrintingSummary = {
  id: string;
  cardSlug: string;
  printingSlug: string;
  cardName: string;
  tcgSlug: string;
  setName: string;
  setCode: string;
  cardNumber: string;
  rarity: string;
  illustrator: string;
  facts: CardFacts;
  categories: CardCategory[];
  imageUrl: string;
};

export type IllustratorSummary = {
  slug: string;
  name: string;
  biography: string;
};

import type {
  CardPrintingSummary,
  IllustratorSummary,
  Locale,
  TcgSummary,
} from "@/types/card";

export const siteConfig = {
  name: "CardScope",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cardscope.example",
  description:
    "CardScope helps collectors inspect card details, verify authenticity signals, and compare printings.",
};

export const locales: Locale[] = ["en"];
export const defaultLocale: Locale = "en";

export const tcgs: TcgSummary[] = [
  {
    slug: "pokemon",
    name: "Pokemon",
    description: "Identify print variants and compare dimensions for Pokemon cards.",
  },
  {
    slug: "yu-gi-oh",
    name: "Yu-Gi-Oh!",
    description: "Inspect print era differences and card stock indicators.",
  },
  {
    slug: "magic-the-gathering",
    name: "Magic: The Gathering",
    description: "Review set-level reprints, illustrator data, and card facts.",
  },
  {
    slug: "one-piece",
    name: "One Piece",
    description: "Compare modern print lines and release versions.",
  },
];

export const illustrators: IllustratorSummary[] = [
  {
    slug: "mitsuhiro-arita",
    name: "Mitsuhiro Arita",
    biography:
      "Legendary illustrator known for iconic Pokemon artworks and collectible staples.",
  },
  {
    slug: "kazuki-takahashi-studio",
    name: "Kazuki Takahashi Studio",
    biography:
      "Studio-attributed card art references associated with early Yu-Gi-Oh! print eras.",
  },
  {
    slug: "seb-mckinnon",
    name: "Seb McKinnon",
    biography:
      "Distinct fantasy compositions in modern Magic: The Gathering sets.",
  },
];

export const cardPrintings: CardPrintingSummary[] = [
  {
    id: "pkm-charizard-bsv-4-holo-en",
    cardSlug: "charizard",
    printingSlug: "bsv-4-holo-en",
    cardName: "Charizard",
    tcgSlug: "pokemon",
    setName: "Base Set",
    setCode: "BSV",
    cardNumber: "4/102",
    rarity: "Holo Rare",
    illustrator: "Mitsuhiro Arita",
    facts: {
      widthMm: 63,
      heightMm: 88,
      weightGrams: 1.78,
      printedAt: "1999-01-09",
      variant: "Unlimited Holo",
      language: "English",
    },
    categories: [
      { slug: "illustrator", label: "Illustrator" },
      { slug: "rarity", label: "Holo Rare" },
      { slug: "era", label: "Vintage" },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1618335829737-2228915674e0?auto=format&fit=crop&w=720&q=80",
  },
  {
    id: "ygo-dark-magician-lob-005-1st-en",
    cardSlug: "dark-magician",
    printingSlug: "lob-005-1st-en",
    cardName: "Dark Magician",
    tcgSlug: "yu-gi-oh",
    setName: "Legend of Blue Eyes White Dragon",
    setCode: "LOB",
    cardNumber: "LOB-005",
    rarity: "Ultra Rare",
    illustrator: "Kazuki Takahashi Studio",
    facts: {
      widthMm: 59,
      heightMm: 86,
      weightGrams: 1.62,
      printedAt: "2002-03-08",
      variant: "1st Edition",
      language: "English",
    },
    categories: [
      { slug: "illustrator", label: "Illustrator" },
      { slug: "rarity", label: "Ultra Rare" },
      { slug: "archetype", label: "Spellcaster" },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1632507127788-43e9586a3794?auto=format&fit=crop&w=720&q=80",
  },
  {
    id: "mtg-liliana-of-the-veil-isd-105-en",
    cardSlug: "liliana-of-the-veil",
    printingSlug: "isd-105-en",
    cardName: "Liliana of the Veil",
    tcgSlug: "magic-the-gathering",
    setName: "Innistrad",
    setCode: "ISD",
    cardNumber: "105/264",
    rarity: "Mythic Rare",
    illustrator: "Seb McKinnon",
    facts: {
      widthMm: 63,
      heightMm: 88,
      weightGrams: 1.81,
      printedAt: "2011-09-30",
      variant: "Regular",
      language: "English",
    },
    categories: [
      { slug: "illustrator", label: "Illustrator" },
      { slug: "rarity", label: "Mythic Rare" },
      { slug: "color", label: "Black" },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1620912189862-9ea613c346b5?auto=format&fit=crop&w=720&q=80",
  },
  {
    id: "op-luffy-st01-001-en",
    cardSlug: "monkey-d-luffy",
    printingSlug: "st01-001-en",
    cardName: "Monkey D. Luffy",
    tcgSlug: "one-piece",
    setName: "Starter Deck: Straw Hat Crew",
    setCode: "ST01",
    cardNumber: "ST01-001",
    rarity: "Leader",
    illustrator: "Bandai Studio",
    facts: {
      widthMm: 63,
      heightMm: 88,
      weightGrams: 1.76,
      printedAt: "2022-12-02",
      variant: "Starter Deck",
      language: "English",
    },
    categories: [
      { slug: "illustrator", label: "Illustrator" },
      { slug: "crew", label: "Straw Hat" },
      { slug: "rarity", label: "Leader" },
      { slug: "set", label: "Starter" },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1626204327425-6c1f636b1969?auto=format&fit=crop&w=720&q=80",
  },
];

export function getCardBySlug(cardSlug: string, printingSlug: string) {
  return cardPrintings.find(
    (entry) => entry.cardSlug === cardSlug && entry.printingSlug === printingSlug,
  );
}

export function getCardsByTcg(tcgSlug: string) {
  return cardPrintings.filter((entry) => entry.tcgSlug === tcgSlug);
}

export function getCardsByIllustrator(slug: string) {
  return cardPrintings.filter(
    (entry) => entry.illustrator.toLowerCase().replaceAll(" ", "-") === slug,
  );
}

export function getCardsByCategory(categorySlug: string) {
  return cardPrintings.filter((entry) =>
    entry.categories.some((category) => category.slug === categorySlug),
  );
}

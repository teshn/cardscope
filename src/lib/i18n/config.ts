import { defaultLocale, locales, localeLabels } from "@/data/mock-cards";

export { defaultLocale, locales, localeLabels };

export function isLocale(value: string): value is (typeof locales)[number] {
  return locales.includes(value as (typeof locales)[number]);
}

export const messages = {
  en: {
    nav: {
      browse: "Browse",
      popularTcgs: "Popular TCGs",
      important: "Important",
      donation: "Support",
      searchPlaceholder: "Search a card, set, or illustrator",
    },
    hero: {
      kicker: "Card Authentication Toolkit",
      title: "Inspect trading cards with trustworthy details.",
      subtitle:
        "Use structured card facts, print data, and visual inspection tools to compare versions and spot suspicious offers.",
      ctaPrimary: "Start with popular TCGs",
      ctaSecondary: "View trending cards",
    },
  },
  de: {
    nav: {
      browse: "Entdecken",
      popularTcgs: "Beliebte TCGs",
      important: "Wichtig",
      donation: "Unterstuetzen",
      searchPlaceholder: "Karte, Set oder Illustrator suchen",
    },
    hero: {
      kicker: "Toolkit zur Kartenpruefung",
      title: "Pruefe Sammelkarten mit verlaesslichen Details.",
      subtitle:
        "Nutze strukturierte Kartendaten, Druckinformationen und visuelle Pruefung, um Versionen zu vergleichen und verdaechtige Angebote zu erkennen.",
      ctaPrimary: "Mit beliebten TCGs starten",
      ctaSecondary: "Trendkarten ansehen",
    },
  },
} as const;

export function getMessages(locale: (typeof locales)[number]) {
  return messages[locale];
}

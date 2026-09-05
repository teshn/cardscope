import { defaultLocale, locales } from "@/data/mock-cards";

export { defaultLocale, locales };

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
} as const;

export function getMessages(locale: (typeof locales)[number]) {
  return messages[locale];
}

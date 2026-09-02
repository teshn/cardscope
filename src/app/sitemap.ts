import type { MetadataRoute } from "next";

import { cardPrintings, illustrators, locales, siteConfig, tcgs } from "@/data/mock-cards";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const localizedHome = locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 1,
    alternates: {
      languages: {
        en: `${siteConfig.url}/en`,
        de: `${siteConfig.url}/de`,
      },
    },
  }));

  const localizedTcg = locales.flatMap((locale) =>
    tcgs.map((tcg) => ({
      url: `${siteConfig.url}/${locale}/tcg/${tcg.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );

  const localizedIllustrators = locales.flatMap((locale) =>
    illustrators.map((illustrator) => ({
      url: `${siteConfig.url}/${locale}/illustrator/${illustrator.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.65,
    })),
  );

  const localizedCategories = locales.flatMap((locale) =>
    ["illustrator", "rarity", "set", "era", "archetype", "color", "crew"].map((category) => ({
      url: `${siteConfig.url}/${locale}/category/${category}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  );

  const legalPages = locales.flatMap((locale) => [
    {
      url: `${siteConfig.url}/${locale}/legal/privacy`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.45,
    },
    {
      url: `${siteConfig.url}/${locale}/legal/cookies`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.45,
    },
  ]);

  const localizedCards = locales.flatMap((locale) =>
    cardPrintings.map((card) => ({
      url: `${siteConfig.url}/${locale}/card/${card.cardSlug}/${card.printingSlug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: [card.imageUrl],
    })),
  );

  return [
    ...localizedHome,
    ...localizedTcg,
    ...localizedIllustrators,
    ...localizedCategories,
    ...localizedCards,
    ...legalPages,
  ];
}

import type { MetadataRoute } from "next";

import { cardPrintings, illustrators, siteConfig, tcgs } from "@/data/mock-cards";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home = [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  const tcgPages = tcgs.map((tcg) => ({
    url: `${siteConfig.url}/tcg/${tcg.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const illustratorPages = illustrators.map((illustrator) => ({
    url: `${siteConfig.url}/illustrator/${illustrator.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  const categoryPages = ["illustrator", "rarity", "set", "era", "archetype", "color", "crew"].map(
    (category) => ({
      url: `${siteConfig.url}/category/${category}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }),
  );

  const legalPages = [
    {
      url: `${siteConfig.url}/legal/privacy`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.45,
    },
    {
      url: `${siteConfig.url}/legal/cookies`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.45,
    },
  ];

  const cardPages = cardPrintings.map((card) => ({
    url: `${siteConfig.url}/card/${card.cardSlug}/${card.printingSlug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
    images: [card.imageUrl],
  }));

  return [
    ...home,
    ...tcgPages,
    ...illustratorPages,
    ...categoryPages,
    ...cardPages,
    ...legalPages,
  ];
}

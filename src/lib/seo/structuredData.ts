import { siteConfig } from "@/data/mock-cards";
import type { CardPrintingSummary } from "@/types/card";

export function organizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: [
      "https://www.buymeacoffee.com/",
      "https://ko-fi.com/",
      "https://ethereum.org/",
    ],
  };
}

export function cardStructuredData(card: CardPrintingSummary) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${card.cardName} (${card.setCode} ${card.cardNumber})`,
    description: `CardScope listing for ${card.cardName} with dimensions, weight, print date, and variant details.`,
    image: [card.imageUrl],
    brand: {
      "@type": "Brand",
      name: card.tcgSlug,
    },
    category: "Trading Card",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Width (mm)",
        value: card.facts.widthMm,
      },
      {
        "@type": "PropertyValue",
        name: "Height (mm)",
        value: card.facts.heightMm,
      },
      {
        "@type": "PropertyValue",
        name: "Weight (g)",
        value: card.facts.weightGrams,
      },
      {
        "@type": "PropertyValue",
        name: "Printed At",
        value: card.facts.printedAt,
      },
      {
        "@type": "PropertyValue",
        name: "Variant",
        value: card.facts.variant,
      },
      {
        "@type": "PropertyValue",
        name: "Illustrator",
        value: card.illustrator,
      },
    ],
  };
}

export function breadcrumbStructuredData(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

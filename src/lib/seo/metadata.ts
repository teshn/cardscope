import type { Metadata } from "next";

import { siteConfig } from "@/data/mock-cards";
import type { CardPrintingSummary } from "@/types/card";

const defaultSeoKeywords = [
  "trading card verifier",
  "card authenticity checks",
  "card dimensions",
  "card print variants",
  "collectible card lookup",
  "CardScope",
];

type PageSeoOptions = {
  title?: string;
  description?: string;
  keywords?: string[];
  imageUrl?: string;
  noIndex?: boolean;
  openGraphTitle?: string;
  openGraphDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
};

function toAbsoluteUrl(pathname: string) {
  return new URL(pathname, siteConfig.url).toString();
}

export function canonicalMetadata(pathname: string): Metadata {
  const canonicalUrl = toAbsoluteUrl(pathname);

  return {
    description: siteConfig.description,
    keywords: defaultSeoKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      url: canonicalUrl,
      title: siteConfig.name,
      description: siteConfig.description,
    },
    twitter: {
      card: "summary",
      title: siteConfig.name,
      description: siteConfig.description,
    },
  };
}

export function pageMetadata(pathname: string, options: PageSeoOptions): Metadata {
  const canonicalUrl = toAbsoluteUrl(pathname);
  const description = options.description ?? siteConfig.description;
  const hasImage = Boolean(options.imageUrl);
  const shouldIndex = !options.noIndex;
  const keywords = options.keywords
    ? [...new Set([...options.keywords, ...defaultSeoKeywords])]
    : defaultSeoKeywords;
  const openGraphTitle = options.openGraphTitle ?? options.title ?? siteConfig.name;
  const openGraphDescription = options.openGraphDescription ?? description;
  const twitterTitle = options.twitterTitle ?? options.title ?? siteConfig.name;
  const twitterDescription = options.twitterDescription ?? description;

  const metadata: Metadata = {
    title: options.title,
    description,
    keywords,
    robots: shouldIndex
      ? undefined
      : {
          index: false,
          follow: false,
        },
  };

  if (shouldIndex) {
    metadata.alternates = {
      canonical: canonicalUrl,
    };
    metadata.openGraph = {
      type: "website",
      siteName: siteConfig.name,
      url: canonicalUrl,
      title: openGraphTitle,
      description: openGraphDescription,
      images: hasImage
        ? [
            {
              url: options.imageUrl!,
              width: 1200,
              height: 630,
              alt: `${openGraphTitle} preview`,
            },
          ]
        : undefined,
    };
    metadata.twitter = {
      card: hasImage ? "summary_large_image" : "summary",
      title: twitterTitle,
      description: twitterDescription,
      images: hasImage ? [options.imageUrl!] : undefined,
    };
  }

  return metadata;
}

export function cardDetailMetadata(card: CardPrintingSummary): Metadata {
  return pageMetadata(`/card/${card.cardSlug}/${card.printingSlug}`, {
    title: `${card.cardName} (${card.cardNumber})`,
    description: `Inspect ${card.cardName} (${card.cardNumber}) with dimensions, print date, variant, illustrator, and anti-counterfeit reference fields.`,
    openGraphTitle: `${card.cardName} • ${card.setCode}`,
    openGraphDescription: `CardScope detail for ${card.cardName} ${card.cardNumber}.`,
    twitterTitle: `${card.cardName} • ${card.setCode}`,
    twitterDescription: `Verify ${card.cardName} print details on CardScope.`,
    keywords: [
      card.cardName,
      card.setName,
      card.setCode,
      card.tcgSlug,
      card.illustrator,
      ...defaultSeoKeywords,
    ],
    imageUrl: toAbsoluteUrl(
      `/api/og/card?cardSlug=${card.cardSlug}&printingSlug=${card.printingSlug}`,
    ),
  });
}

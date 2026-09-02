import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";

import { CardInspector } from "@/components/card/card-inspector";
import { CardTiltCanvas } from "@/components/card/card-tilt-canvas";
import { ViewTracker } from "@/components/card/view-tracker";
import { AdSlot } from "@/components/monetization/ad-slot";
import { getCardBySlug, siteConfig } from "@/data/mock-cards";
import { isLocale } from "@/lib/i18n/config";
import { breadcrumbStructuredData, cardStructuredData } from "@/lib/seo/structuredData";

type CardDetailParams = Promise<{
  locale: string;
  cardSlug: string;
  printingSlug: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: CardDetailParams;
}) {
  const { locale, cardSlug, printingSlug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const card = getCardBySlug(cardSlug, printingSlug);
  if (!card) {
    return {};
  }

  const path = `/${locale}/card/${card.cardSlug}/${card.printingSlug}`;

  return {
    title: `${card.cardName} (${card.cardNumber})`,
    description: `Inspect ${card.cardName} with dimensions, print date, variant, illustrator, and anti-counterfeit reference fields.`,
    alternates: {
      canonical: `${siteConfig.url}${path}`,
    },
    openGraph: {
      title: `${card.cardName} • ${card.setCode}`,
      description: `CardScope detail for ${card.cardName} ${card.cardNumber}.`,
      url: `${siteConfig.url}${path}`,
      images: [
        {
          url: `${siteConfig.url}/api/og/card?cardSlug=${card.cardSlug}&printingSlug=${card.printingSlug}`,
          width: 1200,
          height: 630,
          alt: `${card.cardName} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${card.cardName} • ${card.setCode}`,
      description: `Verify ${card.cardName} print details on CardScope.`,
      images: [`${siteConfig.url}/api/og/card?cardSlug=${card.cardSlug}&printingSlug=${card.printingSlug}`],
    },
  };
}

export default async function CardDetailPage({
  params,
}: {
  params: CardDetailParams;
}) {
  const { locale, cardSlug, printingSlug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const card = getCardBySlug(cardSlug, printingSlug);
  if (!card) {
    notFound();
  }

  const productData = cardStructuredData(card);
  const breadcrumbData = breadcrumbStructuredData([
    { name: "CardScope", url: `${siteConfig.url}/${locale}` },
    { name: card.tcgSlug, url: `${siteConfig.url}/${locale}/tcg/${card.tcgSlug}` },
    {
      name: card.cardName,
      url: `${siteConfig.url}/${locale}/card/${card.cardSlug}/${card.printingSlug}`,
    },
  ]);

  return (
    <div className="space-y-6">
      <ViewTracker tcgSlug={card.tcgSlug} cardPrintingId={card.id} locale={locale} />
      <Script id="card-schema" type="application/ld+json">
        {JSON.stringify(productData)}
      </Script>
      <Script id="breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </Script>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="border-2 border-[var(--ink)] bg-[var(--paper)] p-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Card Preview</p>
          <div className="relative mt-3 aspect-[4/5] overflow-hidden border border-[var(--ink)]">
            <Image src={card.imageUrl} alt={card.cardName} fill className="object-cover" />
          </div>
        </div>

        <div className="space-y-4">
          <section className="border-2 border-[var(--ink)] bg-[var(--paper)] p-4">
            <h1 className="text-3xl font-semibold tracking-tight">{card.cardName}</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {card.setName} • {card.cardNumber} • {card.rarity}
            </p>
          </section>
          <CardInspector card={card} />
        </div>
      </section>

      <AdSlot variant="feature" label="Card Detail In-Content Ad" />

      <CardTiltCanvas imageUrl={card.imageUrl} title={card.cardName} />
    </div>
  );
}

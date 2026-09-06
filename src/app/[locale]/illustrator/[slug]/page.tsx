import { notFound } from "next/navigation";

import { IllustratorPageContent } from "@/components/illustrator/illustrator-page-content";
import { illustrators } from "@/data/mock-cards";
import { isLocale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";

type IllustratorPageParams = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: IllustratorPageParams;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const illustrator = illustrators.find((entry) => entry.slug === slug);
  if (!illustrator) {
    return {};
  }

  return pageMetadata(`/illustrator/${slug}`, {
    title: `${illustrator.name} Card Gallery`,
    description: `${illustrator.biography} Review card printings and authenticity details illustrated by ${illustrator.name}.`,
    keywords: [illustrator.name, "trading card illustrator", "card art database"],
  });
}

export default async function IllustratorPage({
  params,
}: {
  params: IllustratorPageParams;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <IllustratorPageContent slug={slug} pathPrefix={`/${locale}`} />;
}

import { notFound } from "next/navigation";

import { IllustratorPageContent } from "@/components/illustrator/illustrator-page-content";
import { isLocale } from "@/lib/i18n/config";
import { canonicalMetadata } from "@/lib/seo/metadata";

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

  return canonicalMetadata(`/illustrator/${slug}`);
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

  return <IllustratorPageContent slug={slug} />;
}

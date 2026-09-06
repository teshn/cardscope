import { HomePage } from "@/components/home/home-page";
import { isLocale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";

type LocalizedHomeParams = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: LocalizedHomeParams;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return pageMetadata("/", {
    title: "Card Detail Verification",
    description:
      "Inspect trading card dimensions, weight, print variants, illustrator details, and authenticity signals with CardScope.",
    keywords: ["trading card verification", "card lookup", "card authenticity"],
  });
}

export default async function LocalizedHome({
  params,
}: {
  params: LocalizedHomeParams;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return null;
  }

  return <HomePage locale={locale} pathPrefix={`/${locale}`} />;
}

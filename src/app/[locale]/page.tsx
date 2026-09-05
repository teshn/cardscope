import { HomePage } from "@/components/home/home-page";
import { isLocale } from "@/lib/i18n/config";
import { canonicalMetadata } from "@/lib/seo/metadata";

type LocalizedHomeParams = Promise<{ locale: string }>;

export const metadata = canonicalMetadata("/");

export default async function LocalizedHome({
  params,
}: {
  params: LocalizedHomeParams;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return null;
  }

  return <HomePage locale={locale} />;
}

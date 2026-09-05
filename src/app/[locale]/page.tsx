import { HomePage } from "@/components/home/home-page";
import { isLocale } from "@/lib/i18n/config";

type LocalizedHomeParams = Promise<{ locale: string }>;

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

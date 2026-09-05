import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { isLocale } from "@/lib/i18n/config";

type LocaleLayoutParams = Promise<{ locale: string }>;
type LocaleLayoutProps = {
  children: React.ReactNode;
  params: LocaleLayoutParams;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return <PageShell locale={locale}>{children}</PageShell>;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { isLocale, locales } from "@/lib/i18n/config";

type LocaleLayoutParams = Promise<{ locale: string }>;
type LocaleLayoutProps = {
  children: React.ReactNode;
  params: LocaleLayoutParams;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: LocaleLayoutParams;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const canonicalBase = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cardscope.example";

  return {
    alternates: {
      canonical: `${canonicalBase}/${locale}`,
      languages: {
        en: `${canonicalBase}/en`,
        de: `${canonicalBase}/de`,
      },
    },
  };
}

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

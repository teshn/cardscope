import type { Metadata } from "next";
import { headers } from "next/headers";
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

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const canonical = headerStore.get("x-public-pathname");

  if (!canonical) {
    return {};
  }

  return {
    alternates: {
      canonical,
      languages: {
        en: canonical,
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

import { notFound } from "next/navigation";

import { ImportAdminPage } from "@/components/admin/import-admin-page";
import { isLocale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";

type ImportAdminPageParams = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: ImportAdminPageParams;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  return pageMetadata(`/${locale}/admin/import`, {
    title: "Admin Import",
    description: "CardScope administrator card import controls.",
    noIndex: true,
  });
}

export default async function LocalizedImportAdminPage({
  params,
}: {
  params: ImportAdminPageParams;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return <ImportAdminPage />;
}

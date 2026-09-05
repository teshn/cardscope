import { ImportAdminPage } from "@/components/admin/import-admin-page";
import { PageShell } from "@/components/layout/page-shell";
import { defaultLocale } from "@/lib/i18n/config";
import { canonicalMetadata } from "@/lib/seo/metadata";

export const metadata = canonicalMetadata("/admin/import");

export default function PublicImportAdminPage() {
  return (
    <PageShell locale={defaultLocale}>
      <ImportAdminPage />
    </PageShell>
  );
}

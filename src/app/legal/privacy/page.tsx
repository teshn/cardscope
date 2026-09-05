import { PageShell } from "@/components/layout/page-shell";
import { defaultLocale } from "@/lib/i18n/config";
import { canonicalMetadata } from "@/lib/seo/metadata";

export const metadata = canonicalMetadata("/legal/privacy");

export default function PublicPrivacyPage() {
  return (
    <PageShell locale={defaultLocale}>
      <article className="space-y-4 border-2 border-[var(--ink)] bg-[var(--paper)] p-6">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-[var(--muted)]">
          CardScope collects minimal telemetry for page performance and card view statistics. Personal data is not sold.
        </p>
        <p className="text-sm text-[var(--muted)]">
          For ads and analytics cookies, consent is requested before activation in supported regions.
        </p>
      </article>
    </PageShell>
  );
}

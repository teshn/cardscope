import { isLocale } from "@/lib/i18n/config";
import { canonicalMetadata } from "@/lib/seo/metadata";
import { notFound } from "next/navigation";

type PrivacyPageParams = Promise<{ locale: string }>;

export const metadata = canonicalMetadata("/legal/privacy");

export default async function PrivacyPage({ params }: { params: PrivacyPageParams }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <article className="space-y-4 border-2 border-[var(--ink)] bg-[var(--paper)] p-6">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-[var(--muted)]">
        CardScope collects minimal telemetry for page performance and card view statistics. Personal data is not sold.
      </p>
      <p className="text-sm text-[var(--muted)]">
        For ads and analytics cookies, consent is requested before activation in supported regions.
      </p>
    </article>
  );
}

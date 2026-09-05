import { isLocale } from "@/lib/i18n/config";
import { canonicalMetadata } from "@/lib/seo/metadata";
import { notFound } from "next/navigation";

type CookiesPageParams = Promise<{ locale: string }>;

export const metadata = canonicalMetadata("/legal/cookies");

export default async function CookiesPage({ params }: { params: CookiesPageParams }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <article className="space-y-4 border-2 border-[var(--ink)] bg-[var(--paper)] p-6">
      <h1 className="text-3xl font-semibold tracking-tight">Cookie Policy</h1>
      <p className="text-sm text-[var(--muted)]">
        Essential cookies keep navigation stable. Optional cookies are used only after consent for analytics and ads.
      </p>
      <p className="text-sm text-[var(--muted)]">
        You can reject optional cookies in the consent banner and continue using core card lookup features.
      </p>
    </article>
  );
}

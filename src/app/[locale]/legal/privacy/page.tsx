import { isLocale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";
import { notFound } from "next/navigation";

type PrivacyPageParams = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: PrivacyPageParams;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return pageMetadata("/legal/privacy", {
    title: "Privacy Policy",
    description:
      "Learn how CardScope handles telemetry, personal data, and consent controls for analytics and advertising cookies.",
    keywords: ["CardScope privacy", "privacy policy", "telemetry"],
  });
}

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
        Ad and marketing cookies require consent before activation in supported regions. Required platform cookies and
        Vercel Speed Insights may still run for secure delivery and baseline performance telemetry.
      </p>
    </article>
  );
}

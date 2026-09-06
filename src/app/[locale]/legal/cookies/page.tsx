import { isLocale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";
import { notFound } from "next/navigation";

type CookiesPageParams = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: CookiesPageParams;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return pageMetadata("/legal/cookies", {
    title: "Cookie Policy",
    description:
      "Review required and optional cookies used by CardScope, including consent controls for analytics and advertising.",
    keywords: ["CardScope cookies", "cookie policy", "consent"],
  });
}

export default async function CookiesPage({ params }: { params: CookiesPageParams }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <article className="space-y-4 border-2 border-[var(--ink)] bg-[var(--paper)] p-6">
      <h1 className="text-3xl font-semibold tracking-tight">Cookie Policy</h1>
      <p className="text-sm text-[var(--muted)]">
        CardScope uses required cookies and storage entries to keep the site secure and functional. This includes
        mandatory Vercel platform cookies (routing/security) and Vercel Speed Insights performance measurement that is
        loaded on every page.
      </p>
      <p className="text-sm text-[var(--muted)]">
        A local dismissal cookie is also used to keep the donation popup hidden for up to 24 hours after you close it.
      </p>
      <p className="text-sm text-[var(--muted)]">
        Optional ad and marketing cookies are only enabled after consent. You can reject those optional cookies in the
        consent banner and continue using core card lookup features.
      </p>
    </article>
  );
}

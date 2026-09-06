import { PageShell } from "@/components/layout/page-shell";
import { defaultLocale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("/legal/cookies", {
  title: "Cookie Policy",
  description:
    "Review required and optional cookies used by CardScope, including consent controls for analytics and advertising.",
  keywords: ["CardScope cookies", "cookie policy", "consent"],
});

export default function PublicCookiesPage() {
  return (
    <PageShell locale={defaultLocale}>
      <article className="space-y-4 border-2 border-[var(--ink)] bg-[var(--paper)] p-6">
        <h1 className="text-3xl font-semibold tracking-tight">Cookie Policy</h1>
        <p className="text-sm text-[var(--muted)]">
          Essential cookies keep navigation stable. Optional cookies are used only after consent for analytics and ads.
        </p>
        <p className="text-sm text-[var(--muted)]">
          You can reject optional cookies in the consent banner and continue using core card lookup features.
        </p>
      </article>
    </PageShell>
  );
}

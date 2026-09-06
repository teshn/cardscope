import { PageShell } from "@/components/layout/page-shell";
import { HomePage } from "@/components/home/home-page";
import { defaultLocale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("/", {
  title: "Card Detail Verification",
  description:
    "Inspect trading card dimensions, weight, print variants, illustrator details, and authenticity signals with CardScope.",
  keywords: ["trading card verification", "card lookup", "card authenticity"],
});

export default function Home() {
  return (
    <PageShell locale={defaultLocale}>
      <HomePage locale={defaultLocale} />
    </PageShell>
  );
}

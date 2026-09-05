import { PageShell } from "@/components/layout/page-shell";
import { IllustratorPageContent } from "@/components/illustrator/illustrator-page-content";
import { defaultLocale } from "@/lib/i18n/config";
import { canonicalMetadata } from "@/lib/seo/metadata";

type PublicIllustratorPageParams = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: PublicIllustratorPageParams;
}) {
  const { slug } = await params;

  return canonicalMetadata(`/illustrator/${slug}`);
}

export default async function PublicIllustratorPage({
  params,
}: {
  params: PublicIllustratorPageParams;
}) {
  const { slug } = await params;

  return (
    <PageShell locale={defaultLocale}>
      <IllustratorPageContent slug={slug} />
    </PageShell>
  );
}

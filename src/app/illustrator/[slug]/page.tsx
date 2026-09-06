import { PageShell } from "@/components/layout/page-shell";
import { IllustratorPageContent } from "@/components/illustrator/illustrator-page-content";
import { illustrators } from "@/data/mock-cards";
import { defaultLocale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";

type PublicIllustratorPageParams = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: PublicIllustratorPageParams;
}) {
  const { slug } = await params;
  const illustrator = illustrators.find((entry) => entry.slug === slug);

  if (!illustrator) {
    return {};
  }

  return pageMetadata(`/illustrator/${slug}`, {
    title: `${illustrator.name} Card Gallery`,
    description: `${illustrator.biography} Review card printings and authenticity details illustrated by ${illustrator.name}.`,
    keywords: [illustrator.name, "trading card illustrator", "card art database"],
  });
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

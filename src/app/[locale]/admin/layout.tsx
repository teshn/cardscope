import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";

type AdminLayoutParams = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: AdminLayoutParams;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  return pageMetadata(`/${locale}/admin`, {
    title: "Admin",
    description: "CardScope administrator controls.",
    noIndex: true,
  });
}

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return children;
}

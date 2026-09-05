import { HomePage } from "@/components/home/home-page";
import { defaultLocale } from "@/lib/i18n/config";
import { canonicalMetadata } from "@/lib/seo/metadata";

export const metadata = canonicalMetadata("/");

export default function Home() {
  return <HomePage locale={defaultLocale} />;
}

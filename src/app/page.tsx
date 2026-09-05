import { HomePage } from "@/components/home/home-page";
import { defaultLocale } from "@/lib/i18n/config";

export default function Home() {
  return <HomePage locale={defaultLocale} />;
}

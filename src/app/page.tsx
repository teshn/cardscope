import LocalizedHome from "@/app/[locale]/page";

import { defaultLocale } from "@/lib/i18n/config";

export default function Home() {
  return <LocalizedHome params={Promise.resolve({ locale: defaultLocale })} />;
}

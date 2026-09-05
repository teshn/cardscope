"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { DonationPopup } from "@/components/monetization/donation-popup";
import { ConsentBanner } from "@/components/monetization/consent-banner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import type { Locale } from "@/types/card";

type PageShellProps = {
  locale: Locale;
  children: React.ReactNode;
};

export function PageShell({ locale, children }: PageShellProps) {
  const pathname = usePathname();
  const [pageViews, setPageViews] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const pageViewsKey = "cardscope_page_views";
    const lastPathKey = "cardscope_last_page_view";
    const pageViewsRaw = Number(window.sessionStorage.getItem(pageViewsKey) ?? "0");
    const currentPageViews = Number.isNaN(pageViewsRaw) ? 0 : pageViewsRaw;
    const lastPath = window.sessionStorage.getItem(lastPathKey);
    const next = lastPath === pathname ? currentPageViews : currentPageViews + 1;

    window.sessionStorage.setItem(pageViewsKey, String(next));
    window.sessionStorage.setItem(lastPathKey, pathname);

    const raf = window.requestAnimationFrame(() => {
      setPageViews(next);
    });

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-6">{children}</main>
      <Footer locale={locale} />
      <ConsentBanner />
      <DonationPopup pageViews={pageViews} />
    </div>
  );
}

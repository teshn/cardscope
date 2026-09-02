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
  const [pageViews, setPageViews] = useState(() => {
    if (typeof window === "undefined") {
      return 1;
    }

    return Number(window.sessionStorage.getItem("cardscope_page_views") ?? "0") || 1;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const key = "cardscope_page_views";
    const next = Number(window.sessionStorage.getItem(key) ?? "0") + 1;
    window.sessionStorage.setItem(key, String(next));

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

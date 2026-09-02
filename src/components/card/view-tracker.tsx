"use client";

import { useEffect } from "react";

type ViewTrackerProps = {
  tcgSlug: string;
  cardPrintingId: string;
  locale: "en" | "de";
  categorySlug?: string;
};

export function ViewTracker({
  tcgSlug,
  cardPrintingId,
  locale,
  categorySlug,
}: ViewTrackerProps) {
  useEffect(() => {
    const referrer = document.referrer;
    const referrerType = !referrer
      ? "direct"
      : referrer.includes(window.location.host)
        ? "internal"
        : referrer.includes("google") || referrer.includes("bing")
          ? "search"
          : referrer.includes("twitter") || referrer.includes("facebook") || referrer.includes("reddit")
            ? "social"
            : "unknown";

    void fetch("/api/track/view", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        tcgSlug,
        cardPrintingId,
        categorySlug,
        locale,
        referrer: referrerType,
      }),
    }).catch(() => {
      // Intentionally silent to avoid impacting page render on analytics issues.
    });
  }, [cardPrintingId, categorySlug, locale, tcgSlug]);

  return null;
}

"use client";

import Script from "next/script";
import { useEffect, useMemo, useState } from "react";

import { getConsentState, onConsentChange, type ConsentState } from "@/lib/consent/cmp";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

type AdSlotProps = {
  variant: "banner" | "feature";
  label?: string;
};

export function AdSlot({ variant, label }: AdSlotProps) {
  const [consent, setConsent] = useState<ConsentState>(() => {
    if (typeof window === "undefined") {
      return "unset";
    }
    return getConsentState();
  });

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const slotId =
    variant === "banner"
      ? process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT_ID
      : process.env.NEXT_PUBLIC_ADSENSE_FEATURE_SLOT_ID;

  const classes = variant === "banner" ? "h-24" : "h-56";

  const shouldRenderLiveAd = useMemo(() => {
    return Boolean(clientId && slotId && consent === "accepted");
  }, [clientId, consent, slotId]);

  useEffect(() => {
    return onConsentChange((nextState) => setConsent(nextState));
  }, []);

  useEffect(() => {
    if (!shouldRenderLiveAd || !window.adsbygoogle) {
      return;
    }

    try {
      window.adsbygoogle.push({});
    } catch {
      // AdSense blocks repeated pushes for unresolved slots; silent fallback is acceptable.
    }
  }, [shouldRenderLiveAd, slotId]);

  return (
    <aside
      aria-label={label ?? "Advertisement"}
      className={`relative overflow-hidden border-2 border-dashed border-[var(--ink)] bg-[var(--paper)] p-3 ${classes}`}
    >
      <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">AdSense Slot</p>
      {shouldRenderLiveAd && clientId && slotId ? (
        <>
          <Script
            id="cardscope-adsense"
            strategy="afterInteractive"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
            crossOrigin="anonymous"
          />
          <ins
            className="adsbygoogle mt-3 block h-full w-full overflow-hidden rounded-[2px] border border-[var(--ink)]/35 bg-[var(--paper-strong)]"
            style={{ display: "block" }}
            data-ad-client={clientId}
            data-ad-slot={slotId}
            data-ad-format={variant === "banner" ? "horizontal" : "rectangle"}
            data-full-width-responsive="true"
          />
        </>
      ) : (
        <div className="mt-3 h-full rounded-[2px] border border-[var(--ink)]/40 bg-[repeating-linear-gradient(45deg,#f6f2e8,#f6f2e8_8px,#efe8d8_8px,#efe8d8_16px)] p-3 text-sm text-[var(--muted)]">
          {consent === "rejected"
            ? "Ads disabled because cookie consent was rejected."
            : "Place your ad unit IDs and accept cookies to render live ads."}
        </div>
      )}
    </aside>
  );
}

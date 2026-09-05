import type { Metadata } from "next";

import { siteConfig } from "@/data/mock-cards";

export function canonicalMetadata(pathname: string): Metadata {
  return {
    alternates: {
      canonical: new URL(pathname, siteConfig.url).toString(),
    },
  };
}

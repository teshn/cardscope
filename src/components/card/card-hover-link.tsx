"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";
import { useCallback } from "react";

const prefetchedCardRoutes = new Set<string>();
const prefetchedCardImages = new Set<string>();

type NextLinkProps = ComponentProps<typeof Link>;

type CardHoverLinkProps = Omit<NextLinkProps, "href" | "children"> & {
  href: string;
  imageUrl: string;
  children: ReactNode;
};

function preloadCardImage(imageUrl: string) {
  if (typeof window === "undefined" || prefetchedCardImages.has(imageUrl)) {
    return;
  }

  const image = new window.Image();
  image.src = imageUrl;
  prefetchedCardImages.add(imageUrl);
}

export function CardHoverLink({
  href,
  imageUrl,
  onMouseEnter,
  onFocus,
  onTouchStart,
  children,
  ...props
}: CardHoverLinkProps) {
  const router = useRouter();

  const prefetchCard = useCallback(() => {
    if (!prefetchedCardRoutes.has(href)) {
      router.prefetch(href);
      prefetchedCardRoutes.add(href);
    }

    preloadCardImage(imageUrl);
  }, [href, imageUrl, router]);

  return (
    <Link
      {...props}
      href={href}
      prefetch={false}
      onMouseEnter={(event) => {
        onMouseEnter?.(event);
        prefetchCard();
      }}
      onFocus={(event) => {
        onFocus?.(event);
        prefetchCard();
      }}
      onTouchStart={(event) => {
        onTouchStart?.(event);
        prefetchCard();
      }}
    >
      {children}
    </Link>
  );
}

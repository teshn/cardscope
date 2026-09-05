import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale } from "@/lib/i18n/config";

const localePrefixes = [defaultLocale, "de"] as const;

function getLocalePrefix(pathname: string) {
  return localePrefixes.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

function stripLocalePrefix(pathname: string, locale: (typeof localePrefixes)[number]) {
  const nextPath = pathname.slice(locale.length + 1);
  return nextPath ? nextPath : "/";
}

function isMaintenanceModeEnabled() {
  const rawValue =
    process.env.MAINTENANCE_MODE ??
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE;

  if (!rawValue) {
    return false;
  }

  const normalized = rawValue
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .toLowerCase();

  return ["true", "1", "on", "yes", "enabled"].includes(normalized);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isMaintenanceModeEnabled()) {
    if (pathname === "/maintenance") {
      return NextResponse.next();
    }

    if (pathname.startsWith("/_next") || pathname.includes(".")) {
      return NextResponse.next();
    }

    const maintenanceUrl = request.nextUrl.clone();
    maintenanceUrl.pathname = "/maintenance";
    maintenanceUrl.search = "";
    return NextResponse.redirect(maintenanceUrl);
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const locale = getLocalePrefix(pathname);

  if (locale) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = stripLocalePrefix(pathname, locale);
    return NextResponse.redirect(redirectUrl);
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;

  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

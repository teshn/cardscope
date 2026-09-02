import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale, locales } from "@/lib/i18n/config";

function hasLocale(pathname: string) {
  return locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
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
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (!hasLocale(pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

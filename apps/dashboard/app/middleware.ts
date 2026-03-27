import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

  const isProtectedPage =
    pathname.startsWith("/overview") || pathname.startsWith("/realtime");

  const hasRefreshToken = req.cookies.get("refreshToken");

  if (!hasRefreshToken && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (hasRefreshToken && isAuthPage) {
    return NextResponse.redirect(new URL("/overview", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/overview", "/realtime", "/login", "/register"],
};

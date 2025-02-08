import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { handleTokenRefresh } from "./app/utils/handleTokenRefresh";

export const myAxios = axios.create({
  baseURL: process.env.NEXT_BASE_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPath = ["/login", "/register"];
  const protectedPaths = [
    "/book/stays/",
    "/account-settings",
    "/notifications",
    "/wishlists",
    "/trips",
    "/guest/inbox",
  ];

  const isPublicPath = publicPath.includes(path);
  const isProtectedPath = protectedPaths.includes(path);

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // 🌟 1. If user has NO access token but has refresh token → Refresh it
  if (!accessToken && refreshToken) {
    try {
      const response = await handleTokenRefresh(refreshToken);
      if (response.status === 200) {
        return NextResponse.next();
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 🌟 2. If user has access token but it's expired or almost expired → Refresh it

  if (accessToken && !isPublicPath) {
    try {
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp && decodedToken.exp < currentTime - 1000) {
        if (refreshToken) {
          const response = await handleTokenRefresh(refreshToken);
          if (response.status === 200) {
            return NextResponse.next();
          }
          return NextResponse.redirect(new URL("/login", request.url));
        }
      } else {
        return NextResponse.next();
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 🌟 3. If user tries to access a **protected path** without being logged in → Redirect to login
  if (isProtectedPath && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🌟 4. If logged-in user tries to access `/login` or `/register` → Redirect to `/account-settings`
  if (isPublicPath && accessToken) {
    return NextResponse.redirect(new URL("/account-settings", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

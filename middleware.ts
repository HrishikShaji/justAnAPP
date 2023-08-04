import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_JWT_SECRET,
  });

  if (token) {
  }

  if (!token && pathname.startsWith("/post")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (!token) {
    switch (pathname) {
      case "/":
        return NextResponse.redirect(new URL("/auth", request.url));
      case "/create":
        return NextResponse.redirect(new URL("/auth", request.url));
      case "/friends":
        return NextResponse.redirect(new URL("/auth", request.url));
      case "/apps":
        return NextResponse.redirect(new URL("/auth", request.url));
      case "/profile":
        return NextResponse.redirect(new URL("/auth", request.url));

      default:
        break;
    }
  }
  if (pathname === "/create" && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

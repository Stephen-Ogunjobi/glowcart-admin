import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const isAdminCookie = req.cookies.get("isAdmin");
  const isAuthenticated = isAdminCookie?.value === "true";

  const protectedRoutes = [
    "/admin/home",
    "/admin/products",
    "/admin/orders",
    "/admin/users",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Allow access to login page for logout functionality
  // Only redirect authenticated users from login if they're not logging out

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

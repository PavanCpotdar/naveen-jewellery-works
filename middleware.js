import { NextResponse } from "next/server";
export function middleware(req) {
    const { pathname } = req.nextUrl;
    if (pathname.startsWith("/_next") || pathname.startsWith("/static") || pathname === "/favicon.ico") return NextResponse.next();
    if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) return NextResponse.next();
    if (pathname === "/api/admin/login" || pathname === "/api/admin/logout") return NextResponse.next();

    const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
    const isAdminApi = pathname.startsWith("/api/admin");
    if (!isAdminRoute && !isAdminApi) return NextResponse.next();

    const raw = (req.cookies.get?.("admin_token") ?? req.cookies.get("admin_token")) ?? null;
    const token = raw && typeof raw === "object" && "value" in raw ? raw.value : raw;
    const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

    console.log("token", token)
    console.log("ADMIN_TOKEN", ADMIN_TOKEN)

    if (token && (!ADMIN_TOKEN || token === ADMIN_TOKEN)) return NextResponse.next();

    if (isAdminApi) return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "content-type": "application/json" } });

    const loginUrl = new URL("/admin/login", req.nextUrl.origin);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
}
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };

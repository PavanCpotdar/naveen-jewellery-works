import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ ok: true });
    // clear cookie
    res.headers.set("Set-Cookie", "admin_token=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT");
    return res;
}

// app/api/admin/products/route.js
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// normalize token helper
function getTokenFromReq(req) {
    const raw = (req.cookies.get?.("admin_token") ?? req.cookies.get("admin_token")) ?? null;
    return raw && typeof raw === "object" && "value" in raw ? raw.value : raw;
}

export async function POST(req) {
    // verify cookie token
    const token = getTokenFromReq(req);
    if (!token || (process.env.ADMIN_TOKEN && token !== process.env.ADMIN_TOKEN)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // parse JSON body (POST should have a JSON body)
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

    const doc = {
        name: body.name || "Untitled",
        price: Number(body.price || 0),
        category: body.category || "",
        description: body.description || "",
        image: body.image || "",
        stock: Number(body.stock || 0),
        createdAt: new Date()
    };

    try {
        const db = await getDb();
        const r = await db.collection("products").insertOne(doc);
        doc._id = r.insertedId;
        return NextResponse.json({ product: doc });
    } catch (err) {
        console.error("Insert product error", err);
        return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    }
}

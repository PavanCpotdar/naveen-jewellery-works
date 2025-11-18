// app/api/products/route.js
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
    try {
        const db = await getDb();
        const docs = await db
            .collection("products")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({ products: docs });
    } catch (err) {
        console.error("Products GET error:", err);
        return NextResponse.json({ products: [] }, { status: 500 });
    }
}

// app/api/auth/user/[uid]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";
import type { CollectionInfo } from "mongodb";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ uid: string }> }
) {
  try {
    const { uid } = await context.params; // এখানে await লাগবে
    console.log("🔎 API /auth/user hit with uid =", uid);

    const db = await getDB();
    console.log("📦 Using DB name:", db.databaseName);

    const collections = await db.listCollections().toArray();
    console.log(
      "📚 Collections in DB:",
      collections.map((c: CollectionInfo) => c.name)
    );

    const user = await db.collection("users").findOne({ uid });
    console.log("📄 findOne result:", user);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      uid: user.uid,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("GET /api/auth/user error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

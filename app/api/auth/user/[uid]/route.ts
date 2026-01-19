// app/api/auth/user/[uid]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";

export async function GET(
  _req: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const db = await getDB();
    const user = await db.collection("users").findOne({ uid: params.uid });

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

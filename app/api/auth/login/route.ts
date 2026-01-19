// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { uid } = await request.json();

    const response = NextResponse.json({ success: true });

    response.cookies.set("auth-token", uid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login cookie set failed", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

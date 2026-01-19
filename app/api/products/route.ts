import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = String(formData.get("name"));
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const category = String(formData.get("category"));
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);

    const imagePath = `/uploads/${fileName}`;

    const db = await getDB();
    const result = await db.collection("products").insertOne({
      name,
      price,
      stock,
      category,
      image: imagePath,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        id: String(result.insertedId),
        name,
        price,
        stock,
        category,
        image: imagePath,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Product create error:", err);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

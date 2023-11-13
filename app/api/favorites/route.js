import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();

  const { postId, authorId } = body;

  const existingFavorite = await query({
    query: "SELECT * FROM favorites WHERE postId = ? AND authorId = ?",
    values: [postId, authorId],
  });

  if (existingFavorite.length > 0) {
    await query({
      query: "DELETE FROM favorites WHERE postId = ? AND authorId = ?",
      values: [postId, authorId],
    });

    return NextResponse.json(
      { message: "Favorite removed", favorite: false },
      { status: 200 }
    );
  } else {
    const result = await query({
      query: "INSERT INTO favorites (postId, authorId) VALUES (?, ?)",
      values: [postId, authorId],
    });

    return NextResponse.json({ ...result, favorite: true }, { status: 200 });
  }
}

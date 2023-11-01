import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();

  const { postId, authorId, isFav } = body;

  const result = await query({
    query: "INSERT INTO favorites (postId, authorId, isFav) VALUES (?, ?, ?)",
    values: [postId, authorId, isFav],
  });

  return NextResponse.json(result, { status: 200 });
}

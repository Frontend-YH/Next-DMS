import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();

  const { postId, authorId } = body;

  const result = await query({
    query: "INSERT INTO favorites (postId, authorId) VALUES (?, ?)",
    values: [postId, authorId],
  });

  return NextResponse.json(result, { status: 200 });
}

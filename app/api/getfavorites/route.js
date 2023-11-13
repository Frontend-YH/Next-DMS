import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { userId } = await req.json();

  const result = await query({
    query: "SELECT * FROM favorites WHERE authorId = ?",
    values: [userId],
  });

  return NextResponse.json(result, { status: 200 });
}

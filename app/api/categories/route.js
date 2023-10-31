import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {

    const result = await query({ 
        query: "SELECT p.pid, p.title, p.content,p.lastUpdated, p.isDeleted, c.cName FROM posts p JOIN categories c ON p.categoryId = c.categoryId WHERE p.isDeleted = 0"
    })
    return NextResponse.json(result, {status: 200});
    
} 
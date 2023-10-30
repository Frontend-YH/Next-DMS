import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {

    const result = await query({ 
        query: "SELECT * FROM posts WHERE deleted=0"
    })
    return NextResponse.json(result, {status: 200});
    
} 


export async function POST(req, res) {

    const body = await req.json();

    const {title, content} = body;

    const result = await query({ 
        query: "INSERT INTO posts (title, content) VALUES (?, ?)",
        values: [title, content]
    });

    return NextResponse.json(result, {status: 200});

} 
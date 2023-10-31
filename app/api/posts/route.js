import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {

    const result = await query({ 
        query: "SELECT posts.*, authors.* FROM posts JOIN authors ON posts.authorId = authors.authorId WHERE posts.isDeleted = 0" // isDeleted=0
    })
    


    return NextResponse.json(result, {status: 200});
    
} 


export async function POST(req, res) {

    const body = await req.json();

    const {title, content} = body;

    const result = await query({ 
        query: "INSERT INTO posts (title, content, authorId, categoryId, isPublic) VALUES (?, ?, ?, ?, ?)",
        values: [title, content, 1, 1, 1]
    });

    return NextResponse.json(result, {status: 200});

} 
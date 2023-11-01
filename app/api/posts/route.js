import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {

    const result = await query({ 
        //query: "SELECT posts.*, authors.* FROM posts JOIN authors ON posts.authorId = authors.authorId WHERE posts.isDeleted = 0"
        query: "SELECT posts.*, authors.*, categories.* FROM posts JOIN authors ON posts.authorId = authors.authorId JOIN categories ON posts.categoryId = categories.categoryId WHERE posts.isDeleted = 0"
    })
    


    return NextResponse.json(result, {status: 200});
    
} 


export async function POST(req, res) {

    const body = await req.json();

    const {title, content, categoryId, isPublic} = body;

    const result = await query({ 
        query: "INSERT INTO posts (title, content, authorId, categoryId, isPublic) VALUES (?, ?, ?, ?, ?)",
        values: [title, content, 1, categoryId, isPublic]
    });

    
    return NextResponse.json(result, {status: 200});

} 
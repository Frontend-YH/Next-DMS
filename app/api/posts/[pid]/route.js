import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {

    const {pid} = params;

    const result = await query({ 
        query: "SELECT * FROM posts WHERE pid=" + parseInt(pid)
    })
    return NextResponse.json(result, {status: 200});

} 

export async function PATCH(req, {params}) {
    const { pid } = params;
    const body = await req.json();

    const { title, content, authorId, categoryId, isPublic, lastUpdated } = body;

    const result = await query({ 
        query: "UPDATE posts SET title=?, content=?, authorId=?, categoryId=?, isPublic=?, lastUpdated=? WHERE pid = ?",
        values: [title, content, authorId, categoryId, isPublic, lastUpdated, parseInt(pid)]
    }).catch(err => console.error(err));

    return NextResponse.json(result, {status: 200});
}  

export async function DELETE(req, {params}) {

    const { pid } = params;

    const isDeleted = 1;
    
    const result = await query({ 
        query: "UPDATE posts SET isDeleted=? WHERE pid = ?",
        values: [isDeleted, parseInt(pid)]
    }).catch(err => console.error(err));
    
    return NextResponse.json(result, {status: 200});
    }
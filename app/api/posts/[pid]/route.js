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

    const {pid} = params;
    const body = await req.json();

    const {title, content} = body;

    const result = await query({ 
        query: "UPDATE posts SET title=?, content=? WHERE pid = ?",
        values: [title, content, parseInt(pid)]
    })

    return NextResponse.json(result, {status: 200});
    
} 

export async function DELETE(req, {params}) {

    const {pid} = params;

    // HARD DELETE (default)
    const result = await query({ 
        query: "DELETE FROM posts WHERE pid=?",
        values: [parseInt(pid)]
    })

   /* // SOFT DELETE om vi föredrar det
      // T ex om vi vill ha en Papperskorg man kan tömma eller återställa DELETES från
    const result = await query({ 
        query: "UPDATE posts SET deleted=? WHERE pid = ?",
        values: [1, parseInt(pid)]
    })
    */

    return NextResponse.json(result, {status: 200});
    
} 
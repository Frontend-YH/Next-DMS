import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {

    const result = await query({ 
        query: "SELECT * FROM categories"
    })
    
    return NextResponse.json(result, {status: 200});
    
} 


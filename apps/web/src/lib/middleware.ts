import type { NextRequest } from "next/server"; 
import { NextResponse } from "next/server";

export function middleware(req: NextRequest): NextResponse {
    const res = NextResponse.next();

    const cookie = req.cookies.get("sessionId")

    if (!cookie) {
        res.cookies.set("sessionId", crypto.randomUUID())
    }

    return res
}
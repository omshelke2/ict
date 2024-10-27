import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const username = request.cookies.get("username");

    if (!username) {
        return NextResponse.json({ error: "Username cookie not found." }, { status: 404 });
    }

    return NextResponse.json({ username });
}
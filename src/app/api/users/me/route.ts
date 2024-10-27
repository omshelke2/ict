import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';

// Define the DecodedToken interface inline
interface DecodedToken {
    id: string; // or the actual type if it's different
    // Add other properties that are part of your token if needed
}

connect();

export async function POST(request: NextRequest) {
    try {
        // Extract data from token Data
        const currentUser = await getDataFromToken(request) as DecodedToken | null;

        // Check if currentUser is null
        if (!currentUser) {
            return NextResponse.json({ error: "Invalid token or user not found." }, { status: 400 });
        }

        // Now we can safely access currentUser.id
        const userId = currentUser.id; // This will be safe now
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Return user data
        return NextResponse.json({
            message: "User Found",
            data: user,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
        }
    }
}

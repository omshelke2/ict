import { connect } from '@/dbConfig/dbConfig';
import Lead from '@/models/leadModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, emailId, message, status } = reqBody;

        // Validation
        console.log(reqBody);

        const newLead = new Lead({
            name,
            emailId,
            message,
            status,
        });

        const savedLead = await newLead.save();

        console.log(savedLead);

        // Send verification mail (if needed)

        return NextResponse.json({
            message: "Feedback registered successfully.",
            success: true,
            savedLead,
        });
    } catch (error: unknown) {
        // Handle error with proper type checking
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
        }
    }
}

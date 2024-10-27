import { connect } from '@/dbConfig/dbConfig';
import Feedback from "@/models/feedbackModel";
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { feedback, feedbackType } = reqBody;

        // Validation
        console.log(reqBody);

        const newFeedback = new Feedback({
            feedback,
            feedbackType,
        });

        const savedFeedback = await newFeedback.save();

        console.log(savedFeedback);

        // Send verification mail (if needed)

        return NextResponse.json({
            message: "Feedback registered successfully.",
            success: true,
            savedFeedback,
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

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request:NextRequest){

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

        const model = genAI.getGenerativeModel({model:"gemini-pro"})

        const data = await request.json()
        const {prompt} = data

        const result = await model.generateContent(prompt)

        const response = await result.response

        const output = await response.text()

        return NextResponse.json({
            message:"Response sent successfully",
            success:true,
            output
            })

    } catch (error: unknown) {
        // Handle error with proper type checking
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
        }
    }

}
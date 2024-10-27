import {connect} from '@/dbConfig/dbConfig'

import { NextResponse } from 'next/server'






connect();

export async function POST(){
    try {
        
        const response = NextResponse.json({
            message:"Logged out successfully.",
            success:true
                },
            {status:200}
        )

        response.cookies.set("token","",
            {httpOnly:true, 
             expires : new Date(0)
            }
        )
        response.cookies.set("username","",
            {httpOnly:true, 
             expires : new Date(0)
            }
        )

        return response

        




    } catch (error: unknown) {
        // Handle error with proper type checking
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
        }
    }
}
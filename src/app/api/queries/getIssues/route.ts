import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/issueModel'
import { NextRequest,NextResponse } from 'next/server'



connect();

export async function POST(request:NextRequest){
    
    const reqBody = await request.json()
    const {username} = reqBody
    
    try {
       
        

        

       const issues = await User.find({username:username})

       if (!issues) {
        return NextResponse.json({error:"Issues does not exist."},
            {status:400}
        )
        
       }

       console.log("Issues Exists");

       

       

       

       

       return NextResponse.json({
        message:"Issue registered successfully.",
        success:true,
        issues
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
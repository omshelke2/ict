import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/issueModel'
import { NextResponse } from 'next/server'



connect();

export async function POST(){
    
    
    
    try {
       
        

        

       const issues = await User.find({})

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
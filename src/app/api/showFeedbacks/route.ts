import {connect} from '@/dbConfig/dbConfig'
import Feedback from '@/models/feedbackModel'
import { NextResponse } from 'next/server'



connect();

export async function GET(){
    
    
    
    try {
       
        

        

       const feedbacks = await Feedback.find({})

       if (!feedbacks) {
        return NextResponse.json({error:"Issues does not exist."},
            {status:400}
        )
        
       }

       console.log("Feedbacks Exists");

       

       

       

       

       return NextResponse.json({
        message:"Issue registered successfully.",
        success:true,
        feedbacks
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
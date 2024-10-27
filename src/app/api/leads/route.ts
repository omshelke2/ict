import {connect} from '@/dbConfig/dbConfig'
import Lead from '@/models/leadModel'
import { NextResponse } from 'next/server'



connect();

export async function GET(){
    
    
    
    try {
       
        

        

       const leads = await Lead.find({})

       if (!leads) {
        return NextResponse.json({error:"Leads does not exist."},
            {status:400}
        )
        
       }

       console.log("Leads Exists");

       

       

       

       

       return NextResponse.json({
        message:"Leads fetched successfully.",
        success:true,
        leads
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
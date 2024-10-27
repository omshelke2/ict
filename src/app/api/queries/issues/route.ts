import {connect} from '@/dbConfig/dbConfig'
import Issue from '@/models/issueModel';

import { NextRequest,NextResponse } from 'next/server'



connect();

export async function POST(request:NextRequest,){
    try {
        const reqBody = await request.json();
        const {issue,status,username} = reqBody;
        //validation
        console.log(reqBody);
        
       

        const newIssue = new Issue({
            issue,
            status,
            username
        })

        const savedUser =await newIssue.save();

        console.log(savedUser);

        //send verification mail
       

       return NextResponse.json({
        message:"Issue registered successfully.",
        success:true,
        savedUser
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
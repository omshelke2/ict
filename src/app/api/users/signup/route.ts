import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'

import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer';


connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {username,email,password} = reqBody;
        //validation
        console.log(reqBody);
        
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User already Exists."},{status:400})
        }

        const salt = await bcryptjs.genSaltSync(10); 
        const hashedPassword = await bcryptjs.hashSync(password,salt);

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser =await newUser.save();

        console.log(savedUser);

        //send verification mail
       await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

       return NextResponse.json({
        message:"User registered successfully.",
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
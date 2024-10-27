import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'

import bcryptjs from 'bcryptjs'


import jwt from "jsonwebtoken"


connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody

        console.log(reqBody)

       const user = await User.findOne({email});

       if (!user) {
        return NextResponse.json({error:"User does not exist."},
            {status:400}
        )
        
       }

       console.log("User Exists");

       const validPassword = await bcryptjs.compare(password,user.password)
       console.log("Password is Valid.");

       if (!validPassword) {
        return NextResponse.json({error:"Check your Password."},
            {status:400}
        )
       }

       const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
       }

       const token =await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{ expiresIn: '1d' })

      const response = NextResponse.json({
        message:"Logged in Successfully.",
        success:true

       })

       response.cookies.set("token",token,{
        httpOnly:true
       })

       response.cookies.set("username", user.username, {
        httpOnly: true // Optional: set to true if you want to restrict access to the cookie from JavaScript
    });

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
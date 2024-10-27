import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'




connect();

export async function POST(request:NextRequest){
   try {
    const reqBody = await request.json();
    const {token} = reqBody;
    console.log(token);

    const user = await User.findOne({verifyToken:token,
        verifyTokenExpiry:{$gt: Date.now()}}
    )
    if(!user){
        return NextResponse.json({error: "Invalid Token !"},
            {status: 400} )
    }

    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({error: "Email verified successfully",
        success:true
        },
        {status: 200},

    )



   } catch (error: unknown) {
    // Handle error with proper type checking
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}
}
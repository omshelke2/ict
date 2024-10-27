import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';



// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/feedback' || path === '/adminLogin' || path === '/addLead' || path === '/products';
    const token = request.cookies.get('token')?.value || '';


    

    // If the user is authenticated and trying to access a public path, redirect to userTickets
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/userTickets', request.url));
    }

    // If the user is not authenticated and trying to access a protected route, redirect to login
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Allow the request to continue if all checks pass
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/adminDashboard',
        '/login',
        '/signup',
        '/verifyemail',
        '/userTickets',
        '/profile',
    ],
};












// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { getDataFromToken } from './helpers/getDataFromToken'

// import  jwt  from 'jsonwebtoken'
// import axios from 'axios'


 
// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
    

//   // const getUsernameResponse = await axios.post("/api/users/me")
//   // const isAdmin = getUsernameResponse.data.data.isAdmin


//     const path = request.nextUrl.pathname

//     const isPublicPath = path==="/login" || path==="/signup" ||path==="/verifyemail"
    
//     const token = request.cookies.get("token")?.value || ""

//     let decodedToken;
//     try {
//         decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
//         const isAdmin = decodedToken.isAdmin
//     } catch (error) {
//         console.error('Token verification failed:', error);
//         // Optionally, redirect to login if the token is invalid
//         if (!isPublicPath) {
//             return NextResponse.redirect(new URL('/login', request.url));
//         }
//     }

//     // const decodedToken:any = Jwt.verify(token, process.env.TOKEN_SECRET!)
    
//   //   const decodedToken = await getDataFromToken(request)
//   //   const userId = decodedToken.id
//   //   const user = await User.findOne({_id:userId}).select("-password")
//     // const isAdmin = decodedToken.isAdmin


//   //   if(isPublicPath && token && isAdmin){
//   //     return NextResponse.redirect(new URL('/adminDashboard', request.url))
//   // }



//     if(isPublicPath && token){
//         return NextResponse.redirect(new URL('/userTickets', request.url))
//     }

//     if(!isPublicPath && !token){
//         return NextResponse.redirect(new URL('/login', request.url))
//     }



// //   return NextResponse.redirect(new URL('/', request.url))
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//      // Apply middleware to all API routes
//     '/adminDashboard',
//     '/login',
//     '/signup',
//     '/verifyemail',
//     '/userTickets', // Apply middleware to all routes under /userTickets
//     '/profile'
//   ]
// }
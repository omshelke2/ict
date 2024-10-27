import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Define an interface for the decoded token
interface DecodedToken {
    userId: string; // Adjust the properties according to your token structure
    // Add other properties if needed
}

export const getDataFromToken = (request: NextRequest): DecodedToken | null => {
    try {
        const token = request.cookies.get("token")?.value || "";

        // Verify the token and specify the type of the decoded token
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;

        return decodedToken;
    } catch (error: unknown) {
        // Handle the error appropriately
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred.");
        }
    }
};
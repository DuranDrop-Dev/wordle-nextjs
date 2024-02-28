import { NextResponse } from "next/server";
import { dbConnect } from "../../../utils/MongoDB";
import UserDB from "../../../utils/User";

export async function GET(request: Request, { params }: { params: { userUID: string } }) {
    try {
        // Establishing database connection
        await dbConnect();

        // Finding admin data based on email and userUID
        const adminData = await UserDB.find(
            { userUID: params.userUID },
            { _id: 0, __v: 0, email: 0, userUID: 0 }
        );

        // Check if the blog post exists
        if (!adminData) {
            // If the blog post does not exist, return a 404 Not Found response
            return new Response('Admin data not found', { status: 404 });
        }

        // Returning admin data as response
        return NextResponse.json(adminData);
    } catch (error) {
        // Logging error and returning error response
        console.error('Error fetching admin data: ', error);
        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}
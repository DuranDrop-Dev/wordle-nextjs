import { NextResponse } from "next/server";
import { dbConnect } from "../../../utils/MongoDB";
import UserDB from "../../../utils/User";

export async function GET(request: Request, { params }: { params: { userUID: string } }) {
    try {
        // Establishing database connection
        await dbConnect();

        // Ensure you have an index on the 'userUID' field for optimal performance
        const adminData = await UserDB.find(
            {userUID: params.userUID},
            { _id: 0, __v: 0, email: 0, userID: 0, dateCreated: 0, totalWins: 0, totalLosses: 0, userUID: 0 }
        );

        if (adminData) {
            // Admin data found
            return NextResponse.json(adminData);
        } else {
            // Admin data not found
            return NextResponse.json("Admin data not found for user!");
        }
    } catch (error) {
        // Logging error and returning error response
        console.error('Error fetching admin data: ', error);
        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}
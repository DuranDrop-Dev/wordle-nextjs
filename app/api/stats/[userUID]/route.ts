import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "../../../utils/MongoDB";
import { PutRequest } from "../../../utils/Types";
import GamesDB from "../../../utils/Games";

export async function GET(request: Request, { params }: { params: { userUID: string } }) {
    try {
        // Establishing database connection
        await dbConnect();

        // Finding admin data based on email and userUID
        const statsData = await GamesDB.find(
            { userID: params.userUID },
            { _id: 0, __v: 0, email: 0, userID: 0, admin: 0 }
        );

        // Check if the blog post exists
        if (!statsData) {
            // If the blog post does not exist, return a 404 Not Found response
            return new Response('Stats data not found', { status: 404 });
        }

        // Returning admin data as response
        return NextResponse.json(statsData);
    } catch (error) {
        // Logging error and returning error response
        console.error('Error fetching stats data: ', error);
        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}

export async function PUT(nextReq: NextRequest, { params }: { params: { userUID: string } }) {
    try {
        // Establishing database connection
        await dbConnect();

        // Parse request body
        const bodyText = await nextReq.text();

        if (!bodyText) {
            return NextResponse.json({
                success: false,
                error: 'Request body is missing'
            }, { status: 400 });
        }

        let body: PutRequest;

        try {
            body = JSON.parse(bodyText);
        } catch (error) {
            console.error('Error parsing request body:', error);
            return NextResponse.json({
                success: false,
                error: 'Invalid request body format'
            }, { status: 400 });
        }

        const totalGames = body?.body.totalGames ?? 0;
        const totalWins = body?.body?.totalWins ?? 0;
        const totalLosses = body?.body?.totalLosses ?? 0;

        // Update the user stats in the database
        const result = await GamesDB.updateOne({ userID: params.userUID }, { $set: { totalGames: totalGames, totalWins: totalWins, totalLosses: totalLosses } });

        console.log("Result: ", result);

        return NextResponse.json(`Result: ${JSON.stringify(body.body)}`, {
            status: 200
        });
    } catch (error) {
        // Logging error and returning error response
        console.error('Error fetching stats data: ', error);
        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}
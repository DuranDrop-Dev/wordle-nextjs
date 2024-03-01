import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "../../../utils/MongoDB";
import { PutRequest, PostRequest } from "../../../utils/Types";
import UserDB from "../../../utils/User";

export async function GET(request: Request, { params }: { params: { userUID: string } }) {
    try {
        // Establishing database connection
        await dbConnect();

        // Finding admin data based on userUID
        const statsData = await UserDB.findOne({ userUID: params.userUID }, { _id: 0, __v: 0, email:0, userID: 0, dateCreated: 0, admin:0, userUID: 0});

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

        const totalWins = body?.body?.totalWins ?? 0;
        const totalLosses = body?.body?.totalLosses ?? 0;

        // Update the user stats in the database
        const result = await UserDB.updateOne({ userUID: params.userUID }, { $set: { totalWins: totalWins, totalLosses: totalLosses } });

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

export async function POST(nextReq: NextRequest, { params }: { params: { userUID: string } }) {
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

        let body: PostRequest;

        try {
            body = JSON.parse(bodyText);
        } catch (error) {
            console.error('Error parsing request body:', error);
            return NextResponse.json({
                success: false,
                error: 'Invalid request body format'
            }, { status: 400 });
        }

        // Check if the user already exists
        const currentUser = await UserDB.findOne({ userID: params.userUID });

        if (currentUser) {
            // If user exists, cancel the operation without sending back a response
            return NextResponse.json("Welcome back!", {
                status: 200
            });
        }

        // Create a new user in the database
        await UserDB.create({ 
            userUID: params.userUID.toString(), 
            email: body.email.toString(), 
            dateCreated: new Date(), 
            admin: false, 
            totalWins: 0, 
            totalLosses: 0 
        });

        // Returning user data as response
        return NextResponse.json(`New user created!`, {
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
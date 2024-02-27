import axios from "axios";
import { NextResponse } from "next/server";

export type UserRequestBody = {
    _id: string;
    email: string;
    userUID: string;
    admin: boolean;
}

export const getMongoAdmin = async ({ userUID }: UserRequestBody) => {
    try {
        const response = await fetch(`/api/user/${userUID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: UserRequestBody[] = await response.json();

        const isAdmin: boolean = data[0].admin;

        return isAdmin;
    } catch (error) {
        console.error('Error fetching admin data: ', error);
        return false;
    }
}

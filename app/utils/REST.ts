import { PostRequest, UserBody, UserPayload, UserRequestBody } from "./Types";

export const getMongoAdmin = async ({ userUID }: UserBody) => {
    try {
        const response = await fetch(`/api/admin/${userUID}`, {
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

export const getStats = async ({ userUID }: UserBody) => {
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

        const data: [UserPayload] = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching stats data: ', error);
        return false;
    }
}

export const putStats = async ({ userUID }: UserBody, newStats: UserPayload, oldStats: UserPayload) => {
    try {
        const mergedStats: { [key: string]: number } = {};

        Object.keys(oldStats).forEach(key => {
            mergedStats[key] = oldStats[key] + newStats[key];
        });

        const requestData = {
            body: mergedStats
        };

        const response = await fetch(`/api/user/${userUID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const results = await response.json();

        alert(results);
    } catch (error) {
        console.error('Error putting stats: ', error);
    }
}

export const createNewStats = async ({ userID, email }: PostRequest) => {
    try {
        const response = await fetch(`/api/user/${userID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const results = await response.json();

        alert(results);
    } catch (error) {
        console.error('Error putting stats: ', error);
    }
}
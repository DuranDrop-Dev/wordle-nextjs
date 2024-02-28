import axios from "axios";
import { UserPayload } from "./Types";

/**
 * Check if the user exists in the database.
 * 
 * @param {string} email - The user's email address.
 * @returns {Promise<object>} - The response data from the API.
 */
export const checkIfUser = async (email: string): Promise<object> => {
    try {
        // Define the API URL
        const url = 'https://wordle.durandrop.com/api/user.php';
        // const url = 'http://localhost:3000/private/WordleAPI/user.php';

        // Send a GET request to the API
        const response = await axios.get(url, {
            params: {
                email: email
            }
        });

        // Get the results from the response
        const results = response.data;

        // Return the results
        return results;
    } catch (error) {
        // Log any errors that occur
        console.log(error);
        return { error: error };
    }
}


/**
 * Update the user stats in the database.
 * 
 * @param {string} email - The user's email address.
 * @param {object} payload - The user payload.
 */
export const updateUserStats = async (email: string, payload: UserPayload) => {
    try {
        // Define the API URL
        const url = 'https://wordle.durandrop.com/api/stats.php';
        // const url = 'http://localhost:3000/private/WordleAPI/stats.php';

        // Define the games, wins, and losses
        const games = payload.totalGames;
        const wins = payload.totalWins;
        const losses = payload.totalLosses;

        const packedPayload = {
            email: email,
            games: games,
            wins: wins,
            losses: losses
        }

        // Send a PUT request to the API
        const response = await axios.put(url, packedPayload);

        // Get the results from the response
        const results = response.data;

        // Log the results
        if (results) {
            console.log('updateUserStats:', results);
        }

        // Log a message if no data is returned
        if (!results) {
            console.log("updateUserStats: No data");
        }
    } catch (error) {
        // Log any errors that occur
        console.log(error);
    }
}
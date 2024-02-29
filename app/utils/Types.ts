type CellData = { 
    value: string; 
    green: boolean; 
    yellow: boolean 
}

export type InputValues = Record<string, CellData>;

export type InputValue = {
    value: string;
    green: boolean;
    yellow: boolean;
}

export type Word = string;

export type UserRequestBody = {
    _id: string;
    email: string;
    userUID: string;
    admin: boolean;
    totalGames?: number;
    totalWins?: number;
    totalLosses?: number;
}

export type PutRequest = {
    totalGames: number;
    totalWins: number;
    totalLosses: number;
    body: MergedStats;
}

export type MergedStats = {
    totalGames: number;
    totalWins: number;
    totalLosses: number;
}
export type UserBody = {
    userUID: string;
}

export type UserPayload = {
    [key: string]: number;
    totalGames: number;
    totalWins: number;
    totalLosses: number;
}

export type PostRequest = {
    userID: string;
}
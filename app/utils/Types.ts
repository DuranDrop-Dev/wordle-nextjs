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
}
export type UserBody = {
    userUID: string;
}

export type UserPayload = {
    totalGames: number;
    totalWins: number;
    totalLosses: number;
}
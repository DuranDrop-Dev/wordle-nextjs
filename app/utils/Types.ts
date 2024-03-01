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
    dateCreated: Date;
    admin: boolean;
    totalWins?: number;
    totalLosses?: number;
}

export type PutRequest = {
    totalWins: number;
    totalLosses: number;
    body: MergedStats;
}

export type MergedStats = {
    totalWins: number;
    totalLosses: number;
}
export type UserBody = {
    userUID: string;
}

export type UserPayload = {
    [key: string]: number;
    totalWins: number;
    totalLosses: number;
}

export type PostRequest = {
    email: string;
    userID: string;
}
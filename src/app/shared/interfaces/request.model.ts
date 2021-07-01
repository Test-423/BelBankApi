export interface Codes {
    curName: string;
    curCode: number;
}

export interface Request {
    urlBody: string;
    startDate: string;
    endDate: string;
    currencies: Codes[]
}
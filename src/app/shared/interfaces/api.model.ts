interface Codes {
    name: string;
    code: number;
}

export interface Api {
    url: string;
    startDate: string;
    endDate: string;
    params: Codes[]
}
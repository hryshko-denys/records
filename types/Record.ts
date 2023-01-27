export interface RecordInt {
    id: string;
    title: string,
    'created_at': Date,
    number: number,
    currency: string,
    people: string[]
}

export type ItemInfo = {
    value: number | string;
    isValid: boolean;
}

export interface RecordInfoInt {
    [index: string | number]: ItemInfo;
}
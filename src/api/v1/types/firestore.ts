export type FirestoreDataTypes =
    | string
    | number
    | boolean
    | Date
    | FirestoreDataTypes[]
    | { [key: string]: FirestoreDataTypes }; 
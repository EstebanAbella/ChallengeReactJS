export type CustomErrorType = {
    statusCode: number
    statusMessage: string
}

export enum ServerStatus {
    IDLE,
    FETCHING,
    FETCH,
    FETCH_ERROR
}

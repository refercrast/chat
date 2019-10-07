/* Action types */
export enum AuthTypes {
    AUTH_REQUEST = "AUTH_REQUEST",
    AUTH_SUCCESS = "AUTH_SUCCESS",
    AUTH_FAILURE = "AUTH_FAILURE",
}


/* Data types */
export interface AuthType {
    token: string | null
}

export interface AuthState {
    readonly data: AuthType,
    readonly loading: boolean,
    readonly error: string | null
}
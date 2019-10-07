/*
    Action types
*/

// Auth
export enum AuthTypes {
    AUTH_REQUEST = "AUTH_REQUEST",
    AUTH_SUCCESS = "AUTH_SUCCESS",
    AUTH_FAILURE = "AUTH_FAILURE",
}


/*
    Data types
*/

// Auth
export interface Auth {
    token: string
}

export interface AuthState {
    readonly data: Auth,
    readonly loading: boolean,
    readonly error: string
}
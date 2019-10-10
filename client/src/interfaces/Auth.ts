export interface AuthRequestData {
    username: string,
    password: string,
    path: string
}

export interface AuthResponseData {
    token: string | null
}

export interface AuthState {
    readonly data: AuthResponseData,
    readonly loading: boolean,
    readonly error: string | null
}
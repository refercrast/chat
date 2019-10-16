export interface AuthState {
    readonly token: string | null,
    readonly loading: boolean,
    readonly error: string | null
}

export interface ApplicationState {
    auth: AuthState
}
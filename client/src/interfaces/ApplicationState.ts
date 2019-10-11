import { AuthResponseData } from "./Auth";

export interface AuthState {
    readonly data: AuthResponseData,
    readonly loading: boolean,
    readonly error: string | null
}

export interface ApplicationState {
    auth: AuthState
}
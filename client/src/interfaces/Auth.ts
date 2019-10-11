export interface AuthRequestData {
    username: string,
    password: string,
    path: string
}

export interface AuthResponseData {
    token: string | null
}
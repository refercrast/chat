export interface AuthRequestData {
    email: string,
    password: string,
    path: string
}

export interface AuthResponseData {
    token: string | null
}

export interface GoogleSignInOptions {
    prompt: string,
    scope: string,
    ux_mode?: string,
    redirect_uri?: string
}

export interface GoogleAuthSettings {
    clientId: string,
    signInOptions: GoogleSignInOptions
}

export interface GoogleUser {
    email: string,
    firstName: string,
    lastName: string
}
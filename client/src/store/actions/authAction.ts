import { action } from 'typesafe-actions';
import { AuthActionTypes } from "./actionTypes";
import { AuthRequestData, AuthResponseData } from "../../interfaces";


export const authActions = {
    authRequest: (data: AuthRequestData) => action(AuthActionTypes.AUTH_REQUEST, { ...data }),
    authSuccess: (data: AuthResponseData) => action(AuthActionTypes.AUTH_SUCCESS, { ...data }),
    authFailure: (error: string) => action(AuthActionTypes.AUTH_FAILURE, { error })
};
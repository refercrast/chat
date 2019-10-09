import { action } from 'typesafe-actions';
import { LoginActionTypes, RegisterActionTypes } from "./actionTypes";
import { AuthRequestData, AuthResponseData } from "../../interfaces";


export const loginActions = {
    loginRequest: (data: AuthRequestData) => action(LoginActionTypes.LOGIN_REQUEST, { data }),
    loginSuccess: (data: AuthResponseData) => action(LoginActionTypes.LOGIN_SUCCESS, { data }),
    loginFailure: (error: string) => action(LoginActionTypes.LOGIN_FAILURE, { error })
};

export const registerActions = {
    registerRequest: (data: AuthRequestData) => action(RegisterActionTypes.REGISTER_REQUEST, { data }),
    registerSuccess: (data: AuthResponseData) => action(RegisterActionTypes.REGISTER_SUCCESS, { data }),
    registerFailure: (error: string) => action(RegisterActionTypes.REGISTER_FAILURE, { error })
};
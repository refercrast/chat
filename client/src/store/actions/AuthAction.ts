import { action } from 'typesafe-actions';
import { AuthTypes, AuthType } from "../types";

// need to change type of data and add it to the  AuthTypes
export const authRequest = (data: any) => action(AuthTypes.AUTH_REQUEST, { data });

export const authSuccess = (data: AuthType) => action(AuthTypes.AUTH_SUCCESS, { data });

export const authFailure = (error: string) => action(AuthTypes.AUTH_FAILURE, { error });
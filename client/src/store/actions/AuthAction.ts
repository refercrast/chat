import { action } from 'typesafe-actions';
import { AuthTypes, AuthType } from "../types";

export const authRequest = () => action(AuthTypes.AUTH_REQUEST);

export const authSuccess = (data: AuthType) => action(AuthTypes.AUTH_SUCCESS, { data });

export const authFailure = (error: string) => action(AuthTypes.AUTH_FAILURE, { error });
import { AuthState } from "../../interfaces";
import { AuthActionTypes } from "../actions/actionTypes";
import { RootAction } from "../types/types";

const INITIAL_STATE: AuthState = {
    data: {
      token: null
    },
    error: null,
    loading: false
};

export const authReducer = (state: AuthState = INITIAL_STATE, action: RootAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.AUTH_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case AuthActionTypes.AUTH_SUCCESS:
            return {
                error: null,
                loading: false,
                data: {
                    token: action.payload.data.token,
                }
            };
        case AuthActionTypes.AUTH_FAILURE:
            return {
                loading: false,
                error: action.payload.error,
                data: {
                    token: null
                }
            };
        default:
            return state;
    }
};
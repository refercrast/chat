import { Reducer } from 'redux';
import { AuthState, AuthTypes } from "../types";

const INITIAL_STATE: AuthState = {
    data: {
      token: null
    },
    error: null,
    loading: false
};

export const authReducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AuthTypes.AUTH_REQUEST:
            return {
                ...state,
                loading: true
            };
        case AuthTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    token: action.payload.data
                }
            };
        case AuthTypes.AUTH_FAILURE:
            return {
                ...state,
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
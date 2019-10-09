import { AuthState } from "../../interfaces";
import { LoginActionTypes } from "../actions/actionTypes";
import { RootAction } from "../types/types";

const INITIAL_STATE: AuthState = {
    data: {
      token: null
    },
    error: null,
    loading: false
};

export const loginReducer = (state: AuthState = INITIAL_STATE, action: RootAction): AuthState => {
    switch (action.type) {
        case LoginActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LoginActionTypes.LOGIN_SUCCESS:
            return {
                error: null,
                loading: false,
                data: {
                    token: action.payload.data.token,
                }
            };
        case LoginActionTypes.LOGIN_FAILURE:
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
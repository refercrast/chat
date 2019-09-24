import { SET_CURRENT_USER, AUTH_REQUEST } from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false,
    user: {},
    loading: false
};

export const auth = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return {
                ...state,
                loading: action.loading
            };
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user,
                loading: false
            };
        default:
            return state
    }
};
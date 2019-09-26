import { GET_MESSAGES, MESSAGES_REQUEST } from "../actionTypes";

const defaultState = {
    isLoading: false,
    messages:[]
};

export const messages = (state = defaultState, action) => {
    switch (action.type) {
        case MESSAGES_REQUEST:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case GET_MESSAGES:
            return {
                isLoading: false,
                messages: action.messages
            };
        default:
            return state
    }
};
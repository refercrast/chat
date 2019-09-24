import { ADD_NEW_CHANNEL, CHANNEL_REQUEST, DELETE_CHANNEL } from '../actionTypes';

const defaultState = {
    isLoading: false,
    channel: []
};

export const channel = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_NEW_CHANNEL:
            return {
                isLoading: false,
                channel: action.channel
            };
        case DELETE_CHANNEL:
            return {
                isLoading: false,
                channel: action.channel
            };
        case CHANNEL_REQUEST:
            return {
                ...state,
                isLoading: action.isLoading
            };
        default:
            return state;
    }
};
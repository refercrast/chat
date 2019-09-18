import { CREATE_CHANNEL, CREATE_CHANNEL_REQUEST } from '../actionTypes';

const defaultState = {
    isLoading: false,
    channel: []
};

export const channels = (state = defaultState, action) => {
    switch (action.type) {
        case CREATE_CHANNEL_REQUEST:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case CREATE_CHANNEL:
            return {
                ...state,
                channel: action.channel,
            };
        default:
            return state
    }
};
import { ADD_NEW_CHANNEL, CHANNEL_REQUEST, DELETE_CHANNEL, SET_DISPLAYED_CHANNEL } from '../actionTypes';

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

export const displayedChannel = (state = { id: '', title: '' }, action) => {
    switch (action.type) {
        case SET_DISPLAYED_CHANNEL:
            return {
                id: action.id,
                title: action.title
            };
        default:
            return state;
    }
};
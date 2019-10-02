import { TOGGLE_MENU, TOGGLE_ADD_CHANNEL, TOGGLE_SEARCH_RESULT } from "../actionTypes";

export const toggleMenu = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_MENU:
            return action.displayed;
        default:
            return state;
    }
};

export const toggleAddChannel = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_ADD_CHANNEL:
            return action.displayed;
        default:
            return state;
    }
};

export const toggleSearchResult = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_SEARCH_RESULT:
            return action.displayed;
        default:
            return state;
    }
};
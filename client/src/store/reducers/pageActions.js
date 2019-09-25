import { TOGGLE_MENU, TOGGLE_ADD_CHANNEL } from "../actionTypes";

export default (state = { pageAction: { type: '', displayed: false } }, action) => {
    switch (action.type) {
        case TOGGLE_MENU:
            return {
                    pageAction: {
                        type: action.actionType,
                        displayed: action.displayed
                    }
            };
        case TOGGLE_ADD_CHANNEL:
            return {
                    pageAction: {
                        type: action.actionType,
                        displayed: action.displayed
                    }
            };
        default:
            return state;
    }
}
import { TOGGLE_MENU, TOGGLE_SEARCH_RESULT, TOGGLE_ADD_CHANNEL } from "../actionTypes";

const toggleMenuAction = (type, displayed) => ({
    type,
    displayed
});

const toggleSearchResultAction = (type, displayed) => ({
    type,
    displayed
});

const toggleAddChannelAction = (type, displayed) => ({
    type,
    displayed
});

export const toggleMenu = displayed => {
  return dispatch => {
      dispatch(toggleMenuAction(TOGGLE_MENU, displayed));
  }
};

export const toggleSearchResult = displayed => {
    return dispatch => {
        dispatch(toggleSearchResultAction(TOGGLE_SEARCH_RESULT, displayed));
    }
};

export const toggleAddChannel = displayed => {
    return dispatch => {
        dispatch(toggleAddChannelAction(TOGGLE_ADD_CHANNEL, displayed));
    }
};
import { TOGGLE_PAGE_ACTION } from "../actionTypes";

const togglePageActionAction = (actionType, displayed) => ({
    type: TOGGLE_PAGE_ACTION,
    actionType,
    displayed
});


export const togglePageAction = (actionType, displayed) => {
  return dispatch => {
      dispatch(togglePageActionAction(actionType, displayed));
  }
};
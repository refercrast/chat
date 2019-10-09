import { combineReducers } from "redux";

import { loginReducer } from "./AuthReducer";

export default combineReducers({
    login: loginReducer
});
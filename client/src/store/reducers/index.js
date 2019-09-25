import { combineReducers } from "redux";

import { channels } from "./channels";
import { auth } from './auth';
import error from './error';
import pageActions from './pageActions';

export default combineReducers({
    channels,
    auth,
    error,
    pageActions
});
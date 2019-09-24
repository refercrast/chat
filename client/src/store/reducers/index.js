import { combineReducers } from "redux";

import { channels } from "./channels";
import { auth } from './auth';
import error from './error';

export default combineReducers({
    channels,
    auth,
    error
});
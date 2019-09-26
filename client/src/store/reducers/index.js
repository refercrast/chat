import { combineReducers } from "redux";

import { channels } from "./channels";
import { displayedChannel } from "./channel";
import { auth } from './auth';
import { messages } from "./messages";
import error from './error';
import togglePageActions from './togglePageActions';

export default combineReducers({
    channels,
    auth,
    error,
    togglePageActions,
    messages,
    displayedChannel
});
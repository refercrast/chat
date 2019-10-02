import { combineReducers } from "redux";

import { channels, userChannels } from "./channels";
import { displayedChannel } from "./channel";
import { auth } from './auth';
import { messages } from "./messages";
import error from './error';
import { toggleAddChannel, toggleMenu, toggleSearchResult } from './togglePageActions';

export default combineReducers({
    channels,
    userChannels,
    auth,
    error,
    toggleAddChannel,
    toggleMenu,
    toggleSearchResult,
    messages,
    displayedChannel
});
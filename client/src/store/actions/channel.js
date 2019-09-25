import api from '../../services/api';
import { ADD_NEW_CHANNEL, CHANNEL_REQUEST, DELETE_CHANNEL, TOGGLE_ADD_CHANNEL } from '../actionTypes';
import { addError, removeError } from "./error";
import { togglePageAction } from "./pageActions";

export const deleteChannelAction = channel => ({
    type: DELETE_CHANNEL,
    channel
});

export const addNewChannelAction = channel => ({
    type: ADD_NEW_CHANNEL,
    channel
});

export const channelRequest = isLoading => ({
    type: CHANNEL_REQUEST,
    isLoading
});

export const addNewChannel = channelInfo => {
    return async dispatch => {
        try {
            dispatch(channelRequest(true));
            const channel = await api.call('post','channel', channelInfo);
            dispatch(addNewChannelAction(channel));
            dispatch(togglePageAction(TOGGLE_ADD_CHANNEL, false));
            dispatch(removeError());
        } catch (e) {
            const error = e.response.data;
            dispatch(channelRequest(false));
            dispatch(addError(error.errorMessage));
        }
    };
};

export const deleteChannel = channelId => {
    return async dispatch => {
        try {
            dispatch(channelRequest(true));
            const channel = api.call('delete',`channel/${channelId}`, channelId);
            dispatch(deleteChannelAction(channel));
            dispatch(removeError());
        } catch (e) {
            const error = e.response;
            dispatch(channelRequest(false));
            dispatch(addError(error.errorMessage));
        }
    };
};
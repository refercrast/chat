import api from '../../services/api';
import { GET_CHANNELS, GET_CHANNELS_REQUEST, GET_USER_CHANNELS } from '../actionTypes';
import {addError, removeError} from "./error";

const getChannelsAction = channels => ({
    type: GET_CHANNELS,
    channels
});

const getUserChannelsAction = channels => ({
    type: GET_USER_CHANNELS,
    channels
});

const getChannelsRequestAction = isLoading => ({
    type: GET_CHANNELS_REQUEST,
    isLoading
});

export const getChannels = () => {
    return async dispatch => {
        try {
            dispatch(getChannelsRequestAction(true));
            const channels = await api.call('get','channels');
            dispatch(getChannelsAction(channels));
            dispatch(removeError());
        } catch (e) {
            const error = e.response;
            dispatch(getChannelsRequestAction(false));
            dispatch(addError(error.errorMessage));
        }      
    }
};

export const getUserChannels = () => {
    return async dispatch => {
        try {
            dispatch(getChannelsRequestAction(true));
            const channels = await api.call('get','user/channels');
            dispatch(getUserChannelsAction(channels));
            dispatch(removeError());
        } catch (e) {
            const error = e.response;
            dispatch(getChannelsRequestAction(false));
            dispatch(addError(error.errorMessage));
        }
    }
};
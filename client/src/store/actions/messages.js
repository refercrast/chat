import { GET_MESSAGES, MESSAGES_REQUEST } from "../actionTypes";
import { addError, removeError } from "./error";
import api from "../../services/api";

const getMessagesAction = messages => ({
    type: GET_MESSAGES,
    messages
});

const getMessagesRequestAction = isLoading => ({
    type: MESSAGES_REQUEST,
    isLoading
});

export const getMessages = channelId => {
    return async dispatch => {
        try {
            dispatch(getMessagesRequestAction(true));
            const messages = await api.call('get',`messages/${channelId}`);
            dispatch(getMessagesAction(messages));
            dispatch(getMessagesRequestAction(false));
        } catch (e) {
            const error = e.response.data;
            dispatch(getMessagesRequestAction(false));
            dispatch(addError(error.errorMessage));
        }
    }
};

export const addMessage = (channelId, data) => {
    return async dispatch => {
        try {
            await api.call('post',`message/${channelId}`, data);
        } catch (e) {
            const error = e.response.data;
            dispatch(addError(error.errorMessage));
        }
    }
};
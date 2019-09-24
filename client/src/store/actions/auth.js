import { addError, removeError } from "./error";
import { SET_CURRENT_USER, AUTH_REQUEST } from "../actionTypes";
import api from '../../services/api';

export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    user
});

export const setToken = token => {
    api.setToken(token);
};

export const authRequest = loading => ({
    type: AUTH_REQUEST,
    loading
});

export const logout = () => {
    return async dispatch => {
        localStorage.clear();
        api.setToken(null);
        dispatch(setCurrentUser({}));
        dispatch(removeError());
    }
};

export const authUser = (path, data) => {
    return async dispatch => {
        try {
            dispatch(authRequest(true));
            const response = await api.call('post', `user/${path}`, data);
            if(response.errorMessage) {
                dispatch(authRequest(false));
                dispatch(addError(response.errorMessage));
            } else {
                const { token } = response;
                localStorage.setItem('_wtu', token);
                api.setToken(token);
                dispatch(setCurrentUser({ username: data.username }));
                dispatch(removeError());
            }
        } catch (e) {
            const error = e.response.data;
            dispatch(authRequest(false));
            dispatch(addError(error.errorMessage));
        }
    }
};
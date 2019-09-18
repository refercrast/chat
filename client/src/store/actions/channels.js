import api from '../../services/api';
import { SET_CHANNELS } from '../actionTypes';

export const setChannelsAction = channels => ({
    type: SET_CHANNELS,
    channels
});

export const setChannels = channels => {
    return async dispatch => {
        try {
            dispatch(setChannelsAction(channels));
        //    Todo - remove error
        } catch (e) {
            const error = e.response;
            console.log(e)
        //    Todo - add error
        }      
    }
};
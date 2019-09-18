import { CREATE_CHANNEL } from '../actionTypes';

export const createChannelAction = channel => ({
    type: CREATE_CHANNEL,
    channel
});

export const createChannel = channel => {
    return async dispatch => {
        try {
            dispatch(createChannelAction(channel));
            //    Todo - remove error
        } catch (e) {
            const error = e.response;
            console.log(e)
            //    Todo - add error
        }
    }
};
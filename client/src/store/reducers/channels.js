import { GET_CHANNELS, GET_CHANNELS_REQUEST } from '../actionTypes';

const defaultState = {
  isLoading: false,
  channels: []
};

export const channels = (state = defaultState, action) => {
  switch (action.type) {
      case GET_CHANNELS_REQUEST:
          return {
              ...state,
              isLoading: action.isLoading
          };
      case GET_CHANNELS:
          return {
              isLoading: false,
              channels: action.channels,
          };
      default:
          return state
  }
};
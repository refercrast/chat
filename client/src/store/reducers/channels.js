import { GET_CHANNELS, GET_CHANNELS_REQUEST, GET_USER_CHANNELS } from '../actionTypes';

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

export const userChannels = (state = defaultState, action) => {
  switch (action.type) {
      case GET_CHANNELS_REQUEST:
          return {
              ...state,
              isLoading: action.isLoading
          };
      case GET_USER_CHANNELS:
          return {
              isLoading: false,
              channels: action.channels,
          };
      default:
          return state
  }
};
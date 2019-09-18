import { SET_CHANNELS, SET_CHANNELS_REQUEST } from '../actionTypes';

const defaultState = {
  isLoading: false,
  channels: []
};

export const channels = (state = defaultState, action) => {
  switch (action.type) {
      case SET_CHANNELS_REQUEST:
          return {
              ...state,
              isLoading: action.isLoading
          };
      case SET_CHANNELS:
          return {
              ...state,
              channels: action.channels,
          };
      default:
          return state
  }
};
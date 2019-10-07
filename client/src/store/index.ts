import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducers from './redusers';
import { AuthState } from "./types";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export interface ApplicationState {
    auth: AuthState
}

// mount it on the store
export const store: Store<ApplicationState> = createStore(
    rootReducers,
    applyMiddleware(sagaMiddleware)
);
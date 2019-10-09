import { createStore, applyMiddleware, Store, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { AuthState } from "../interfaces";

import rootReducers from './redusers';
import rootSagas from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export interface ApplicationState {
    auth: AuthState
}

// mount it on the store
export const store: Store<ApplicationState> = createStore(
    rootReducers,
    compose(
        applyMiddleware(sagaMiddleware),
        (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__()
        )
);

sagaMiddleware.run(rootSagas);
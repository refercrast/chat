import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducers from './redusers';
import rootSagas from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducers,
    compose(
        applyMiddleware(sagaMiddleware),
        (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__()
        )
);

sagaMiddleware.run(rootSagas);
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducers from './reducers';

export const store = createStore(rootReducers, {}, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) );
// export const store = createStore(rootReducers, {}, compose(applyMiddleware(thunk)) );
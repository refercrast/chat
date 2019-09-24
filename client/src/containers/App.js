import React from 'react';
import decode from 'jwt-decode';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../store";
import RouteViews from "../containers/RouteViews";
import { addError, setCurrentUser, setToken } from "../store/actions";

if (localStorage._wtu) {
    setToken(localStorage._wtu);
    try {
        store.dispatch(setCurrentUser(decode(localStorage._wtu)));
    } catch (e) {
        store.dispatch(setCurrentUser({}));
        store.dispatch(addError(e.message));
    }
}

const App = () => (
    <Provider store={store}>
        <Router>
            <RouteViews />
        </Router>
    </Provider>
);

export default App;
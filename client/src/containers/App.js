import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../store";
import RouteViews from "../containers/RouteViews";

const App = () => (
    <Provider store={store}>
        <Router>
            <RouteViews />
        </Router>
    </Provider>
);

export default App;
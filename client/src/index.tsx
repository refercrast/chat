import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import './resources/styles/styles.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import { store } from "./store";

const Application = () => (
    <BrowserRouter>
        <Provider store={store} >
            {/*For test*/}
            <AuthForm authType="login"/>
        </Provider>
    </BrowserRouter>
);

ReactDOM.render(<Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

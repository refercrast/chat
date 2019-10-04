import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/Styles/styles.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import AuthForm from "./Components/Auth/AuthForm";

const Application = () => (
    // For test
    <BrowserRouter>
        <AuthForm authType="login"/>
    </BrowserRouter>
);

ReactDOM.render(<Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

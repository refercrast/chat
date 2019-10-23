import React from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

interface StateProps {
    authType: string
}

const AuthLinks = (props: StateProps) => {
    return(
        <ul className="auth-links">
            <li className={classNames({
                'login-link': true,
                'active': props.authType === 'login'
            })}>
                <NavLink to='/login' >Login</NavLink>
            </li>
            <li className={classNames({
                'register-link': true,
                'active': props.authType === 'register'
            })}>
                <NavLink to='/register'>Register</NavLink>
            </li>
        </ul>
    )
};

export default AuthLinks;
import React, { useState, useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { authActions } from "../../store/actions";
import { AuthRequestData, ApplicationState, AuthState } from "../../interfaces";
import { Google } from "../../services/google";

interface StateProps {
    authType: string,
    auth: AuthState
}

interface DispatchProps {
    authRequest(data: AuthRequestData): void
}

const AuthForm = (props: StateProps & DispatchProps) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = useCallback((event: any) => {
        props.authRequest({
            username,
            password,
            path: props.authType
        });

        event.preventDefault();
        setUsername('');
        setPassword('');
    },[username, password, props.authType]);

    const setUsernameHandle = useCallback((event: any) => {
        setUsername(event.target.value)
    }, [username]);

    const setPasswordHandle = useCallback((event: any) => {
        setPassword(event.target.value)
    }, [password]);

    useEffect(() => {
       Google.init();
    });

    return (
        <div className="authForm">
            {/* only for test */}
            { props.auth.error && <span>{props.auth.error}</span> }
            <ul className="auth-links">
                <li>
                    <NavLink to='/login' >Login</NavLink>
                </li>
                <li>
                    <NavLink to='/register'>Register</NavLink>
                </li>
            </ul>
            <div className="g-signin2" data-onsuccess="onSignIn"></div>
            <form onSubmit={handleSubmit}>
                <div className="auth-item-field">
                    <label htmlFor="input-username">Username</label>
                    <input
                        type="text"
                        id="input-username"
                        name="username"
                        value={username}
                        placeholder="Username"
                        autoComplete="On"
                        onChange={setUsernameHandle}
                    />
                </div>
                <div className="auth-item-field">
                    <label htmlFor="input-password">Password</label>
                    <input
                        type="password"
                        id="input-password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        autoComplete="On"
                        onChange={setPasswordHandle}
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
};

export default connect(
    (state: ApplicationState) => ({
        auth: state.auth
    }),
    { authRequest: authActions.authRequest }
)(AuthForm);
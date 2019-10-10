import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loginActions } from "../../store/actions";
import { AuthRequestData, ApplicationState, AuthState } from "../../interfaces";

interface StateProps {
    authType: string,
    login: AuthState
}

interface DispatchProps {
    loginRequest(data: AuthRequestData): void
}

const AuthForm = (props: StateProps & DispatchProps) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: any) => {
        props.loginRequest({
            username,
            password
        });

        event.preventDefault();
        setUsername('');
        setPassword('');
    };

    return (
        <div className="authForm">
            {/* only for test */}
            { props.login.error && <span>{props.login.error}</span> }
            <ul className="auth-links">
                <li>
                    <NavLink to='/login' >Login</NavLink>
                </li>
                <li>
                    <NavLink to='/register'>Register</NavLink>
                </li>
            </ul>
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
                        onChange={(e) => setUsername(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
};

export default connect(
    (state: ApplicationState) => ({
        login: state.login
    }),
    { loginRequest: loginActions.loginRequest }
)(AuthForm);
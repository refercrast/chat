import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { authRequest } from "../../store/actions";

interface StateProps {
    authType: string
}

interface DispatchProps {
    authRequest(data: any): void
}

const AuthForm = (props: StateProps & DispatchProps) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: any) => {

        // need to add types
        props.authRequest({
            path: props.authType,
            data: {
                username,
                password
            }
        });

        event.preventDefault();
        setUsername('');
        setPassword('');
    };

    useEffect(() => {
        // console.log(props)
    });

    return (
        <div className="authForm">
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
        auth: state.auth
    }),
    { authRequest }
)(AuthForm);
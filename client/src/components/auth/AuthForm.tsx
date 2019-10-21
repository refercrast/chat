// form validation
// error message

import React, { useState, useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { authActions } from "../../store/actions";
import { AuthRequestData, ApplicationState, AuthState } from "../../interfaces";
import { Google } from "../../services/googleAuth";

interface StateProps {
    authType: string,
    auth: AuthState
}

interface DispatchProps {
    authRequest(data: AuthRequestData): void
}

const AuthForm = (props: StateProps & DispatchProps) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = useCallback((event: any) => {
        props.authRequest({
            email,
            password,
            path: props.authType
        });

        event.preventDefault();
        setEmail('');
        setPassword('');
    },[email, password, props]);

    const setEmailHandler = useCallback((event: any) => {
        setEmail(event.target.value)
    }, []);

    const setPasswordHandler = useCallback((event: any) => {
        setPassword(event.target.value)
    }, []);

    const handleGoogleSignIn = useCallback( () => {
        Google.signIn().then((info) => {
            console.log('From Auth',info)
        });
    },[]);

    const handleGoogleSignOut = useCallback( () => {
        Google.signOut();
    },[]);

    return (
        <section className='auth-section'>
            <div className="auth-form-wrapper">
                <div className='auth-form'>
                    <ul className="auth-links">
                        <li>
                            <NavLink to='/login' >Login</NavLink>
                        </li>
                        <li>
                            <NavLink to='/register'>Register</NavLink>
                        </li>
                    </ul>
                    <div className='social-buttons'>
                        <div className='google-button default-button' onClick={handleGoogleSignIn}>
                            <i className="fab fa-google"/>
                            <span>Google</span>
                        </div>
                        <div className='facebook-button default-button'>
                            <i className="fab fa-facebook-f"/>
                            <span>Facebook</span>
                        </div>
                    </div>
                    {/*<div onClick={handleGoogleSignOut}>Sign out</div>*/}
                    <form onSubmit={handleSubmit}>
                        <div className="auth-item-field">
                            <label htmlFor="input-email">Email</label>
                            <input
                                type="text"
                                id="input-email"
                                name="email"
                                value={email}
                                placeholder="Email"
                                autoComplete="On"
                                onChange={setEmailHandler}
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
                                onChange={setPasswordHandler}
                            />
                        </div>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </section>
    )
};

export default connect(
    (state: ApplicationState) => ({
        auth: state.auth
    }),
    { authRequest: authActions.authRequest }
)(AuthForm);
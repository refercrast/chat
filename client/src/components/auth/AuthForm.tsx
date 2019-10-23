// form validation
// error message

import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { authActions } from "../../store/actions";
import { AuthRequestData, ApplicationState, AuthState } from "../../interfaces";
import { Google } from "../../services/googleAuth";
import SocialButton from "./socialButton";
import AuthLinks from "./authLinks";

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
                   <AuthLinks authType={props.authType} />
                   <div className='auth-body'>
                       <div className='social-buttons'>
                           <div onClick={handleGoogleSignIn} className='google-button default-button'>
                               <SocialButton iconClass='fa-google' tittle='Google' />
                           </div>
                           <div className='facebook-button default-button'>
                               <SocialButton iconClass='fa-facebook-f' tittle='Facebook' />
                           </div>
                       </div>
                       {/*<div onClick={handleGoogleSignOut}>Sign out</div>*/}
                       <form onSubmit={handleSubmit}>
                           <div className='auth-fields'>
                               <div className="auth-item-field">
                                   <label htmlFor="input-email">Email</label>
                                   <input
                                       type="text"
                                       id="input-email"
                                       name="email"
                                       value={email}
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
                                       value={password}
                                       autoComplete="On"
                                       onChange={setPasswordHandler}
                                   />
                               </div>
                           </div>
                           <div className='submit-auth default-button'>
                               <button type='submit'>{props.authType}</button>
                           </div>
                       </form>
                   </div>
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
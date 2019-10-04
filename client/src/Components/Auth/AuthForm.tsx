import React, { useState } from "react";
import { NavLink } from "react-router-dom";

interface AuthFormProps {
    authType: string
}

const AuthForm = (props: AuthFormProps) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setUsername('');
        setPassword('');
    };

    return (
        <div className="authForm">
            <ul className="auth-links">
                <li>
                    <NavLink to='/login' />
                </li>
                <li>
                    <NavLink to='/register' />
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
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="auth-item-field">
                    <label htmlFor="input-password">Password</label>
                    <input
                        type="password"
                        id="input-password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
};

export default AuthForm;
import React, { PureComponent } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { authUser } from "../../store/actions";

class AuthForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        const { authType } = this.props;
        this.props.authUser(authType, { username, password });
    };

    handleChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <NavLink className='auth-link' to='/login'>Login</NavLink>
                    </li>
                    <li>
                        <NavLink className='auth-link' to='/register'>Register</NavLink>
                    </li>
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="input-username">Username</label>
                        <input
                            id='input-username'
                            type="text"
                            name="username"
                            onChange={this.handleChangeInput}
                            value={this.state.username}
                        />
                    </div>
                    <div>
                        <label htmlFor="input-password">Password</label>
                        <input
                            id='input-password'
                            type="text"
                            name="password"
                            onChange={this.handleChangeInput}
                            value={this.state.password}
                        />
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default connect(store => ({}), { authUser })(AuthForm);

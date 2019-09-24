import React, { PureComponent } from 'react';
import AuthForm from '../components/AuthForm';
import ErrorMessage from '../components/ErrorMessage';
import { connect } from "react-redux";

class AuthPage extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            { this.props.error.message &&
                <ErrorMessage/>
            }
            <AuthForm authType={this.props.authType}/>
        </div>
    }
}

export default connect(store => ({ error: store.error }),{})(AuthPage);

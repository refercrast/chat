import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { ApplicationState, AuthState } from "../interfaces";
import AuthForm from "../components/auth/AuthForm";

interface PropsState {
    auth: AuthState
}

const RouteViews = (props: PropsState) => {
    if (!props.auth.token) {
            return <Switch>
                <Route
                    exact
                    path='/login'
                    render={() => <AuthForm authType='login'/>}
                />
                <Route
                    exact
                    path='/register'
                    render={() => <AuthForm authType='register'/>}
                />
                <Redirect to='/login' />
            </Switch>
    } else {
        return <Switch>
            <Redirect to='/' />
        </Switch>
    }
};

export default withRouter(
    connect(
        (store: ApplicationState) => ({
            auth: store.auth
        }),
        {})
(RouteViews));
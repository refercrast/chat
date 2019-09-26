import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from "../pages/homePage";
import AuthPage from "../pages/authPage";

const RouteViews = ({ auth }) => {
    if (!auth.isAuthenticated) {
        return <Switch>
            <Route
                exatct
                path="/login"
                render={ () => <AuthPage authType="login" /> }
            />
            <Route
                exact
                path="/register"
                render={() => <AuthPage authType="register"/> }
            />
            <Redirect to="/login" />
        </Switch>
    } else {
        return <Switch>
            <Route
                exatct
                path="/chat"
                render={ () => <HomePage /> }
            />
            <Redirect to="/chat" />
        </Switch>
    }

};

export default withRouter(connect(store => ({ auth: store.auth }),{})(RouteViews));
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from "../pages/homePage";

const RouteViews = () => {
    return <Switch>
        <Route
            exatct
            path="/"
            render={ () => <HomePage /> }
        />
    </Switch>
};

export default withRouter(connect(store => ({}),{})(RouteViews));
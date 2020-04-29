import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
    } from 'react-router-dom';

import Index from './components/pages/Index/Index';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Login/Register';
import Dashboard from './components/Dashboard/Dashboard';
import ForgotPassword from './components/pages/Login/ForgotPassword';
import ResetPassword from './components/pages/Login/ResetPassword';
import ConfirmEmail from './components/pages/Login/ConfirmEmail';
import Logout from './components/pages/Login/Logout';
import Motivation from './components/pages/Motivation/Motivation';
import Oauth from './components/pages/Login/Oauth';


function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Index />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/verify">
                    <ConfirmEmail />
                </Route>
                <Route path="/forgot_pass">
                    <ForgotPassword />
                </Route>
                <Route path="/reset_pass">
                    <ResetPassword />
                </Route>
                <Route path="/motivation">
                    <Motivation />
                </Route>
                <Route path="/oauth">
                    <Oauth />
                </Route>
                <Route path={["/home", "/explore", "/lessons", "/lesson", "/account", "/logout", "/motivation"]}>
                    <Dashboard />
                </Route>
            </Switch>
        </Router>
    );
}

export default Routes;

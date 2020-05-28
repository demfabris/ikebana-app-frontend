import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Logout from '../pages/Login/Logout';

import Explore from '../pages/Explore/Explore';
import Home from '../pages/Home/Home';
import Account from '../pages/Account/Account';
import Lessons from '../pages/Lessons/Lessons';
import SingleLesson from '../pages/SingleLesson/SingleLesson';
import Admin from '../pages/Admin/Admin';

import './styles.scss';

function Dashboard() {
    return (
        <>
            <Sidebar />
            <Header />
            <div className="dashboard-content" id="main-content">
                <div className="spacer" id="header_spacer"></div>
                <Route path="/explore">
                    <Explore />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/logout">
                    <Logout />
                </Route>
                <Route path="/account">
                    <Account />
                </Route>
                <Route path="/lessons">
                    <Lessons />
                </Route>
                <Route path="/admin">
                    <Admin />
                </Route>
                <Route path="/lesson/:lesson_hash">
                    <SingleLesson />
                </Route>
            </div>
            <Footer />
        </>
    );
}

export default Dashboard;

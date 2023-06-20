import React from 'react';
import {
    Link, BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import CommitListContainer from './containers/CommitListContainer';
import RepoCreateContainer from './containers/RepoCreateContainer';
import SidebarContainer from './containers/SidebarContainer';

export default (
    <Router>
        <div id="wrapper" className="toggled">
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <li className="sidebar-brand">
                        <Link to="/">
                            Github Monitor
                        </Link>
                    </li>
                </ul>
            </div>

            <SidebarContainer />

            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <RepoCreateContainer />
                    <Switch>
                        <Route path="/" exact component={CommitListContainer} />
                    </Switch>
                </div>
            </div>

        </div>
    </Router>
);

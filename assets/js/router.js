import React from 'react';
import {
    Link, BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import CommitListContainer from './containers/CommitListContainer';
import RepoCreateContainer from './containers/RepoCreateContainer';
import RepoListContainer from './containers/RepoListContainer';

export default (
    <Router>
        <div id="wrapper" className="toggled">

            <RepoListContainer />
            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <RepoCreateContainer />
                    <Switch>
                        <Route path="/" exact> <CommitListContainer /> </Route>
                    </Switch>
                </div>
            </div>

        </div>
    </Router>
);

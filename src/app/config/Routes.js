import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  browserHistory,
  NavLink
} from 'react-router-dom';

import GamesList from '../components/GamesList';
import GamesProfile from '../components/GamesProfile';
import Base from '../components/Base';

const NotFound = () => <h1>NotFound</h1>;

const Routes = () => (
  <Router history={browserHistory}>
    <div>
      <Base />
      <Switch>
        <Route exact path="/" component={GamesList} />
        <Route exact path="/games/:id" component={GamesProfile} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default Routes;

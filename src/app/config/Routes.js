import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  browserHistory,
  NavLink
} from 'react-router-dom';

import Base from '../components/Base';
import GamesList from '../components/Pages/GamesList';
import GamesProfile from '../components/Pages/GamesProfile';
import Checkout from '../components/Pages/Checkout';
import Done from '../components/Pages/Done';
import NotFound from '../components/Pages/NotFound';

const Routes = () => (
  <Router history={browserHistory}>
    <div>
      <Base />
      <Switch>
        <Route exact path="/" component={GamesList} />
        <Route path="/games/:id" component={GamesProfile} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/done" component={Done} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default Routes;

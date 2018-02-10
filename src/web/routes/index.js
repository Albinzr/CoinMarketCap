import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../components/Home';

const Index = () => (
  <Switch>
    <Route
      path="/"
      render={props => (

        <Home {...props} />

      )}
    />

  </Switch>
);

export default Index;

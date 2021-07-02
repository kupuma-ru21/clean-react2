import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

type Factory = { makeLogin: React.VFC; makeSignUp: React.VFC };

const Router: React.VFC<Factory> = ({ makeLogin, makeSignUp }: Factory) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={makeSignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

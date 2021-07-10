import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SurveyList } from '@/presentation/pages';

type Factory = { makeLogin: React.VFC; makeSignUp: React.VFC };

const Router: React.VFC<Factory> = ({ makeLogin, makeSignUp }: Factory) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={makeSignUp} />
        <Route path="/" exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

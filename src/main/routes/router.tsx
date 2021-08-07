import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import {
  makeLogin,
  makeSignUp,
  makeSurveyList,
  MakeSurveyResult,
} from '@/main/factories/pages';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '@/main/adapters/current-account-adapters';
import { PrivateRoute, currentAccountState } from '@/presentation/components';

const Router: React.VFC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter,
  };

  return (
    <RecoilRoot
      initializeState={({ set }) => {
        return set(currentAccountState, state);
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignUp} />
          <PrivateRoute path="/" exact component={makeSurveyList} />
          <PrivateRoute
            path="/surveys/:id"
            exact
            component={MakeSurveyResult}
          />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default Router;

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  makeLogin,
  makeSignUp,
  makeSurveyList,
  MakeSurveyResult,
} from '@/main/factories/pages';
import { ApiContext } from '@/presentation/context';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '@/main/adapters/current-account-adapters';
import { PrivateRoute } from '@/presentation/components';

const Router: React.VFC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter,
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
    </ApiContext.Provider>
  );
};

export default Router;

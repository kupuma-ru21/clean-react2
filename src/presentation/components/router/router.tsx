import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SignUp } from '@/presentation/pages';

type Props = { makeLogin: React.VFC };

const Router: React.VFC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

import React, { useContext } from 'react';
import type { VFC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ApiContext } from '@/presentation/context';

const PrivateRoute: VFC<RouteProps> = (props: RouteProps) => {
  const { getCurrentAccount } = useContext(ApiContext);
  const invalidAccessToken = !getCurrentAccount()?.accessToken;
  if (invalidAccessToken) {
    return <Route {...props} component={() => <Redirect to="/login" />} />;
  }
  return <Route {...props} />;
};

export default PrivateRoute;

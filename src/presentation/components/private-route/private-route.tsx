import React from 'react';
import type { VFC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const PrivateRoute: VFC<RouteProps> = (props: RouteProps) => {
  return <Route {...props} component={() => <Redirect to="/login" />} />;
};

export default PrivateRoute;

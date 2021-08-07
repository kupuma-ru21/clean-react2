import React from 'react';
import type { VFC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currentAccountState } from '@/presentation/components';

const PrivateRoute: VFC<RouteProps> = (props: RouteProps) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState);
  const invalidAccessToken = !getCurrentAccount()?.accessToken;
  if (invalidAccessToken) {
    return <Route {...props} component={() => <Redirect to="/login" />} />;
  }
  return <Route {...props} />;
};

export default PrivateRoute;

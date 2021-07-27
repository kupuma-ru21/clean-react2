import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import PrivateRoute from './private-route';

describe('Private Route', () => {
  it('Should redirect to Login to /login if token is empty', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    render(
      <Router history={history}>
        <PrivateRoute />
      </Router>
    );
    expect(history.location.pathname).toBe('/login');
  });
});

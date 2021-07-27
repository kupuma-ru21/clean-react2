import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import PrivateRoute from './private-route';

type SutTypes = { history: MemoryHistory };

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <Router history={history}>
      <PrivateRoute />
    </Router>
  );
  return { history };
};

describe('Private Route', () => {
  it('Should redirect to Login to /login if token is empty', () => {
    const { history } = makeSut();
    expect(history.location.pathname).toBe('/login');
  });
});

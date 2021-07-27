import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { mockAccountModel } from '@/domain/test';
import { ApiContext } from '@/presentation/context';
import PrivateRoute from './private-route';

type SutTypes = { history: MemoryHistory };

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router history={history}>
        <PrivateRoute />
      </Router>
    </ApiContext.Provider>
  );
  return { history };
};

describe('Private Route', () => {
  test('Should redirect to Login to /login if token is empty', () => {
    const { history } = makeSut(null);
    expect(history.location.pathname).toBe('/login');
  });

  test('Should render current component if token is not empty', () => {
    const { history } = makeSut();
    expect(history.location.pathname).toBe('/');
  });
});

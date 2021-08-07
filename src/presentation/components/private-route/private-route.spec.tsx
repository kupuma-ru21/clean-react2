import React from 'react';
import { RecoilRoot } from 'recoil';
import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { mockAccountModel } from '@/domain/test';
import PrivateRoute from './private-route';
import { currentAccountState } from '../atoms/atoms';

type SutTypes = { history: MemoryHistory };

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const mockedState = {
    setCurrentAccount: jest.fn(),
    getCurrentAccount: () => account,
  };
  render(
    <RecoilRoot
      initializeState={({ set }) => {
        return set(currentAccountState, mockedState);
      }}
    >
      <Router history={history}>
        <PrivateRoute />
      </Router>
    </RecoilRoot>
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

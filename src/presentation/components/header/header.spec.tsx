import React from 'react';
import { Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { AccountModel } from '@/domain/models';
import { Header } from '@/presentation/components';
import { ApiContext } from '@/presentation/context';

type SutTypes = {
  history: MemoryHistory;
  setCurrentAccountMock?: (account: AccountModel) => void;
};

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Header />
      </Router>
    </ApiContext.Provider>
  );

  return { history, setCurrentAccountMock };
};

describe('Header Component', () => {
  test('Should call setCurrentAccount with null', () => {
    const { history, setCurrentAccountMock } = makeSut();
    fireEvent.click(screen.getByTestId('logout'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });
});

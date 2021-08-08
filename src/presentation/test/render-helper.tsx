import React from 'react';
import { Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { MemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { mockAccountModel } from '@/domain/test';
import { AccountModel } from '@/domain/models';
import { currentAccountState } from '@/presentation/components';

type Params = {
  Page: React.VFC;
  history: MemoryHistory;
  account?: AccountModel;
};

type Result = {
  setCurrentAccountMock: (account: AccountModel) => void;
};

export const renderWithHistory = ({
  Page,
  history,
  account = mockAccountModel(),
}: Params): Result => {
  const setCurrentAccountMock = jest.fn();
  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account,
  };

  render(
    <RecoilRoot
      initializeState={({ set }) => {
        return set(currentAccountState, mockedState);
      }}
    >
      <Router history={history}>
        <Page />
      </Router>
    </RecoilRoot>
  );
  return { setCurrentAccountMock };
};

import React from 'react';
import { render, screen } from '@testing-library/react';
import { SurveyResult } from '@/presentation/pages';
import { ApiContext } from '@/presentation/context';
import { mockAccountModel } from '@/domain/test';

const makeSut = (): void => {
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <SurveyResult />
    </ApiContext.Provider>
  );
};

describe('SurveyResult Cmponent', () => {
  test('Should present correct initial state', async () => {
    makeSut();
    const surveyResult = screen.getByTestId('survey-result');
    expect(surveyResult.childElementCount).toBe(0);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });
});

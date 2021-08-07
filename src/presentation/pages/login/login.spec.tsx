import React from 'react';
import { Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { createMemoryHistory } from 'history';
import { render, fireEvent, screen } from '@testing-library/react';
import faker from 'faker';
import { InvaildCredentialsError } from '@/domain/errors';
import { Authentication } from '@/domain/usecases';
import { AuthenticationSpy, mockAccountModel } from '@/domain/test';
import { ValidationStub, Helper } from '@/presentation/test';
import { Login } from '@/presentation/pages';
import { currentAccountState } from '@/presentation/components';

type SutTypes = {
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
  setCurrentAccountMock: (account: Authentication.Model) => void;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });
const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy();
  const setCurrentAccountMock = jest.fn();
  const validationStub = new ValidationStub();
  validationStub.errorMessage = faker.random.words();
  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => mockAccountModel(),
  };
  render(
    <RecoilRoot
      initializeState={({ set }) => {
        return set(currentAccountState, mockedState);
      }}
    >
      <Router history={history}>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </RecoilRoot>
  );
  return { validationStub, authenticationSpy, setCurrentAccountMock };
};

const simulateValidSubmit = (
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  Helper.populateField('email', email);
  Helper.populateField('password', password);
  const form = screen.getByTestId('form');
  fireEvent.submit(form);
};

describe('Login Component', () => {
  test('Should start with initial state', async () => {
    const { validationStub } = makeSut();
    await Helper.testChildCount('error-wrap', 0);
    expect(screen.getByTestId('submit')).toBeDisabled();
    Helper.testStatusForField('email', validationStub);
    Helper.testStatusForField('password', validationStub);
  });

  test('Should show email error if Validation fails', () => {
    const { validationStub } = makeSut();
    Helper.populateField('email');
    Helper.testStatusForField('email', validationStub);
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { validationStub } = makeSut();
    validationStub.errorMessage = '';
    Helper.populateField('email');
    Helper.testStatusForField('email', validationStub);
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { validationStub } = makeSut();
    validationStub.errorMessage = '';
    Helper.populateField('password');
    Helper.testStatusForField('password', validationStub);
  });

  test('Should submit button if form is valid', () => {
    const { validationStub } = makeSut();
    validationStub.errorMessage = '';
    Helper.populateField('email');
    Helper.populateField('password');
    expect(screen.getByTestId('submit')).toBeEnabled();
  });

  test('Should show spinner on submit', () => {
    const { validationStub } = makeSut();
    validationStub.errorMessage = '';
    simulateValidSubmit();
    expect(screen.queryByTestId('spinner')).toBeInTheDocument();
  });

  test('Should call Authentication with correct values', () => {
    const { validationStub, authenticationSpy } = makeSut();
    validationStub.errorMessage = '';
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(email, password);
    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test('Should call Authentication only once', () => {
    const { validationStub, authenticationSpy } = makeSut();
    validationStub.errorMessage = '';
    simulateValidSubmit();
    simulateValidSubmit();
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should call Authentication if form is invalid', () => {
    const { authenticationSpy } = makeSut();
    Helper.populateField('email');
    fireEvent.submit(screen.getByTestId('form'));
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy, validationStub } = makeSut();
    validationStub.errorMessage = '';
    const error = new InvaildCredentialsError();
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error);
    simulateValidSubmit();
    await Helper.testChildCount('error-wrap', 1);
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message);
  });

  test('Should call UpdateCurrentAccount on success', async () => {
    const { validationStub, authenticationSpy, setCurrentAccountMock } =
      makeSut();
    validationStub.errorMessage = '';
    simulateValidSubmit();
    await screen.findByTestId('form');
    expect(setCurrentAccountMock).toHaveBeenCalledWith(
      authenticationSpy.account
    );
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  test('Should go to signup page', () => {
    makeSut();
    const signupLink = screen.getByTestId('signup-link');
    fireEvent.click(signupLink);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/signup');
  });

  test('Should call Validatiion with correct email', () => {
    const { validationStub } = makeSut();
    const email = faker.internet.email();
    Helper.populateField('email', email);
    expect(validationStub.fieldName).toBe('email');
    expect(validationStub.fieldValue).toBe(email);
  });

  test('Should call Validatiion with correct password', () => {
    const { validationStub } = makeSut();
    const password = faker.internet.password();
    Helper.populateField('password', password);
    expect(validationStub.fieldName).toBe('password');
    expect(validationStub.fieldValue).toBe(password);
  });

  test('Should show password error if Validation fails', () => {
    const { validationStub } = makeSut();
    Helper.populateField('password');
    Helper.testStatusForField('password', validationStub);
  });
});

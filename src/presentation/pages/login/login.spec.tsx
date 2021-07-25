import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import faker from 'faker';
import { InvaildCredentialsError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { ValidationStub, AuthenticationSpy, Helper } from '@/presentation/test';
import { Login } from '@/presentation/pages';
import { ApiContext } from '@/presentation/context';

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
  setCurrentAccountMock: (account: AccountModel) => void;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });
const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy();
  const setCurrentAccountMock = jest.fn();
  const validationStub = new ValidationStub();
  validationStub.errorMessage = faker.random.words();
  const sut = render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>
  );
  return { sut, validationStub, authenticationSpy, setCurrentAccountMock };
};

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  Helper.populateField(sut, 'email', email);
  Helper.populateField(sut, 'password', password);
  const form = sut.getByTestId('form');
  fireEvent.submit(form);
};

describe('Login Component', () => {
  afterEach(cleanup);
  test('Should start with initial state', async () => {
    const { sut, validationStub } = makeSut();
    await Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonDisabled(sut, 'submit', true);
    Helper.testStatusForField(sut, 'email', validationStub);
    Helper.testStatusForField(sut, 'password', validationStub);
  });

  test('Should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut();
    Helper.populateField(sut, 'email');
    Helper.testStatusForField(sut, 'email', validationStub);
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = '';
    Helper.populateField(sut, 'email');
    Helper.testStatusForField(sut, 'email', validationStub);
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = '';
    Helper.populateField(sut, 'password');
    Helper.testStatusForField(sut, 'password', validationStub);
  });

  test('Should submit button if form is valid', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = '';
    Helper.populateField(sut, 'email');
    Helper.populateField(sut, 'password');
    Helper.testButtonDisabled(sut, 'submit', false);
  });

  test('Should show spinner on submit', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = '';
    simulateValidSubmit(sut);
    Helper.testElementExists(sut, 'spinner');
  });

  test('Should call Authentication with correct values', () => {
    const { sut, validationStub, authenticationSpy } = makeSut();
    validationStub.errorMessage = '';
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test('Should call Authentication only once', () => {
    const { sut, validationStub, authenticationSpy } = makeSut();
    validationStub.errorMessage = '';
    simulateValidSubmit(sut);
    simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should call Authentication if form is invalid', () => {
    const { sut, authenticationSpy } = makeSut();
    Helper.populateField(sut, 'email');
    fireEvent.submit(sut.getByTestId('form'));
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy, validationStub } = makeSut();
    validationStub.errorMessage = '';
    const error = new InvaildCredentialsError();
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error);
    simulateValidSubmit(sut);
    await Helper.testChildCount(sut, 'error-wrap', 1);
    Helper.testElementText(sut, 'main-error', error.message);
  });

  test('Should call UpdateCurrentAccount on success', async () => {
    const { sut, validationStub, authenticationSpy, setCurrentAccountMock } =
      makeSut();
    validationStub.errorMessage = '';
    simulateValidSubmit(sut);
    await sut.findByTestId('form');
    expect(setCurrentAccountMock).toHaveBeenCalledWith(
      authenticationSpy.account
    );
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  test('Should go to signup page', () => {
    const { sut } = makeSut();
    const signupLink = sut.getByTestId('signup-link');
    fireEvent.click(signupLink);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/signup');
  });

  test('Should call Validatiion with correct email', () => {
    const { sut, validationStub } = makeSut();
    const email = faker.internet.email();
    Helper.populateField(sut, 'email', email);
    expect(validationStub.fieldName).toBe('email');
    expect(validationStub.fieldValue).toBe(email);
  });

  test('Should call Validatiion with correct password', () => {
    const { sut, validationStub } = makeSut();
    const password = faker.internet.password();
    Helper.populateField(sut, 'password', password);
    expect(validationStub.fieldName).toBe('password');
    expect(validationStub.fieldValue).toBe(password);
  });

  test('Should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut();
    Helper.populateField(sut, 'password');
    Helper.testStatusForField(sut, 'password', validationStub);
  });
});

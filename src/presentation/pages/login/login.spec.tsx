import React from 'react';
import faker from 'faker';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import { ValidationStub, AuthenticationSpy } from '@/presentation/test';
import Login from './login';

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
};
const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = faker.random.words();
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  );
  return { sut, validationStub, authenticationSpy };
};

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email');
  fireEvent.input(emailInput, { target: { value: email } });
};
const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password');
  fireEvent.input(passwordInput, { target: { value: password } });
};
const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);
  const submitButton = sut.getByTestId('submit');
  fireEvent.click(submitButton);
};

const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationStub: ValidationStub
): void => {
  const status = sut.getByTestId(`${fieldName}-status`);
  const { title, textContent } = status;
  const { errorMessage } = validationStub;
  expect(title).toBe(errorMessage || '認証に成功');
  expect(textContent).toBe(errorMessage ? '🔴' : '🔵');
};

describe('Login Component', () => {
  afterEach(cleanup);
  test('Should start with initial state', () => {
    const { sut, validationStub } = makeSut();
    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    simulateStatusForField(sut, 'email', validationStub);
    simulateStatusForField(sut, 'password', validationStub);
  });

  test('Should call Validatiion with correct email', () => {
    const { sut, validationStub } = makeSut();
    const email = faker.internet.email();
    populateEmailField(sut, email);
    expect(validationStub.fieldName).toBe('email');
    expect(validationStub.fieldValue).toBe(email);
  });

  test('Should call Validatiion with correct password', () => {
    const { sut, validationStub } = makeSut();
    const password = faker.internet.password();
    populatePasswordField(sut, password);
    expect(validationStub.fieldName).toBe('password');
    expect(validationStub.fieldValue).toBe(password);
  });

  test('Should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut();
    populateEmailField(sut);
    simulateStatusForField(sut, 'email', validationStub);
  });

  test('Should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut();
    populatePasswordField(sut);
    simulateStatusForField(sut, 'password', validationStub);
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    populateEmailField(sut);
    simulateStatusForField(sut, 'email', validationStub);
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    populatePasswordField(sut);
    simulateStatusForField(sut, 'password', validationStub);
  });

  test('Should submit button if form is valid', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    populateEmailField(sut);
    populatePasswordField(sut);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test('Should submit button if form is valid', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    simulateValidSubmit(sut);
    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Should call Authentication with correct values', () => {
    const { sut, validationStub, authenticationSpy } = makeSut();
    validationStub.errorMessage = null;
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({ email, password });
  });
});

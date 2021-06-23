import React from 'react';
import faker from 'faker';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import { Authentication, AuthenticationParams } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';
import { ValidationStub } from '@/presentation/test';
import Login from './login';

class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return Promise.resolve(this.account);
  }
}

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

describe('Login Component', () => {
  afterEach(cleanup);
  test('Should start with initial state', () => {
    const { sut, validationStub } = makeSut();
    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should call Validatiion with correct email', () => {
    const { sut, validationStub } = makeSut();
    const emailInput = sut.getByTestId('email');
    const email = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: email } });
    expect(validationStub.fieldName).toBe('email');
    expect(validationStub.fieldValue).toBe(email);
  });

  test('Should call Validatiion with correct password', () => {
    const { sut, validationStub } = makeSut();
    const passwordInput = sut.getByTestId('password');
    const password = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: password } });
    expect(validationStub.fieldName).toBe('password');
    expect(validationStub.fieldValue).toBe(password);
  });

  test('Should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');
  });

  test('Should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut();
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('認証に成功');
    expect(emailStatus.textContent).toBe('🔵');
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('認証に成功');
    expect(passwordStatus.textContent).toBe('🔵');
  });

  test('Should submit button if form is valid', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test('Should submit button if form is valid', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const submitButton = sut.getByTestId('submit');
    fireEvent.click(submitButton);
    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Should call Authentication with correct values', () => {
    const { sut, validationStub, authenticationSpy } = makeSut();
    validationStub.errorMessage = null;
    const emailInput = sut.getByTestId('email');
    const email = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: email } });
    const passwordInput = sut.getByTestId('password');
    const password = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: password } });
    const submitButton = sut.getByTestId('submit');
    fireEvent.click(submitButton);
    expect(authenticationSpy.params).toEqual({ email, password });
  });
});

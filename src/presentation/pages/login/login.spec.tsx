import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import faker from 'faker';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import { InvaildCredentialsError } from '@/domain/errors';
import {
  ValidationStub,
  AuthenticationSpy,
  SaveAccessTokenMock,
  Helper,
} from '@/presentation/test';
import { Login } from '@/presentation/pages';

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });
const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  const validationStub = new ValidationStub();
  validationStub.errorMessage = faker.random.words();
  const sut = render(
    <Router history={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  );
  return { sut, validationStub, authenticationSpy, saveAccessTokenMock };
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

const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const el = sut.getByTestId(fieldName);
  expect(el).toBeTruthy();
};

const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string
): void => {
  const el = sut.getByTestId(fieldName);
  expect(el.textContent).toBe(text);
};

const testErrorWrapChildCount = async (
  sut: RenderResult,
  count: number
): Promise<void> => {
  const errorWrap = await sut.findByTestId('error-wrap');
  expect(errorWrap.childElementCount).toBe(count);
};

describe('Login Component', () => {
  afterEach(cleanup);
  test('Should start with initial state', async () => {
    const { sut, validationStub } = makeSut();
    await testErrorWrapChildCount(sut, 0);
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
    validationStub.errorMessage = null;
    Helper.populateField(sut, 'email');
    Helper.testStatusForField(sut, 'email', validationStub);
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    Helper.populateField(sut, 'password');
    Helper.testStatusForField(sut, 'password', validationStub);
  });

  test('Should submit button if form is valid', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    Helper.populateField(sut, 'email');
    Helper.populateField(sut, 'password');
    Helper.testButtonDisabled(sut, 'submit', false);
  });

  test('Should submit button if form is valid', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    simulateValidSubmit(sut);
    testElementExists(sut, 'spinner');
  });

  test('Should call Authentication with correct values', () => {
    const { sut, validationStub, authenticationSpy } = makeSut();
    validationStub.errorMessage = null;
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test('Should call Authentication only once', () => {
    const { sut, validationStub, authenticationSpy } = makeSut();
    validationStub.errorMessage = null;
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
    validationStub.errorMessage = null;
    const error = new InvaildCredentialsError();
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error));
    simulateValidSubmit(sut);
    await testErrorWrapChildCount(sut, 1);
    testElementText(sut, 'main-error', error.message);
  });

  test('Should call SaveAaccessToken on success', async () => {
    const { sut, validationStub, authenticationSpy, saveAccessTokenMock } =
      makeSut();
    validationStub.errorMessage = null;
    simulateValidSubmit(sut);
    await sut.findByTestId('form');
    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken
    );
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  test('Should present error if SaveAaccessToken fails', async () => {
    const { sut, validationStub, saveAccessTokenMock } = makeSut();
    validationStub.errorMessage = null;
    const error = new InvaildCredentialsError();
    jest
      .spyOn(saveAccessTokenMock, 'save')
      .mockReturnValueOnce(Promise.reject(error));
    simulateValidSubmit(sut);
    await testErrorWrapChildCount(sut, 1);
    testElementText(sut, 'main-error', error.message);
  });

  test('Should go to signup page', () => {
    const { sut } = makeSut();
    const signup = sut.getByTestId('signup');
    fireEvent.click(signup);
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

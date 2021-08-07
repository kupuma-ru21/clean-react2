import React from 'react';
import { Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { createMemoryHistory } from 'history';
import { screen, render, fireEvent } from '@testing-library/react';
import faker from 'faker';
import { EmailInUseError } from '@/domain/errors';
import { AddAccountSpy } from '@/domain/test';
import { ValidationStub, Helper } from '@/presentation/test';
import { ApiContext } from '@/presentation/context';
import SignUp from './signup';
import { AddAccount } from '@/domain/usecases';

type SutTypes = {
  validationStub: ValidationStub;
  addAccountSpy: AddAccountSpy;
  setCurrentAccountMock: (account: AddAccount.Model) => void;
};

const history = createMemoryHistory({ initialEntries: ['/signup'] });
const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy();
  const setCurrentAccountMock = jest.fn();
  const validationStub = new ValidationStub();
  validationStub.errorMessage = faker.random.words();
  render(
    <RecoilRoot>
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router history={history}>
          <SignUp addAccount={addAccountSpy} validation={validationStub} />
        </Router>
      </ApiContext.Provider>
    </RecoilRoot>
  );
  return { validationStub, addAccountSpy, setCurrentAccountMock };
};

const simulateValidSubmit = (
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  Helper.populateField('name', name);
  Helper.populateField('email', email);
  Helper.populateField('password', password);
  Helper.populateField('passwordConfirmation', password);
  const form = screen.getByTestId('form');
  fireEvent.submit(form);
};

describe('SignUp Component', () => {
  test('Should start with initial state', async () => {
    const { validationStub } = makeSut();
    await Helper.testChildCount('error-wrap', 0);
    expect(screen.getByTestId('submit')).toBeDisabled();
    Helper.testStatusForField('name', validationStub);
    Helper.testStatusForField('email', validationStub);
    Helper.testStatusForField('password', validationStub);
    Helper.testStatusForField('passwordConfirmation', validationStub);
  });

  test('Should show name error if Validation fails', () => {
    const { validationStub } = makeSut();
    validationStub.errorMessage = faker.random.words();
    Helper.populateField('name');
    Helper.testStatusForField('name', validationStub);
  });

  test('Should show email error if Validation fails', () => {
    const { validationStub } = makeSut();
    validationStub.errorMessage = faker.random.words();
    Helper.populateField('email');
    Helper.testStatusForField('email', validationStub);
  });

  test('Should show password error if Validation fails', () => {
    const { validationStub } = makeSut();
    validationStub.errorMessage = faker.random.words();
    Helper.populateField('password');
    Helper.testStatusForField('password', validationStub);
  });

  test('Should show passwordConfirmation error if Validation fails', () => {
    const { validationStub } = makeSut();
    validationStub.errorMessage = faker.random.words();
    Helper.populateField('passwordConfirmation');
    Helper.testStatusForField('passwordConfirmation', validationStub);
  });

  test('Should show valid name state if Validation succeeds', () => {
    const { validationStub } = makeSut();
    validationStub.errorMessage = '';
    Helper.populateField('name');
    Helper.testStatusForField('name', validationStub);
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

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    const { validationStub } = makeSut();
    validationStub.errorMessage = '';
    Helper.populateField('passwordConfirmation');
    Helper.testStatusForField('passwordConfirmation', validationStub);
  });

  test('Should submit button if form is valid', () => {
    const { validationStub } = makeSut();
    validationStub.errorMessage = '';
    Helper.populateField('name');
    Helper.populateField('email');
    Helper.populateField('password');
    Helper.populateField('passwordConfirmation');
    expect(screen.getByTestId('submit')).toBeEnabled();
  });

  test('Should show spinner on submit', () => {
    const { validationStub } = makeSut();
    validationStub.errorMessage = '';
    simulateValidSubmit();
    expect(screen.queryByTestId('spinner')).toBeInTheDocument();
  });

  test('Should call AddAccount with correct values', () => {
    const { validationStub, addAccountSpy } = makeSut();
    validationStub.errorMessage = '';
    const name = faker.name.firstName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(name, email, password);
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });

  test('Should call AddAccount only once', () => {
    const { validationStub, addAccountSpy } = makeSut();
    validationStub.errorMessage = '';
    simulateValidSubmit();
    simulateValidSubmit();
    expect(addAccountSpy.callsCount).toBe(1);
  });

  test('Should call AddAcount if form is invalid', () => {
    const { addAccountSpy } = makeSut();
    Helper.populateField('email');
    fireEvent.submit(screen.getByTestId('form'));
    expect(addAccountSpy.callsCount).toBe(0);
  });

  test('Should present error if AddAccount fails', async () => {
    const { addAccountSpy, validationStub } = makeSut();
    validationStub.errorMessage = '';
    const error = new EmailInUseError();
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error);
    simulateValidSubmit();
    await Helper.testChildCount('error-wrap', 1);
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message);
  });

  test('Should call UpdateCurrentAccount on success', async () => {
    const { validationStub, addAccountSpy, setCurrentAccountMock } = makeSut();
    validationStub.errorMessage = '';
    simulateValidSubmit();
    await screen.findByTestId('form');
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  test('Should go to login page', () => {
    makeSut();
    const loginLink = screen.getByTestId('login-link');
    fireEvent.click(loginLink);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/login');
  });

  test('Should call Validatiion with correct name', () => {
    const { validationStub } = makeSut();
    const name = faker.name.findName();
    Helper.populateField('name', name);
    expect(validationStub.fieldName).toBe('name');
    expect(validationStub.fieldValue).toBe(name);
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

  test('Should call Validatiion with correct passwordConfirmation', () => {
    const { validationStub } = makeSut();
    const passwordConfirmation = faker.internet.password();
    Helper.populateField('passwordConfirmation', passwordConfirmation);
    expect(validationStub.fieldName).toBe('passwordConfirmation');
    expect(validationStub.fieldValue).toBe(passwordConfirmation);
  });
});

import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  RenderResult,
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import faker from 'faker';
import {
  ValidationStub,
  Helper,
  AddAccountSpy,
  SaveAccessTokenMock,
} from '@/presentation/test';
import SignUp from './signup';
import { EmainInUseError } from '@/domain/errors';

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
  addAccountSpy: AddAccountSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

const history = createMemoryHistory({ initialEntries: ['/signup'] });
const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  const validationStub = new ValidationStub();
  validationStub.errorMessage = faker.random.words();
  const sut = render(
    <Router history={history}>
      <SignUp
        addAccount={addAccountSpy}
        validation={validationStub}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  );
  return { sut, validationStub, addAccountSpy, saveAccessTokenMock };
};

const simulateValidSubmit = (
  sut: RenderResult,
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  Helper.populateField(sut, 'name', name);
  Helper.populateField(sut, 'email', email);
  Helper.populateField(sut, 'password', password);
  Helper.populateField(sut, 'passwordConfirmation', password);
  const form = sut.getByTestId('form');
  fireEvent.submit(form);
};

describe('SignUp Component', () => {
  afterEach(cleanup);

  test('Should start with initial state', async () => {
    const { sut, validationStub } = makeSut();
    await Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonDisabled(sut, 'submit', true);
    Helper.testStatusForField(sut, 'name', validationStub);
    Helper.testStatusForField(sut, 'email', validationStub);
    Helper.testStatusForField(sut, 'password', validationStub);
    Helper.testStatusForField(sut, 'passwordConfirmation', validationStub);
  });

  test('Should show name error if Validation fails', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = faker.random.words();
    Helper.populateField(sut, 'name');
    Helper.testStatusForField(sut, 'name', validationStub);
  });

  test('Should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = faker.random.words();
    Helper.populateField(sut, 'email');
    Helper.testStatusForField(sut, 'email', validationStub);
  });

  test('Should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = faker.random.words();
    Helper.populateField(sut, 'password');
    Helper.testStatusForField(sut, 'password', validationStub);
  });

  test('Should show passwordConfirmation error if Validation fails', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = faker.random.words();
    Helper.populateField(sut, 'passwordConfirmation');
    Helper.testStatusForField(sut, 'passwordConfirmation', validationStub);
  });

  test('Should show valid name state if Validation succeeds', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    Helper.populateField(sut, 'name');
    Helper.testStatusForField(sut, 'name', validationStub);
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

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    Helper.populateField(sut, 'passwordConfirmation');
    Helper.testStatusForField(sut, 'passwordConfirmation', validationStub);
  });

  test('Should submit button if form is valid', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    Helper.populateField(sut, 'name');
    Helper.populateField(sut, 'email');
    Helper.populateField(sut, 'password');
    Helper.populateField(sut, 'passwordConfirmation');
    Helper.testButtonDisabled(sut, 'submit', false);
  });

  test('Should show spinner on submit', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    simulateValidSubmit(sut);
    Helper.testElementExists(sut, 'spinner');
  });

  test('Should call AddAccount with correct values', () => {
    const { sut, validationStub, addAccountSpy } = makeSut();
    validationStub.errorMessage = null;
    const name = faker.name.firstName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, name, email, password);
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });

  test('Should call AddAccount only once', () => {
    const { sut, validationStub, addAccountSpy } = makeSut();
    validationStub.errorMessage = null;
    simulateValidSubmit(sut);
    simulateValidSubmit(sut);
    expect(addAccountSpy.callsCount).toBe(1);
  });

  test('Should call AddAcount if form is invalid', () => {
    const { sut, addAccountSpy } = makeSut();
    Helper.populateField(sut, 'email');
    fireEvent.submit(sut.getByTestId('form'));
    expect(addAccountSpy.callsCount).toBe(0);
  });

  test('Should present error if AddAccount fails', async () => {
    const { sut, addAccountSpy, validationStub } = makeSut();
    validationStub.errorMessage = null;
    const error = new EmainInUseError();
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error);
    simulateValidSubmit(sut);
    await Helper.testChildCount(sut, 'error-wrap', 1);
    Helper.testElementText(sut, 'main-error', error.message);
  });

  test('Should call SaveAaccessToken on success', async () => {
    const { sut, validationStub, addAccountSpy, saveAccessTokenMock } =
      makeSut();
    validationStub.errorMessage = null;
    simulateValidSubmit(sut);
    await sut.findByTestId('form');
    expect(saveAccessTokenMock.accessToken).toBe(
      addAccountSpy.account.accessToken
    );
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });
});

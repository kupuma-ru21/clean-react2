import React from 'react';
import {
  RenderResult,
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import faker from 'faker';
import { ValidationStub, Helper, AddAccountSpy } from '@/presentation/test';
import SignUp from './signup';

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
  addAccountSpy: AddAccountSpy;
};
const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy();
  const validationStub = new ValidationStub();
  validationStub.errorMessage = faker.random.words();
  const sut = render(
    <SignUp addAccount={addAccountSpy} validation={validationStub} />
  );
  return { sut, validationStub, addAccountSpy };
};

const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  const el = sut.getByTestId(fieldName);
  expect(el.childElementCount).toBe(count);
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

  test('Should start with initial state', () => {
    const { sut, validationStub } = makeSut();
    testChildCount(sut, 'error-wrap', 0);
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
});

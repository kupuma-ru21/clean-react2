import React from 'react';
import { RenderResult, render, cleanup } from '@testing-library/react';
import faker from 'faker';
import { ValidationStub, Helper } from '@/presentation/test';
import SignUp from './signup';

type SutTypes = { sut: RenderResult; validationStub: ValidationStub };
const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const sut = render(<SignUp validation={validationStub} />);
  return { sut, validationStub };
};

const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  const el = sut.getByTestId(fieldName);
  expect(el.childElementCount).toBe(count);
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
    validationStub.errorMessage = 'error';
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
});

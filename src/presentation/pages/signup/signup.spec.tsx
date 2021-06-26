import React from 'react';
import {
  RenderResult,
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react';
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

const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = sut.getByTestId(fieldName);
  fireEvent.input(input, { target: { value } });
};

describe('SignUp Component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const { sut, validationStub } = makeSut();
    testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonDisabled(sut, 'submit', true);
    Helper.testStatusForField(sut, 'name', validationStub);
    validationStub.errorMessage = 'error';
    Helper.testStatusForField(sut, 'email', validationStub);
    Helper.testStatusForField(sut, 'password', validationStub);
    Helper.testStatusForField(sut, 'passwordConfirmation', validationStub);
  });

  test('Should show name error if Validation fails', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = faker.random.words();
    populateField(sut, 'name');
    Helper.testStatusForField(sut, 'name', validationStub);
  });
});

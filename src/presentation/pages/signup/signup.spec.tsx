import React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { ValidationStub, Helper } from '@/presentation/test';
import SignUp from './signup';

type SutTypes = { sut: RenderResult; validationStub: ValidationStub };
const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const sut = render(<SignUp />);
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
  test('Should start with initial state', () => {
    const { sut, validationStub } = makeSut();
    testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonDisabled(sut, 'submit', true);
    validationStub.errorMessage = 'error';
    Helper.testStatusForField(sut, 'name', validationStub);
    Helper.testStatusForField(sut, 'email', validationStub);
    Helper.testStatusForField(sut, 'password', validationStub);
    Helper.testStatusForField(sut, 'passwordConfirmation', validationStub);
  });
});

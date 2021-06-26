import React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { ValidationStub } from '@/presentation/test';
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

const testButtonDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const submitButton = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(submitButton.disabled).toBe(isDisabled);
};

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationStub: ValidationStub
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  const { title, textContent } = fieldStatus;
  const { errorMessage } = validationStub;
  expect(title).toBe(errorMessage || '認証に成功');
  expect(textContent).toBe(errorMessage ? '🔴' : '🔵');
};

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const { sut, validationStub } = makeSut();
    testChildCount(sut, 'error-wrap', 0);
    testButtonDisabled(sut, 'submit', true);
    validationStub.errorMessage = 'error';
    testStatusForField(sut, 'name', validationStub);
    testStatusForField(sut, 'email', validationStub);
    testStatusForField(sut, 'password', validationStub);
    testStatusForField(sut, 'passwordConfirmation', validationStub);
  });
});

import { fireEvent, RenderResult } from '@testing-library/react';
import faker from 'faker';
import { ValidationStub } from './mock-validation';

export const testButtonDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const submitButton = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(submitButton.disabled).toBe(isDisabled);
};

export const testStatusForField = (
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

export const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = sut.getByTestId(fieldName);
  fireEvent.input(input, { target: { value } });
};

export const testElementExists = (
  sut: RenderResult,
  fieldName: string
): void => {
  const el = sut.getByTestId(fieldName);
  expect(el).toBeTruthy();
};

export const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string
): void => {
  const el = sut.getByTestId(fieldName);
  expect(el.textContent).toBe(text);
};

export const testChildCount = async (
  sut: RenderResult,
  fieldName: string,
  count: number
): Promise<void> => {
  const el = await sut.findByTestId(fieldName);
  expect(el.childElementCount).toBe(count);
};

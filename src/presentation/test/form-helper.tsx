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
  const wrap = sut.getByTestId(`${fieldName}-wrap`);
  const field = sut.getByTestId(fieldName);
  const label = sut.getByTestId(`${fieldName}-label`);
  const { errorMessage } = validationStub;
  expect(wrap.getAttribute('data-status')).toBe(
    errorMessage ? 'invalid' : 'valid'
  );
  expect(field.title).toBe(errorMessage);
  expect(label.title).toBe(errorMessage);
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

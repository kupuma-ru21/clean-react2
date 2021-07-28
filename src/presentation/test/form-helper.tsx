import { fireEvent, screen } from '@testing-library/react';
import faker from 'faker';
import { ValidationStub } from './mock-validation';

export const testButtonDisabled = (
  fieldName: string,
  isDisabled: boolean
): void => {
  const submitButton = screen.getByTestId(fieldName) as HTMLButtonElement;
  expect(submitButton.disabled).toBe(isDisabled);
};

export const testStatusForField = (
  fieldName: string,
  validationStub: ValidationStub
): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`);
  const field = screen.getByTestId(fieldName);
  const label = screen.getByTestId(`${fieldName}-label`);
  const { errorMessage } = validationStub;
  expect(wrap.getAttribute('data-status')).toBe(
    errorMessage ? 'invalid' : 'valid'
  );
  expect(field.title).toBe(errorMessage);
  expect(label.title).toBe(errorMessage);
};

export const populateField = (
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = screen.getByTestId(fieldName);
  fireEvent.input(input, { target: { value } });
};

export const testElementExists = (fieldName: string): void => {
  const el = screen.getByTestId(fieldName);
  expect(el).toBeTruthy();
};

export const testElementText = (fieldName: string, text: string): void => {
  const el = screen.getByTestId(fieldName);
  expect(el.textContent).toBe(text);
};

export const testChildCount = async (
  fieldName: string,
  count: number
): Promise<void> => {
  const el = await screen.findByTestId(fieldName);
  expect(el.childElementCount).toBe(count);
};

import { fireEvent, screen } from '@testing-library/react';
import faker from 'faker';
import { ValidationStub } from './mock-validation';

export const testStatusForField = (
  fieldName: string,
  validationStub: ValidationStub
): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`);
  const field = screen.getByTestId(fieldName);
  const label = screen.getByTestId(`${fieldName}-label`);
  const { errorMessage } = validationStub;
  expect(wrap).toHaveAttribute(
    'data-status',
    errorMessage ? 'invalid' : 'valid'
  );
  expect(field).toHaveProperty('title', errorMessage);
  expect(label).toHaveProperty('title', errorMessage);
};

export const populateField = (
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = screen.getByTestId(fieldName);
  fireEvent.input(input, { target: { value } });
};

export const testChildCount = async (
  fieldName: string,
  count: number
): Promise<void> => {
  const el = await screen.findByTestId(fieldName);
  expect(el.children).toHaveLength(count);
};

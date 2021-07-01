import faker from 'faker';
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from '@/validation/validators';
import { CompareFieldsValidation } from '../compare-field/compare-field-validation';
import { ValidationBuilder as sut } from './validation-builder';

describe('ValidationBuilder', () => {
  test('Should return RequredFieldValidation', () => {
    const field = faker.database.column();
    const validations = sut.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  test('Should return EmailValidation', () => {
    const field = faker.database.column();
    const validations = sut.field(field).email().build();
    expect(validations).toEqual([new EmailValidation(field)]);
  });

  test('Should return MinLengthValidation', () => {
    const field = faker.database.column();
    const minLength = faker.datatype.number();
    const validations = sut.field(field).min(minLength).build();
    expect(validations).toEqual([new MinLengthValidation(field, minLength)]);
  });

  test('Should return CompareFieldsValidation', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const validations = sut.field(field).sameAs(fieldToCompare).build();
    expect(validations).toEqual([
      new CompareFieldsValidation(field, fieldToCompare),
    ]);
  });

  test('Should return a list of validations', () => {
    const field = faker.database.column();
    const minLength = faker.datatype.number();
    const validations = sut
      .field(field)
      .required()
      .email()
      .min(minLength)
      .build();
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field),
      new MinLengthValidation(field, minLength),
    ]);
  });
});

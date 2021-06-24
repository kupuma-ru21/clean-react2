import faker from 'faker';
import { FieldValidationSpy } from '@/validation/test';
import { ValidationComposite } from './validation-composite';

type SutTyeps = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (fieldName: string): SutTyeps => {
  const fieldValidationSpy = new FieldValidationSpy(fieldName);
  const fieldValidationSpy2 = new FieldValidationSpy(fieldName);
  const fieldValidationsSpy = [fieldValidationSpy, fieldValidationSpy2];
  const sut = ValidationComposite.build(fieldValidationsSpy);

  return { sut, fieldValidationsSpy };
};

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidationsSpy } = makeSut(fieldName);
    const errorFirstMessage = faker.random.words();
    fieldValidationsSpy[0].error = new Error(errorFirstMessage);
    fieldValidationsSpy[1].error = new Error(faker.random.words());
    const error = sut.validate(fieldName, faker.random.word());
    expect(error).toBe(errorFirstMessage);
  });

  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);
    const error = sut.validate(fieldName, faker.random.word());
    expect(error).toBeFalsy();
  });
});

import faker from 'faker';
import { FieldValidationSpy } from '@/validation/validators/test/mock-field-validation';
import { ValidationComposite } from './validation-composite';

type SutTyeps = {
  sut: ValidationComposite;
  fieldalidationsSpy: FieldValidationSpy[];
};

const makeSut = (fieldName: string): SutTyeps => {
  const fieldValidationSpy = new FieldValidationSpy(fieldName);
  const fieldValidationSpy2 = new FieldValidationSpy(fieldName);
  const fieldalidationsSpy = [fieldValidationSpy, fieldValidationSpy2];
  const sut = ValidationComposite.build(fieldalidationsSpy);

  return { sut, fieldalidationsSpy };
};

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column();
    const { sut, fieldalidationsSpy } = makeSut(fieldName);
    const errorFirstMessage = faker.random.words();
    fieldalidationsSpy[0].error = new Error(errorFirstMessage);
    fieldalidationsSpy[1].error = new Error(faker.random.words());
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

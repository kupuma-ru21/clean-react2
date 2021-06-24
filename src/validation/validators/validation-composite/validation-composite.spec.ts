import { FieldValidationSpy } from '@/validation/validators/test/mock-field-validation';
import { ValidationComposite } from './validation-composite';

type SutTyeps = {
  sut: ValidationComposite;
  fieldalidationsSpy: FieldValidationSpy[];
};

const makeSut = (): SutTyeps => {
  const fieldValidationSpy = new FieldValidationSpy('any_field');
  const fieldValidationSpy2 = new FieldValidationSpy('any_field');
  const fieldalidationsSpy = [fieldValidationSpy, fieldValidationSpy2];
  const sut = new ValidationComposite(fieldalidationsSpy);

  return { sut, fieldalidationsSpy };
};

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, fieldalidationsSpy } = makeSut();
    fieldalidationsSpy[0].error = new Error('first_error_message');
    fieldalidationsSpy[1].error = new Error('second_error_message');
    const error = sut.validate('any_field', 'any_value');
    expect(error).toBe('first_error_message');
  });
});

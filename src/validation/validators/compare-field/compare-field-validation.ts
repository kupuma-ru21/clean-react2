import { FieldValidation } from '@/validation/procotols/field-validation';
import { InvalidFieldError } from '@/validation//errors';

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly valueToCompare: string
  ) {}

  validate(value: string): Error {
    return new InvalidFieldError();
  }
}

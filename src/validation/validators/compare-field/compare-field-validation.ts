import { FieldValidation } from '@/validation/procotols/field-validation';
import { InvalidFieldError } from '@/validation//errors';

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate(input: object): Error {
    if (input[this.fieldToCompare] === input[this.field]) return null;
    return new InvalidFieldError();
  }
}

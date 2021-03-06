import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/procotols/field-validation';

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}
  validate(input: object): Error {
    const emailRegex =
      /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    return !input[this.field] || emailRegex.test(input[this.field])
      ? null
      : new InvalidFieldError();
  }
}

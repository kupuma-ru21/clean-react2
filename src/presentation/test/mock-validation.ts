import { Validation } from '@/presentation/procotols/validation';

export class ValidationStub implements Validation {
  errorMessage: string;
  fieldName: string;
  fieldValue: string;
  validate(fieldName: string, input: object): string {
    this.fieldName = fieldName;
    this.fieldValue = input[fieldName];
    return this.errorMessage;
  }
}

import faker from 'faker';
import * as Helper from './http-mock';

export const mockEmailInUseError = (): void => {
  return Helper.mockEmailInUseError(/signup/);
};

export const mockUnexpectedError = (): void => {
  return Helper.mockUnexpectedError(/signup/, 'POST');
};

export const mockInvalidData = (): void => {
  return Helper.mockOk(/signup/, 'POST', {
    invalid: faker.datatype.uuid(),
  });
};

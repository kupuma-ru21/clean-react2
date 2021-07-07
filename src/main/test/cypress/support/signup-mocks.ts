import * as Helper from './http-mock';

export const mockEmailInUseError = (): void => {
  return Helper.mockEmailInUseError(/signup/);
};

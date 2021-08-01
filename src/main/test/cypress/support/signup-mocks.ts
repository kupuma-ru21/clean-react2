import faker from 'faker';
import * as Http from './http-mock';

export const mockEmailInUseError = (): void => {
  return Http.mockForbiddenError(/signup/, 'POST');
};

export const mockUnexpectedError = (): void => {
  return Http.mockServerError(/signup/, 'POST');
};

export const mockOk = (): void => {
  return Http.mockOk(/signup/, 'POST', {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName(),
  });
};

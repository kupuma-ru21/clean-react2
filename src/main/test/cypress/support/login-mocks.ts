import faker from 'faker';
import * as Http from './http-mock';

export const mockInvalidCredentialsError = (): void => {
  return Http.mockUnauthorizedError(/login/);
};

export const mockUnexpectedError = (): void => {
  return Http.mockServerError(/login/, 'POST');
};

export const mockOk = (): void => {
  return Http.mockOk(/login/, 'POST', {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName(),
  });
};

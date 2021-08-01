import * as Http from './http-mock';

export const mockUnexpectedError = (): void => {
  return Http.mockServerError(/surveys/, 'GET');
};

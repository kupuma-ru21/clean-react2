import * as Helper from '../utils/helpers';

describe('PrivateRoutes', () => {
  beforeEach(() => {
    cy.visit('login');
  });
  it('Should logout if survey-list has no token', () => {
    cy.visit('');
    Helper.testUrl('/login');
  });
});
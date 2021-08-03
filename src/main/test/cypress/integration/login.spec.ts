import faker from 'faker';
import * as FormHelper from '../utils/form-helpers';
import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mock';

const path = /login/;

const mockInvalidCredentialsError = (): void => {
  return Http.mockUnauthorizedError(path);
};

const mockUnexpectedError = (): void => {
  return Http.mockServerError(path, 'POST');
};

const mockSuccess = (): void => {
  return Http.mockOk(path, 'POST', 'fx:account');
};

const populateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email());
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
};

const simulateValidSubmit = (): void => {
  populateFields();
  cy.getByTestId('submit').click();
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });
  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', '入力必須です');

    cy.getByTestId('password').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', '入力必須です');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());
    FormHelper.testInputStatus('email', '無効な値');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('password', '無効な値');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
    FormHelper.testInputStatus('password');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present InvalidCredentialsError on 401', () => {
    mockInvalidCredentialsError();
    simulateValidSubmit();
    FormHelper.testMainError('Credentials invailds');

    Helper.testUrl('/login');
  });

  it('Should present UnExpectedError on default error cases', () => {
    mockUnexpectedError();

    simulateValidSubmit();
    FormHelper.testMainError(
      'Algo de errado acounteceu. Tente novaente em breve.'
    );

    Helper.testUrl('/login');
  });

  it('Should present save accessToken if valid cledentials are provided', () => {
    mockSuccess();
    simulateValidSubmit();

    Helper.testUrl('/');
    cy.window().then((window) => Helper.testLocalStorageItem('account'));
  });

  it('Should prevent multiple submits', () => {
    mockSuccess();
    populateFields();
    cy.getByTestId('submit').dblclick();
    cy.wait('@request');
    Helper.testHttpCallsCount(1);
  });

  it('Should not call if form is invalid', () => {
    mockSuccess();
    cy.getByTestId('email')
      .focus()
      .type(faker.internet.email())
      .type('{enter}');

    Helper.testHttpCallsCount(0);
  });
});

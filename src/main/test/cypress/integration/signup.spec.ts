import faker from 'faker';
import * as FormHelper from '../support/form-helper';

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup');
  });
  it('Should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('name', '入力必須です');

    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', '入力必須です');

    cy.getByTestId('password').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', '入力必須です');

    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('passwordConfirmation', '入力必須です');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('name', '無効な値');

    cy.getByTestId('email').focus().type(faker.random.word());
    FormHelper.testInputStatus('email', '無効な値');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('password', '無効な値');

    cy.getByTestId('passwordConfirmation')
      .focus()
      .type(faker.random.alphaNumeric(4));
    FormHelper.testInputStatus('passwordConfirmation', '無効な値');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });
});

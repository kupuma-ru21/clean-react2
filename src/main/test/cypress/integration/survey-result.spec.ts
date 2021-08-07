import faker from 'faker';
import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mock';

const path = /surveys/;

const mockUnexpectedError = (): void => {
  return Http.mockServerError(path, 'GET');
};

const mockSuccess = (): void => {
  return Http.mockOk(path, 'GET', 'fx:survey-result');
};

const mockAccessDeniedError = (): void => {
  return Http.mockForbiddenError(path, 'GET');
};

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem('account', account);
    });
    Helper.setLocalStorageItem('account', {
      accessToken: faker.datatype.uuid(),
      name: faker.name.findName(),
    });
  });

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError();
    cy.visit('/surveys/any_id');
    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado acounteceu. Tente novaente em breve.'
    );
  });

  it('Should reload on button click', () => {
    mockUnexpectedError();
    cy.visit('/surveys/any_id');
    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado acounteceu. Tente novaente em breve.'
    );
    mockSuccess();
    cy.getByTestId('reload').click();
    cy.getByTestId('question').should('exist');
  });

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError();
    cy.visit('/surveys/any_id');
    Helper.testUrl('/login');
  });

  it('Should present surveyResult', () => {
    mockSuccess();
    cy.visit('/surveys/any_id');
    cy.getByTestId('question').should('have.text', 'Question 1');
    cy.getByTestId('day').should('have.text', '03');
    cy.getByTestId('month').should('have.text', 'fev');
    cy.getByTestId('year').should('have.text', '2018');

    cy.get('li:nth-child(1)').then((li) => {
      assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer');
      assert.equal(li.find('[data-testid="percent"]').text(), '70%');
      assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image');
    });

    cy.get('li:nth-child(2)').then((li) => {
      assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer2');
      assert.equal(li.find('[data-testid="percent"]').text(), '30%');
      assert.notExists(li.find('[data-testid="image"]'));
    });
  });

  it('Should goto SurveyList on back button click', () => {
    cy.visit('');
    mockSuccess();
    cy.visit('/surveys/any_id');
    cy.getByTestId('back-button').click();
    Helper.testUrl('/');
  });
});
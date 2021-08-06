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
});

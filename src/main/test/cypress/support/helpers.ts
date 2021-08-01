const baseUrl: string = Cypress.config().baseUrl;

export const testHttpCallsCount = (count: number): void => {
  cy.get('@request.all').should('have.length', count);
};

export const testUrl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`);
};

export const testLocalStorageItem = (key: string): void => {
  assert.isOk(window.localStorage.getItem(key));
};

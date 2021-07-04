describe('Login', () => {
  beforeEach(() => cy.visit('login'));
  it('Should load with correct initial state', () => {
    cy.getByTestId('email-status').should('have.attr', 'title', '入力必須です');
  });
});

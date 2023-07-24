describe('Login Page Nvigation', () => {
  it('should navigate to the login page', () => {
    cy.visit('http://localhost:3000/');
    cy.get('a[href*="/auth/signin"]').first().click();
    cy.url().should('include', '/auth/signin');
  });
});

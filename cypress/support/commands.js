Cypress.Commands.add('initTest', () => {
    cy.viewport(Cypress.env("testViewport"));
    cy.visit(Cypress.env("testUrl"));
    cy.clearCookies()
    cy.clearLocalStorage()
  });
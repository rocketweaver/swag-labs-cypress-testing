// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import * as TestFactories from "./page_objects/helpers/helpers";

Cypress.Commands.add("loginToApp", (username, password) => {
  cy.visit("https://www.saucedemo.com");

  if (username) {
    cy.get("[placeholder='Username']").type(username);
  }

  if (password) {
    cy.get("[placeholder='Password']").type(password);
  }

  cy.get("[name='login-button']").should("contain", "Login").click();
  cy.wait(500);

  if (!username) {
    TestFactories.containErrorRequired("skipUsername");
  }

  if (!password) {
    TestFactories.containErrorRequired("skipPassword");
  }
});

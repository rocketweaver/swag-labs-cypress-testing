import { onHomePage } from "../support/page_objects/homePage";

describe("Homepage", () => {
  const username = [
    "standard_user",
    "error_user",
    "visual_user",
    "performance_glitch_user",
    "problem_user",
  ];

  before(() => {
    cy.visit("/");
  });

  it("Verify user can see product list with price, title, description, and 'Add to Cart' button", () => {
    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");
      cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
      cy.then(Cypress.session.clearCurrentSessionData);

      onHomePage.checkProductList();
    });
  });

  it.only("Verify user can sort product", () => {
    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");
      cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
      cy.then(Cypress.session.clearCurrentSessionData);

      onHomePage.sortProduct();
    });
  });
});

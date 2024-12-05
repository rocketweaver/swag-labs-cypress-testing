import { onCartPage } from "../support/page_objects/cartPage";
import { onHomePage } from "../support/page_objects/homePage";

describe("Valid Cart", () => {
  const username = [
    "standard_user",
    // "error_user",
    // "visual_user",
    // "performance_glitch_user",
    // "problem_user",
  ];

  before(() => {
    cy.visit("/");
  });

  it("Validate user can add item to cart", () => {
    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");

      onHomePage.addToCart(3).then(({_itemsName}) => {
        cy.log(_itemsName);
      });

      cy.get(".shopping_cart_link").click();

      onCartPage.checkProductList();

      cy.then(Cypress.session.clearCurrentSessionData);
    });
  });

  it("Validate user can remove item from cart in home page", () => {
    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");

      onHomePage.addToCart(3).then(({ _dataTest, _totalItems }) => {
        onHomePage.nullifyCart(_totalItems, _dataTest);
      });

      cy.then(Cypress.session.clearCurrentSessionData);
    });
  });

  it("Validate user can remove item from cart in cart page", () => {
    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");

      onHomePage.addToCart(3).then(({ _dataTest, _totalItems }) => {
        cy.get(".shopping_cart_link").click();

        onCartPage.checkProductList();
        onCartPage.nullifyCart(_totalItems, _dataTest);
      });

      cy.then(Cypress.session.clearCurrentSessionData);
    });
  });

  it("Validate user can reset app state after adding item to cart", () => {
    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");

      onHomePage.addToCart(3).then(() => {
        cy.get(".shopping_cart_link").click();

        onCartPage.checkProductList();
        cy.wait(300);

        cy.get("#react-burger-menu-btn").click();
        cy.contains("Reset App State").click();

        onCartPage.checkProductList();
      });

      cy.then(Cypress.session.clearCurrentSessionData);
    });
  });

  it("Validate user can remove item from cart in cart page", () => {
    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");

      onHomePage.addToCart(3).then(({ _dataTest, _totalItems }) => {
        cy.get(".shopping_cart_link").click();

        onCartPage.checkProductList();
        onCartPage.nullifyCart(_totalItems, _dataTest);
      });

      cy.then(Cypress.session.clearCurrentSessionData);
    });
  });
});

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
      cy.url().should("eq", "https://www.saucedemo.com/inventory.html");

      onHomePage.addToCart();

      cy.get("#react-burger-menu-btn").click();
      cy.contains("Reset App State").click();

      cy.then(Cypress.session.clearCurrentSessionData);
    });
  });

  it("Validate user can remove item from cart in homepage", () => {
    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");

      onHomePage.addToCart(3).then(({ _dataTest, _totalItems }) => {
        onHomePage.nullifyCart(_totalItems, _dataTest);
      });

      cy.then(Cypress.session.clearCurrentSessionData);
    });
  });

  it.only("Validate user can remove multiple items from cart", () => {
    const itemsName = [];
    let sortedItems = [];

    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");

      onHomePage.addToCart(3).then(({ _dataTest, _itemsName, _totalItems }) => {
        _itemsName.forEach((name) => {
          itemsName.push(name);
        });

        sortedItems = [...itemsName].sort();

        cy.get(".shopping_cart_link").click();

        onCartPage.checkProductList(sortedItems);

        onHomePage.nullifyCart(_totalItems, _dataTest);
      });


      cy.then(Cypress.session.clearCurrentSessionData);
    });
  });
});

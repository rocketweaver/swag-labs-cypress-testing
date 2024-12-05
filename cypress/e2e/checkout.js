import { onHomePage } from "../support/page_objects/homePage";
import { onCartPage } from "../support/page_objects/cartPage";
import { onCheckoutPage } from "../support/page_objects/checkoutPage";

describe("Valid Checkout", () => {
  const username = [
    "standard_user",
    // "error_user",
    // "visual_user",
    // "performance_glitch_user",
    // "problem_user",
  ];

  const user = {
    firstName: "John",
    lastName: "Doe",
    postalCode: "1234",
  };

  before(() => {
    cy.visit("/");
  });

  it("Validate checkout after adding item to cart", () => {
    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");

      onHomePage.addToCart(3).then(({ _itemsName, _itemsPrice }) => {
        cy.get(".shopping_cart_link").click();

        onCartPage.checkProductList(_itemsName, _itemsPrice);
        cy.contains("Checkout").click();

        onCheckoutPage.submitForm(user);
        cy.contains("Continue").click();

        onCheckoutPage.checkProductOverview(_itemsName, _itemsPrice);
        cy.contains("Finish").click();

        cy.contains("Thank you for your order!");
      });

      cy.then(Cypress.session.clearCurrentSessionData);
    });
  });
});

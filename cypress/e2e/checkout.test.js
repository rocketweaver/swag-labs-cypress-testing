import { onHomePage } from "../support/page_objects/homePage";
import { onCartPage } from "../support/page_objects/cartPage";
import { onCheckoutPage } from "../support/page_objects/checkoutPage";

describe("Valid Checkout", () => {
  const username = [
    "standard_user",
    // "visual_user",
    // "performance_glitch_user",
    // "error_user",
    // "problem_user",
  ];

  before(() => {
    cy.visit("/");
  });

  it("Validate checkout after adding item to cart", () => {
    const user = {
      firstName: "John",
      lastName: "Doe",
      postalCode: "1234",
    };

    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");

      onHomePage.addToCart(3).then(({ _itemsName, _itemsPrice }) => {
        cy.get(".shopping_cart_link").click();

        onCartPage.checkProductList(_itemsName, _itemsPrice);
        cy.contains("Checkout").click();

        onCheckoutPage.submitForm(user);

        onCheckoutPage.checkProductOverview(_itemsName, _itemsPrice);
        cy.contains("Finish").click();

        cy.contains("Thank you for your order!");
      });

      cy.then(Cypress.session.clearCurrentSessionData);
    });
  });

  it("Provide a valid first name & last name in arabic format", () => {
    const user = {
      firstName: "جون",
      lastName: "كارتر",
      postalCode: "1234",
    };

    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");

      onHomePage.addToCart(3).then(({ _itemsName, _itemsPrice }) => {
        cy.get(".shopping_cart_link").click();

        onCartPage.checkProductList(_itemsName, _itemsPrice);
        cy.contains("Checkout").click();

        onCheckoutPage.submitForm(user);

        onCheckoutPage.checkProductOverview(_itemsName, _itemsPrice);
        cy.contains("Finish").click();

        cy.contains("Thank you for your order!");
      });

      cy.then(Cypress.session.clearCurrentSessionData);
    });
  });

  it("Provide a valid zip/postal code with arabic format, first name, and last name", () => {
    const user = {
      firstName: "John",
      lastName: "Doe",
      postalCode: "١٧٤١٢",
    };

    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");

      onHomePage.addToCart(3).then(({ _itemsName, _itemsPrice }) => {
        cy.get(".shopping_cart_link").click();

        onCartPage.checkProductList(_itemsName, _itemsPrice);
        cy.contains("Checkout").click();

        onCheckoutPage.submitForm(user);

        onCheckoutPage.checkProductOverview(_itemsName, _itemsPrice);
        cy.contains("Finish").click();

        cy.contains("Thank you for your order!");
      });

      cy.then(Cypress.session.clearCurrentSessionData);
    });
  });
});

describe("Invalid Checkout", () => {
  const username = [
    "standard_user",
    // "visual_user",
    // "performance_glitch_user",
    // "error_user",
    // "problem_user",
  ];

  before(() => {
    cy.visit("/");
  });

  it.skip("Validate user can't checkout if they have 0 item on cart", () => {
    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");

      cy.get(".shopping_cart_link").click();
      cy.contains("Checkout").click();
      cy.url().should("eq", "https://www.saucedemo.com/cart.html");

      cy.then(Cypress.session.clearCurrentSessionData);
    });
  });

  it("Provide empty first name in checkout form", () => {
    const user = {
      firstName: "",
      lastName: "كارتر",
      postalCode: "1234",
    };

    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");

      onHomePage.addToCart(3).then(({ _itemsName, _itemsPrice }) => {
        cy.get(".shopping_cart_link").click();

        onCartPage.checkProductList(_itemsName, _itemsPrice);
        cy.contains("Checkout").click();

        onCheckoutPage.submitForm(user, "skipFirstName");
      });

      cy.then(Cypress.session.clearCurrentSessionData);
    });
  });

  it("Provide empty last name in checkout form", () => {
    const user = {
      firstName: "John",
      lastName: "",
      postalCode: "1234",
    };

    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");

      onHomePage.addToCart(3).then(({ _itemsName, _itemsPrice }) => {
        cy.get(".shopping_cart_link").click();

        onCartPage.checkProductList(_itemsName, _itemsPrice);
        cy.contains("Checkout").click();

        onCheckoutPage.submitForm(user, "skipLastName");
      });

      cy.then(Cypress.session.clearCurrentSessionData);
    });
  });

  it("Provide empty zip/postal code in checkout form", () => {
    const user = {
      firstName: "John",
      lastName: "Doe",
      postalCode: "",
    };

    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");

      onHomePage.addToCart(3).then(({ _itemsName, _itemsPrice }) => {
        cy.get(".shopping_cart_link").click();

        onCartPage.checkProductList(_itemsName, _itemsPrice);
        cy.contains("Checkout").click();

        onCheckoutPage.submitForm(user, "skipPostalCode");
      });

      cy.then(Cypress.session.clearCurrentSessionData);
    });
  });
});

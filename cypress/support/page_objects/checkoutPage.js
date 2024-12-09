import * as TestFactories from "./helpers/helpers";

class CheckoutPage {
  constructor() {
    this._selectors = {
      cardContainer: ".cart_item",
      name: "[data-test='inventory-item-name']",
      desc: ".inventory_item_desc",
      price: ".inventory_item_price",
      cartBadge: ".shopping_cart_badge",
    };
  }

  checkProductList(itemsName, itemsPrice) {
    TestFactories.getProductsAttribute(this._selectors).then(
      ({ productList }) => {
        TestFactories.isDatumNotEqual(productList.names);
        TestFactories.isStringsEqual(itemsName, productList.names);
        TestFactories.isNumbersEqual(itemsPrice, productList.prices);
      }
    );
  }

  checkProductOverview(itemsName, itemsPrice) {
    this.checkProductList(itemsName, itemsPrice);

    cy.contains("Payment Information").then(() => {
      cy.contains("SauceCard #31337").should("be.visible");
    });

    cy.contains("Shipping Information").then(() => {
      cy.contains("Free Pony Express Delivery!");
    });

    cy.contains("Price Total").then(() => {
      const itemsTotal = itemsPrice.reduce(
        (partialSum, a) => partialSum + a,
        0
      );

      const tax = (itemsTotal * 0.08).toFixed(2);

      const totalPrice = itemsTotal + parseFloat(tax);

      cy.contains(`Item total: $${itemsTotal}`);
      cy.contains(`Tax: $${tax}`);
      cy.contains(`Total: $${totalPrice}`);
    });
  }

  submitForm(user, skipInput = "") {
    const _user = {
      firstName: user.firstName,
      lastName: user.lastName,
      postalCode: user.postalCode,
    };

    if (skipInput !== "skipFirstName") {
      cy.get("[name='firstName']").focus().type(_user.firstName);
    }

    if (skipInput !== "skipLastName") {
      cy.get("[name='lastName']").focus().type(_user.lastName);
    }

    if (skipInput !== "skipPostalCode") {
      cy.get("[name='postalCode']").focus().type(_user.postalCode);
    }

    cy.contains("Continue").click();

    if(skipInput) {
      TestFactories.containErrorRequired(skipInput);
    }
  }
}

export const onCheckoutPage = new CheckoutPage();

import * as TestFactories from "./helpers/helpers";

class CartPage {
  constructor() {
    this._selectors = {
      container: ".cart_item",
      name: "[data-test='inventory-item-name']",
      img: ".inventory_item_img",
      desc: ".inventory_item_desc",
      price: ".inventory_item_price",
      addToCartButton: ".btn_inventory",
    };
  }

  checkProductList(items) {
    cy.wrap(items).each((item, index) => {
      cy.get(".cart_item")
        .eq(index)
        .each((cart) => {
          cy.wrap(cart)
            .find('[data-test="inventory-item-name"]')
            .then((itemNames) => {
              cy.wrap(itemNames)
                .invoke("text")
                .then((name) => {
                  expect(name).to.equal(item);
                });
            });
        });
    });
  }
}

const onCartPage = new CartPage();

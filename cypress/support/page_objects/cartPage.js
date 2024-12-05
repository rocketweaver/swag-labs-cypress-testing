import * as TestFactories from "./helpers/helpers";

class CartPage {
  constructor() {
    this._selectors = {
      cardContainer: ".cart_item",
      name: "[data-test='inventory-item-name']",
      desc: ".inventory_item_desc",
      price: ".inventory_item_price",
      cartBadge: ".shopping_cart_badge",
    };
  }

  checkProductList() {
    TestFactories.getProductsAttribute(this._selectors).wrap(
      ({ productList }) => {
        TestFactories.isDatumNotEqual(productList.names);
      }
    );
  }

  nullifyCart(totalItems, dataTest) {
    let _totalItems = totalItems;

    cy.wrap(dataTest)
      .each((data) => {
        cy.get(`#remove-${data}`).click();
        _totalItems -= 1;
      })
      .then(() => {
        if (_totalItems <= 0) {
          cy.get(this._selectors.cartBadge).should("not.exist");
        } else {
          TestFactories.isNumbersEqual(this._selectors.cartBadge, _totalItems);
        }
      });
  }
}

export const onCartPage = new CartPage();

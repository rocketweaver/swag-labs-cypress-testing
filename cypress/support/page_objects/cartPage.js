import * as TestFactories from "./helpers/elementHelper";
import * as ExtractAttribute from "./helpers/extractAttributesHelper";
import * as Compare from "./helpers/comparisonHelper";

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

  checkProductList(itemsName, itemsPrice) {
    ExtractAttribute.getProductsAttribute(this._selectors).then(
      ({ productList }) => {
        Compare.isDatumNotEqual(productList.names);
        Compare.isStringsEqual(itemsName, productList.names);
        Compare.isNumbersEqual(itemsPrice, productList.prices);
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
          Compare.isNumberEqual(this._selectors.cartBadge, _totalItems);
        }
      });
  }
}

export const onCartPage = new CartPage();

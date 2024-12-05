import * as TestFactories from "./helpers/helpers";

class CheckoutPage {
  constructor() {
    this._selectors = {
      container: ".cart_item",
      name: "[data-test='inventory-item-name']",
      desc: ".inventory_item_desc",
      price: ".inventory_item_price",
    };
  }

  checkProductList() {
    TestFactories.getProductsAttribute(this._selectors).wrap(
      ({ productList }) => {
        TestFactories.isDatumNotEqual(productList.names);
      }
    );
  }
}

export const onCheckoutPage = new CheckoutPage();

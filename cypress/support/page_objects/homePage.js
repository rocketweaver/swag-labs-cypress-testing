import * as TestFactories from "./helpers/helpers";

export class HomePage {
  constructor() {
    this._selectors = {
      element: "",
      cardContainer: ".inventory_item",
      name: ".inventory_item_name",
      img: ".inventory_item_img",
      desc: ".inventory_item_desc",
      price: ".inventory_item_price",
      addToCartButton: ".btn_inventory",
      cartBadge: ".shopping_cart_badge",
      selectFilter: ".product_sort_container"
    };
  }

  checkProductList() {
    TestFactories.getProductsAttribute(this._selectors).then(
      ({ productList }) => {
        this._selectors.element = this._selectors.addToCartButton;

        TestFactories.isDatumNotEqual(productList.names);
        TestFactories.isDatumNotEqual(productList.images);
        TestFactories.isElementChildExist(this._selectors, "Add to cart");
      }
    );
  }

  sortProduct() {
    const optionList = [
      "Name (A to Z)",
      "Name (Z to A)",
      "Price (low to high)",
      "Price (high to low)",
    ];

    cy.wrap(optionList).each((option) => {
      cy.get(this._selectors.selectFilter).select(option);

      switch (option) {
        case "Name (A to Z)":
          TestFactories.getProductsAttribute(this._selectors).then(
            ({ productList }) => {
              TestFactories.isSortedStringsEqual(productList.names);
            }
          );
          break;
        case "Name (Z to A)":
          TestFactories.getProductsAttribute(this._selectors).then(
            ({ productList }) => {
              TestFactories.isSortedStringsEqual(productList.names, "desc");
            }
          );
          break;
        case "Price (low to high)":
          TestFactories.getProductsAttribute(this._selectors).then(
            ({ productList }) => {
              TestFactories.isSortedNumbersEqual(productList.prices);
            }
          );
          break;
        case "Price (high to low)":
          TestFactories.getProductsAttribute(this._selectors).then(
            ({ productList }) => {
              TestFactories.isSortedNumbersEqual(productList.prices, "desc");
            }
          );
          break;
      }
    });
  }

  addToCart(totalItems = 1) {
    const _dataTest = [];
    const _itemsName = [];
    const _totalItems = totalItems;

    return TestFactories.getProductsAttribute(this._selectors).then(
      ({ dataTest, productList }) => {
        for (let i = 0; i < _totalItems; i++) {
          cy.get(this._selectors.cardContainer).eq(i).find(this._selectors.addToCartButton).click();
          _dataTest.push(dataTest[i]);
          _itemsName.push(productList.names[i]);
        }

        TestFactories.isNumberEqual(this._selectors.cartBadge, _totalItems);

        return cy.wrap({ _dataTest, _itemsName, _totalItems });
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
          TestFactories.isNumberEqual(this._selectors.cartBadge, _totalItems);
        }
      });
  }
}

export const onHomePage = new HomePage();

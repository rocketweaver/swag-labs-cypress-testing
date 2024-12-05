import * as TestFactories from "./helpers/helpers";

export class HomePage {
  constructor() {
    this._selectors = {
      cardContainer: ".inventory_item",
      name: ".inventory_item_name",
      img: ".inventory_item_img",
      desc: ".inventory_item_desc",
      price: ".inventory_item_price",
      addToCartButton: ".btn_inventory",
      cartBadge: ".shopping_cart_badge",
    };
  }

  checkProductList() {
    TestFactories.getProductsAttribute(this._selectors).then(
      ({ productList }) => {
        TestFactories.isDatumNotEqual(productList.names);
        TestFactories.isDatumNotEqual(productList.images);
        TestFactories.isAddToCartButtonExist(this._selectors);
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
      cy.get(".cardContainer").select(option);

      switch (option) {
        case "Name (A to Z)":
          TestFactories.getProductsAttribute(this._selectors).then(
            ({ productList }) => {
              TestFactories.sortProductName(productList.names);
            }
          );
          break;
        case "Name (Z to A)":
          TestFactories.getProductsAttribute(this._selectors).then(
            ({ productList }) => {
              TestFactories.sortProductName(productList.names, "desc");
            }
          );
          break;
        case "Price (low to high)":
          TestFactories.getProductsAttribute(this._selectors).then(
            ({ productList }) => {
              TestFactories.sortProductPrice(productList.prices);
            }
          );
          break;
        case "Price (high to low)":
          TestFactories.getProductsAttribute(this._selectors).then(
            ({ productList }) => {
              TestFactories.sortProductPrice(productList.prices, "desc");
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
          cy.get(".inventory_item").eq(i).find(".btn_inventory").click();
          _dataTest.push(dataTest[i]);
          _itemsName.push(productList.names[i]);
        }

        TestFactories.isNumbersEqual(this._selectors.cartBadge, _totalItems);

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
          TestFactories.isNumbersEqual(this._selectors.cartBadge, _totalItems);
        }
      });
  }
}

export const onHomePage = new HomePage();

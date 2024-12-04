import * as HomePageHelpers from "./helpers/homePageHelpers";

export class HomePage {
  constructor() {
    this._dataTest = [];
    this._totalItems = 0;
  }

  checkProductList() {
    HomePageHelpers.getProductsAttribute().then((productList) => {
      compareProductNamesAndImages(productList);
    });
  }

  sortProduct() {
    const optionList = [
      "Name (A to Z)",
      "Name (Z to A)",
      "Price (low to high)",
      "Price (high to low)",
    ];

    cy.wrap(optionList).each((option) => {
      cy.get(".product_sort_container").select(option);

      switch (option) {
        case "Name (A to Z)":
          HomePageHelpers.getProductsAttribute().then((productList) => {
            sortProductName(productList);
          });
          break;
        case "Name (Z to A)":
          HomePageHelpers.getProductsAttribute().then((productList) => {
            sortProductName(productList, "desc");
          });
          break;
        case "Price (low to high)":
          HomePageHelpers.getProductsAttribute().then((productList) => {
            HomePageHelpers.sortProductPrice(productList);
          });
          break;
        case "Price (high to low)":
          HomePageHelpers.getProductsAttribute().then((productList) => {
            HomePageHelpers.sortProductPrice(productList, "desc");
          });
          break;
      }
    });
  }

  addToCart(totalItems = 1) {
    this._totalItems = totalItems;

    HomePageHelpers.getProductsAttribute().then(({ dataTest }) => {
      for (let i = 0; i < totalItems; i++) {
        cy.get(".inventory_item").eq(i).find(".btn_inventory").click();
        this._dataTest.push(dataTest[i]);
      }

      HomePageHelpers.compareShoppingCartBadge(totalItems);
    });
  }

  nullifyCart() {
    cy.wrap(this._dataTest)
      .each((data) => {
        cy.get(`[data-test="remove-${data}"]`).click();
        this._totalItems -= 1;
      })
      .then(() => {
        if (this._totalItems <= 0) {
          cy.get(".shopping_cart_badge").should("not.exist");
        } else {
          compareShoppingCartBadge(this._totalItems);
        }
      });
  }
}

export const onHomePage = new HomePage();

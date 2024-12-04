function compareProductNamesAndImages(productList) {
  cy.wrap(null).then(() => {
    productList.names.forEach((name, index) => {
      productList.names.slice(index + 1).forEach((otherName) => {
        expect(name).to.not.equal(
          otherName,
          `Name at index ${index} should not be equal to other descriptions.`
        );
      });
    });

    productList.imageSources.forEach((src, index) => {
      productList.imageSources.slice(index + 1).forEach((otherSrc) => {
        expect(src).to.not.equal(
          otherSrc,
          `Image source at index ${index} should not be equal to other image sources.`
        );
      });
    });
  });
}

function compareShoppingCartBadge(totalItems) {
  cy.get(".shopping_cart_badge")
    .should("be.visible")
    .invoke("text")
    .then((badgeText) => {
      expect(Number(badgeText.trim())).to.eq(totalItems);
    });
}

function sortProductName(productList, type = "asc") {
  const sortedNames =
    type.toLowerCase() === "desc"
      ? [...productList.names].sort().reverse()
      : [...productList.names].sort();
  cy.wrap(productList.names).should("deep.equal", sortedNames);
}

function sortProductPrice(productList, type = "asc") {
  const sortedPrices =
    type.toLowerCase() === "desc"
      ? [...productList.prices].sort((a, b) => b - a)
      : [...productList.prices].sort((a, b) => a - b);
  cy.wrap(productList.prices).should("deep.equal", sortedPrices);
}

function getProductsAttribute() {
  const selectors = {
    img: ".inventory_item_img",
    name: ".inventory_item_name",
    desc: ".inventory_item_desc",
    price: ".inventory_item_price",
    button: ".btn_inventory",
  };

  const dataTest = [];

  const productList = {
    names: [],
    descriptions: [],
    prices: [],
    imageSources: [],
  };

  return cy.get(".inventory_item").then(($items) => {
    return cy
      .wrap($items)
      .each(($item) => {
        cy.wrap($item)
          .find("img")
          .invoke("attr", "data-test")
          .then((val) => {
            const removeInventoryItemTxt = val
              .replace("inventory-item-", "")
              .trim();
            const cleanDataTest = removeInventoryItemTxt
              .replace("-img", "")
              .trim();
            dataTest.push(cleanDataTest);
          });

        cy.wrap($item)
          .find(selectors.img)
          .find("img")
          .invoke("attr", "src")
          .then((src) => {
            productList.imageSources.push(src);
          });

        cy.wrap($item)
          .find(selectors.name)
          .invoke("text")
          .then((text) => productList.names.push(text.trim()));

        cy.wrap($item)
          .find(selectors.desc)
          .invoke("text")
          .should("not.be.empty")
          .then((text) => productList.descriptions.push(text.trim()));

        cy.wrap($item)
          .find(selectors.price)
          .invoke("text")
          .should("not.be.empty")
          .then((text) => {
            const numericPrice = parseFloat(text.replace("$", "").trim());
            productList.prices.push(numericPrice);
          });

        cy.wrap($item)
          .find(selectors.button)
          .invoke("text")
          .should("equal", "Add to cart");
      })
      .then(() => {
        return { productList, dataTest };
      });
  });
}

export default {
  compareProductNamesAndImages,
  compareShoppingCartBadge,
  getProductsAttribute,
};

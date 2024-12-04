function compareProductName(names) {
  cy.wrap(null).then(() => {
    names.forEach((name, index) => {
      names.slice(index + 1).forEach((otherName) => {
        expect(name).to.not.equal(otherName);
      });
    });
  });
}

function compareProductImage(images) {
  cy.wrap(null).then(() => {
    images.forEach((img, index) => {
      images.slice(index + 1).forEach((otherImg) => {
        expect(img).to.not.equal(otherImg);
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

function isAddToCartButtonExist(selectors) {
  const _selectors = {
    container: selectors.container,
    addToCartButton: selectors.addToCartButton,
  };

  cy.get(_selectors.container).each((item) => {
    cy.wrap(item)
      .find(_selectors.addToCartButton)
      .invoke("text")
      .should("equal", "Add to cart");
  });
}

function sortProductName(names, type = "asc") {
  const sortedNames =
    type.toLowerCase() === "desc"
      ? [...names].sort().reverse()
      : [...names].sort();
  cy.wrap(names).should("deep.equal", sortedNames);
}

function sortProductPrice(prices, type = "asc") {
  const sortedPrices =
    type.toLowerCase() === "desc"
      ? [...prices].sort((a, b) => b - a)
      : [...prices].sort((a, b) => a - b);
  cy.wrap(prices).should("deep.equal", sortedPrices);
}

function getProductsAttribute(selectors) {
  const _selectors = {
    container: selectors.container,
    img: selectors.img || null,
    name: selectors.name,
    desc: selectors.desc,
    price: selectors.price,
    addToCartButton: selectors.addToCartButton || null,
  };

  const dataTest = [];

  const productList = {
    names: [],
    descriptions: [],
    prices: [],
    images: [],
  };

  return cy
    .get(_selectors.container)
    .then((items) => {
      return cy.wrap(items).each((item) => {
        if (_selectors.img) {
          cy.wrap(item)
            .find(_selectors.img)
            .find("img")
            .invoke("attr", "data-test")
            .then((val) => {
              const cleanDataTest = val
                .replace("inventory-item-", "")
                .replace("-img", "")
                .trim();
              dataTest.push(cleanDataTest);
            });

          cy.wrap(item)
            .find(_selectors.img)
            .find("img")
            .invoke("attr", "src")
            .then((src) => productList.images.push(src));
        }

        cy.wrap(item)
          .find(_selectors.name)
          .invoke("text")
          .then((text) => productList.names.push(text.trim()));

        cy.wrap(item)
          .find(_selectors.desc)
          .invoke("text")
          .should("not.be.empty")
          .then((text) => productList.descriptions.push(text.trim()));

        cy.wrap(item)
          .find(_selectors.price)
          .invoke("text")
          .should("not.be.empty")
          .then((text) => {
            const numericPrice = parseFloat(text.replace("$", "").trim());
            productList.prices.push(numericPrice);
          });
      });
    })
    .then(() => {
      return { productList, dataTest };
    });
}

export default {
  compareProductName,
  compareProductImage,
  compareShoppingCartBadge,
  getProductsAttribute,
  isAddToCartButtonExist,
  sortProductName,
  sortProductPrice,
};

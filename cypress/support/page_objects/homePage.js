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
        return productList;
      });
  });
}

export class HomePage {
  checkProductList() {
    getProductsAttribute().then((productList) => {
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
          getProductsAttribute().then((productList) => {
            sortProductName(productList);
          });
          break;
        case "Name (Z to A)":
          getProductsAttribute().then((productList) => {
            sortProductName(productList, "desc");
          });
          break;
        case "Price (low to high)":
          getProductsAttribute().then((productList) => {
            sortProductPrice(productList);
          });
          break;
        case "Price (high to low)":
          getProductsAttribute().then((productList) => {
            sortProductPrice(productList, "desc");
          });
          break;
      }
    });
  }
}

export const onHomePage = new HomePage();

function extractImageAttributes(item, selectors, dataTest, productList) {
  if (selectors.img) {
    cy.wrap(item)
      .find(selectors.img)
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
      .find(selectors.img)
      .find("img")
      .invoke("attr", "src")
      .then((src) => productList.images.push(src));
  }
}

function extractTextData(item, selector, targetArray) {
  return cy
    .wrap(item)
    .find(selector)
    .invoke("text")
    .should("not.be.empty")
    .then((text) => {
      targetArray.push(text.trim());
    });
}

function extractPrice(item, selector, targetArray) {
  return cy
    .wrap(item)
    .find(selector)
    .invoke("text")
    .should("not.be.empty")
    .then((text) => {
      const numericPrice = parseFloat(text.replace("$", "").trim());
      targetArray.push(numericPrice);
    });
}

function processProductItem(item, selectors, dataTest, productList) {
  extractImageAttributes(item, selectors, dataTest, productList);
  extractTextData(item, selectors.name, productList.names);
  extractTextData(item, selectors.desc, productList.descriptions);
  extractPrice(item, selectors.price, productList.prices);
}

function getProductsAttribute(selectors) {
  const _selectors = {
    container: selectors.cardContainer,
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
        processProductItem(item, _selectors, dataTest, productList);
      });
    })
    .then(() => {
      return { productList, dataTest };
    });
}

export default { getProductsAttribute };

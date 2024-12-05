function isDatumNotEqual(datum) {
  cy.wrap(null).then(() => {
    datum.forEach((data, index) => {
      datum.slice(index + 1).forEach((otherData) => {
        expect(data).to.not.equal(otherData);
      });
    });
  });
}

function isNumberEqual(selector, totalItems) {
  const _selector = selector;

  cy.get(_selector)
    .should("be.visible")
    .invoke("text")
    .then((badgeText) => {
      expect(Number(badgeText.trim())).to.eq(totalItems);
    });
}

function isStringsEqual(firstStrings, secondStrings) {
  const firstSortedStrings = [...firstStrings].sort();
  const sortedSecondStrings = [...secondStrings].sort();
  cy.wrap(firstSortedStrings).should("deep.equal", sortedSecondStrings);
}

function isNumbersEqual(firstNumbers, secondNumbers) {
  const sortedFirstNumbers = [...firstNumbers].sort((a, b) => b - a);
  const sortedSecondNumbers = [...secondNumbers].sort((a, b) => b - a);
  cy.wrap(sortedFirstNumbers).should("deep.equal", sortedSecondNumbers);
}

function isElementChildExist(selectors, text) {
  const _selectors = {
    container: selectors.cardContainer,
    element: selectors.element,
  };

  cy.get(_selectors.container).each((item) => {
    cy.wrap(item).find(_selectors.element).invoke("text").should("equal", text);
  });
}

function isStringsSorted(strings, type = "asc") {
  const sortedStrings =
    type.toLowerCase() === "desc"
      ? [...strings].sort().reverse()
      : [...strings].sort();
  cy.wrap(strings).should("deep.equal", sortedStrings);
}

function isNumbersSorted(numbers, type = "asc") {
  const sortedNumbers =
    type.toLowerCase() === "desc"
      ? [...numbers].sort((a, b) => b - a)
      : [...numbers].sort((a, b) => a - b);
  cy.wrap(numbers).should("deep.equal", sortedNumbers);
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
          .then((text) => {
            productList.descriptions.push(text.trim());
          });

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
  getProductsAttribute,
  isDatumNotEqual,
  isElementChildExist,
  isNumberEqual,
  isNumbersEqual,
  isNumbersSorted,
  isStringsEqual,
  isStringsSorted,
};

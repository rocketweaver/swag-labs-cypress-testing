

function isElementChildExist(selectors, text) {
  const _selectors = {
    container: selectors.cardContainer,
    element: selectors.element,
  };

  cy.get(_selectors.container).each((item) => {
    cy.wrap(item).find(_selectors.element).invoke("text").should("equal", text);
  });
}

export default {
  isElementChildExist,
};

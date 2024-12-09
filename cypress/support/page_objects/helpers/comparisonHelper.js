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

function isNumbersEqual(firstNumbers, secondNumbers) {
  const sortedFirstNumbers = [...firstNumbers].sort((a, b) => b - a);
  const sortedSecondNumbers = [...secondNumbers].sort((a, b) => b - a);
  cy.wrap(sortedFirstNumbers).should("deep.equal", sortedSecondNumbers);
}

function isStringsEqual(firstStrings, secondStrings) {
  const firstSortedStrings = [...firstStrings].sort();
  const sortedSecondStrings = [...secondStrings].sort();
  cy.wrap(firstSortedStrings).should("deep.equal", sortedSecondStrings);
}

export default { isDatumNotEqual, isNumberEqual, isNumbersEqual, isStringsEqual };

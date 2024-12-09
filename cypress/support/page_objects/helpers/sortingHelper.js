function isNumbersSorted(numbers, type = "asc") {
  const sortedNumbers =
    type.toLowerCase() === "desc"
      ? [...numbers].sort((a, b) => b - a)
      : [...numbers].sort((a, b) => a - b);
  cy.wrap(numbers).should("deep.equal", sortedNumbers);
}

function isStringsSorted(strings, type = "asc") {
  const sortedStrings =
    type.toLowerCase() === "desc"
      ? [...strings].sort().reverse()
      : [...strings].sort();
  cy.wrap(strings).should("deep.equal", sortedStrings);
}

export default { isNumbersSorted, isStringsSorted };

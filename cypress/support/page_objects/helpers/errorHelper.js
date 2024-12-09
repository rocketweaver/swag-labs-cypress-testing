function containErrorRequired(skipInput) {
  cy.get("[data-test='error']")
    .invoke("text")
    .then((errorTxt) => {
      switch (skipInput) {
        case "skipUsername":
          expect(errorTxt).to.contain("Username is required");
          break;
        case "skipPassword":
          expect(errorTxt).to.contain("Password is required");
          break;
        case "skipFirstName":
          expect(errorTxt).to.contain("First Name is required");
          break;
        case "skipLastName":
          expect(errorTxt).to.contain("Last Name is required");
          break;
        case "skipPostalCode":
          expect(errorTxt).to.contain("Postal Code is required");
          break;
      }
    });
}

export default { containErrorRequired };

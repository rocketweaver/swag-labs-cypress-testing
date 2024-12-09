describe("Valid Login", () => {
  before(() => {
    cy.visit("/");
  })

  const username = [
    "standard_user",
    "problem_user",
    "error_user",
    "visual_user",
    "performance_glitch_user",
  ];

  it("Login with valid username & password", () => {
    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");
      cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
      cy.then(Cypress.session.clearCurrentSessionData)
    });
  });

  it("Logout", () => {
    cy.wrap(username).each((username) => {
      cy.loginToApp(username, "secret_sauce");
        cy.get(".bm-burger-button").click();
        cy.contains("Logout").click();
    });
  });
});

describe("Invalid Login", () => {
  before(() => {
    cy.visit("/");
  })

  it("Login with empty username", () => {
    cy.loginToApp("", "secret_sauce");
    cy.get("[data-test='error']").should("contain", "Username is required");
  });

  it("Login with empty password", () => {
    cy.loginToApp("standard_user", "");
    cy.get("[data-test='error']").should("contain", "Password is required");
  });

  it("Login with invalid username or password", () => {
    cy.loginToApp("standard_user", "asdadsad");
    cy.get("[data-test='error']").should("contain", "Username and password do not match any user in this service");
  });

  it("Login with locked out account", () => {
    cy.loginToApp("locked_out_user", "secret_sauce");
    cy.get("[data-test='error']").should("contain", "Sorry, this user has been locked out.");
  });
});

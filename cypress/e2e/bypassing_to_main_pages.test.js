describe("Bypass to Main Pages Without Login", () => {
    it("Bypass Homepage", () => {
        cy.visit("/inventory.html", {failOnStatusCode: false});
        cy.get("[data-test='error']").should("contain", "You can only access '/inventory.html' when you are logged in.");
    })
    
    it("Bypass Product Detail", () => {
        cy.visit("/inventory-item.html?id=4", {failOnStatusCode: false});
        cy.get("[data-test='error']").should("contain", "You can only access '/inventory-item.html' when you are logged in");
    })
    
    it("Bypass Cart", () => {
        cy.visit("/cart.html", {failOnStatusCode: false});
        cy.get("[data-test='error']").should("contain", "You can only access '/cart.html' when you are logged in");
    })
})
import { onHomePage } from "../support/page_objects/homePage";

describe("Valid Checkout", () => {
    before(() => {
        cy.visit("/");
    })

    it("Validate checkout after adding item to cart", () => {
        onHomePage.addToCart(3).then(() => {
            cy.get(".shopping_cart_link").click();
        })
    });
})
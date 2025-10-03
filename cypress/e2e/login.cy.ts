describe("Login", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Realizar login com paciente", () => {
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha)
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        cy.screenshot()
    });
        it("Realizar login com admin", () => {
        cy.login(Cypress.env("admin").email, Cypress.env("admin").senha)
        cy.url({ timeout: 20000 }).should("include", "/");
        cy.screenshot()
    });
});



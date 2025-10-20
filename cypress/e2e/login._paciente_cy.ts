describe("Login", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("Realizar login com paciente", () => {
        // Teste para login com paciente e validação da tela inicial
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        cy.contains("a", "Iniciar triagem").should("be.visible");
        cy.screenshot();
    });
});
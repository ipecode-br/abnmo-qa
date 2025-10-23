describe("Login", () => {
    beforeEach(() => {
        cy.visit("/");
    });  

    it("Deve permitir login com credenciais válidas (nurse)", () => {
        // Teste para validar login com admin e validação da tela inicial
        cy.login(Cypress.env("nurse").email, Cypress.env("nurse").senha);
        cy.url({ timeout: 20000 }).should("include", "/");
        // Aguarda o e-mail na home para garantir carregamento
        cy.contains("nurse@ipecode.com.br", { timeout: 10000 })
        .scrollIntoView()
        .should("be.visible");
        cy.screenshot();
    });   
}); 
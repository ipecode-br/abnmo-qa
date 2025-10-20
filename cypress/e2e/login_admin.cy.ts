describe("Login", () => {
    beforeEach(() => {
        cy.visit("/");
    });  

    it("Realizar login com admin", () => {
        // Teste para validar login com admin e validação da tela inicial
        cy.login(Cypress.env("admin").email, Cypress.env("admin").senha);
        cy.url({ timeout: 20000 }).should("include", "/");
        cy.screenshot();
    });

    it("Validar inserção de senha curta", () => {
        // Teste para validar exibição de mensagem de erro ao inserir senha com menos de oito caracteres    
        cy.login(Cypress.env("senha_curta").email, Cypress.env("senha_curta").senha);
        cy.url({ timeout: 20000 }).should("include", "/");
        cy.contains("Sua senha deve conter 8 ou mais caracteres", { timeout: 10000 })
         .should("be.visible");
        cy.screenshot()
    });
        
    it("Validar inserção de domínio inválido", () => {
        // Teste para validar exibição de mensagem de erro ao inserir domínio inválido    
        cy.login(Cypress.env("email_invalido").email, Cypress.env("email_invalido").senha);
        cy.url({ timeout: 20000 }).should("include", "/");
        cy.contains("Credenciais inválidas. Por favor, tente novamente.", { timeout: 10000 })
         .should("be.visible");
        cy.screenshot()       
    });

    it("Validar inserção do campo e-mail vazio", () => {
        // Teste para validar exibição de mensagem de erro ao deixar o campo e-mail vazio    
        cy.login(Cypress.env("vazio").email, Cypress.env("vazio").senha);
        cy.url({ timeout: 20000 }).should("include", "/");
        cy.contains("Insira um e-mail válido", { timeout: 10000 })
         .should("be.visible");
        cy.screenshot()       
    });
}); 
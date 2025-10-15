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

    it("Realizar login com admin", () => {
        // Teste para login com admin e validação da tela inicial
        cy.login(Cypress.env("admin").email, Cypress.env("admin").senha);
        cy.url({ timeout: 20000 }).should("include", "/");
        cy.screenshot();
    });

    it("Validar inserção de domínio inválido", () => {
        // Teste para validar exibição de mensagem de erro ao inserir domínio inválido    
        cy.login(Cypress.env("admin1").email, Cypress.env("admin1").senha);
        cy.url({ timeout: 20000 }).should("include", "/");
        cy.contains("Credenciais inválidas. Por favor, tente novamente.", { timeout: 10000 })
         .should("be.visible");
        cy.screenshot()
    });

    it("Validar inserção de senha curta", () => {
        // Teste para validar exibição de mensagem de erro ao inserir senha com menos de oito caracteres    
        cy.login(Cypress.env("senha_curta").email, Cypress.env("senha_curta").senha);
        cy.url({ timeout: 20000 }).should("include", "/");
        cy.contains("Sua senha deve conter 8 ou mais caracteres", { timeout: 10000 })
         .should("be.visible");
        cy.screenshot()
        });
    });



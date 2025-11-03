describe("Login", () => {
    beforeEach(() => {
        cy.visit("/");
    });  

    it.only("Deve permitir login com credenciais válidas (admin) e efetuar o logout", () => {
        // Teste para validar o login com o usuário admin e a exibição da tela inicial
        cy.login(Cypress.env("admin").email, Cypress.env("admin").senha);
        cy.url({ timeout: 20000 }).should("include", "/");
        // Valida se o email do usuário aparece
        cy.get("p.text-foreground-soft.truncate.text-xs", { timeout: 10000 })
         .should("contain", "admin@ipecode.com.br");
         cy.screenshot("Login com sucesso");           

        // Efetuar logout
        // Clica no botão de menu (abre o dropdown do usuário)
        cy.get('#radix-_r_0_', { timeout: 30000 }) // espera até 10 segundos
         .should('be.visible') // garante que está visível
         .click();
        cy.contains('div', 'Sair')
         .should('be.visible')
         .click();
        // Valida que voltou para a URL esperada após logout
        cy.url({ timeout: 20000 }).should('eq', Cypress.config().baseUrl + '/');
        cy.contains("Logout realizado com sucesso.", { timeout: 30000 })
         .should("be.visible");
        cy.screenshot("Logout com sucesso");
    });

    it("Deve exibir erro ao inserir senha curta", () => {
        // Teste para validar a exibição da mensagem de erro ao inserir uma senha com menos de oito caracteres
        cy.login(Cypress.env("senha_curta").email, Cypress.env("senha_curta").senha);
        cy.url({ timeout: 20000 }).should("include", "/conta/entrar");
        cy.contains("Sua senha deve conter 8 ou mais caracteres", { timeout: 10000 })
         .should("be.visible");
        cy.screenshot("Senha curta")
    });
        
    it("Deve exibir erro ao inserir domínio inválido", () => {
        // Teste para validar a exibição da mensagem de erro ao inserir um e-mail com domínio inválido    
        cy.login(Cypress.env("dominio_invalido").email, Cypress.env("dominio_invalido").senha);
        cy.url({ timeout: 20000 }).should("include", "/conta/entrar");
        cy.contains("Credenciais inválidas. Por favor, tente novamente.", { timeout: 10000 })
         .should("be.visible");
        cy.screenshot("Domínio inválido")       
    });

    it("Deve exibir erro ao deixar o campo e-mail vazio", () => {
        // Teste para validar a exibição da mensagem de erro ao deixar o campo de e-mail vazio    
        cy.login(Cypress.env("vazio").email, Cypress.env("vazio").senha);
        cy.url({ timeout: 20000 }).should("include", "/conta/entrar");
        cy.contains("Insira um e-mail válido", { timeout: 10000 })
         .should("be.visible");
        cy.screenshot("E-mail vazio")       
    });
    
    it("Deve exibir erro ao inserir senha inválida", () => {
        // Teste para validar a exibição da mensagem de erro ao inserir uma senha inválida    
        cy.login(Cypress.env("senha_invalida").email, Cypress.env("senha_invalida").senha);
        cy.contains("Credenciais inválidas. Por favor, tente novamente.", { timeout: 10000 })
        .should("be.visible");
        cy.screenshot("Senha inválida");       
    });

    it("Deve exibir erro ao inserir usuário não cadastrado", () => {
        // Teste para validar a exibição da mensagem de erro ao inserir um usuário não cadastrado    
        cy.login(Cypress.env("usuario_nao_cadastrado").email, Cypress.env("usuario_nao_cadastrado").senha);
        cy.contains("Credenciais inválidas. Por favor, tente novamente.", { timeout: 10000 })
        .should("be.visible");
        cy.screenshot("Usuário não cadastrado"); 
    });
});
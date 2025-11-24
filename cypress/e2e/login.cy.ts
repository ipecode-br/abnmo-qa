describe("Login", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Deve permitir login com credenciais válidas (admin)", () => {
        // Teste para validar o login com o usuário admin e a exibição da tela inicial
        cy.login(Cypress.env("admin").email, Cypress.env("admin").senha);

        cy.url().should("include", "/");

        // Valida acesso à home page através do elemento "Visão Geral"
        cy.contains("Visão Geral", { timeout: 15000 })
         .should("be.visible");

        cy.screenshot("Login com sucesso");      
    });

    it("Deve exibir erro ao inserir senha curta", () => {
        // Teste para validar a exibição da mensagem de erro ao inserir uma senha com menos de oito caracteres
        cy.login(Cypress.env("senha_curta").email, Cypress.env("senha_curta").senha);

        cy.url().should("include", "/conta/entrar");

        // Valida a mensagem de erro visível
        cy.contains("Sua senha deve conter 8 ou mais caracteres")
        .should("be.visible");

        cy.screenshot("Senha curta")
    });
        
    it("Deve exibir erro ao inserir domínio com formato inválido", () => {
        // Teste para validar a exibição da mensagem de erro ao inserir um e-mail com domínio inválido    
        cy.login(Cypress.env("email_formato_inválido").email, Cypress.env("email_formato_inválido").senha);

        cy.url().should("include", "/conta/entrar");

        // Valida a mensagem de erro visível
        cy.contains("Credenciais inválidas. Por favor, tente novamente.")
        .should("be.visible");

        cy.screenshot("Domínio com formato inválido")       
    });

    it("Deve exibir erro ao deixar o campo e-mail vazio", () => {
        // Teste para validar a exibição da mensagem de erro ao deixar o campo de e-mail vazio    
        cy.login(Cypress.env("vazio").email, Cypress.env("vazio").senha);

        cy.url().should("include", "/conta/entrar");

        // Valida a mensagem de erro visível
        cy.contains("Insira um e-mail válido")
        .should("be.visible");

        cy.screenshot("E-mail vazio")       
    });
    
    it("Deve exibir erro ao inserir senha inválida", () => {
        // Teste para validar a exibição da mensagem de erro ao inserir uma senha inválida    
        cy.login(Cypress.env("senha_invalida").email, Cypress.env("senha_invalida").senha);

        // Valida a mensagem de erro visível
        cy.contains("Credenciais inválidas. Por favor, tente novamente.")
        .should("be.visible");

        cy.screenshot("Senha inválida");       
    });

    it("Deve exibir erro ao inserir usuário não cadastrado", () => {
        // Teste para validar a exibição da mensagem de erro ao inserir um usuário não cadastrado 

        cy.login(Cypress.env("usuario_nao_cadastrado").email, Cypress.env("usuario_nao_cadastrado").senha);

        // Valida a mensagem de erro visível
        cy.contains("Credenciais inválidas. Por favor, tente novamente.")
        .should("be.visible");
        cy.screenshot("Usuário não cadastrado"); 
    });
});
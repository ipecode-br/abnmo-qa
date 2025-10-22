describe("Login paciente", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Realizar login com paciente", () => {
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        cy.contains('Iniciar triagem').should("be.visible");
        cy.screenshot();
    });
    it("Realizar login com senha curta", () => {
        cy.login(Cypress.env("senha_curta").email, Cypress.env("senha_curta").senha);
        cy.url({ timeout: 20000 }). should("include", "/");
        cy.contains("Sua senha deve conter 8 ou mais caracteres").should("be.visible");
        cy.screenshot();
    });
    it("Realizar login com domínio inválido", () => {
        cy.login(Cypress.env("dominio_invalido").email, Cypress.env("dominio_invalido").senha)
        cy.url({ timeout: 20000}). should("include", "/");
        cy.contains("Insira um e-mail válido").should("be.visible");
        cy.screenshot();
    });
    it("Realizar login com campo email vazio", () => {
        cy.login(Cypress.env("email_vazio").email, Cypress.env("email_vazio").senha);
        cy.url({ timeout: 20000 }). should("include", "/");
        cy.contains("Insira um e-mail válido").should("be.visible");
        cy.screenshot();
    });
    it("Validar recuperação de senha", () => {
        cy.get('a[href="/conta/recuperar-senha"]').click(); 
        cy.contains("Recuperar senha").should("be.visible");
        cy.screenshot();
    });
    it.only("Realizar login com paciente", () => {
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        cy.contains('Iniciar triagem').should("be.visible");
        cy.get("[aria-label='Abrir menu']").click();
        cy.contains('Sair').click();
        cy.contains("Logout realizado com sucesso.").should("be.visible");
        cy.screenshot();
    });
});



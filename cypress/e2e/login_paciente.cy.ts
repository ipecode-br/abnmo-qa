describe("Login paciente", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Realizar login com paciente", () => {
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha)
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        cy.contains('Iniciar triagem').should("be.visible");
        cy.screenshot()
    });
    it("Realizar login com senha curta", () => {
        cy.login(Cypress.env("senha_curta").email, Cypress.env("senha_curta").senha)
        cy.url({ timeout: 20000 }). should("include", "/");
        cy.screenshot()
    });
    it("Realizar login com domínio inválido", () => {
        cy.login(Cypress.env("dominio_invalido").email, Cypress.env("dominio_invalido").senha)
        cy.url({ timeout: 20000}). should("include", "/");
        cy.screenshot
    });
    it("Realizar login com campo email vazio", () => {
        cy.login(Cypress.env("email_vazio").email, Cypress.env("email_vazio").senha)
        cy.url({ timeout: 20000 }). should("include", "/");
        cy.screenshot
    });
    it("Validar recuperação de senha", () => {
        cy.get('a[href="/conta/recuperar-senha"]').click() 
    });
    it("Validar logout", () =>{
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha)
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        cy.get("[aria-label='Abrir menu']").click()
        cy.contains('Sair').click()
    });
});



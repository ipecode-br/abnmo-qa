import { TriagemPage } from "../support/page/triagemPage";

const triagemPage = new TriagemPage ();

describe("Triagem Paciente", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Realizar login com paciente", () => {
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha)
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        triagemPage.clicarIniciartriagem();
        triagemPage.validarPaginaTriagemCarregada();
        cy.screenshot()
    });       

    it("Validar preencimento de campos obrigatórios", () => {
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        triagemPage.clicarIniciartriagem();
        triagemPage.validarPaginaTriagemCarregada();
        triagemPage.validarCamposObrigatorios();
        cy.screenshot()
    });

    it("Validar CPF", () => {
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        triagemPage.clicarIniciartriagem();
        triagemPage.validarPaginaTriagemCarregada();
        triagemPage.validarCPFInvalido();
        cy.screenshot()
    });

    it.only("Avançar para a etapa 2", () => {
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        triagemPage.clicarIniciartriagem();
        triagemPage.validarPaginaTriagemCarregada();
        triagemPage.avancarEtapa2();

    })
});



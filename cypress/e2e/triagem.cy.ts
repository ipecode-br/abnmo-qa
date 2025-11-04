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

    it("Avançar para a etapa 2", () => {
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        triagemPage.clicarIniciartriagem();
        triagemPage.validarPaginaTriagemCarregada();
        triagemPage.preencherEtapa1();

    });

    it.only("Voltar para etapa 1 ter dados persistidos", () => {
        const nome = 'Maria da Silva';
        const dataNascimentoEsperada = '21/07/1990';
        const generoEsperado = 'Mulher (Cis)';
        const estadoEsperado = 'São Paulo';
        const cidadeEsperada = 'Osasco';
        
        
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        triagemPage.clicarIniciartriagem();
        triagemPage.validarPaginaTriagemCarregada();
        triagemPage.preencherEtapa1();

        triagemPage.elements.botaoVoltar().click();

        triagemPage.elements.campoNome().should('have.value', nome); 

        triagemPage.elements.campoGenero().should('contain', generoEsperado);

        triagemPage.elements.campoDataNascimento().should('contain', dataNascimentoEsperada);
    
        triagemPage.elements.campoEstado().should('contain', estadoEsperado);
    
        triagemPage.elements.campoCidade().should('contain', cidadeEsperada);
    });
});



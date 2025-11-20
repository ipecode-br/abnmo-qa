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
        cy.screenshot();
    });

    it("Avançar para a etapa 2", () => {
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        triagemPage.clicarIniciartriagem();
        triagemPage.validarPaginaTriagemCarregada();
        triagemPage.preencherEtapa1();
        cy.screenshot();
    });

    it("Voltar para etapa 1 ter dados persistidos", () => {
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
    
        cy.screenshot();
    });

    it("Validar preenchimento de campos obrigatorios 2", () => {
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        triagemPage.clicarIniciartriagem();
        triagemPage.validarPaginaTriagemCarregada();
        triagemPage.preencherEtapa1();
        triagemPage.elements.botaoAvancar(); 

        cy.url({ timeout: 20000 }).should("include", "/laudo-medico");

        triagemPage.elements.botaoProxEtapa().click();
    
        cy.contains('Você possui alguma deficiência?*').parents('div').contains('p', 'Selecione "Sim" ou "Não"').should('be.visible');
        cy.contains('Precisa de assistência legal?*').parents('div').contains('p', 'Selecione "Sim" ou "Não"').should('be.visible');
        cy.contains('Faz uso de medicamentos?*').parents('div').contains('p', 'Selecione "Sim" ou "Não"').should('be.visible');
        cy.contains('Você possui um Diagnóstico de NMO?*').parents('div').contains('p', 'Selecione "Sim" ou "Não"').should('be.visible');
        cy.screenshot();

    });

    it("Avançar Etapa 3", () => {
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        triagemPage.clicarIniciartriagem();
        triagemPage.validarPaginaTriagemCarregada();
        triagemPage.preencherEtapa1();
        triagemPage.elements.botaoAvancar(); 

        cy.url({ timeout: 20000 }).should("include", "/laudo-medico");

        triagemPage.elements.botaoProxEtapa().click();

        triagemPage.preencherEtapa2();
        cy.screenshot();
    });

    it("Adicionar Rede de Apoio", () => {
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        triagemPage.clicarIniciartriagem();
        triagemPage.validarPaginaTriagemCarregada();
        triagemPage.preencherEtapa1();
        triagemPage.elements.botaoAvancar(); 

        cy.url({ timeout: 20000 }).should("include", "/laudo-medico");

        triagemPage.elements.botaoProxEtapa().click();

        triagemPage.preencherEtapa2();
        triagemPage.addRedeApoio();        

    });

    it("Remover Rede de Apoio", () => {
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        triagemPage.clicarIniciartriagem();
        triagemPage.validarPaginaTriagemCarregada();
        triagemPage.preencherEtapa1();
        triagemPage.elements.botaoAvancar(); 

        cy.url({ timeout: 20000 }).should("include", "/laudo-medico");

        triagemPage.elements.botaoProxEtapa().click();

        triagemPage.preencherEtapa2();
        triagemPage.addRedeApoio();        
        triagemPage.removerRedeApoio();
    });
   
    it("Dados persistidos na Etapa2 e Apoio", () => {
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        triagemPage.clicarIniciartriagem();
        triagemPage.validarPaginaTriagemCarregada();
        triagemPage.preencherEtapa1();
        triagemPage.elements.botaoAvancar(); 

        cy.url({ timeout: 20000 }).should("include", "/laudo-medico");

        triagemPage.elements.botaoProxEtapa().click();

        triagemPage.preencherEtapa2();
        triagemPage.addRedeApoio();  

        triagemPage.elements.botaoVoltarApoio().click();


        triagemPage.validarPersistenciaEtapa2();
        triagemPage.persistirRededeApoio();
        cy.screenshot();

    });

    it("Manter dados aos reabrir formulário", () => {
        const nome = 'Maria de Souza';
        const dataNascimentoEsperada = '21/07/1990';
        const generoEsperado = 'Mulher (Cis)';
        const estadoEsperado = 'São Paulo';
        const cidadeEsperada = 'Osasco';
        
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        triagemPage.clicarIniciartriagem();
        triagemPage.validarPaginaTriagemCarregada();
        triagemPage.preencherEtapa1();
        triagemPage.elements.botaoAvancar(); 

        cy.url({ timeout: 20000 }).should("include", "/laudo-medico");

        triagemPage.elements.botaoProxEtapa().click();

        triagemPage.preencherEtapa2();
        triagemPage.addRedeApoio();

        triagemPage.elements.botaoInicio().click();
        triagemPage.elements.botaoIniciarTriagem().click();

        
        triagemPage.validarPaginaTriagemCarregada();
       
        triagemPage.elements.campoNome().should('have.value', nome); 
        triagemPage.elements.campoGenero().should('contain', generoEsperado);
        triagemPage.elements.campoDataNascimento().should('contain', dataNascimentoEsperada);
        triagemPage.elements.campoEstado().should('contain', estadoEsperado);
        triagemPage.elements.campoCidade().should('contain', cidadeEsperada);

        triagemPage.elements.botaoAvancar().click();

        cy.url({ timeout: 20000 }).should("include", "/laudo-medico");

        triagemPage.validarPersistenciaEtapa2();
        
        triagemPage.persistirRededeApoio();
        
        
        cy.screenshot();

    });

    it.only("Finalizar formulário", () => {
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        triagemPage.clicarIniciartriagem();
        triagemPage.validarPaginaTriagemCarregada();
        triagemPage.preencherEtapa1();
        triagemPage.elements.botaoAvancar(); 

        cy.url({ timeout: 20000 }).should("include", "/laudo-medico");

        triagemPage.elements.botaoProxEtapa().click();

        triagemPage.preencherEtapa2();
        triagemPage.addRedeApoio();       
        triagemPage.finalizarFormulario(); 
        
    });

});



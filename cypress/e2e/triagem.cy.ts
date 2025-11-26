import { TriagemPage } from "../support/page/triagemPage";

const triagemPage = new TriagemPage ();

describe("Triagem Paciente", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Acessar formulário de triagem", () => {
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

        triagemPage.clicarEmAvancar();
        
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
    
        triagemPage.clicarEmAvancar();
       
        cy.url({ timeout: 20000 }).should("include", "/laudo-medico");

        cy.screenshot();
    });

    it("Voltar para etapa 1 ter dados persistidos", () => {
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

        triagemPage.clicarEmAvancar();
        cy.url({ timeout: 20000 }).should("include", "/laudo-medico");

        triagemPage.clicarVoltar();

        triagemPage.elements.seusDados.inputNome().should('have.value', nome); 

        triagemPage.elements.seusDados.inputGenero().should('contain', generoEsperado);

        triagemPage.elements.seusDados.campoDataNascimento().should('contain', dataNascimentoEsperada);
    
        triagemPage.elements.seusDados.inputEstado().should('contain', estadoEsperado);
    
        triagemPage.elements.seusDados.inputCidade().should('contain', cidadeEsperada);
    
        cy.screenshot();
    });

    it("Validar preenchimento de campos obrigatorios 2", () => {
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
     
        triagemPage.clicarIniciartriagem();
        
        triagemPage.validarPaginaTriagemCarregada();
        triagemPage.preencherEtapa1();
        triagemPage.clicarEmAvancar();

        cy.url({ timeout: 20000 }).should("include", "/laudo-medico");

        triagemPage.clicarEmAvancarFinal();
    
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
        triagemPage.clicarEmAvancar(); 

        cy.url({ timeout: 20000 }).should("include", "/laudo-medico");

        triagemPage.preencherEtapa2();
        triagemPage.clicarEmAvancarFinal();

        cy.url({ timeout: 20000 }).should("include", "/rede-de-apoio");

        cy.screenshot();
    });

    it("Adicionar Rede de Apoio", () => {
           
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        triagemPage.clicarIniciartriagem();
        
        triagemPage.validarPaginaTriagemCarregada();
        triagemPage.preencherEtapa1();
        triagemPage.clicarEmAvancar(); 

        cy.url({ timeout: 20000 }).should("include", "/laudo-medico");

        triagemPage.preencherEtapa2();
        triagemPage.clicarEmAvancarFinal();

        triagemPage.addRedeApoio();  
        
        cy.screenshot();

    });

    it("Remover Rede de Apoio", () => {
        
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        triagemPage.clicarIniciartriagem();
        
        triagemPage.validarPaginaTriagemCarregada();
        triagemPage.preencherEtapa1();
        triagemPage.clicarEmAvancar(); 

        cy.url({ timeout: 20000 }).should("include", "/laudo-medico");
        triagemPage.preencherEtapa2();
        triagemPage.clicarEmAvancarFinal();
        
        triagemPage.addRedeApoio();        
        triagemPage.removerRedeApoio();

        cy.screenshot();
    });
   
    it("Dados persistidos na Etapa2 e Apoio", () => {
      
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
        triagemPage.clicarIniciartriagem();
        
        triagemPage.validarPaginaTriagemCarregada();
        triagemPage.preencherEtapa1();
        triagemPage.clicarEmAvancar(); 

        cy.url({ timeout: 20000 }).should("include", "/laudo-medico");
        triagemPage.preencherEtapa2();
        triagemPage.clicarEmAvancarFinal();

        cy.url({ timeout: 20000 }).should("include", "/rede-de-apoio");
        triagemPage.addRedeApoio();  
        triagemPage.clicarVoltar();

        triagemPage.validarPersistenciaEtapa2();

        triagemPage.clicarEmAvancarFinal();

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
        cy.url({ timeout: 20000 }).should("include", "/seus-dados");
        triagemPage.preencherEtapa1();
        triagemPage.clicarEmAvancar(); 

        cy.url({ timeout: 20000 }).should("include", "/laudo-medico");    
        triagemPage.preencherEtapa2();
        triagemPage.clicarEmAvancarFinal();
        
        cy.url({ timeout: 20000 }).should("include", "/rede-de-apoio");
        triagemPage.addRedeApoio();

        triagemPage.clicarInicio();

        triagemPage.clicarIniciartriagem(); 
        
        triagemPage.validarPaginaTriagemCarregada();

        cy.url({ timeout: 20000 }).should("include", "/seus-dados");
        triagemPage.validarPersistenciaEtapa1();

        triagemPage.clicarEmAvancar();

        cy.url({ timeout: 20000 }).should("include", "/laudo-medico");
        triagemPage.validarPersistenciaEtapa2();
        
        triagemPage.clicarEmAvancarFinal();

        cy.url({ timeout: 20000 }).should("include", "/rede-de-apoio");
        triagemPage.persistirRededeApoio();
        
        
        cy.screenshot();

    });

    it("Finalizar formulário", () => {
        cy.login(Cypress.env("paciente").email, Cypress.env("paciente").senha);
        cy.url({ timeout: 20000 }).should("include", "/paciente");
     
        triagemPage.clicarIniciartriagem();
     
        triagemPage.validarPaginaTriagemCarregada();

        cy.url({ timeout: 20000 }).should("include", "/seus-dados");
        triagemPage.preencherEtapa1();
        triagemPage.clicarEmAvancar(); 

        cy.url({ timeout: 20000 }).should("include", "/laudo-medico");

        triagemPage.preencherEtapa2();
        triagemPage.clicarEmAvancarFinal();

        cy.url({ timeout: 20000 }).should("include", "/rede-de-apoio");
        triagemPage.addRedeApoio();

        triagemPage.clicarFinalizar();
        triagemPage.mensagemDeConfirmacao();

        cy.screenshot();
    });

});



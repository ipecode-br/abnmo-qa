export class TriagemPage {
    elements = {
        botaoIniciarTriagem: () => cy.get('a[href="/paciente/triagem/seus-dados"]'),
        tituloSeusDados: () => cy.contains('Seus dados'),
        tituloLaudoMedico: () => cy.contains('Laudo Médico'),
        tituloRedeApoio: () => cy.contains('Rede de apoio'),
        botaoAvancar: () => cy.get('button[type="submit"]'),
        campoCPF: () => cy.get('[id="cpf"]'),
        mensagemErroCPF: () => cy.contains('Informe um CPF válido'),
        campoNome: () => cy.get('[id="name"]'),
        campoGenero: () => cy.get('[id="gender"]'),
        roleOption: () => cy.get('[role="option"]'),
        opcaoGenero: (genero: string) => cy.contains(genero),
        opcaoGeneroFeminino: () => cy.get('[role="option"]').contains('Mulher (Cis)'),
        campoDataNascimento: () => cy.get('button[name="date_of_birth"]'),
        calendarioContainer: () => cy.get('[role="dialog"]'),
        seletoresDeData: () => cy.get('[role="dialog"]').find('button[role="combobox"]'),
        botaoSelecaoMes: () => this.elements.seletoresDeData().eq(0),
        botaoSelecaoAno: () => this.elements.seletoresDeData().eq(1),
        cointainerListaAnos: () => cy.get('[role="listbox"][data-state="open"]'),
        viewportRolavelAnos: () => this.elements.cointainerListaAnos().find('[role="presentation"]'),
        campoEstado: () => cy.get('[id="state"]'),
        selectEstadoOculto: () => cy.get('button[id="state"]').next('select[aria-hidden="true"]'),
        campoCidade: () => cy.get('button[id="city"]'),
        selectCidadeOculto: () => cy.get('button[id="city"]').next('select[aria-hidden="true"]'),
        campoTelefone: () => cy.get('[id="phone"]'),
        botaoVoltar: () => cy.contains('button', 'Voltar'),
        botaoProxEtapa: () => cy.contains('button[type="submit"]', 'Próxima etapa'),        
        possuiDeficiencia: () => cy.get('[id="has_disability"]'), 
        opcaoRadio: (grupoId: string, opcao: 'Sim' | 'Não') => cy.get(`[id="${grupoId}"]`).contains('label', opcao),
        opcaoPossuiDeficiencia: (opcao: 'Sim' | 'Não') => cy.get('#has_disability').contains('label', opcao),
        precisaDeAssistencia: (opcao: 'Sim' | 'Não') => cy.get('#need_legal_assistance').contains('label', opcao),
        usoMedicamento: (opcao: 'Sim' | 'Não') => cy.get('#take_medication').contains('label', opcao),
        diagnosticoNmo: (opcao: 'Sim' | 'Não') => cy.get('#has_nmo_diagnosis').contains('label', opcao),            
        campoNomeApoio: () => cy.get('[id="name"]'),
        campoParentesco: () => cy.get('[id="kinship"]'),
        campoContatoApoio: () => cy.get('[id="phone"]'),
        botaoAddContato: () => cy.contains('button', 'Adicionar contato'),
        previewContato: (nome: string) => cy.contains('p', nome),
        removerContatoBtn: () => cy.contains('button', 'Remover'),
        botaoFinalizar: () => cy.contains('button', 'Finalizar'),
        mensagemConfirmacao: () => cy.contains('Obrigado por enviar suas informações. Estamos analisando seu cadastro e entraremos em contato em breve.'),
        botaoVoltarApoio: () => cy.contains('button', 'Voltar'),
        opcaoPossuiDeficienciaParaValidar: (opcao: 'Sim' | 'Não') => {return cy.get('#has_disability').contains('label', opcao).prev('input');},
        opcaoPrecisaAssistencia: (opcao: 'Sim' | 'Não') => {return cy.get('#need_legal_assistance').contains('label', opcao).prev('input');},
        opcaoUsoMedicamentos: (opcao: 'Sim' | 'Não') => {return cy.get('#take_medication').contains('label', opcao).prev('input');},
        opcaoPossuiNmo: (opcao: 'Sim' | 'Não') => {return cy.get('#has_nmo_diagnosis').contains('label', opcao).prev('input');},
        botaoInicio: () => cy.get('a[href="/paciente"]'),
    };    

    clicarIniciartriagem() {
        this.elements.botaoIniciarTriagem().click();
        cy.url().should('include', '/paciente/triagem/seus-dados');
    };

    validarPaginaTriagemCarregada() {
        this.elements.tituloSeusDados().should('be.visible');
        this.elements.tituloLaudoMedico().should('be.visible');
        this.elements.tituloRedeApoio().should('be.visible');
    };

    validarCamposObrigatorios() {
        this.elements.botaoAvancar().contains('Avançar').click();
    };

    validarCPFInvalido() {
        const cpfInvalido = '1234567891';
        this.elements.campoCPF().type(cpfInvalido);
        this.elements.botaoAvancar().click();
        this.elements.mensagemErroCPF().should('be.visible');
      
    };

    preencherEtapa1() {
        const nome = 'Maria de Souza';
        const anoNascimento = '1990';
        const mesNascimento = 'Jul';
        const diaNascimento = '21';
        const tel = '11972401234';
        const cpf = '12345678910';

        this.elements.campoNome().type(nome);

        this.elements.campoGenero().click();
        this.elements.opcaoGeneroFeminino().click();
        
        this.elements.campoDataNascimento().click();
        
        this.elements.botaoSelecaoAno().click();

        this.elements.cointainerListaAnos().contains(anoNascimento).scrollIntoView().click({ force: true });
        
        this.elements.botaoSelecaoMes().click();
        this.elements.cointainerListaAnos().contains(mesNascimento).click();
        
        this.elements.calendarioContainer().find('button[type="button"]').contains(diaNascimento).click();

        this.elements.selectEstadoOculto().select('São Paulo', { force: true });
        this.elements.campoEstado().should('contain', 'São Paulo');
        
        this.elements.selectCidadeOculto().select('Osasco', { force: true });
        this.elements.campoCidade().should('contain', 'Osasco');
    
        this.elements.campoTelefone().type(tel);

        this.elements.campoCPF().type(cpf);

        this.elements.botaoAvancar().click();
    
    };

    validarCamposObrigatorios2() {
        this.elements.botaoProxEtapa().click()
    };

    preencherEtapa2() {
        this.elements.opcaoPossuiDeficiencia('Não').click();
        this.elements.precisaDeAssistencia('Não').click();
        this.elements.usoMedicamento('Não').click();
        this.elements.diagnosticoNmo('Sim').click();
        this.elements.botaoProxEtapa().click();
        cy.url().should('include', '/rede-de-apoio')
    };

    addRedeApoio() {
        const nomeApoio = 'José de Oliveira';
        const parentesco = 'Marido';
        const contatoApoio = '11977676542';
    
    
        this.elements.campoNomeApoio().type(nomeApoio);
        this.elements.campoParentesco().type(parentesco);
        this.elements.campoContatoApoio().type(contatoApoio);
        
        this.elements.botaoAddContato().click();
        
        this.elements.previewContato(nomeApoio).should('be.visible');
          
    };

    removerRedeApoio() {
        const nomeApoio = 'José de Oliveira';
        
        this.elements.removerContatoBtn().click();
        this.elements.previewContato(nomeApoio).should('not.exist');
    };

    validarPersistenciaEtapa2() {
       
       this.elements.opcaoPossuiDeficienciaParaValidar('Não').should('be.checked');
       this.elements.opcaoPrecisaAssistencia('Não').should('be.checked');
       this.elements.opcaoUsoMedicamentos('Não').should('be.checked');
       this.elements.opcaoPossuiNmo('Sim').should('be.checked');

    };

    persistirRededeApoio() {
        const nomeApoio = 'José de Oliveira';

        this.elements.botaoProxEtapa().click();

        this.elements.previewContato(nomeApoio).should('be.visible');
        
    };

    finalizarFormulario() {
        this.elements.botaoFinalizar().click();

        this.elements.mensagemConfirmacao().should('be.visible');

        cy.url().should('include', '/paciente');
    };
 };  
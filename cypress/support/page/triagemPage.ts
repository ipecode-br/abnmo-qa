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
        const nome = 'Maria da Silva';
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
 }
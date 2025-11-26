import { commonElements } from "./triagem/elements/commonElements";
import { seusDadosElements } from "./triagem/elements/seusDadosElements";
import { laudoMedicoElements } from "./triagem/elements/laudoMedicoElements";
import { redeApoioElements } from "./triagem/elements/redeApoioElements";
import { TriagemActions } from "./triagem/actions/TriagemActions";

export class TriagemPage {
  elements = {
    common: commonElements,
    seusDados: seusDadosElements,
    laudoMedico: laudoMedicoElements,
    redeApoio: redeApoioElements
  };

  actions = new TriagemActions();

  clicarIniciartriagem() {
  
    this.elements.common.btnInicioTriagem().click();
    
  };

  clicarEmAvancar() {
  
    this.elements.common.btnSubmit().click();
  
  };

  clicarEmAvancarFinal() {
    
    this.elements.common.btnSubmitFinal().click();
    
  };

  clicarVoltar() {
    
    this.elements.common.btnVoltar().click();
    
  };

  clicarFinalizar() {
    this.elements.common.btnFinalizar().click();
  };

  clicarInicio() {
    this.elements.common.btnInicio().click();
  };

  mensagemDeConfirmacao() {
    this.elements.common.mensagemConfirmacao();
  };

  validarPaginaTriagemCarregada() {
  
    this.elements.seusDados.titulo().should("be.visible");
    this.elements.laudoMedico.titulo().should("be.visible");
    this.elements.redeApoio.titulo().should("be.visible");
  };

  validarCamposObrigatorios() {

    cy.contains("Insira o nome completo").should("be.visible");
    cy.contains("Informe o gênero").should("be.visible");
    cy.contains("Informe uma data válida").should("be.visible");
    cy.contains("Informe o estado").should("be.visible");
    cy.contains("Informe a cidade").should("be.visible");
    cy.contains("Informe o telefone").should("be.visible");
    cy.contains("Informe o CPF").should("be.visible");
};
  
  validarCPFInvalido() {
    const cpfInvalido = "1234567891";

    this.elements.seusDados.inputCPF().type(cpfInvalido);
    this.elements.common.btnSubmit().click();
    this.elements.seusDados.mensagemErroCPF().should("be.visible");
  }

  preencherEtapa1() {
    const nome = "Maria de Souza";
    const anoNascimento = "1990";
    const mesNascimento = "Jul";
    const diaNascimento = "21";
    const tel = "11972401234";
    const cpf = "12345678922";

    this.elements.seusDados.inputNome().type(nome);

    this.elements.seusDados.inputGenero().click();
    
    this.elements.seusDados.opcaoGenero("Mulher (Cis)").click();

    this.elements.seusDados.campoDataNascimento().click();

    this.elements.seusDados.botaoSelecaoAno().click();
    this.elements.seusDados.cointainerListaAnos().contains(anoNascimento).scrollIntoView().click({ force: true });

    this.elements.seusDados.botaoSelecaoMes().click();
    this.elements.seusDados.cointainerListaAnos().contains(mesNascimento).click();

    this.elements.seusDados.calendarioContainer().find('button[type="button"]').contains(diaNascimento).click();

    this.elements.seusDados.selectEstadoOculto().select("São Paulo", { force: true });
    this.elements.seusDados.inputEstado().should("contain", "São Paulo");

    this.elements.seusDados.selectCidadeOculto().select("Osasco", { force: true });
    this.elements.seusDados.inputCidade().should("contain", "Osasco");

    this.elements.seusDados.inputTelefone().type(tel);
    this.elements.seusDados.inputCPF().type(cpf);

  }

  validarCamposObrigatorios2() {

    this.elements.common.btnSubmit().click();
  }

  preencherEtapa2() {

    this.elements.laudoMedico.possuiDeficiencia("Não").click();
    this.elements.laudoMedico.precisaAssistencia("Não").click();
    this.elements.laudoMedico.usaMedicamento("Não").click();
    this.elements.laudoMedico.possuiNmo("Sim").click();

  }

  addRedeApoio() {
    const nomeApoio = "José de Oliveira";
    const parentesco = "Marido";
    const contatoApoio = "(11) 97767-6542";

    this.elements.redeApoio.inputNomeApoio().type(nomeApoio);
    this.elements.redeApoio.inputParentesco().type(parentesco);
    this.elements.redeApoio.inputTelefoneApoio().type(contatoApoio);

    this.elements.redeApoio.btnAdicionarContato().click();

    this.elements.redeApoio.previewContato(nomeApoio).should("be.visible");
    this.elements.redeApoio.previewContato(parentesco).should("be.visible");
    this.elements.redeApoio.previewContato(contatoApoio).should("be.visible");
  }

  removerRedeApoio() {
    const nomeApoio = "José de Oliveira";

    this.elements.redeApoio.btnRemoverContato().click();
    this.elements.redeApoio.previewContato(nomeApoio).should("not.exist");
  };

  validarPersistenciaEtapa1() {

        const nome = 'Maria de Souza';
        const dataNascimentoEsperada = '21/07/1990';
        const generoEsperado = 'Mulher (Cis)';
        const estadoEsperado = 'São Paulo';
        const cidadeEsperada = 'Osasco';
  
        this.elements.seusDados.inputNome().should('have.value', nome);
        this.elements.seusDados.campoDataNascimento().should('contain', dataNascimentoEsperada);
        this.elements.seusDados.inputGenero().should('contain', generoEsperado);
        this.elements.seusDados.inputEstado().should('contain', estadoEsperado);
        this.elements.seusDados.inputCidade().should('contain', cidadeEsperada); 
  
      };

  validarPersistenciaEtapa2() {
  const checkedState = "checked";
  
  this.elements.laudoMedico.possuiDeficiencia("Não").should("have.attr", "data-state", checkedState);
  this.elements.laudoMedico.precisaAssistencia("Não").should("have.attr", "data-state", checkedState);
  this.elements.laudoMedico.usaMedicamento("Não").should("have.attr", "data-state", checkedState);
  this.elements.laudoMedico.possuiNmo("Sim").should("have.attr", "data-state", checkedState);
};

  persistirRededeApoio() {
  
    const nomeApoio = "José de Oliveira";
    const parentesco = "Marido";
    const contatoApoio = "(11) 97767-6542";
    
    this.elements.redeApoio.previewContato(nomeApoio).should("be.visible");
    this.elements.redeApoio.previewContato(parentesco).should("be.visible");
    this.elements.redeApoio.previewContato(contatoApoio).should("be.visible");
  
  }

  finalizarFormulario() {
    this.elements.common.btnFinalizar().click();
    this.elements.common.mensagemConfirmacao().should("be.visible");
    cy.url().should("include", "/paciente");
  }
};

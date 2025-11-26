import { commonElements } from "../elements/commonElements";

export class TriagemActions {
  clickBotaoPorTexto(texto: string) {
    cy.contains("button", texto).click();
  }

  avancar() {
    commonElements.btnSubmit().click();
  }

  voltar() {
    commonElements.btnVoltar().click();
  }

  proximaEtapa() {
    commonElements.btnSubmitFinal().click();
  }

  finalizar() {
    commonElements.btnFinalizar().click();
  }
}

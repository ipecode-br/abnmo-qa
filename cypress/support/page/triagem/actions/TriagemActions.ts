import { commonElements } from "../elements/commonElements";

export class TriagemActions {
  clickBotaoPorTexto(texto: string) {
    cy.contains("button", texto).click();
  }

  avancar() {
    commonElements.btnAvancar().click();
  }

  voltar() {
    commonElements.btnVoltar().click();
  }

  proximaEtapa() {
    commonElements.btnProximaEtapa().click();
  }

  finalizar() {
    commonElements.btnFinalizar().click();
  }
}

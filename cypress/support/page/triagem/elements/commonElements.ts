export const commonElements = {
  btnSubmit: () => cy.get('button[type="submit"]'),
  btnSubmitFinal: () => cy.contains('button[type="submit"]', 'Próxima etapa'),
  btnVoltar: () => cy.contains('button', 'Voltar'),
  btnFinalizar: () => cy.contains('button', 'Finalizar'),
  btnInicioTriagem: () => cy.get('a[href="/paciente/triagem/seus-dados"]'),
  btnInicio: () => cy.get('a[href="/paciente"]'),
  mensagemConfirmacao: () => cy.contains(
      'Obrigado por enviar suas informações. Estamos analisando seu cadastro e entraremos em contato em breve.'
    )
};

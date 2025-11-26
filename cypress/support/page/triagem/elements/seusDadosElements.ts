export const seusDadosElements = {
  titulo: () => cy.contains('Seus dados'),

  inputNome: () => cy.get('#name'),
  inputGenero: () => cy.get('button#gender'),
  opcaoGenero: (genero: string) => cy.get('[role="option"]').contains(genero),

  campoDataNascimento: () => cy.get('button[name="date_of_birth"]'),
  calendarioContainer: () => cy.get('[role="dialog"]'),
  seletoresDeData: () => cy.get('[role="dialog"]').find('button[role="combobox"]'),

  botaoSelecaoMes: () => cy.get('[role="dialog"]').find('button[role="combobox"]').eq(0),

  botaoSelecaoAno: () => cy.get('[role="dialog"]').find('button[role="combobox"]').eq(1),

  cointainerListaAnos: () => cy.get('[role="listbox"][data-state="open"]'),

  viewportRolavelAnos: () => cy.get('[role="listbox"][data-state="open"]').find('[role="presentation"]'),

  inputEstado: () => cy.get('#state'),
  selectEstadoOculto: () => cy.get('button#state').next('select[aria-hidden="true"]'),

  inputCidade: () => cy.get('#city'),
  selectCidadeOculto: () => cy.get('button#city').next('select[aria-hidden="true"]'),

  inputTelefone: () => cy.get('#phone'),

  inputCPF: () => cy.get('#cpf'),
  mensagemErroCPF: () => cy.contains('Informe um CPF válido'),
};

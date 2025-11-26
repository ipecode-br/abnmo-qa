export const laudoMedicoElements = {
  titulo: () => cy.contains('Laudo Médico'),

  possuiDeficiencia: (opcao: 'Sim' | 'Não') => {
      const valor = opcao === 'Sim' ? 'yes' : 'no'; 
      
      
      return cy.get('#has_disability').find(`[role="radio"][value="${valor}"]`);
  },

  precisaAssistencia: (opcao: 'Sim' | 'Não') => {
      const valor = opcao === 'Sim' ? 'yes' : 'no';
      return cy.get('#need_legal_assistance').find(`[role="radio"][value="${valor}"]`);
  },

  usaMedicamento: (opcao: 'Sim' | 'Não') => {
      const valor = opcao === 'Sim' ? 'yes' : 'no';
      return cy.get('#take_medication').find(`[role="radio"][value="${valor}"]`);
  },

  possuiNmo: (opcao: 'Sim' | 'Não') => {
      const valor = opcao === 'Sim' ? 'yes' : 'no';
      return cy.get('#has_nmo_diagnosis').find(`[role="radio"][value="${valor}"]`);
  },
};
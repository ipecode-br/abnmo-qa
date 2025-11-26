export const redeApoioElements = {
    titulo: () => cy.contains('Rede de apoio'),
  
    inputNomeApoio: () => cy.get('#name'),
    inputParentesco: () => cy.get('#kinship'),
    inputTelefoneApoio: () => cy.get('#phone'),
  
    btnAdicionarContato: () => cy.contains('button', 'Adicionar contato'),
    previewContato: (nome: string) => cy.contains('p', nome),
    btnRemoverContato: () => cy.contains('button', 'Remover'),
  };
  
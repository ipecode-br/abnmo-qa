/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(email: string, senha: string): Chainable<void>;
  }
}

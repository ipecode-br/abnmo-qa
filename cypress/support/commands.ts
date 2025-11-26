import { loginElemento } from "./page/loginPage"

Cypress.Commands.add("login", (emailEntrada, senhaEntrada) => {
    cy.visit("/")
    cy.get(loginElemento.email).should("be.visible").type(emailEntrada)
    cy.get(loginElemento.senha).should("be.visible").type(senhaEntrada, { log: false })
    cy.get(loginElemento.btnEntrar).should("be.visible").click()
})

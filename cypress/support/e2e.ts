import 'cypress-xpath';
import './commands';
import "@shelex/cypress-allure-plugin";

after(() => {
  const b = Cypress.browser || { name: "unknown", version: "unknown", majorVersion: undefined };
  cy.task("setBrowserInfo", { name: b.name, version: b.version, majorVersion: b.majorVersion }, { log: false });
});

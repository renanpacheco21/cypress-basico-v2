Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function () {
  cy.get("#firstName").type("Renan");
  cy.get("#lastName").type("Pacheco de Matos");
  cy.get("#email").type("teste@teste.com");
  cy.get("#open-text-area").type("teste");
  cy.contains("button", "Enviar").click();;
});

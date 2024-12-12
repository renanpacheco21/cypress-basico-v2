/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche campos obrigatórios e envia o formulário", function () {
    const longText =
      "teste abc 1234567890 teste abc 0 teste abc 1234567890 teste abc 1234567890 teste abc 1234567890 teste abc 1234567890 ";

    cy.get("#firstName").type("Renan");
    cy.get("#lastName").type("Pacheco de Matos");
    cy.get("#email").type("teste@teste.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get("button[type='submit']").click();
    cy.get(".success").should("be.visible");
  });

  it.only("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("Renan");
    cy.get("#lastName").type("Pacheco de Matos");
    cy.get("#email").type("teste-teste.com");
    cy.get("#open-text-area").type("teste", { delay: 0 });
    cy.get("button[type='submit']").click();
    cy.get(".error").should("be.visible");
  });
});

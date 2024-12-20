/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  //Aula 02 - Exercicio e Exercciio Extra 1
  it("preenche campos obrigatórios e envia o formulário", function () {
    const longText =
      "teste abc 1234567890 teste abc 0 teste abc 1234567890 teste abc 1234567890 teste abc 1234567890 teste abc 1234567890 ";

    cy.get("#firstName").type("Renan");
    cy.get("#lastName").type("Pacheco de Matos");
    cy.get("#email").type("teste@teste.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });

  //Aula 02 - Exercicio Extra 2
  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("Renan");
    cy.get("#lastName").type("Pacheco de Matos");
    cy.get("#email").type("teste-teste.com");
    cy.get("#open-text-area").type("teste");
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  //Aula 02 - Exercicio Extra 3
  it("campo telefone continua vazio quando preenchido com valor não-numérico", function () {
    cy.get("#phone").type("abcdef").should("have.value", "");
  });

  //Aula 02 - Exercicio Extra 4
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("Renan");
    cy.get("#lastName").type("Pacheco de Matos");
    cy.get("#email").type("teste@teste.com");
    cy.get("#phone-checkbox").click();
    cy.get("#open-text-area").type("teste");
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  //Aula 02 - Exercicio Extra 5
  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Renan")
      .should("have.value", "Renan")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Pacheco de Matos")
      .should("have.value", "Pacheco de Matos")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("teste@teste.com")
      .should("have.value", "teste@teste.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("1234567890")
      .should("have.value", "1234567890")
      .clear()
      .should("have.value", "");
  });

  //Aula 02 - Exercicio Extra 6
  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    //cy.get("button[type='submit']").click();
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  //Aula 02 - Exercicio Extra 7
  it("envia o formuário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });

  //Aula 03 - Exercicio
  it("seleciona um produto (YouTube) por seu texto", function () {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  //Aula 03 - Exercicio Extra 1
  it("seleciona um produto (Mentoria) por seu (value)", function () {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  //Aula 03 - Exercicio Extra 2
  it("seleciona um produto (Blog) por seu índice", function () {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  //Aula 04 - Exercio
  it("marca o tipo de atendimento Feedback", function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });

  //Aula 04 - Exercicio Extra
  it("marca cada tipo de atendimento", function () {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(function ($radio) {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });

  //Aula 05 - Exercicio
  it("marca ambos checkboxes, depois desmarca o último", function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  //Aula 05 - Exercicio Extra
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("Renan");
    cy.get("#lastName").type("Pacheco de Matos");
    cy.get("#email").type("teste@teste.com");
    cy.get("#phone-checkbox").check().should("be.checked");
    cy.get("#open-text-area").type("teste");
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  //Aula 06 - Exercicio
  it("seleciona um arquivo da pasta fixtures", function () {
    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  //Aula 06 - Exercicio Extra 1
  it("seleciona um arquivo simulando um drag-and-drop", function () {
    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  //Aula 06 - Exercicio Extra 2
  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function () {
    cy.fixture("example.json").as("sampleFile");
    cy.get("#file-upload")
      .selectFile("@sampleFile")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  //Aula 07 - Exercicio
  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function () {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  //Aula 07 - Exercicio Extra 1
  it("acessa a página da política de privacidade removendo o target e então clicando no link", function () {
    cy.get("#privacy a").invoke("removeAttr", "target").click();
    cy.contains("Talking About Testing");
  });

});

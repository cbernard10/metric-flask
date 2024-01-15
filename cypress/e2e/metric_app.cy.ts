describe("metrics", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Shape");
    cy.contains("Coordinates");
  });

  it("shape can be changed", function () {
    cy.get("#shape-2").click();
    cy.get(".grid").children().should("have.length", 4);
    cy.get("#shape-3").click();
    cy.get(".grid").children().should("have.length", 9);
    cy.get("#shape-4").click();
    cy.get(".grid").children().should("have.length", 16);
  });

  it("entries can be changed", function () {
    cy.get("#entry-0").type("1");
    cy.get("#entry-1").type("0");
    cy.get("#entry-2").type("0");
    cy.get("#entry-3").type("0");
    cy.get("#entry-4").type("1");
    cy.get("#entry-5").type("0");
    cy.get("#entry-6").type("0");
    cy.get("#entry-7").type("0");
    cy.get("#entry-8").type("1");
  });

  it("computes for 2x2 metric", function () {
    cy.get("#shape-2").click();
    cy.get("#entry-0").type("1");
    cy.get("#entry-1").type("0");
    cy.get("#entry-2").type("0");
    cy.get("#entry-3").type("1");
    cy.get("#compute-button").click();
    cy.wait(1000);
    cy.contains("connecting to server");
    cy.wait(1000);
    cy.contains("trace");
  });
});

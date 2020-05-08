import { elements } from "../support/constants";
import { variablesCZ } from "../support/variables";
import { getInformerSearching } from "../support/request";
import "../support/commands";

describe("Basic functionality on the home page of Slevomat", () => {
  beforeEach(() => {
    cy.initTest();
  });

  it("Returns proper items when searching", () => {
    cy.server();
    cy.route(getInformerSearching);
    cy.get(elements.inputSearchingHP)
      .clear()
      .focus()
      .type(variablesCZ.searchingText)
      .type("{enter}")
      .end();
    cy.get(elements.containerSearchingHP)
      .find("h1")
      .should(($h1) => {
        expect($h1).to.have.text(variablesCZ.SearchingTitleText);
      });
    cy.location().should((loc) => {
      expect(loc.href).to.include(variablesCZ.searchingText);
    });
    cy.get(elements.buttonSearchingAllWeb)
      .contains(variablesCZ.buttonSearchingAllWebText)
      .click()
      .end();
    cy.get(elements.pageSearch)
      .find(elements.titleProduct)
      .first()
      .should(($titleProduct) => {
        expect($titleProduct).to.contain(variablesCZ.searchingText);
      });
  });

  it("Returns proper items when searching on page travel", () => {
    cy.get(elements.buttonTraveling).click();
    cy.get(".button").contains(variablesCZ.buttonSearchingText).click();
    cy.location().should((loc) => {
      expect(loc.href).to.include(variablesCZ.urlOffersText);
    });
    cy.get(elements.wrapperAssertTerm)
      .find("strong")
      .should(($strong) => {
        expect($strong).to.contain(variablesCZ.daysSearchingText);
      });
  });
});

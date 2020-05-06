import { elements } from "../support/constants";
import { variablesCZ } from "../support/variables";
import { getInformerSearching } from "../support/request";
import "../support/commands"

describe("basic functionality in the home page Slevomat", () => {
  beforeEach(() => {
  cy.initTest()
  });

  it("searching home page", () => {
    cy.server();
    cy.route(getInformerSearching);
    cy.get(elements.inputSearchingHP)
      .clear()
      .focus()
      .type("Wellness {enter}")
      .end();
    cy.get(elements.containerSearchingHP)
      .find("h1")
      .should(($h1) => {
        expect($h1).to.have.text("\nWellness pobyty a dovolená\n");
      });
    cy.location().should((loc) => {
      expect(loc.href).to.include("/wellness");
    });
    cy.get(elements.buttonSearchingAllWeb)
      .contains(variablesCZ.buttonSearchingAllWeb)
      .click()
      .end();
    cy.get(elements.pageSearch)
      .find(elements.titleProduct)
      .first()
      .should(($titleProduct) => {
        expect($titleProduct).to.contain("Wellness");
      });
  });
  
  it("searching - term of travel", () => {
    cy.get(elements.buttonTraveling).click();
    cy.get(".button").contains(variablesCZ.buttonSearching).click();
    cy.location().should((loc) => {
      expect(loc.href).to.include("#nabidky");
    });
    cy.get(elements.wrapperAssertTerm)
      .find("strong")
      .should(($strong) => {
        expect($strong).to.contain(variablesCZ.daysSearching);
      });
  });
});

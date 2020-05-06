import { elements } from "../support/constants";
import "../support/commands"

describe("basic functionality in the home page Slevomat", () => {
  beforeEach(() => {
   cy.initTest()
  });

  it("Benefits cards", () => {
    cy.get(elements.buttonBenefits).eq(1).click().end();
    cy.get(elements.gatesBenefit)
      .find(elements.cardsBenefits)
      .should(($cardsBenefits) => {
        expect($cardsBenefits).have.length.lessThan(9);
      });
    cy.get(elements.cardsBenefits).first().focus().click({ force: true }).end();
    cy.location().should((loc) => {
      expect(loc.pathname).to.include("/benefity/");
    });
  });
});

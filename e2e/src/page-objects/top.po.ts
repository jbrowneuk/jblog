export class TopPageObject {
  get signature() {
    return cy.byDataTest('signature');
  }

  get tagline() {
    return cy.byDataTest('tagline');
  }

  get slideButton1() {
    return cy.byDataTest('slide-button-0');
  }
  get slideButton2() {
    return cy.byDataTest('slide-button-1');
  }
  get slideButton3() {
    return cy.byDataTest('slide-button-2');
  }

  get slide1() {
    return cy.byDataTest('slide-0');
  }
  get slide2() {
    return cy.byDataTest('slide-1');
  }
  get slide3() {
    return cy.byDataTest('slide-2');
  }
}

export class TopPageObject {
  get pageHero() {
    return cy.get('jblog-super-hero');
  }

  get softwareSection() {
    return cy.get('jblog-software-section');
  }

  get artworksSection() {
    return cy.get('jblog-artworks-section');
  }

  get aboutSection() {
    return cy.get('jblog-about');
  }
}

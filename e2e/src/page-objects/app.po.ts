export class AppPageObject {
  get title() {
    return cy.get('title');
  }

  get menu() {
    return cy.byDataTest('page-header');
  }

  get menuHomeIcon() {
    return cy.byDataTest('home-icon');
  }

  get menuHomeLink() {
    return cy.byDataTest('home-link');
  }

  get menuArtLink() {
    return cy.byDataTest('art-link');
  }

  get menuProjectsLink() {
    return cy.byDataTest('projects-link');
  }

  get menuJournalLink() {
    return cy.byDataTest('journal-link');
  }

  get licensesLink() {
    return cy.byDataTest('licenses-link');
  }
}

import { AppPageObject } from '../page-objects/app.po';

describe('page navigation', () => {
  let appPage: AppPageObject;

  beforeEach(() => {
    cy.visit('/');
    appPage = new AppPageObject();
  });

  it('should navigate through main pages by clicking on navigation', () => {
    appPage.menuAboutLink.click();
    cy.get('jblog-about').should('exist');

    appPage.menuHomeIcon.click();
    cy.get('jblog-top-page').should('exist');

    appPage.menuProjectsLink.click();
    cy.get('jblog-project-list').should('exist');

    appPage.menuArtLink.click();
    cy.get('jblog-album').should('exist');

    appPage.menuJournalLink.click();
    cy.get('jblog-post-list').should('exist');

    appPage.menuHomeLink.click();
    cy.get('jblog-top-page').should('exist');
  });

  it('should navigate to the licenses page', () => {
    appPage.licensesLink.click();
    cy.get('jblog-licenses').should('exist');
  });
});

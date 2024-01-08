import { AboutPageObject } from '../page-objects/about.po';
import { AppPageObject } from '../page-objects/app.po';

describe('about page', () => {
  let aboutPage: AboutPageObject;
  let appPage: AppPageObject;

  beforeEach(() => {
    cy.visit('/about');
    aboutPage = new AboutPageObject();
    appPage = new AppPageObject();
  });

  it('should visit page', () => {});

  it('should have page header menu', () => {
    appPage.menu.should('exist');
  });

  it('should have all containers', () => {
    aboutPage.experienceContainer.should('exist');
    aboutPage.workExperienceContainer.should('exist');
    aboutPage.educationContainer.should('exist');
    aboutPage.contactsContainer.should('exist');
    aboutPage.skillsContainer.should('exist');
    aboutPage.manifestoContainer.should('exist');
  });
});

import { AppPageObject } from '../page-objects/app.po';
import { TopPageObject } from '../page-objects/top.po';

describe('Top page', () => {
  let topPage: TopPageObject;
  let appPage: AppPageObject;

  beforeEach(() => {
    cy.visit('/');
    appPage = new AppPageObject();
    topPage = new TopPageObject();
  });

  it('should visit page', () => { });

  it('should have page header menu', () => {
    appPage.menu.should('exist');
  });

  it('should have hero section', () => {
    topPage.pageHero.should('exist');
  });

  it('should have software section', () => {
    topPage.softwareSection.should('exist');
  });

  it('should have artworks section', () => {
    topPage.artworksSection.should('exist');
  });

  it('should have about section', () => {
    topPage.aboutSection.should('exist');
  });
});

import { AppPageObject } from '../page-objects/app.po';
import { TopPageObject } from '../page-objects/top.po';

describe('Top page', () => {
  let topPage: TopPageObject;
  let appPage: AppPageObject;

  beforeEach(() => {
    cy.visit('/');
    appPage = new AppPageObject();
  });

  it('should visit page', () => {});

  it('should have page header menu', () => {
    appPage.menu.should('exist');
  });

  describe('first slide', () => {
    beforeEach(() => {
      topPage.slideButton1.click();
    });

    it('should have slide container', () => {
      topPage.slide1.should('exist');
    });

    it('should have signature block', () => {
      topPage.signature.should('exist');
    });

    it('should have tagline block', () => {
      topPage.tagline.should('exist');
    });
  });

  describe('second slide', () => {
    beforeEach(() => {
      topPage.slideButton2.click();
    });

    it('should have slide container', () => {
      topPage.slide2.should('exist');
    });
  });

  describe('third slide', () => {
    beforeEach(() => {
      topPage.slideButton3.click();
    });

    it('should have slide container', () => {
      topPage.slide3.should('exist');
    });
  });
});

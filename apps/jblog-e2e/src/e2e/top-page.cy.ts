import { getMenu } from '../support/top-page.po';

describe('Top page', () => {
  beforeEach(() => cy.visit('/'));

  it('should visit top page', () => {});

  it('should have page header menu', () => {
    getMenu().should('exist');
  });
});

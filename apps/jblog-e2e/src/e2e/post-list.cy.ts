import * as postWrapper from '../fixtures/posts.json';
import { PostListPageObject } from '../page-objects/post-list.po';

describe('Journal - post list', () => {
  let postListPage: PostListPageObject;

  describe('with data', () => {
    beforeEach(() => {
      cy.fixture('posts.json').then(json => {
        cy.intercept('GET', '/api/?posts&page=*', json);
        cy.visit('/journal');
        postListPage = new PostListPageObject();
      });
    });

    it('should show loader on page visit', () => {
      postListPage.loader.should('exist');
    });

    it('should show posts once loaded', () => {
      postListPage.loader.should('not.exist');
      postListPage.posts.should('have.length', postWrapper.posts.length);
    });

    it('should display correct post titles for each post', () => {
      postWrapper.posts.forEach((data: any) => {
        cy.log(`Checking post with ID ${data.postId}`);
        postListPage
          .postById(data.postId)
          .find('h1')
          .should('contain.text', data.title);
      });
    });
  });
});

export class PostListPageObject {
  get loader() {
    return cy.get('[data-loading-posts]');
  }

  get posts() {
    return cy.get('jblog-post');
  }

  postById(id: number) {
    return cy.get(`[data-post=${id}]`);
  }
}

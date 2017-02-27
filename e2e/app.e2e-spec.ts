import { Jblog3Page } from './app.po';

describe('jblog3 App', () => {
  let page: Jblog3Page;

  beforeEach(() => {
    page = new Jblog3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

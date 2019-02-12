import { Title } from '@angular/platform-browser';
import { It, IMock, Mock, Times } from 'typemoq';

import { TitleService } from './title.service';

describe('Title Service wrapper', () => {
  let mockTitle: IMock<Title>;

  beforeEach(() => {
    mockTitle = Mock.ofType<Title>();
  });

  it('should set and format title if non-empty string is passed', () => {
    const newTitle = 'my new title';
    const expectedTitle = `Jason Browne: ${newTitle}`;
    mockTitle.setup(s => s.setTitle(It.isAnyString()));

    const service = new TitleService(mockTitle.object);

    service.setTitle(newTitle);

    mockTitle.verify(s => s.setTitle(It.isValue(expectedTitle)), Times.once());
    expect().nothing();
  });

  it('should set default title if empty string is passed', () => {
    const newTitle = '';
    const expectedTitle = 'Jason Browne';
    mockTitle.setup(s => s.setTitle(It.isAnyString()));

    const service = new TitleService(mockTitle.object);

    service.setTitle(newTitle);

    mockTitle.verify(s => s.setTitle(It.isValue(expectedTitle)), Times.once());
    expect().nothing();
  });

  it('should set default title if reset is called', () => {
    const expectedTitle = 'Jason Browne';
    mockTitle.setup(s => s.setTitle(It.isAnyString()));

    const service = new TitleService(mockTitle.object);

    service.resetTitle();

    mockTitle.verify(s => s.setTitle(It.isValue(expectedTitle)), Times.once());
    expect().nothing();
  });
});

import { IMock, It, Mock, Times } from 'typemoq';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PageObjectBase } from '../lib/testing/page-object.base';
import { TitleService } from '../shared/title.service';
import { ErrorComponent } from './error.component';

describe('Error Component', () => {
  let mockTitleService: IMock<TitleService>;
  let fixture: ComponentFixture<ErrorComponent>;
  let pageObject: ErrorPageObject;

  beforeEach(() => {
    mockTitleService = Mock.ofType<TitleService>();
    mockTitleService.setup(x => x.setTitle(It.isAnyString()));
    mockTitleService.setup(x => x.resetTitle());

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ErrorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    pageObject = new ErrorPageObject(fixture);
    fixture.detectChanges();
  });

  it('should show 404 text', () => {
    const heading = pageObject.title;
    expect(heading).toBeTruthy();
    expect(`${heading.textContent}`.length).toBeGreaterThan(0);
  });

  it('should show navigation links', () => {
    const links = pageObject.navigationLinks;
    expect(links).toBeTruthy();
    expect(links.length).toBeGreaterThan(0);
  });

  it('should reset title', () => {
    mockTitleService.verify(s => s.resetTitle(), Times.once());
    expect().nothing();
  });
});

class ErrorPageObject extends PageObjectBase<ErrorComponent> {
  public get title(): HTMLHeadingElement {
    return this.select('[data-title]');
  }

  public get navigationLinks(): HTMLAnchorElement[] {
    return this.selectAll('[data-navigation] a');
  }
}

import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { FormattedTextComponent } from './formatted-text.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

const mockTestContent = 'MockTestContent';
const dataTestSelectors = {
  noContent: 'no-content',
  withContent: 'with-content'
};

@Component({
  selector: 'ngx-md', // tslint:disable-line
  template: '<ng-content></ng-content>'
})
class MockMarkdownComponent {}

@Component({
  selector: 'jblog-test-wrapper',
  template: `
    <jblog-text data-test="${dataTestSelectors.noContent}"></jblog-text>
    <jblog-text data-test="${dataTestSelectors.withContent}"
      >${mockTestContent}</jblog-text
    >
  `
})
class TestComponent {}

describe('Formatted Text View', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MockMarkdownComponent,
        FormattedTextComponent,
        TestComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  }));

  it('should contain a markdown component', () => {
    const mdElement = fixture.debugElement.query(
      By.css(`[data-test=${dataTestSelectors.noContent}]`)
    );
    expect(mdElement).toBeTruthy();
  });

  it('should pass data to markdown component', async(async () => {
    const mdElement = fixture.debugElement.query(
      By.css(`[data-test=${dataTestSelectors.withContent}] ngx-md`)
    );
    expect(mdElement.nativeElement.innerHTML.trim()).toBe(mockTestContent);
  }));
});

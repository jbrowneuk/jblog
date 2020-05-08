import { NgxMdModule } from 'ngx-md';
import { PageObjectBase } from 'src/app/lib/testing/page-object.base';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormattedTextComponent } from './formatted-text.component';

const mockTestContent = 'MockTestContent';
const dataAttributes = {
  noContent: 'data-no-content',
  withContent: 'data-with-content',
  markdown: 'data-text-area'
};

@Component({
  selector: 'jblog-test-wrapper',
  template: `
    <jblog-text ${dataAttributes.noContent}></jblog-text>
    <jblog-text ${dataAttributes.withContent} [text]="text"></jblog-text>
  `
})
class TestComponent {
  public text = mockTestContent;
}

class TestComponentPageObject extends PageObjectBase<TestComponent> {
  public get noContent(): HTMLElement {
    return this.select(`[${dataAttributes.noContent}]`);
  }

  public get withContent(): HTMLElement {
    return this.select(`[${dataAttributes.withContent}]`);
  }

  public mdContainerFor(parent: HTMLElement): HTMLElement {
    return parent.querySelector(`[${dataAttributes.markdown}]`);
  }
}

describe('Formatted Text View', () => {
  let fixture: ComponentFixture<TestComponent>;
  let pageObject: TestComponentPageObject;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormattedTextComponent, TestComponent],
      imports: [HttpClientTestingModule, NgxMdModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    pageObject = new TestComponentPageObject(fixture);
    fixture.detectChanges();
  }));

  it('should contain a markdown component', () => {
    const noContentMd = pageObject.mdContainerFor(pageObject.noContent);
    expect(noContentMd).toBeTruthy();

    const contentMd = pageObject.mdContainerFor(pageObject.withContent);
    expect(contentMd).toBeTruthy();
  });

  it('should pass data to markdown component', async(async () => {
    const contentMd = pageObject.mdContainerFor(pageObject.withContent);
    expect(contentMd.textContent.trim()).toBe(mockTestContent);
  }));
});

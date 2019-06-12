import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Pipe,
  PipeTransform,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { PostComponent } from './post.component';

const mockPostData = {
  postId: 1,
  date: Date.now(),
  title: 'post title',
  content: 'Example post content with an emoji :smile: . Yay!',
  tags: ['one', 'two'],
  slug: 'mock'
};

@Pipe({
  name: 'date',
  pure: false
})
class MockDatePipe implements PipeTransform {
  transform(value: any): string {
    return `${value}`;
  }
}

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let compiled: HTMLElement;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MockDatePipe, PostComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.data = mockPostData;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  }));

  it('should render content correctly', () => {
    expect(
      compiled.querySelector('[data-test=post-title]').textContent.trim()
    ).toBe('post title');
    expect(component.hasTags()).toBeTruthy();

    const output = compiled
      .querySelector('[data-test=post-content]')
      .textContent.trim();
    expect(output).toContain(mockPostData.content);
  });

  it('should display post date', async(async () => {
    const expectedDate = '' + mockPostData.date * 1000;

    fixture.detectChanges();
    await fixture.whenStable();

    // Uses the mock date pipe
    expect(
      compiled.querySelector('[data-test=post-date]').textContent.trim()
    ).toBe(expectedDate);
  }));
});

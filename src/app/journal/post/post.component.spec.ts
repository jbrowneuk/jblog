import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { TextParsingService } from '../../shared/text-parsing.service';
import { MockTextParsingService } from '../../shared/mocks/mock-text-parsing.service';

import { PostComponent } from './post.component';

const mockPostData = {
  postId: 1,
  date: Date.now(),
  title: 'post title',
  content: '<p>Example post content with an emoji :smile: . Yay!</p>',
  tags: ['one', 'two']
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
  const mockTextParsingService = new MockTextParsingService();

  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MockDatePipe, PostComponent],
      providers: [
        { provide: TextParsingService, useValue: mockTextParsingService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.data = mockPostData;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should render content correctly', () => {
    expect(compiled.querySelector('article h1').textContent.trim()).toBe(
      'post title'
    );
    expect(component.hasTags()).toBeTruthy();

    const output = compiled.querySelector('.content-area').textContent.trim();
    expect(output).toContain(
      'Example post content with an emoji :smile: . Yay! was parsed'
    );
  });

  it('should display image date', async(async () => {
    const expectedDate = '' + mockPostData.date * 1000;

    fixture.detectChanges();
    await fixture.whenStable();

    // Uses the mock date pipe
    expect(compiled.querySelector('.date').textContent.trim()).toBe(
      expectedDate
    );
  }));
});

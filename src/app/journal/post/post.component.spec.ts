import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PostData } from '../../model/post-data';
import { PostComponent } from './post.component';

const mockPostData: PostData = {
  postId: 1,
  date: Date.now(),
  modified: null,
  title: 'post title',
  content: 'Example post content with an emoji :smile: . Yay!',
  tags: ['one', 'two'],
  slug: 'mock',
  status: 'publish'
};

@Pipe({
  name: 'date'
})
class MockDatePipe implements PipeTransform {
  transform(value: any): string {
    return `${value}`;
  }
}

@Pipe({
  name: 'relativeDate'
})
class MockRelativeDatePipe implements PipeTransform {
  transform(value: any): string {
    return `${value}`;
  }
}

@Pipe({
  name: 'unixEpoch'
})
class MockUnixEpochPipe implements PipeTransform {
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
      declarations: [
        MockDatePipe,
        MockRelativeDatePipe,
        MockUnixEpochPipe,
        PostComponent
      ],
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
    expect(compiled.querySelector('[data-post-date]').textContent.trim()).toBe(
      expectedDate
    );
  }));

  it('should display modified information if set', async(() => {
    const modified = 1234567;

    // Copy mockPostData so the value doesn't linger after the test
    component.data = Object.assign({}, mockPostData);
    component.data.modified = modified;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const modifiedElement = compiled.querySelector(
        '[data-post-date]'
      ) as HTMLElement;
      expect(modifiedElement).toBeTruthy();
      expect(modifiedElement.title).toContain(`${modified}`);
    });
  }));

  it('should display outdated content warning when post is older than 2 years', async(() => {
    const numberYears = 2;
    // Convert Date.now to unix timestamp, subtract 1 second then subtract n years
    const secondsInYear = 31557600;
    const date =
      Math.floor(Date.now() / 1000) - 1 - secondsInYear * numberYears;

    // Copy mockPostData so the value doesn't linger after the test
    component.data = Object.assign({}, mockPostData);
    component.data.date = date;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const modifiedElement = compiled.querySelector(
        '[data-outdated-content]'
      ) as HTMLElement;
      expect(modifiedElement).toBeTruthy();
    });
  }));
});

import { formatDate } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PageObjectBase } from '../../lib/testing/page-object.base';
import { PostData, PostStatus } from '../../model/post-data';
import { SharedModule } from '../../shared/shared.module';
import { PostComponent } from './post.component';

const mockPostData: PostData = {
  postId: 1,
  date: 1577880720, // 2020-01-01T12:12:00Z
  modified: null,
  title: 'mock post',
  content: 'mock post',
  tags: ['mock', 'post'],
  slug: 'mock-post',
  status: PostStatus.Publish
};

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let pageObject: PostPageObject;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    pageObject = new PostPageObject(fixture);
    component = fixture.componentInstance;
    component.postData = mockPostData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    expect(`${pageObject.title.textContent}`.trim()).toBe(mockPostData.title);
  });

  it('should display date in correct formats', () => {
    // Convert date/time using test runner’s timeZone
    const currentLocale = TestBed.inject(LOCALE_ID);
    const epochMsec = mockPostData.date * 1000;
    const expectedAttrValue = formatDate(
      epochMsec,
      'yyyy-MM-ddTHH:mmZ',
      currentLocale
    );
    const expectedDayValue = formatDate(epochMsec, 'd', currentLocale);

    const expectedMonthYearValue = formatDate(
      epochMsec,
      'MMM yyyy',
      currentLocale
    );

    expect(pageObject.dateContainer.dateTime).toBe(expectedAttrValue);
    expect(`${pageObject.dateDay.textContent}`.trim()).toBe(expectedDayValue);
    expect(`${pageObject.dateMonthYear.textContent}`.trim()).toBe(
      expectedMonthYearValue
    );
  });

  it('should display post content', () => {
    expect(`${pageObject.postContent.textContent}`.trim()).toBe(
      mockPostData.content
    );
  });

  it('should display tags', () => {
    const tagElements = pageObject.tags;
    mockPostData.tags.forEach(tag => {
      const relatedElement = tagElements.find(
        t => t.dataset['postTag'] === tag
      );
      expect(relatedElement).toBeTruthy();
      expect(`${relatedElement?.textContent}`.trim()).toContain(tag);
    });
  });

  it('should display outdated content warning when post is older than 2 years', () => {
    const numberYears = 2;
    // Convert Date.now to unix timestamp, subtract 1 second then subtract n years
    const secondsInYear = 31557600;
    const date =
      Math.floor(Date.now() / 1000) - 1 - secondsInYear * numberYears;

    // Copy mockPostData so the value doesn't linger after the test
    component.postData = Object.assign({}, mockPostData);
    component.postData.date = date;

    fixture.detectChanges();
    expect(pageObject.outdatedContent).toBeTruthy();
  });

  describe('title clicking behaviour', () => {
    it('should not present a clickable title if title link property not provided', () => {
      expect(pageObject.titleLink).toBeFalsy();
      expect(`${pageObject.title.textContent}`.trim()).toBe(mockPostData.title);
    });

    it('should present a clickable title if title link property is provided', () => {
      component.titleLink = '/anywhere';
      fixture.detectChanges();

      expect(pageObject.titleLink).toBeTruthy();
      expect(`${pageObject.title.textContent}`.trim()).toBe(mockPostData.title);
    });
  });
});

class PostPageObject extends PageObjectBase<PostComponent> {
  public get title(): HTMLHeadingElement {
    return this.select('[data-title]');
  }

  public get titleLink(): HTMLAnchorElement {
    return this.select('[data-title-link]');
  }

  public get dateContainer(): HTMLTimeElement {
    return this.select('[data-date]');
  }

  public get dateDay(): HTMLSpanElement {
    return this.select('[data-day]');
  }

  public get dateMonthYear(): HTMLSpanElement {
    return this.select('[data-month-year]');
  }

  public get postContent(): HTMLElement {
    return this.select('[data-post-content]');
  }

  public get tags(): HTMLLIElement[] {
    return this.selectAll('[data-post-tags] [data-post-tag]');
  }

  public get outdatedContent(): HTMLDivElement {
    return this.select('[data-outdated-content]');
  }
}

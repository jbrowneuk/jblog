import { of } from 'rxjs';
import { PageObjectBase } from 'src/app/lib/testing/page-object.base';
import { PostData, PostDataWrapper, PostStatus } from 'src/app/model/post-data';
import { SharedModule } from 'src/app/shared/shared.module';
import { IMock, It, Mock, Times } from 'typemoq';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { JournalFacade } from '../state/journal.facade';
import { PostListComponent } from './post-list.component';

const mockPost: PostData = {
  postId: 1,
  date: 1585347583,
  modified: null,
  title: 'mock post',
  content: '',
  tags: [],
  slug: 'mock-post',
  status: PostStatus.Publish
};

const mockPostData: PostDataWrapper = {
  posts: Array(6).fill(mockPost),
  page: 2,
  totalPages: 4
};

class PostListPageObject extends PageObjectBase<PostListComponent> {
  public get posts(): HTMLElement[] {
    return this.selectAll('[data-post]');
  }

  public get previousPage(): HTMLAnchorElement {
    return this.select('[data-previous]');
  }

  public get nextPage(): HTMLAnchorElement {
    return this.select('[data-next]');
  }

  public get paginationText(): HTMLSpanElement {
    return this.select('[data-page]');
  }
}

describe('Post List Component', () => {
  let mockFacade: IMock<JournalFacade>;
  let mockRoute: IMock<ActivatedRoute>;
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let pageObject: PostListPageObject;

  beforeEach(async(async () => {
    mockFacade = Mock.ofType<JournalFacade>();
    mockFacade.setup(f => f.postListLoading$).returns(() => of(false));
    mockFacade.setup(f => f.postList$).returns(() => of(mockPostData));

    mockRoute = Mock.ofType<ActivatedRoute>();
    mockRoute
      .setup(r => r.params)
      .returns(() => of({ page: mockPostData.page }));

    await TestBed.configureTestingModule({
      declarations: [PostListComponent],
      providers: [
        { provide: JournalFacade, useFactory: () => mockFacade.object },
        { provide: ActivatedRoute, useFactory: () => mockRoute.object }
      ],
      imports: [RouterTestingModule, SharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    pageObject = new PostListPageObject(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should load posts from facade on creation', () => {
    expect(component).toBeTruthy();
    mockFacade.verify(
      f => f.loadPostList(It.isValue(mockPostData.page), It.isValue(null)),
      Times.once()
    );
  });

  it('should display posts', () => {
    const posts = pageObject.posts;
    mockPostData.posts.forEach((post, index) => {
      const relatedPostElement = posts[index];
      expect(relatedPostElement).toBeTruthy();
      expect(relatedPostElement.dataset.post).toBe(`${post.postId}`);
    });
  });

  it('should provide title link to posts', () => {
    const posts = pageObject.posts;
    mockPostData.posts.forEach((post, index) => {
      const relatedPostElement = posts[index] as any;
      expect(relatedPostElement.titleLink).toContain(post.slug);
    });
  });

  it('should display previous page link', () => {
    expect(pageObject.previousPage).toBeTruthy();
    expect(pageObject.previousPage.tagName.toUpperCase()).toBe('A');
  });

  it('should display next page link', () => {
    expect(pageObject.nextPage).toBeTruthy();
    expect(pageObject.nextPage.tagName.toUpperCase()).toBe('A');
  });

  it('should display pagination information', () => {
    const expectedText = `${mockPostData.page} of ${mockPostData.totalPages}`;
    expect(pageObject.paginationText).toBeTruthy();
    expect(pageObject.paginationText.textContent).toContain(expectedText);
  });
});

import { MockComponent } from 'ng-mocks';
import { BehaviorSubject, of } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { PageObjectBase } from '../../lib/testing/page-object.base';
import { PostData, PostDataWrapper, PostStatus } from '../../model/post-data';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { SharedModule } from '../../shared/shared.module';
import { TitleService } from '../../shared/title.service';
import { PostComponent } from '../post/post.component';
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

describe('Post List Component', () => {
  let mockFacade: IMock<JournalFacade>;
  let mockRoute: IMock<ActivatedRoute>;
  let mockTitleService: IMock<TitleService>;
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let pageObject: PostListPageObject;
  let paramsSubject: BehaviorSubject<Params>;

  beforeEach(() => {
    mockFacade = Mock.ofType<JournalFacade>();
    mockFacade.setup(f => f.postListLoading$).returns(() => of(false));
    mockFacade.setup(f => f.postList$).returns(() => of(mockPostData));

    paramsSubject = new BehaviorSubject({ page: mockPostData.page } as Params);

    mockRoute = Mock.ofType<ActivatedRoute>();
    mockRoute.setup(r => r.params).returns(() => paramsSubject);

    mockTitleService = Mock.ofType<TitleService>();

    TestBed.configureTestingModule({
      declarations: [PostListComponent, MockComponent(PostComponent)],
      providers: [
        { provide: JournalFacade, useFactory: () => mockFacade.object },
        { provide: ActivatedRoute, useFactory: () => mockRoute.object },
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ],
      imports: [RouterTestingModule, SharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    pageObject = new PostListPageObject(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load posts from facade on creation', () => {
    expect(component).toBeTruthy();
    mockFacade.verify(
      f => f.loadPostList(It.isValue(mockPostData.page), It.isValue('')),
      Times.once()
    );
  });

  it('should display posts', () => {
    const posts = pageObject.posts;
    mockPostData.posts.forEach((post, index) => {
      const relatedPostElement = posts[index];
      expect(relatedPostElement).toBeTruthy();
      expect(relatedPostElement.dataset['post']).toBe(`${post.postId}`);
    });
  });

  it('should provide title link to posts', () => {
    const posts = pageObject.postComponents;
    mockPostData.posts.forEach((post, index) => {
      const relatedPostElement = posts[index];
      expect(relatedPostElement.titleLink).toContain(post.slug);
    });
  });

  it('should display pagination', () => {
    const pagination = pageObject.pagination;
    expect(pagination).toBeTruthy();
    expect(pagination.currentPage).toBe(mockPostData.page);
    expect(pagination.totalPages).toBe(mockPostData.totalPages);
  });

  describe('tab title behaviour', () => {
    it('should update tab title with page number if no tag set', done => {
      setTimeout(() => {
        const expectedTitle = `Journal - page ${mockPostData.page}`;
        mockTitleService.verify(
          x => x.setTitle(It.isValue(expectedTitle)),
          Times.once()
        );

        done();
      });
    });

    it('should provide tag info and page number when tag set', done => {
      const mockTag = 'mock tag';
      paramsSubject.next({ page: mockPostData.page, tag: mockTag });

      setTimeout(() => {
        const expectedTitle = `Journal - posts tagged ${mockTag}, page ${mockPostData.page}`;
        mockTitleService.verify(
          x => x.setTitle(It.isValue(expectedTitle)),
          Times.once()
        );

        done();
      });
    });
  });

  describe('Tag filter behaviour', () => {
    it('should not have tag information if no tag specified', () => {
      expect(pageObject.tagName).toBeFalsy();
    });

    it('should provide tag info and page number when tag set', done => {
      const mockTag = 'mock-tag';
      paramsSubject.next({ page: mockPostData.page, tag: mockTag });
      fixture.detectChanges();

      setTimeout(() => {
        expect(pageObject.tagName.textContent).toBe(mockTag);
        done();
      });
    });
  });
});

class PostListPageObject extends PageObjectBase<PostListComponent> {
  public get posts(): HTMLElement[] {
    return this.selectAll('[data-post]');
  }

  public get postComponents(): PostComponent[] {
    return this.selectAllDebug('[data-post]').map(el => el.componentInstance);
  }

  public get pagination(): PaginationComponent {
    return this.selectDebug('jblog-pagination').componentInstance;
  }

  public get tagName(): HTMLSpanElement {
    return this.select('[data-tag]');
  }
}

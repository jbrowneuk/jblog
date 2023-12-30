import { BehaviorSubject, of } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { PageObjectBase } from '../../lib/testing/page-object.base';
import { PostData, PostStatus } from '../../model/post-data';
import { TitleService } from '../../shared/title.service';
import { JournalFacade } from '../state/journal.facade';
import { PostSingleComponent } from './post-single.component';

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

class PostSinglePageObject extends PageObjectBase<PostSingleComponent> {
  public get post(): HTMLElement {
    return this.select('[data-post]');
  }

  public get backButton(): HTMLAnchorElement {
    return this.select('[data-back-button]');
  }
}

describe('Post (Single) Component', () => {
  let mockFacade: IMock<JournalFacade>;
  let mockRoute: IMock<ActivatedRoute>;
  let mockTitleService: IMock<TitleService>;
  let postSubject: BehaviorSubject<PostData | null>;
  let component: PostSingleComponent;
  let fixture: ComponentFixture<PostSingleComponent>;
  let pageObject: PostSinglePageObject;

  beforeEach(() => {
    postSubject = new BehaviorSubject<PostData | null>(mockPost);
    mockFacade = Mock.ofType<JournalFacade>();
    mockFacade.setup(f => f.postListLoading$).returns(() => of(false));
    mockFacade.setup(f => f.currentPost$).returns(() => postSubject);

    mockRoute = Mock.ofType<ActivatedRoute>();
    mockRoute.setup(r => r.params).returns(() => of({ slug: mockPost.slug }));

    mockTitleService = Mock.ofType<TitleService>();

    TestBed.configureTestingModule({
      declarations: [PostSingleComponent],
      providers: [
        { provide: JournalFacade, useFactory: () => mockFacade.object },
        { provide: ActivatedRoute, useFactory: () => mockRoute.object },
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ],
      schemas: [RouterTestingModule, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSingleComponent);
    pageObject = new PostSinglePageObject(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load post from facade on creation', () => {
    expect(component).toBeTruthy();
    mockFacade.verify(
      f => f.loadPostBySlug(It.isValue(mockPost.slug)),
      Times.once()
    );
  });

  it('should display posts', () => {
    const relatedPost = pageObject.post;
    expect(relatedPost).toBeTruthy();
    expect(relatedPost.dataset['post']).toBe(`${mockPost.postId}`);
  });

  describe('tab title behaviour', () => {
    it('should set tab title to post title', () => {
      mockTitleService.verify(
        s => s.setTitle(It.isValue(`Journal - ${mockPost.title}`)),
        Times.once()
      );
    });

    it('should reset tab title if post data is invalid', done => {
      postSubject.next(null);

      setTimeout(() => {
        mockTitleService.verify(s => s.resetTitle(), Times.once());
        done();
      });
    });
  });
});

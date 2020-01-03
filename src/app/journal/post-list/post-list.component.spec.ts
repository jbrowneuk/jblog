import { BehaviorSubject, of as observableOf } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';

import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { PostService } from '../../services/post.service';
import { InfiniteScrollDirective } from '../../shared/infinite-scroll.directive';
import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { TitleService } from '../../shared/title.service';
import { TransitionCompleteService } from '../../shared/transition-complete.service';
import { PostListComponent } from './post-list.component';

const mockPostData = {
  postId: 1,
  date: 1024,
  modified: 2048,
  title: 'post title',
  content: 'long content here',
  tags: ['one', 'two'],
  slug: 'mock-data'
};

const mockPostDataWrapper = {
  posts: [mockPostData],
  page: 1,
  totalPages: 4
};

@Component({
  selector: 'jblog-post',
  template: '<div data-post>Post data</div>',
  styles: ['[data-post]{height:320px}']
})
class MockPostComponent {}

describe('PostListComponent', () => {
  let mockPostService: IMock<PostService>;
  let mockTitleService: IMock<TitleService>;

  // Needed for the scroll directive
  let mockTransitionCompleteService: IMock<TransitionCompleteService>;

  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let compiled: HTMLElement;

  const setupMocks = () => {
    mockTitleService = Mock.ofType<TitleService>();
    mockTitleService.setup(x => x.setTitle(It.isAnyString()));
    mockTitleService.setup(x => x.resetTitle());

    mockPostService = Mock.ofType<PostService>();
    mockPostService
      .setup(mps => mps.getPostsForPage(It.isAnyNumber(), It.isAny()))
      .returns(() => observableOf(mockPostDataWrapper));
    mockPostService
      .setup(mps => mps.getPost(It.isAnyString()))
      .returns(() => observableOf(mockPostData));

    mockTransitionCompleteService = Mock.ofType<TransitionCompleteService>();
  };

  beforeEach(() => {
    setupMocks();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        PaginationComponent,
        MockPostComponent,
        PostListComponent,
        LoadSpinnerComponent,
        InfiniteScrollDirective
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: PostService, useFactory: () => mockPostService.object },
        { provide: TitleService, useFactory: () => mockTitleService.object },
        {
          provide: TransitionCompleteService,
          useFactory: () => mockTransitionCompleteService.object
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
  });

  it('should fetch posts for default page and tag on initialization', async(async () => {
    fixture.detectChanges(); // Implicitly calls ngOnInit

    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.posts.length).toBe(mockPostDataWrapper.posts.length);
    expect(component.posts[0]).toEqual(mockPostData);
  }));

  it('should fetch posts for specified page', () => {
    const specifedPage = 3;

    const mockParam: Params = { page: `${specifedPage}` };
    const route = TestBed.get(ActivatedRoute) as ActivatedRoute;
    const params = route.params as BehaviorSubject<Params>;
    params.next(mockParam);

    component.ngOnInit();

    mockPostService.verify(
      s => s.getPostsForPage(It.isValue(specifedPage), It.isAny()),
      Times.once()
    );
    expect().nothing();
  });

  it('should fetch a specific post if the ID route is hit', () => {
    const specifiedPost = mockPostData.slug;

    const mockParam: Params = { id: specifiedPost };
    const route = TestBed.get(ActivatedRoute) as ActivatedRoute;
    const params = route.params as BehaviorSubject<Params>;
    params.next(mockParam);

    component.ngOnInit();

    mockPostService.verify(
      s => s.getPost(It.isValue(specifiedPost)),
      Times.once()
    );
    expect().nothing();
  });

  it('should fetch next page when the scroll limit is reached', () => {
    const initialPage = 1;
    component.posts = [mockPostData];
    component.page = initialPage;
    component.totalPages = 4;

    component.onScrollReached();

    mockPostService.verify(
      s => s.getPostsForPage(It.isValue(initialPage + 1), It.isAny()),
      Times.once()
    );
    expect().nothing();
  });

  it('should fetch show navigation button when the scroll and post limit is reached', async(() => {
    fixture.detectChanges();

    const initialPage = 1;
    component.posts = [];
    for (let i = 0; i < 16; i++) {
      component.posts.push(mockPostData);
    }

    component.page = initialPage;
    component.totalPages = 4;
    component.showNavigation = false;

    component.onScrollReached();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.showNavigation).toBeTruthy();

      const navButton = compiled.querySelector('#post-limit-button-area');
      expect(navButton).toBeTruthy();
      expect(navButton.textContent.trim()).toBe('Older posts');

      mockPostService.verify(
        s => s.getPostsForPage(It.isValue(initialPage + 1), It.isAny()),
        Times.once()
      );
      expect().nothing();
    });
  }));
});

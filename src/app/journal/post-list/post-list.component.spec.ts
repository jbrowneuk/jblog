
import {of as observableOf,  Observable ,  BehaviorSubject } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
 // TODO: lettable/pipable import needed
import { Params, ActivatedRoute } from '@angular/router';

import { IMock, It, Mock, Times } from 'typemoq';

import { PostData, PostDataWrapper } from '../post-data';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { PostComponent } from '../post/post.component';
import { PostService } from '../post.service';
import { TextParsingService } from '../../shared/text-parsing.service';
import { PageHeroComponent } from '../../shared/page-hero/page-hero.component';
import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner.component';
import { InfiniteScrollDirective } from '../../shared/infinite-scroll.directive';
import { TitleService } from '../../shared/title.service';
import { TransitionCompleteService } from '../../shared/transition-complete.service';

import { PostListComponent } from './post-list.component';

const mockPostData = {
  postId: 1,
  date: 1024,
  title: 'post title',
  content: 'long content here',
  tags: ['one', 'two']
};
const mockPostDataWrapper = {
  posts: [mockPostData],
  totalPages: 4
};

describe('PostListComponent', () => {
  let mockPostService: IMock<PostService>;
  let mockTextParsingService: IMock<TextParsingService>;
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

    mockTextParsingService = Mock.ofType<TextParsingService>();
    mockTextParsingService
      .setup(tps => tps.parse(It.isAnyString()))
      .returns(s => s);

    mockPostService = Mock.ofType<PostService>();
    mockPostService
      .setup(mps => mps.getPostsForPage(It.isAnyNumber(), It.isAny()))
      .returns(() => observableOf(mockPostDataWrapper));
    mockPostService
      .setup(mps => mps.getPost(It.isAnyNumber()))
      .returns(() => observableOf(mockPostData));

    mockTransitionCompleteService = Mock.ofType<TransitionCompleteService>();
  };

  beforeEach(() => {
    setupMocks();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        PaginationComponent,
        PostComponent,
        PostListComponent,
        PageHeroComponent,
        LoadSpinnerComponent,
        InfiniteScrollDirective
      ],
      providers: [
        { provide: PostService, useFactory: () => mockPostService.object },
        {
          provide: TextParsingService,
          useFactory: () => mockTextParsingService.object
        },
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

  it('should fetch posts for default page and tag on initialization', async(() => {
    fixture.detectChanges(); // Implicitly calls ngOnInit

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(
        compiled.querySelector('jblog-post article h2').textContent.trim()
      ).toBe(mockPostData.title);
      expect(
        compiled.querySelector('jblog-post .content-area').textContent.trim()
      ).toBe(mockPostData.content);
    });
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
  });

  it('should fetch a specific post if the ID route is hit', () => {
    const specifiedPost = 3;

    const mockParam: Params = { id: `${specifiedPost}` };
    const route = TestBed.get(ActivatedRoute) as ActivatedRoute;
    const params = route.params as BehaviorSubject<Params>;
    params.next(mockParam);

    component.ngOnInit();

    mockPostService.verify(
      s => s.getPost(It.isValue(specifiedPost)),
      Times.once()
    );
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
    });
  }));
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'; // TODO: lettable/pipable import needed

import { It, Mock } from 'typemoq';

import { PostData, PostDataWrapper } from '../post-data';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { PostComponent } from '../post/post.component';
import { PostService } from '../post.service';
import { TextParsingService } from '../../shared/text-parsing.service';
import { MockTextParsingService } from '../../shared/mocks/mock-text-parsing.service';
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

class MockPostService {
  public getPostsForPage(pageNumber: number): Observable<PostDataWrapper> {
    return Observable.of(mockPostDataWrapper);
  }

  public getPost(postId: number): Observable<PostData> {
    return Observable.of(mockPostData);
  }
}

describe('PostListComponent', () => {
  const mockPostService = new MockPostService();
  const mockTextParsingService = new MockTextParsingService();
  const mockTitleService = Mock.ofType<TitleService>();
  mockTitleService.setup(x => x.setTitle(It.isAnyString()));
  mockTitleService.setup(x => x.resetTitle());

  const mockTransitionCompleteService = {
    completedTransition(s: string, s1: string) {},
    subscribe() { return { unsubscribe() {} }; }
  };

  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [
        PaginationComponent,
        PostComponent,
        PostListComponent,
        PageHeroComponent,
        LoadSpinnerComponent,
        InfiniteScrollDirective
      ],
      providers: [
        { provide: PostService, useValue: mockPostService },
        { provide: TextParsingService, useValue: mockTextParsingService },
        { provide: TitleService, useFactory: () => mockTitleService.object },
        { provide: TransitionCompleteService, useValue: mockTransitionCompleteService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should render content correctly', () => {
    // Has a post
    expect(compiled.querySelector('jblog-post article h2').textContent.trim()).toBe('post title');
    expect(compiled.querySelector('jblog-post .content-area').textContent.trim()).toBe('long content here was parsed');
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { PostData, PostDataWrapper } from '../post-data';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { PostComponent } from '../post/post.component';
import { PostService } from '../post.service';
// import { LineSplittingPipe } from '../../shared/line-splitting.pipe';
import { TextParsingService } from '../../shared/text-parsing.service';
import { MockTextParsingService } from '../../shared/mocks/mock-text-parsing.service';

import { PostListComponent } from './post-list.component';

const mockPostData = {
  postId: 1,
  date: Date.now(),
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

  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [
        PaginationComponent,
        PostComponent,
        PostListComponent
      ],
      providers: [
        { provide: PostService, useValue: mockPostService },
        { provide: TextParsingService, useValue: mockTextParsingService }
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
    expect(compiled.querySelector('jblog-post article h1').textContent.trim()).toBe('post title');
    expect(compiled.querySelector('jblog-post .content-info-area ul li').textContent.trim()).toBe('Post 1');
    expect(compiled.querySelector('jblog-post .content-area').textContent.trim()).toBe('long content here was parsed');

    // Has a pagination area
    expect(compiled.querySelector('jblog-pagination')).toBeTruthy();
    expect(compiled.querySelector('jblog-pagination li.active').textContent.trim()).toBe('1');
  });
});

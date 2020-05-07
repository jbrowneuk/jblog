import { of } from 'rxjs';
import { IMock, It, Mock } from 'typemoq';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PostData, PostDataWrapper, PostStatus } from '../../model/post-data';
import { PostService } from '../../services/post.service';
import { PostListComponent } from './post-list.component';

const mockPostData: PostData = {
  postId: 1,
  date: 1577487979,
  modified: null,
  title: 'post title',
  content: 'content',
  tags: [],
  slug: 'post-slug',
  status: PostStatus.Publish
};

const mockPostDataWrapper: PostDataWrapper = {
  posts: [mockPostData, mockPostData, mockPostData],
  page: 1,
  totalPages: 4
};

describe('PostListComponent', () => {
  let mockPostService: IMock<PostService>;

  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async(() => {
    mockPostService = Mock.ofType<PostService>();
    mockPostService
      .setup(s => s.getPostsForPage(It.isAny()))
      .returns(() => of(mockPostDataWrapper));

    TestBed.configureTestingModule({
      declarations: [PostListComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: PostService, useFactory: () => mockPostService.object }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PostListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display rows for each post', () => {
    const postRows = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '[data-post-row]'
    );

    expect(postRows.length).toBe(mockPostDataWrapper.posts.length);

    for (let index = 0; index < postRows.length; index++) {
      const postData = mockPostDataWrapper.posts[index];
      const rowElement = postRows.item(index);

      const titleElement = rowElement.querySelector('[data-title]');
      expect(titleElement.textContent.trim()).toBe(postData.title);
    }
  });
});

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PostData, PostDataWrapper } from '../model/post-data';
import { PostService } from './post.service';

const mockFirstPost = {
  postId: 1,
  date: Date.now(),
  title: 'first',
  content: 'first post!',
  tags: ['first', 'post'],
  slug: 'first-post'
};

const mockSecondPost = {
  postId: 2,
  date: Date.now(),
  title: '2nd',
  content: 'second post!',
  tags: ['second', 'post'],
  slug: 'second post'
};

describe('PostService', () => {
  let httpTestingController: HttpTestingController;
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(PostService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get posts for a specified page', (done: DoneFn) => {
    const expectedPage = 3;

    const mockResponse: PostDataWrapper = {
      posts: [mockFirstPost, mockSecondPost],
      totalPages: expectedPage
    };

    service
      .getPostsForPage(expectedPage)
      .subscribe((postData: PostDataWrapper) => {
        expect(postData.posts.length).toBe(mockResponse.posts.length);
        done();
      });

    const req = httpTestingController.expectOne(
      `http://localhost/api/?posts&page=${expectedPage}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should get posts for a specified tag', (done: DoneFn) => {
    const expectedTag = 'myTag';

    const mockResponse: PostDataWrapper = {
      posts: [mockFirstPost, mockSecondPost],
      totalPages: 1
    };

    service
      .getPostsForPage(0, expectedTag)
      .subscribe((postData: PostDataWrapper) => {
        expect(postData.posts.length).toBe(mockResponse.posts.length);
        done();
      });

    const req = httpTestingController.expectOne(
      `http://localhost/api/?posts&tag=${expectedTag}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should get a specific post', (done: DoneFn) => {
    const slug = mockFirstPost.slug;
    const mockResponse: PostData[] = [mockFirstPost];

    service.getPost(slug).subscribe(
      (postData: PostData) => {
        expect(postData).toEqual(mockFirstPost);
        done();
      },
      (err: any) => fail(err)
    );

    const req = httpTestingController.expectOne(
      `http://localhost/api/?posts&slug=${slug}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should handle errors when getting post list', (done: DoneFn) => {
    const page = 1024;

    service.getPostsForPage(page).subscribe(
      () => fail('Should never get here'),
      (err: Error) => {
        expect(err).toBeTruthy();
        done();
      }
    );

    const req = httpTestingController.expectOne(
      `http://localhost/api/?posts&page=${page}`
    );
    req.flush('fake 404', { status: 404, statusText: 'Not Found' });
  });

  it('should handle errors when getting single post information', (done: DoneFn) => {
    const postId = '1024';
    service.getPost(postId).subscribe(
      () => fail('Should never get here'),
      (err: Error) => {
        expect(err).toBeTruthy();
        done();
      }
    );

    const req = httpTestingController.expectOne(
      `http://localhost/api/?posts&slug=${postId}`
    );
    req.flush('fake 404', { status: 404, statusText: 'Not Found' });
  });

  it('should handle errors when getting post information for invalid id', (done: DoneFn) => {
    const postId = '';

    service.getPost(postId).subscribe(
      () => fail('Should never get here'),
      (err: Error) => {
        expect(err).toBeTruthy();
        done();
      }
    );
  });
});

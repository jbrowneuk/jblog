import { of, throwError } from 'rxjs';
import { IMock, It, Mock } from 'typemoq';

import { TestBed } from '@angular/core/testing';

import { PostData, PostDataWrapper, PostStatus } from '../model/post-data';
import { PostService } from './post.service';
import { RestService } from './rest.service';

const mockFirstPost: PostData = {
  postId: 1,
  date: Date.now(),
  modified: null,
  title: 'first',
  content: 'first post!',
  tags: ['first', 'post'],
  slug: 'first-post',
  status: PostStatus.Publish
};

const mockSecondPost: PostData = {
  postId: 2,
  date: Date.now(),
  modified: null,
  title: '2nd',
  content: 'second post!',
  tags: ['second', 'post'],
  slug: 'second post',
  status: PostStatus.Publish
};

describe('PostService', () => {
  let mockRestService: IMock<RestService>;
  let service: PostService;

  beforeEach(() => {
    mockRestService = Mock.ofType<RestService>();

    TestBed.configureTestingModule({
      providers: [
        { provide: RestService, useFactory: () => mockRestService.object },
        PostService
      ]
    });

    service = TestBed.inject(PostService);
  });

  afterEach(() => {
    mockRestService.verifyAll();
  });

  it('should get posts for a specified page', done => {
    const expectedPage = 3;
    const expectedUrl = `http://localhost/api/?posts&page=${expectedPage}`;

    const mockResponse: PostDataWrapper = {
      posts: [mockFirstPost, mockSecondPost],
      page: 1,
      totalPages: expectedPage
    };

    mockRestService
      .setup(s => s.get(It.isValue(expectedUrl)))
      .returns(() => of(mockResponse));

    service.getPostsForPage(expectedPage).subscribe({
      next: (postData: PostDataWrapper) => {
        expect(postData.posts.length).toBe(mockResponse.posts.length);
        done();
      }
    });
  });

  it('should get posts for a specified tag', done => {
    const expectedTag = 'myTag';
    const expectedUrl = `http://localhost/api/?posts&tag=${expectedTag}`;

    const mockResponse: PostDataWrapper = {
      posts: [mockFirstPost, mockSecondPost],
      page: 1,
      totalPages: 1
    };

    mockRestService
      .setup(s => s.get(It.isValue(expectedUrl)))
      .returns(() => of(mockResponse));

    service.getPostsForPage(0, expectedTag).subscribe({
      next: (postData: PostDataWrapper) => {
        expect(postData.posts.length).toBe(mockResponse.posts.length);
        done();
      }
    });
  });

  it('should get a specific post', done => {
    const slug = mockFirstPost.slug;
    const expectedUrl = `http://localhost/api/?posts&slug=${slug}`;
    const mockResponse: PostData[] = [mockFirstPost];

    mockRestService
      .setup(s => s.get(It.isValue(expectedUrl)))
      .returns(() => of(mockResponse));

    service.getPost(slug).subscribe({
      next: (postData: PostData) => {
        expect(postData).toEqual(mockFirstPost);

        done();
      }
    });
  });

  it('should handle errors when getting post list', done => {
    const page = 1024;
    const expectedUrl = `http://localhost/api/?posts&page=${page}`;

    mockRestService
      .setup(s => s.get(It.isValue(expectedUrl)))
      .returns(() => throwError(() => new Error('mock failure')));

    service.getPostsForPage(page).subscribe({
      next: () => fail('Should never get here'),
      error: (err: Error) => {
        expect(err).toBeTruthy();

        done();
      }
    });
  });

  it('should handle errors when getting single post information', done => {
    const postId = '1024';
    const expectedUrl = `http://localhost/api/?posts&slug=${postId}`;

    mockRestService
      .setup(s => s.get(It.isValue(expectedUrl)))
      .returns(() => throwError(() => new Error('mock failure')));

    service.getPost(postId).subscribe({
      next: () => fail('Should never get here'),
      error: (err: Error) => {
        expect(err).toBeTruthy();
        done();
      }
    });
  });

  it('should handle errors when getting post information for invalid id', done => {
    const postId = '';

    service.getPost(postId).subscribe({
      next: () => fail('Should never get here'),
      error: (err: Error) => {
        expect(err).toBeTruthy();
        done();
      }
    });
  });
});

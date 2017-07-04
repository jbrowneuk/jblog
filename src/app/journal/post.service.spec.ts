import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { PostData, PostDataWrapper } from './post-data';
import { PostService } from './post.service';

const mockFirstPost = {
  postId: 1,
  date: Date.now(),
  title: 'first',
  content: 'first post!',
  tags: ['first', 'post']
};

const mockSecondPost = {
  postId: 2,
  date: Date.now(),
  title: '2nd',
  content: 'second post!',
  tags: ['second', 'post']
};

describe('PostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        PostService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should get all posts for a page',
    inject([PostService, XHRBackend], (service, mockBackend) => {
      const mockResponse = { data: {
        posts: [mockFirstPost, mockSecondPost],
        totalPages: 1
      }};

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      service.getPostsForPage().subscribe((postData: PostDataWrapper) => {
        expect(postData.posts.length).toBe(2);
        expect(postData.totalPages).toBe(1);
      });
  }));

  it('should get a post',
    inject([PostService, XHRBackend], (service, mockBackend) => {
      const mockResponse = { data: [mockFirstPost] };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      service.getPost(1).subscribe((postData: PostData) => {
        expect(postData.postId).toBe(1);
        expect(postData.title).toBe('first');
      });
  }));

});

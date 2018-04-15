import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

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
      providers: [PostService, { provide: XHRBackend, useClass: MockBackend }]
    });
  });

  it(
    'should get all posts for default page',
    inject([PostService, XHRBackend], (service, mockBackend) => {
      const mockResponse = {
        data: {
          posts: [mockFirstPost, mockSecondPost],
          totalPages: 1
        }
      };

      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: JSON.stringify(mockResponse)
            })
          )
        );
      });

      service.getPostsForPage().subscribe((postData: PostDataWrapper) => {
        expect(postData.posts.length).toBe(mockResponse.data.posts.length);
        expect(postData.totalPages).toBe(mockResponse.data.totalPages);
      });
    })
  );

  it(
    'should get posts for a specified page',
    inject(
      [PostService, XHRBackend],
      (service: PostService, mockBackend: MockBackend) => {
        const expectedPage = 3;
        let lastConnection: MockConnection;

        const mockResponse = {
          data: {
            posts: [mockFirstPost, mockSecondPost],
            totalPages: expectedPage
          }
        };
        mockBackend.connections.subscribe((connection: MockConnection) => {
          lastConnection = connection;
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                body: JSON.stringify(mockResponse)
              })
            )
          );
        });

        service
          .getPostsForPage(expectedPage)
          .subscribe((postData: PostDataWrapper) => {
            expect(postData.posts.length).toBe(mockResponse.data.posts.length);
            expect(lastConnection.request.url).toBe(
              `http://localhost/api/?posts&page=${expectedPage}`
            );
          });
      }
    )
  );

  it(
    'should get posts for a specified tag',
    inject(
      [PostService, XHRBackend],
      (service: PostService, mockBackend: MockBackend) => {
        const expectedTag = 'myTag';
        let lastConnection: MockConnection;

        const mockResponse = {
          data: {
            posts: [mockFirstPost, mockSecondPost],
            totalPages: 1
          }
        };
        mockBackend.connections.subscribe((connection: MockConnection) => {
          lastConnection = connection;
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                body: JSON.stringify(mockResponse)
              })
            )
          );
        });

        service
          .getPostsForPage(0, expectedTag)
          .subscribe((postData: PostDataWrapper) => {
            expect(postData.posts.length).toBe(mockResponse.data.posts.length);
            expect(lastConnection.request.url).toBe(
              `http://localhost/api/?posts&tag=${expectedTag}`
            );
          });
      }
    )
  );

  it(
    'should get a specific post',
    inject([PostService, XHRBackend], (service, mockBackend) => {
      const mockResponse = { data: [mockFirstPost] };

      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: JSON.stringify(mockResponse)
            })
          )
        );
      });

      service.getPost(1).subscribe((postData: PostData) => {
        expect(postData.postId).toBe(1);
        expect(postData.title).toBe('first');
      });
    })
  );

  it(
    'should handle errors when getting post list',
    inject([PostService], (service: PostService) => {
      const http = TestBed.get(Http);
      spyOn(http, 'get').and.returnValue(Observable.throw('any error'));

      service
        .getPostsForPage(1)
        .subscribe(
          (response: any) => fail('Should never get here'),
          (err: Error) => expect(err).toBeTruthy()
        );
    })
  );

  it(
    'should handle errors when getting single post information',
    inject([PostService], (service: PostService) => {
      const http = TestBed.get(Http);
      spyOn(http, 'get').and.returnValue(Observable.throw('any error'));

      service
        .getPost(1)
        .subscribe(
          (response: any) => fail('Should never get here'),
          (err: Error) => expect(err).toBeTruthy()
        );
    })
  );

  it(
    'should handle errors when getting post information for invalid id',
    inject([PostService], (service: PostService) => {
      const http = TestBed.get(Http);
      spyOn(http, 'get').and.returnValue(Observable.throw('any error'));

      service
        .getPost(0)
        .subscribe(
          (response: any) => fail('Should never get here'),
          (err: Error) => expect(err.message).toBeTruthy()
        );
    })
  );
});

import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { PostData, PostDataWrapper, PostStatus } from 'src/app/model/post-data';
import { PostService } from 'src/app/services/post.service';
import { IMock, It, Mock } from 'typemoq';

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import {
  LoadPosts,
  LoadPostsFailure,
  LoadPostsSuccess,
  LoadSinglePost,
  LoadSinglePostFailure,
  LoadSinglePostSuccess
} from './journal.actions';
import { JournalEffects } from './journal.effects';

describe('Journal effects', () => {
  const mockPost: PostData = {
    postId: 1,
    title: 'test post',
    content: 'a test post',
    slug: 'test-post',
    tags: ['test', 'post'],
    date: 123456789,
    modified: null,
    status: PostStatus.Publish
  };

  const mockPostData: PostDataWrapper = {
    posts: [],
    page: 1,
    totalPages: 4
  };

  let actions: Observable<any>;
  let mockService: IMock<PostService>;
  let effects: JournalEffects;

  beforeEach(() => {
    mockService = Mock.ofType<PostService>();

    TestBed.configureTestingModule({
      providers: [
        JournalEffects,
        provideMockActions(() => actions),
        { provide: PostService, useFactory: () => mockService.object }
      ]
    });

    effects = TestBed.inject(JournalEffects);
  });

  describe('loadPosts$', () => {
    it('should return LoadPostsSuccess action with the post data on success', () => {
      const page = 1;
      const tag = 'any';
      mockService
        .setup(s => s.getPostsForPage(It.isValue(page), It.isValue(tag)))
        .returns(() => of(mockPostData));

      const inputAction = new LoadPosts(page, tag);
      const outcomeAction = new LoadPostsSuccess(mockPostData);
      actions = hot('--a-', { a: inputAction });
      const expected = cold('--b', { b: outcomeAction });
      expect(effects.loadPosts$).toBeObservable(expected);
    });

    it('should return LoadPostsFailure action on failure', () => {
      const page = 1;
      const tag = 'any';
      mockService
        .setup(s => s.getPostsForPage(It.isValue(page), It.isValue(tag)))
        .returns(() => throwError(() => 'nope'));

      const inputAction = new LoadPosts(page, tag);
      const outcomeAction = new LoadPostsFailure();
      actions = hot('--a-', { a: inputAction });
      const expected = cold('--b', { b: outcomeAction });
      expect(effects.loadPosts$).toBeObservable(expected);
    });
  });

  describe('loadSinglePost$', () => {
    it('should return LoadSinglePostSuccess action with the post on success', () => {
      const slug = 'slug';
      mockService.setup(s => s.getPost(slug)).returns(() => of(mockPost));

      const inputAction = new LoadSinglePost(slug);
      const outcomeAction = new LoadSinglePostSuccess(mockPost);
      actions = hot('--a-', { a: inputAction });
      const expected = cold('--b', { b: outcomeAction });
      expect(effects.loadSinglePost$).toBeObservable(expected);
    });

    it('should return LoadSinglePostFailure action on failure', () => {
      const slug = 'slug';
      mockService.setup(s => s.getPost(slug)).returns(() => throwError('nope'));

      const inputAction = new LoadSinglePost(slug);
      const outcomeAction = new LoadSinglePostFailure();
      actions = hot('--a-', { a: inputAction });
      const expected = cold('--b', { b: outcomeAction });
      expect(effects.loadSinglePost$).toBeObservable(expected);
    });
  });
});

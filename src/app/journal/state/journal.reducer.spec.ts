import { PostData, PostDataWrapper, PostStatus } from 'src/app/model/post-data';

import {
  LoadPosts,
  LoadPostsFailure,
  LoadPostsSuccess,
  LoadSinglePost,
  LoadSinglePostFailure,
  LoadSinglePostSuccess
} from './journal.actions';
import { journalReducer } from './journal.reducer';
import { JournalState } from './journal.state';

describe('Journal reducer', () => {
  const initialState: JournalState = {
    currentPost: null,
    postsLoading: false
  };

  const mockPostData: PostDataWrapper = {
    posts: [],
    page: 1,
    totalPages: 4
  };

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

  describe('loading multiple posts', () => {
    it('should set loading to true on LoadPosts action', () => {
      const action = new LoadPosts(1, 'any');
      const result = journalReducer(initialState, action);
      expect(result.postsLoading).toBeTrue();
    });

    it('should set loading to false on LoadPostsSuccess action', () => {
      const action = new LoadPostsSuccess(mockPostData);
      const result = journalReducer(initialState, action);
      expect(result.postsLoading).toBeFalse();
    });

    it('should set post data on LoadPostsSuccess action', () => {
      const action = new LoadPostsSuccess(mockPostData);
      const result = journalReducer(initialState, action);
      expect(result.posts).toEqual(mockPostData);
    });

    it('should set loading to false on LoadPostsFailure action', () => {
      const action = new LoadPostsFailure();
      const result = journalReducer(initialState, action);
      expect(result.postsLoading).toBeFalse();
    });

    it('should not change post data on LoadPostsFailure action', () => {
      const action = new LoadPostsFailure();
      const result = journalReducer(initialState, action);
      expect(result.posts).toEqual(initialState.posts);
    });
  });

  describe('loading single posts', () => {
    it('should set loading to true on LoadSinglePost action', () => {
      const action = new LoadSinglePost('any');
      const result = journalReducer(initialState, action);
      expect(result.postsLoading).toBeTrue();
    });

    it('should set loading to false on LoadSinglePostSuccess action', () => {
      const action = new LoadSinglePostSuccess(mockPost);
      const result = journalReducer(initialState, action);
      expect(result.postsLoading).toBeFalse();
    });

    it('should set post data on LoadSinglePostSuccess action', () => {
      const action = new LoadSinglePostSuccess(mockPost);
      const result = journalReducer(initialState, action);
      expect(result.currentPost).toEqual(mockPost);
    });

    it('should set loading to false on LoadSinglePostFailure action', () => {
      const action = new LoadSinglePostFailure();
      const result = journalReducer(initialState, action);
      expect(result.postsLoading).toBeFalse();
    });

    it('should not change current post data on LoadSinglePostFailure action', () => {
      const action = new LoadSinglePostFailure();
      const result = journalReducer(initialState, action);
      expect(result.currentPost).toEqual(initialState.currentPost);
    });
  });
});

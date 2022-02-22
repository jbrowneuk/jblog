import { PostData, PostDataWrapper, PostStatus } from 'src/app/model/post-data';

import {
    JournalActionsType, LoadPosts, LoadPostsFailure, LoadPostsSuccess, LoadSinglePost,
    LoadSinglePostFailure, LoadSinglePostSuccess
} from './journal.actions';

describe('Load Post action', () => {
  it('should have correct type', () => {
    const action = new LoadPosts(1, 'any');
    expect(action.type).toBe(JournalActionsType.LoadPosts);
  });

  it('should have page number and tag set', () => {
    const page = 42069;
    const tag = 'any';
    const action = new LoadPosts(page, tag);
    expect(action.page).toBe(page);
    expect(action.tag).toBe(tag);
  });
});

describe('Load Posts Success action', () => {
  const mockPostData: PostDataWrapper = {
    posts: [],
    page: 1,
    totalPages: 5
  };

  it('should have correct type', () => {
    const action = new LoadPostsSuccess(mockPostData);
    expect(action.type).toBe(JournalActionsType.LoadPostsSuccess);
  });

  it('should have correct payload', () => {
    const action = new LoadPostsSuccess(mockPostData);
    expect(action.payload).toBe(mockPostData);
  });
});

describe('Load Posts Failure action', () => {
  it('should have correct type', () => {
    const action = new LoadPostsFailure();
    expect(action.type).toBe(JournalActionsType.LoadPostsFailure);
  });
});

describe('Load Single Post action', () => {
  it('should have correct type', () => {
    const action = new LoadSinglePost('slug');
    expect(action.type).toBe(JournalActionsType.LoadSinglePost);
  });

  it('should have post slug as payload', () => {
    const slug = 'slug';
    const action = new LoadSinglePost(slug);
    expect(action.payload).toBe(slug);
  });
});

describe('Load Single Post Success action', () => {
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

  it('should have correct type', () => {
    const action = new LoadSinglePostSuccess(mockPost);
    expect(action.type).toBe(JournalActionsType.LoadSinglePostSuccess);
  });

  it('should have correct payload', () => {
    const action = new LoadSinglePostSuccess(mockPost);

    // The single post is the first element in the array
    expect(action.payload).toBe(mockPost);
  });
});

describe('Load Single Post Failure action', () => {
  it('should have correct type', () => {
    const action = new LoadSinglePostFailure();
    expect(action.type).toBe(JournalActionsType.LoadSinglePostFailure);
  });
});

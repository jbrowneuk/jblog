import { PostStatus } from '../../model/post-data';
import {
  getCurrentPost,
  getPostList,
  getPostListLoading,
  journalFeatureName
} from './journal.selectors';
import { JournalState } from './journal.state';

const mockState: JournalState = {
  posts: {
    posts: [],
    page: 1,
    totalPages: 4
  },
  currentPost: {
    postId: 1,
    title: 'test post',
    content: 'a test post',
    slug: 'test-post',
    tags: ['test', 'post'],
    date: 123456789,
    modified: null,
    status: PostStatus.Publish
  },
  postsLoading: false
};

const appState: any = {};
appState[journalFeatureName] = mockState;

describe('getPostList', () => {
  it('should return post list from store', () => {
    const result = getPostList(appState);
    expect(result).toEqual(mockState.posts);
  });
});

describe('getCurrentPost', () => {
  it('should return current post data from store', () => {
    const result = getCurrentPost(appState);
    expect(result).toEqual(mockState.currentPost);
  });
});

describe('getPostListLoading', () => {
  it('should return loading state from store', () => {
    const result = getPostListLoading(appState);
    expect(result).toEqual(mockState.postsLoading);
  });
});

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { JournalState } from './journal.state';

export const journalFeatureName = 'Journal';

export const getPartBrowserState =
  createFeatureSelector<JournalState>(journalFeatureName);

export const getPostList = createSelector(
  getPartBrowserState,
  state => state.posts
);

export const getCurrentPost = createSelector(
  getPartBrowserState,
  state => state.currentPost
);

export const getPostListLoading = createSelector(
  getPartBrowserState,
  state => state.postsLoading
);

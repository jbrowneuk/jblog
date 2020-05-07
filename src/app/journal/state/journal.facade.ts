import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoadPosts, LoadSinglePost } from './journal.actions';
import { getCurrentPost, getPostList, getPostListLoading } from './journal.selectors';
import { JournalState } from './journal.state';

@Injectable({ providedIn: 'root' })
export class JournalFacade {
  public readonly postList$ = this.store.select(getPostList);
  public readonly currentPost$ = this.store.select(getCurrentPost);
  public readonly postListLoading$ = this.store.select(getPostListLoading);

  constructor(private store: Store<JournalState>) {}

  public loadPostList(page: number): void {
    this.store.dispatch(new LoadPosts(page));
  }

  public loadPostBySlug(slug: string): void {
    this.store.dispatch(new LoadSinglePost(slug));
  }
}

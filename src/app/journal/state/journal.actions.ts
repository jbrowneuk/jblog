import { PostData, PostDataWrapper } from 'src/app/model/post-data';

import { Action } from '@ngrx/store';

export enum JournalActionsType {
  LoadPosts = '[Journal] Load Multiple Posts Start',
  LoadPostsSuccess = '[Journal] Load Multiple Posts Successful',
  LoadPostsFailure = '[Journal] Load Multiple Posts Failure',
  LoadSinglePost = '[Journal] Load Single Post Start',
  LoadSinglePostSuccess = '[Journal] Load Single Post Successful',
  LoadSinglePostFailure = '[Journal] Load Single Post Failure'
}

export class LoadPosts implements Action {
  public readonly type = JournalActionsType.LoadPosts;

  constructor(public page: number, public tag: string) {}
}

export class LoadPostsSuccess implements Action {
  public readonly type = JournalActionsType.LoadPostsSuccess;

  constructor(public payload: PostDataWrapper) {}
}

export class LoadPostsFailure implements Action {
  public readonly type = JournalActionsType.LoadPostsFailure;
}

export class LoadSinglePost implements Action {
  public readonly type = JournalActionsType.LoadSinglePost;

  constructor(public payload: string) {}
}

export class LoadSinglePostSuccess implements Action {
  public readonly type = JournalActionsType.LoadSinglePostSuccess;
  public readonly payload: PostData;

  constructor(postData: PostData) {
    this.payload = postData;
  }
}

export class LoadSinglePostFailure implements Action {
  readonly type = JournalActionsType.LoadSinglePostFailure;
}

export type JournalActions =
  | LoadPosts
  | LoadPostsSuccess
  | LoadPostsFailure
  | LoadSinglePost
  | LoadSinglePostSuccess
  | LoadSinglePostFailure;

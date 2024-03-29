import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { PostService } from '../../services/post.service';
import {
  JournalActionsType,
  LoadPosts,
  LoadPostsFailure,
  LoadPostsSuccess,
  LoadSinglePost,
  LoadSinglePostFailure,
  LoadSinglePostSuccess
} from './journal.actions';

@Injectable()
export class JournalEffects {
  public loadPosts$ = createEffect(() => {
    return this.actions.pipe(
      ofType(JournalActionsType.LoadPosts),
      switchMap((action: LoadPosts) =>
        this.service.getPostsForPage(action.page, action.tag).pipe(
          map(r => new LoadPostsSuccess(r)),
          catchError(() => of(new LoadPostsFailure()))
        )
      )
    );
  });

  public loadSinglePost$ = createEffect(() => {
    return this.actions.pipe(
      ofType(JournalActionsType.LoadSinglePost),
      switchMap((action: LoadSinglePost) =>
        this.service.getPost(action.payload).pipe(
          map(r => new LoadSinglePostSuccess(r)),
          catchError(() => of(new LoadSinglePostFailure()))
        )
      )
    );
  });

  constructor(private actions: Actions, private service: PostService) {}
}

import { Observable, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostData } from '../../model/post-data';
import { TitleService } from '../../shared/title.service';
import { JournalFacade } from '../state/journal.facade';

@Component({
  selector: 'jblog-post-single',
  templateUrl: './post-single.component.html'
})
export class PostSingleComponent implements OnInit {
  public postData$?: Observable<PostData | null>;

  constructor(
    private postFacade: JournalFacade,
    private route: ActivatedRoute,
    private title: TitleService
  ) {}

  public get loading$(): Observable<boolean> {
    return this.postFacade.postListLoading$;
  }

  ngOnInit(): void {
    this.postData$ = this.route.params.pipe(
      switchMap(params => {
        const slug = params['slug'];
        if (!slug) {
          return throwError(() => new Error('No param'));
        }

        this.postFacade.loadPostBySlug(slug);
        return this.postFacade.currentPost$ as Observable<PostData>;
      }),
      tap({ next: this.handlePostChanged.bind(this) })
    );
  }

  private handlePostChanged(post: PostData): void {
    if (!post || post === null) {
      return this.title.resetTitle();
    }

    this.title.setTitle(`Journal - ${post.title}`);
  }
}

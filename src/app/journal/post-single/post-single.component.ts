import { Observable, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PostData } from 'src/app/model/post-data';
import { TitleService } from 'src/app/shared/title.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JournalFacade } from '../state/journal.facade';

@Component({
  selector: 'jblog-post-single',
  templateUrl: './post-single.component.html'
})
export class PostSingleComponent implements OnInit {
  public postData$: Observable<PostData>;

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
        const slug = params.slug;
        if (!slug) {
          return throwError('No param');
        }

        this.postFacade.loadPostBySlug(slug);
        return this.postFacade.currentPost$;
      }),
      tap({ next: this.handlePostChanged.bind(this) })
    );
  }

  private handlePostChanged(post: PostData): void {
    if (!post) {
      return this.title.resetTitle();
    }

    this.title.setTitle(`Journal - ${post.title}`);
  }
}

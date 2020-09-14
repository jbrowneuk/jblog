import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostDataWrapper } from 'src/app/model/post-data';
import { TitleService } from 'src/app/shared/title.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JournalFacade } from '../state/journal.facade';

@Component({
  selector: 'jblog-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  public postData$: Observable<PostDataWrapper>;
  public tag: string;

  constructor(
    private postFacade: JournalFacade,
    private route: ActivatedRoute,
    private title: TitleService
  ) {
    this.tag = null;
  }

  public get loading$(): Observable<boolean> {
    return this.postFacade.postListLoading$;
  }

  ngOnInit(): void {
    this.tag = null;
    this.postData$ = this.route.params.pipe(
      switchMap(params => {
        const page = +params.page || 1;
        this.tag = params.tag || null;
        this.updateTitle(page, this.tag);
        this.postFacade.loadPostList(page, this.tag);
        return this.postFacade.postList$;
      })
    );
  }

  public calculateUrlComponents(): string[] {
    const urlComponents = ['journal'];
    if (this.tag) {
      urlComponents.push('tag', this.tag);
    }

    return urlComponents;
  }

  private updateTitle(page: number, tag: string): void {
    const baseTitle = 'Journal';
    const tagInfo = tag ? `posts tagged ${tag}, ` : '';
    const pageInfo = `page ${page}`;

    this.title.setTitle(`${baseTitle} - ${tagInfo}${pageInfo}`);
  }
}
